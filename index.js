"use strict";
var format = require('util').format;
var EOL = require('os').EOL;
var NODE_NAME_PREFIX = "N_";

/**
 *
 * @param textContent {String}
 * @param outputStream {WritableStream}
 */
module.exports = function (textContent, outputStream) {

  if (typeof textContent !== "string") {
    throw new Error('Param jsonTree must be a string');
  }

  if (!outputStream) {
    outputStream = process.stdout;
  }

  // generate id for each module
  var id = 0;
  var tree = JSON.parse(textContent);


  /**
   * recursive
   *
   * @param tree {Object}
   * @param prev {String}
   * @param level {Number}
   *
   */
  function show(tree, prev, level) {
    level = level + 1;

    if (tree) {
      //FIXME: prototype check
      for (var i in tree.dependencies) {
        if (tree.dependencies.hasOwnProperty(i)) {
          id++;
          var nodeName = NODE_NAME_PREFIX + id;
          var child = i + '@' + tree.dependencies[i].version;

          outputStream.write(format(' "%s" -> "%s"%s', prev, nodeName, EOL));
          outputStream.write(format(' "%s"[label="%s",style="filled",fillcolor="%d 1 1"]%s', nodeName, child, level / 15, EOL));

          show(tree.dependencies[i], nodeName, level);
        }

      }
    }
  }

  outputStream.write(format('digraph{%s', EOL));
  outputStream.write(format(' root="%s@%s"%s', tree.name, tree.version, EOL));
  show(tree, tree.name + "@" + tree.version, 0);
  outputStream.write(format('}%s', EOL));
};





