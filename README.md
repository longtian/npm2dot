# npm2dot
![NPM](https://david-dm.org/wyvernnot/npm2dot.svg)
[![Build Status](https://travis-ci.org/wyvernnot/npm2dot.svg?branch=master)](https://travis-ci.org/wyvernnot/npm2dot)

Convert npm dependency list to dot file which can be visualized using graphviz

[![NPM](https://nodei.co/npm/npm2dot.png)](https://nodei.co/npm/npm2dot/)

**Install**

```sh
npm isntall npm2dot -g
```

**Usage**

1\. In a `Node.js` package folder, type in command line:

```sh
npm ls --json | npm2dot
```

2\. `npm2dot` will write following content to stdout:

```
digraph{
 root="debug@2.2.0"
 "debug@2.2.0" -> "N_1"
 "N_1"[label="ms@0.7.1",style="filled",fillcolor="0.06666666666666667 1 1"]
}
```

3\. The output can be piped to Graphviz:

```sh
npm ls --json | npm2dot | dot -Tpng -o debug.png -Grankdit=LR
```

![debug.png](doc/debug.png)

## Use Case 1 : Comparison of folder structure installed separately using NPM2 and NPM3

NPM3 is currently in beta, one of the most expected feature is [flatten structure](http://www.infoq.com/news/2015/06/npm) :

> Dependencies will now be installed maximally flat. Insofar as is possible, all of your dependencies,
> and their dependencies, and THEIR dependencies will be installed in your project's node_modules folder with no nesting. 
> You'll only see modules nested underneath one another when two (or more) modules have conflicting dependencies.

Using `npm2dot` and `Graphviz` will help you clearly understand this change:

```sh
npm ls --json | npm2dot | twopi -Tsvg -o /tmp/twopi.svg -Granksep=4
```

**Result:**

Before, the dependencies is install with npm@2.x

![npm2](doc/oneapmfed@npm2.png)

If we use npm@3.x (`npm install npm@3.x-next -g`) to install dependencies, there are less nodes in the structure

![npm3](doc/oneapmfed@npm3.png)

## Use Case 2 : Comparison of Express Production and Development environment

In express folder, execute

```sh
npm ls --json | npm2dot | dot -Grankdir=LR -Tpng -O
```

**Result:**

Express Production Environment

![express#production](doc/express.production.png)

Express Development Environment

![express#development](doc/express.dev.png)

## Attention

`npm2dot` converts `npm ls --json` result to `.dot` file format, it will not generate the picture directly for you.

To generate the picture you need install [Graphviz](http://www.graphviz.org/Download.php).


