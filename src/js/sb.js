(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("sb", [], factory);
	else if(typeof exports === 'object')
		exports["sb"] = factory();
	else
		root["sb"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Structures = exports.QuickModeMonosaccharides = exports.MonosaccharideGlycoCT = exports.SubstituentsPositions = exports.Controller = exports.RepeatingUnit = exports.NodeComparator = exports.GlycoCTSubstituents = exports.GlycoCTWriter = exports.GlycoCTParser = exports.Sugar = exports.Substituent = exports.SubstituentLinkage = exports.GlycosidicLinkage = exports.SubstituentType = exports.Monosaccharide = exports.RingType = exports.MonosaccharideType = exports.LinkedCarbon = exports.Isomer = exports.Anomericity = exports.AnomerCarbon = exports.GraphNode = exports.GraphEdge = exports.Graph = undefined;
	
	var _Graph = __webpack_require__(1);
	
	var _Graph2 = _interopRequireDefault(_Graph);
	
	var _GraphEdge = __webpack_require__(2);
	
	var _GraphEdge2 = _interopRequireDefault(_GraphEdge);
	
	var _GraphNode = __webpack_require__(3);
	
	var _GraphNode2 = _interopRequireDefault(_GraphNode);
	
	var _AnomerCarbon = __webpack_require__(4);
	
	var _AnomerCarbon2 = _interopRequireDefault(_AnomerCarbon);
	
	var _Anomericity = __webpack_require__(6);
	
	var _Anomericity2 = _interopRequireDefault(_Anomericity);
	
	var _Isomer = __webpack_require__(7);
	
	var _Isomer2 = _interopRequireDefault(_Isomer);
	
	var _LinkedCarbon = __webpack_require__(8);
	
	var _LinkedCarbon2 = _interopRequireDefault(_LinkedCarbon);
	
	var _MonosaccharideType = __webpack_require__(9);
	
	var _MonosaccharideType2 = _interopRequireDefault(_MonosaccharideType);
	
	var _RingType = __webpack_require__(10);
	
	var _RingType2 = _interopRequireDefault(_RingType);
	
	var _SubstituentType = __webpack_require__(11);
	
	var _SubstituentType2 = _interopRequireDefault(_SubstituentType);
	
	var _SubstituentsGlycoCT = __webpack_require__(12);
	
	var _SubstituentsGlycoCT2 = _interopRequireDefault(_SubstituentsGlycoCT);
	
	var _SubstituentsPositions = __webpack_require__(13);
	
	var _SubstituentsPositions2 = _interopRequireDefault(_SubstituentsPositions);
	
	var _MonosaccharideGlycoCT = __webpack_require__(14);
	
	var _MonosaccharideGlycoCT2 = _interopRequireDefault(_MonosaccharideGlycoCT);
	
	var _QuickModeMonosaccharides = __webpack_require__(15);
	
	var _QuickModeMonosaccharides2 = _interopRequireDefault(_QuickModeMonosaccharides);
	
	var _Structures = __webpack_require__(16);
	
	var _Structures2 = _interopRequireDefault(_Structures);
	
	var _GlycosidicLinkage = __webpack_require__(17);
	
	var _GlycosidicLinkage2 = _interopRequireDefault(_GlycosidicLinkage);
	
	var _SubstituentLinkage = __webpack_require__(18);
	
	var _SubstituentLinkage2 = _interopRequireDefault(_SubstituentLinkage);
	
	var _Monosaccharide = __webpack_require__(19);
	
	var _Monosaccharide2 = _interopRequireDefault(_Monosaccharide);
	
	var _Substituent = __webpack_require__(20);
	
	var _Substituent2 = _interopRequireDefault(_Substituent);
	
	var _Sugar = __webpack_require__(21);
	
	var _Sugar2 = _interopRequireDefault(_Sugar);
	
	var _RepeatingUnit = __webpack_require__(22);
	
	var _RepeatingUnit2 = _interopRequireDefault(_RepeatingUnit);
	
	var _GlycoCTParser = __webpack_require__(23);
	
	var _GlycoCTParser2 = _interopRequireDefault(_GlycoCTParser);
	
	var _GlycoCTWriter = __webpack_require__(24);
	
	var _GlycoCTWriter2 = _interopRequireDefault(_GlycoCTWriter);
	
	var _NodeComparator = __webpack_require__(26);
	
	var _NodeComparator2 = _interopRequireDefault(_NodeComparator);
	
	var _Controller = __webpack_require__(27);
	
	var _Controller2 = _interopRequireDefault(_Controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//IO
	
	
	//Sugar
	
	
	//Nodes
	
	
	//Linkages
	
	
	//Glycomics Structure
	//Dictionary
	exports.Graph = _Graph2.default;
	exports.GraphEdge = _GraphEdge2.default;
	exports.GraphNode = _GraphNode2.default;
	exports.AnomerCarbon = _AnomerCarbon2.default;
	exports.Anomericity = _Anomericity2.default;
	exports.Isomer = _Isomer2.default;
	exports.LinkedCarbon = _LinkedCarbon2.default;
	exports.MonosaccharideType = _MonosaccharideType2.default;
	exports.RingType = _RingType2.default;
	exports.Monosaccharide = _Monosaccharide2.default;
	exports.SubstituentType = _SubstituentType2.default;
	exports.GlycosidicLinkage = _GlycosidicLinkage2.default;
	exports.SubstituentLinkage = _SubstituentLinkage2.default;
	exports.Substituent = _Substituent2.default;
	exports.Sugar = _Sugar2.default;
	exports.GlycoCTParser = _GlycoCTParser2.default;
	exports.GlycoCTWriter = _GlycoCTWriter2.default;
	exports.GlycoCTSubstituents = _SubstituentsGlycoCT2.default;
	exports.NodeComparator = _NodeComparator2.default;
	exports.RepeatingUnit = _RepeatingUnit2.default;
	exports.Controller = _Controller2.default;
	exports.SubstituentsPositions = _SubstituentsPositions2.default;
	exports.MonosaccharideGlycoCT = _MonosaccharideGlycoCT2.default;
	exports.QuickModeMonosaccharides = _QuickModeMonosaccharides2.default;
	exports.Structures = _Structures2.default;
	
	//Controller
	/**
	 * This file allows the creation of a bundle library. 
	 * Author:  Davide Alocci
	 * Version: 0.0.1
	 */
	
	//Data Structure

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Class taken from sigma.js
	 * https://github.com/jacomyal/sigma.js  -> sigma.js/src/classes/sigma.classes.graph.js
	 *
	 * This is the only part we need from sigma.js and we can add more method to fulfill our needs
	 *
	 * Licence:
	 *
	 * Copyright (C) 2013-2014, Alexis Jacomy, http://sigmajs.org
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
	 * to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
	 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
	
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
	 * IN THE SOFTWARE.
	 */
	
	;(function (undefined) {
	    'use strict';
	
	    var _methods = Object.create(null),
	        _indexes = Object.create(null),
	        _initBindings = Object.create(null),
	        _methodBindings = Object.create(null),
	        _methodBeforeBindings = Object.create(null),
	        _defaultSettings = {
	        immutable: true,
	        clone: false
	    },
	        _defaultSettingsFunction = function _defaultSettingsFunction(key) {
	        return _defaultSettings[key];
	    };
	
	    /**
	     * The graph constructor. It initializes the data and the indexes, and binds
	     * the custom indexes and methods to its own scope.
	     *
	     * Recognized parameters:
	     * **********************
	     * Here is the exhaustive list of every accepted parameters in the settings
	     * object:
	     *
	     *   {boolean} clone     Indicates if the data have to be cloned in methods
	     *                       to add nodes or edges.
	     *   {boolean} immutable Indicates if nodes "id" values and edges "id",
	     *                       "source" and "target" values must be set as
	     *                       immutable.
	     *
	     * @param  {?configurable} settings Eventually a settings function.
	     * @return {graph}                  The new graph instance.
	     */
	    var graph = function graph(settings) {
	        var k, fn, data;
	
	        /**
	         * DATA:
	         * *****
	         * Every data that is callable from graph methods are stored in this "data"
	         * object. This object will be served as context for all these methods,
	         * and it is possible to add other type of data in it.
	         */
	        data = {
	            /**
	             * SETTINGS FUNCTION:
	             * ******************
	             */
	            settings: settings || _defaultSettingsFunction,
	
	            /**
	             * MAIN DATA:
	             * **********
	             */
	            nodesArray: [],
	            edgesArray: [],
	
	            /**
	             * GLOBAL INDEXES:
	             * ***************
	             * These indexes just index data by ids.
	             */
	            nodesIndex: Object.create(null),
	            edgesIndex: Object.create(null),
	
	            /**
	             * LOCAL INDEXES:
	             * **************
	             * These indexes refer from node to nodes. Each key is an id, and each
	             * value is the array of the ids of related nodes.
	             */
	            inNeighborsIndex: Object.create(null),
	            outNeighborsIndex: Object.create(null),
	            allNeighborsIndex: Object.create(null),
	
	            inNeighborsCount: Object.create(null),
	            outNeighborsCount: Object.create(null),
	            allNeighborsCount: Object.create(null)
	        };
	
	        // Execute bindings:
	        for (k in _initBindings) {
	            _initBindings[k].call(data);
	        } // Add methods to both the scope and the data objects:
	        for (k in _methods) {
	            fn = __bindGraphMethod(k, data, _methods[k]);
	            this[k] = fn;
	            data[k] = fn;
	        }
	    };
	
	    /**
	     * A custom tool to bind methods such that function that are bound to it will
	     * be executed anytime the method is called.
	     *
	     * @param  {string}   methodName The name of the method to bind.
	     * @param  {object}   scope      The scope where the method must be executed.
	     * @param  {function} fn         The method itself.
	     * @return {function}            The new method.
	     */
	    function __bindGraphMethod(methodName, scope, fn) {
	        var result = function result() {
	            var k, res;
	
	            // Execute "before" bound functions:
	            for (k in _methodBeforeBindings[methodName]) {
	                _methodBeforeBindings[methodName][k].apply(scope, arguments);
	            } // Apply the method:
	            res = fn.apply(scope, arguments);
	
	            // Execute bound functions:
	            for (k in _methodBindings[methodName]) {
	                _methodBindings[methodName][k].apply(scope, arguments);
	            } // Return res:
	            return res;
	        };
	
	        return result;
	    }
	
	    /**
	     * This custom tool function removes every pair key/value from an hash. The
	     * goal is to avoid creating a new object while some other references are
	     * still hanging in some scopes...
	     *
	     * @param  {object} obj The object to empty.
	     * @return {object}     The empty object.
	     */
	    function __emptyObject(obj) {
	        var k;
	
	        for (k in obj) {
	            if (!('hasOwnProperty' in obj) || obj.hasOwnProperty(k)) delete obj[k];
	        }return obj;
	    }
	
	    /**
	     * This global method adds a method that will be bound to the futurly created
	     * graph instances.
	     *
	     * Since these methods will be bound to their scope when the instances are
	     * created, it does not use the prototype. Because of that, methods have to
	     * be added before instances are created to make them available.
	     *
	     * Here is an example:
	     *
	     *  > graph.addMethod('getNodesCount', function() {
	    *  >   return this.nodesArray.length;
	    *  > });
	     *  >
	     *  > var myGraph = new graph();
	     *  > console.log(myGraph.getNodesCount()); // outputs 0
	     *
	     * @param  {string}   methodName The name of the method.
	     * @param  {function} fn         The method itself.
	     * @return {object}              The global graph constructor.
	     */
	    graph.addMethod = function (methodName, fn) {
	        if (typeof methodName !== 'string' || typeof fn !== 'function' || arguments.length !== 2) throw 'addMethod: Wrong arguments.';
	
	        if (_methods[methodName] || graph[methodName]) throw 'The method "' + methodName + '" already exists.';
	
	        _methods[methodName] = fn;
	        _methodBindings[methodName] = Object.create(null);
	        _methodBeforeBindings[methodName] = Object.create(null);
	
	        return this;
	    };
	
	    /**
	     * This global method returns true if the method has already been added, and
	     * false else.
	     *
	     * Here are some examples:
	     *
	     *  > graph.hasMethod('addNode'); // returns true
	     *  > graph.hasMethod('hasMethod'); // returns true
	     *  > graph.hasMethod('unexistingMethod'); // returns false
	     *
	     * @param  {string}  methodName The name of the method.
	     * @return {boolean}            The result.
	     */
	    graph.hasMethod = function (methodName) {
	        return !!(_methods[methodName] || graph[methodName]);
	    };
	
	    /**
	     * This global methods attaches a function to a method. Anytime the specified
	     * method is called, the attached function is called right after, with the
	     * same arguments and in the same scope. The attached function is called
	     * right before if the last argument is true, unless the method is the graph
	     * constructor.
	     *
	     * To attach a function to the graph constructor, use 'constructor' as the
	     * method name (first argument).
	     *
	     * The main idea is to have a clean way to keep custom indexes up to date,
	     * for instance:
	     *
	     *  > var timesAddNodeCalled = 0;
	     *  > graph.attach('addNode', 'timesAddNodeCalledInc', function() {
	    *  >   timesAddNodeCalled++;
	    *  > });
	     *  >
	     *  > var myGraph = new graph();
	     *  > console.log(timesAddNodeCalled); // outputs 0
	     *  >
	     *  > myGraph.addNode({ id: '1' }).addNode({ id: '2' });
	     *  > console.log(timesAddNodeCalled); // outputs 2
	     *
	     * The idea for calling a function before is to provide pre-processors, for
	     * instance:
	     *
	     *  > var colorPalette = { Person: '#C3CBE1', Place: '#9BDEBD' };
	     *  > graph.attach('addNode', 'applyNodeColorPalette', function(n) {
	    *  >   n.color = colorPalette[n.category];
	    *  > }, true);
	     *  >
	     *  > var myGraph = new graph();
	     *  > myGraph.addNode({ id: 'n0', category: 'Person' });
	     *  > console.log(myGraph.nodes('n0').color); // outputs '#C3CBE1'
	     *
	     * @param  {string}   methodName The name of the related method or
	     *                               "constructor".
	     * @param  {string}   key        The key to identify the function to attach.
	     * @param  {function} fn         The function to bind.
	     * @param  {boolean}  before     If true the function is called right before.
	     * @return {object}              The global graph constructor.
	     */
	    graph.attach = function (methodName, key, fn, before) {
	        if (typeof methodName !== 'string' || typeof key !== 'string' || typeof fn !== 'function' || arguments.length < 3 || arguments.length > 4) throw 'attach: Wrong arguments.';
	
	        var bindings;
	
	        if (methodName === 'constructor') bindings = _initBindings;else {
	            if (before) {
	                if (!_methodBeforeBindings[methodName]) throw 'The method "' + methodName + '" does not exist.';
	
	                bindings = _methodBeforeBindings[methodName];
	            } else {
	                if (!_methodBindings[methodName]) throw 'The method "' + methodName + '" does not exist.';
	
	                bindings = _methodBindings[methodName];
	            }
	        }
	
	        if (bindings[key]) throw 'A function "' + key + '" is already attached ' + 'to the method "' + methodName + '".';
	
	        bindings[key] = fn;
	
	        return this;
	    };
	
	    /**
	     * Alias of attach(methodName, key, fn, true).
	     */
	    graph.attachBefore = function (methodName, key, fn) {
	        return this.attach(methodName, key, fn, true);
	    };
	
	    /**
	     * This methods is just an helper to deal with custom indexes. It takes as
	     * arguments the name of the index and an object containing all the different
	     * functions to bind to the methods.
	     *
	     * Here is a basic example, that creates an index to keep the number of nodes
	     * in the current graph. It also adds a method to provide a getter on that
	     * new index:
	     *
	     *  > sigma.classes.graph.addIndex('nodesCount', {
	    *  >   constructor: function() {
	    *  >     this.nodesCount = 0;
	    *  >   },
	    *  >   addNode: function() {
	    *  >     this.nodesCount++;
	    *  >   },
	    *  >   dropNode: function() {
	    *  >     this.nodesCount--;
	    *  >   }
	    *  > });
	     *  >
	     *  > sigma.classes.graph.addMethod('getNodesCount', function() {
	    *  >   return this.nodesCount;
	    *  > });
	     *  >
	     *  > var myGraph = new sigma.classes.graph();
	     *  > console.log(myGraph.getNodesCount()); // outputs 0
	     *  >
	     *  > myGraph.addNode({ id: '1' }).addNode({ id: '2' });
	     *  > console.log(myGraph.getNodesCount()); // outputs 2
	     *
	     * @param  {string} name     The name of the index.
	     * @param  {object} bindings The object containing the functions to bind.
	     * @return {object}          The global graph constructor.
	     */
	    graph.addIndex = function (name, bindings) {
	        if (typeof name !== 'string' || Object(bindings) !== bindings || arguments.length !== 2) throw 'addIndex: Wrong arguments.';
	
	        if (_indexes[name]) throw 'The index "' + name + '" already exists.';
	
	        var k;
	
	        // Store the bindings:
	        _indexes[name] = bindings;
	
	        // Attach the bindings:
	        for (k in bindings) {
	            if (typeof bindings[k] !== 'function') throw 'The bindings must be functions.';else graph.attach(k, name, bindings[k]);
	        }return this;
	    };
	
	    /**
	     * This method adds a node to the graph. The node must be an object, with a
	     * string under the key "id". Except for this, it is possible to add any
	     * other attribute, that will be preserved all along the manipulations.
	     *
	     * If the graph option "clone" has a truthy value, the node will be cloned
	     * when added to the graph. Also, if the graph option "immutable" has a
	     * truthy value, its id will be defined as immutable.
	     *
	     * @param  {object} node The node to add.
	     * @return {object}      The graph instance.
	     */
	    graph.addMethod('addNode', function (node) {
	        // Check that the node is an object and has an id:
	        if (Object(node) !== node || arguments.length !== 1) throw 'addNode: Wrong arguments.';
	
	        if (typeof node.id !== 'string' && typeof node.id !== 'number') throw 'The node must have a string or number id.';
	
	        if (this.nodesIndex[node.id]) throw 'The node "' + node.id + '" already exists.';
	
	        var k,
	            id = node.id,
	            validNode = Object.create(null);
	
	        // Check the "clone" option:
	        if (this.settings('clone')) {
	            for (k in node) {
	                if (k !== 'id') validNode[k] = node[k];
	            }
	        } else validNode = node;
	
	        // Check the "immutable" option:
	        if (this.settings('immutable')) Object.defineProperty(validNode, 'id', {
	            value: id,
	            enumerable: true
	        });else validNode.id = id;
	
	        // Add empty containers for edges indexes:
	        this.inNeighborsIndex[id] = Object.create(null);
	        this.outNeighborsIndex[id] = Object.create(null);
	        this.allNeighborsIndex[id] = Object.create(null);
	
	        this.inNeighborsCount[id] = 0;
	        this.outNeighborsCount[id] = 0;
	        this.allNeighborsCount[id] = 0;
	
	        // Add the node to indexes:
	        this.nodesArray.push(validNode);
	        this.nodesIndex[validNode.id] = validNode;
	
	        // Return the current instance:
	        return this;
	    });
	
	    /**
	     * This method adds an edge to the graph. The edge must be an object, with a
	     * string under the key "id", and strings under the keys "source" and
	     * "target" that design existing nodes. Except for this, it is possible to
	     * add any other attribute, that will be preserved all along the
	     * manipulations.
	     *
	     * If the graph option "clone" has a truthy value, the edge will be cloned
	     * when added to the graph. Also, if the graph option "immutable" has a
	     * truthy value, its id, source and target will be defined as immutable.
	     *
	     * @param  {object} edge The edge to add.
	     * @return {object}      The graph instance.
	     */
	    graph.addMethod('addEdge', function (edge) {
	        // Check that the edge is an object and has an id:
	        if (Object(edge) !== edge || arguments.length !== 1) throw 'addEdge: Wrong arguments.';
	
	        if (typeof edge.id !== 'string' && typeof edge.id !== 'number') throw 'The edge must have a string or number id.';
	
	        if (typeof edge.source !== 'string' && typeof edge.source !== 'number' || !this.nodesIndex[edge.source]) throw 'The edge source must have an existing node id.';
	
	        if (typeof edge.target !== 'string' && typeof edge.target !== 'number' || !this.nodesIndex[edge.target]) throw 'The edge target must have an existing node id.';
	
	        if (this.edgesIndex[edge.id]) throw 'The edge "' + edge.id + '" already exists.';
	
	        var k,
	            validEdge = Object.create(null);
	
	        // Check the "clone" option:
	        if (this.settings('clone')) {
	            for (k in edge) {
	                if (k !== 'id' && k !== 'source' && k !== 'target') validEdge[k] = edge[k];
	            }
	        } else validEdge = edge;
	
	        // Check the "immutable" option:
	        if (this.settings('immutable')) {
	            Object.defineProperty(validEdge, 'id', {
	                value: edge.id,
	                enumerable: true
	            });
	
	            Object.defineProperty(validEdge, 'source', {
	                value: edge.source,
	                enumerable: true
	            });
	
	            Object.defineProperty(validEdge, 'target', {
	                value: edge.target,
	                enumerable: true
	            });
	        } else {
	            validEdge.id = edge.id;
	            validEdge.source = edge.source;
	            validEdge.target = edge.target;
	        }
	
	        // Add the edge to indexes:
	        this.edgesArray.push(validEdge);
	        this.edgesIndex[validEdge.id] = validEdge;
	
	        if (!this.inNeighborsIndex[validEdge.target][validEdge.source]) this.inNeighborsIndex[validEdge.target][validEdge.source] = Object.create(null);
	        this.inNeighborsIndex[validEdge.target][validEdge.source][validEdge.id] = validEdge;
	
	        if (!this.outNeighborsIndex[validEdge.source][validEdge.target]) this.outNeighborsIndex[validEdge.source][validEdge.target] = Object.create(null);
	        this.outNeighborsIndex[validEdge.source][validEdge.target][validEdge.id] = validEdge;
	
	        if (!this.allNeighborsIndex[validEdge.source][validEdge.target]) this.allNeighborsIndex[validEdge.source][validEdge.target] = Object.create(null);
	        this.allNeighborsIndex[validEdge.source][validEdge.target][validEdge.id] = validEdge;
	
	        if (validEdge.target !== validEdge.source) {
	            if (!this.allNeighborsIndex[validEdge.target][validEdge.source]) this.allNeighborsIndex[validEdge.target][validEdge.source] = Object.create(null);
	            this.allNeighborsIndex[validEdge.target][validEdge.source][validEdge.id] = validEdge;
	        }
	
	        // Keep counts up to date:
	        this.inNeighborsCount[validEdge.target]++;
	        this.outNeighborsCount[validEdge.source]++;
	        this.allNeighborsCount[validEdge.target]++;
	        this.allNeighborsCount[validEdge.source]++;
	
	        return this;
	    });
	
	    /**
	     * This method drops a node from the graph. It also removes each edge that is
	     * bound to it, through the dropEdge method. An error is thrown if the node
	     * does not exist.
	     *
	     * @param  {string} id The node id.
	     * @return {object}    The graph instance.
	     */
	    graph.addMethod('dropNode', function (id) {
	        // Check that the arguments are valid:
	        if (typeof id !== 'string' && typeof id !== 'number' || arguments.length !== 1) throw 'dropNode: Wrong arguments.';
	
	        if (!this.nodesIndex[id]) throw 'The node "' + id + '" does not exist.';
	
	        var i, k, l;
	
	        // Remove the node from indexes:
	        delete this.nodesIndex[id];
	        for (i = 0, l = this.nodesArray.length; i < l; i++) {
	            if (this.nodesArray[i].id === id) {
	                this.nodesArray.splice(i, 1);
	                break;
	            }
	        } // Remove related edges:
	        for (i = this.edgesArray.length - 1; i >= 0; i--) {
	            if (this.edgesArray[i].source === id || this.edgesArray[i].target === id) this.dropEdge(this.edgesArray[i].id);
	        } // Remove related edge indexes:
	        delete this.inNeighborsIndex[id];
	        delete this.outNeighborsIndex[id];
	        delete this.allNeighborsIndex[id];
	
	        delete this.inNeighborsCount[id];
	        delete this.outNeighborsCount[id];
	        delete this.allNeighborsCount[id];
	
	        for (k in this.nodesIndex) {
	            delete this.inNeighborsIndex[k][id];
	            delete this.outNeighborsIndex[k][id];
	            delete this.allNeighborsIndex[k][id];
	        }
	
	        return this;
	    });
	
	    /**
	     * This method drops an edge from the graph. An error is thrown if the edge
	     * does not exist.
	     *
	     * @param  {string} id The edge id.
	     * @return {object}    The graph instance.
	     */
	    graph.addMethod('dropEdge', function (id) {
	        // Check that the arguments are valid:
	        if (typeof id !== 'string' && typeof id !== 'number' || arguments.length !== 1) throw 'dropEdge: Wrong arguments.';
	
	        if (!this.edgesIndex[id]) throw 'The edge "' + id + '" does not exist.';
	
	        var i, l, edge;
	
	        // Remove the edge from indexes:
	        edge = this.edgesIndex[id];
	        delete this.edgesIndex[id];
	        for (i = 0, l = this.edgesArray.length; i < l; i++) {
	            if (this.edgesArray[i].id === id) {
	                this.edgesArray.splice(i, 1);
	                break;
	            }
	        }delete this.inNeighborsIndex[edge.target][edge.source][edge.id];
	        if (!Object.keys(this.inNeighborsIndex[edge.target][edge.source]).length) delete this.inNeighborsIndex[edge.target][edge.source];
	
	        delete this.outNeighborsIndex[edge.source][edge.target][edge.id];
	        if (!Object.keys(this.outNeighborsIndex[edge.source][edge.target]).length) delete this.outNeighborsIndex[edge.source][edge.target];
	
	        delete this.allNeighborsIndex[edge.source][edge.target][edge.id];
	        if (!Object.keys(this.allNeighborsIndex[edge.source][edge.target]).length) delete this.allNeighborsIndex[edge.source][edge.target];
	
	        if (edge.target !== edge.source) {
	            delete this.allNeighborsIndex[edge.target][edge.source][edge.id];
	            if (!Object.keys(this.allNeighborsIndex[edge.target][edge.source]).length) delete this.allNeighborsIndex[edge.target][edge.source];
	        }
	
	        this.inNeighborsCount[edge.target]--;
	        this.outNeighborsCount[edge.source]--;
	        this.allNeighborsCount[edge.source]--;
	        this.allNeighborsCount[edge.target]--;
	
	        return this;
	    });
	
	    /**
	     * This method destroys the current instance. It basically empties each index
	     * and methods attached to the graph.
	     */
	    graph.addMethod('kill', function () {
	        // Delete arrays:
	        this.nodesArray.length = 0;
	        this.edgesArray.length = 0;
	        delete this.nodesArray;
	        delete this.edgesArray;
	
	        // Delete indexes:
	        delete this.nodesIndex;
	        delete this.edgesIndex;
	        delete this.inNeighborsIndex;
	        delete this.outNeighborsIndex;
	        delete this.allNeighborsIndex;
	        delete this.inNeighborsCount;
	        delete this.outNeighborsCount;
	        delete this.allNeighborsCount;
	    });
	
	    /**
	     * This method empties the nodes and edges arrays, as well as the different
	     * indexes.
	     *
	     * @return {object} The graph instance.
	     */
	    graph.addMethod('clear', function () {
	        this.nodesArray.length = 0;
	        this.edgesArray.length = 0;
	
	        // Due to GC issues, I prefer not to create new object. These objects are
	        // only available from the methods and attached functions, but still, it is
	        // better to prevent ghost references to unrelevant data...
	        __emptyObject(this.nodesIndex);
	        __emptyObject(this.edgesIndex);
	        __emptyObject(this.nodesIndex);
	        __emptyObject(this.inNeighborsIndex);
	        __emptyObject(this.outNeighborsIndex);
	        __emptyObject(this.allNeighborsIndex);
	        __emptyObject(this.inNeighborsCount);
	        __emptyObject(this.outNeighborsCount);
	        __emptyObject(this.allNeighborsCount);
	
	        return this;
	    });
	
	    /**
	     * This method reads an object and adds the nodes and edges, through the
	     * proper methods "addNode" and "addEdge".
	     *
	     * Here is an example:
	     *
	     *  > var myGraph = new graph();
	     *  > myGraph.read({
	    *  >   nodes: [
	    *  >     { id: 'n0' },
	    *  >     { id: 'n1' }
	    *  >   ],
	    *  >   edges: [
	    *  >     {
	    *  >       id: 'e0',
	    *  >       source: 'n0',
	    *  >       target: 'n1'
	    *  >     }
	    *  >   ]
	    *  > });
	     *  >
	     *  > console.log(
	     *  >   myGraph.nodes().length,
	     *  >   myGraph.edges().length
	     *  > ); // outputs 2 1
	     *
	     * @param  {object} g The graph object.
	     * @return {object}   The graph instance.
	     */
	    graph.addMethod('read', function (g) {
	        var i, a, l;
	
	        a = g.nodes || [];
	        for (i = 0, l = a.length; i < l; i++) {
	            this.addNode(a[i]);
	        }a = g.edges || [];
	        for (i = 0, l = a.length; i < l; i++) {
	            this.addEdge(a[i]);
	        }return this;
	    });
	
	    /**
	     * This methods returns one or several nodes, depending on how it is called.
	     *
	     * To get the array of nodes, call "nodes" without argument. To get a
	     * specific node, call it with the id of the node. The get multiple node,
	     * call it with an array of ids, and it will return the array of nodes, in
	     * the same order.
	     *
	     * @param  {?(string|array)} v Eventually one id, an array of ids.
	     * @return {object|array}      The related node or array of nodes.
	     */
	    graph.addMethod('nodes', function (v) {
	        // Clone the array of nodes and return it:
	        if (!arguments.length) return this.nodesArray.slice(0);
	
	        // Return the related node:
	        if (arguments.length === 1 && (typeof v === 'string' || typeof v === 'number')) return this.nodesIndex[v];
	
	        // Return an array of the related node:
	        if (arguments.length === 1 && Object.prototype.toString.call(v) === '[object Array]') {
	            var i,
	                l,
	                a = [];
	
	            for (i = 0, l = v.length; i < l; i++) {
	                if (typeof v[i] === 'string' || typeof v[i] === 'number') a.push(this.nodesIndex[v[i]]);else throw 'nodes: Wrong arguments.';
	            }return a;
	        }
	
	        throw 'nodes: Wrong arguments.';
	    });
	
	    /**
	     * This methods returns the degree of one or several nodes, depending on how
	     * it is called. It is also possible to get incoming or outcoming degrees
	     * instead by specifying 'in' or 'out' as a second argument.
	     *
	     * @param  {string|array} v     One id, an array of ids.
	     * @param  {?string}      which Which degree is required. Values are 'in',
	     *                              'out', and by default the normal degree.
	     * @return {number|array}       The related degree or array of degrees.
	     */
	    graph.addMethod('degree', function (v, which) {
	        // Check which degree is required:
	        which = {
	            'in': this.inNeighborsCount,
	            'out': this.outNeighborsCount
	        }[which || ''] || this.allNeighborsCount;
	
	        // Return the related node:
	        if (typeof v === 'string' || typeof v === 'number') return which[v];
	
	        // Return an array of the related node:
	        if (Object.prototype.toString.call(v) === '[object Array]') {
	            var i,
	                l,
	                a = [];
	
	            for (i = 0, l = v.length; i < l; i++) {
	                if (typeof v[i] === 'string' || typeof v[i] === 'number') a.push(which[v[i]]);else throw 'degree: Wrong arguments.';
	            }return a;
	        }
	
	        throw 'degree: Wrong arguments.';
	    });
	
	    /**
	     * This methods returns one or several edges, depending on how it is called.
	     *
	     * To get the array of edges, call "edges" without argument. To get a
	     * specific edge, call it with the id of the edge. The get multiple edge,
	     * call it with an array of ids, and it will return the array of edges, in
	     * the same order.
	     *
	     * @param  {?(string|array)} v Eventually one id, an array of ids.
	     * @return {object|array}      The related edge or array of edges.
	     */
	    graph.addMethod('edges', function (v) {
	        // Clone the array of edges and return it:
	        if (!arguments.length) return this.edgesArray.slice(0);
	
	        // Return the related edge:
	        if (arguments.length === 1 && (typeof v === 'string' || typeof v === 'number')) return this.edgesIndex[v];
	
	        // Return an array of the related edge:
	        if (arguments.length === 1 && Object.prototype.toString.call(v) === '[object Array]') {
	            var i,
	                l,
	                a = [];
	
	            for (i = 0, l = v.length; i < l; i++) {
	                if (typeof v[i] === 'string' || typeof v[i] === 'number') a.push(this.edgesIndex[v[i]]);else throw 'edges: Wrong arguments.';
	            }return a;
	        }
	
	        throw 'edges: Wrong arguments.';
	    });
	
	    /**
	     * This method return all the children of a specific node. An error is thrown if the node
	     * does not exist.
	     *
	     * @param  {string} id The edge id.
	     * @return {object|array}      The related node or array of nodes.
	     */
	    graph.addMethod('getChildren', function (id) {
	        // Check that the arguments are valid:
	        if (typeof id !== 'string' && typeof id !== 'number' || arguments.length !== 1) throw 'getChildren: Wrong arguments.';
	
	        if (!this.nodesIndex[id]) throw 'The node "' + id + '" does not exist.';
	        var n = [];
	        for (var node in this.outNeighborsIndex[id]) {
	            if (typeof node === 'string' || typeof node === 'number') n.push(this.nodesIndex[node]);else throw 'nodes: Wrong arguments.';
	        }
	
	        return n;
	    });
	
	    /**
	     * EXPORT:
	     * *******
	     *
	     */
	
	    if (typeof sigma !== 'undefined') {
	        sigma.classes = sigma.classes || Object.create(null);
	        sigma.classes.graph = graph;
	    } else if (true) {
	        if (typeof module !== 'undefined' && module.exports) exports = module.exports = graph;
	        exports.graph = graph;
	    } else this.graph = graph;
	}).call(undefined);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Author:  Davide Alocci
	 * Version: 0.0.1
	 */
	
	var Edge = function () {
	    /**
	     * Create a new Edge using nodes.
	     * @param {string} id the edge id
	     * @param {Node} sourceNode The source node
	     * @param {Node} targetNode The target Node
	     */
	    function Edge(id, sourceNode, targetNode) {
	        _classCallCheck(this, Edge);
	
	        if (typeof id == 'undefined' || typeof sourceNode == 'undefined' || typeof targetNode == 'undefined') {
	            throw "The parameter id, sourceNode and targetNode cannot be undefined";
	        }
	
	        //WARNING: Do not change this properties name !
	        //They are used by the graph class in Sigma.js
	        this.id = id;
	        try {
	            this.source = sourceNode.getId();
	            this.target = targetNode.getId();
	        } catch (err) {
	            throw 'SourceNode and TargetNode must have a getId() method. Please use or extend the Node obj like in Monosaccharide or Substituent';
	        }
	        // end sigma.js strict parameter
	
	        this.sourceNode = sourceNode;
	        this.targetNode = targetNode;
	    }
	
	    _createClass(Edge, [{
	        key: 'getEdgeId',
	        value: function getEdgeId() {
	            return this.id;
	        }
	    }, {
	        key: 'getEdgeSource',
	        value: function getEdgeSource() {
	            return this.sourceNode;
	        }
	    }, {
	        key: 'getEdgeTarget',
	        value: function getEdgeTarget() {
	            return this.targetNode;
	        }
	    }]);
	
	    return Edge;
	}();
	
	exports.default = Edge;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Author:  Davide Alocci
	 * Version: 0.0.1
	 */
	
	var Node = function () {
	    function Node(id) {
	        _classCallCheck(this, Node);
	
	        if (typeof id == 'undefined') {
	            throw "The parameter id be undefined";
	        } else {
	            this.id = id;
	        }
	    }
	
	    _createClass(Node, [{
	        key: "getId",
	        value: function getId() {
	            return this.id;
	        }
	    }]);
	
	    return Node;
	}();
	
	exports.default = Node;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _enumify = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author:  Davide Alocci
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Version: 0.0.1
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var AnomerCarbon = function (_Enum) {
	    _inherits(AnomerCarbon, _Enum);
	
	    function AnomerCarbon() {
	        _classCallCheck(this, AnomerCarbon);
	
	        return _possibleConstructorReturn(this, (AnomerCarbon.__proto__ || Object.getPrototypeOf(AnomerCarbon)).apply(this, arguments));
	    }
	
	    _createClass(AnomerCarbon, [{
	        key: 'getAnomerCarbon',
	        value: function getAnomerCarbon(value) {
	            switch (value) {
	                case 1:
	                    return AnomerCarbon.ONE;
	                case 2:
	                    return AnomerCarbon.TWO;
	                case 3:
	                    return AnomerCarbon.THREE;
	                case 4:
	                    return AnomerCarbon.FOUR;
	                case 5:
	                    return AnomerCarbon.FIVE;
	                case 6:
	                    return AnomerCarbon.SIX;
	                default:
	                    return AnomerCarbon.UNDEFINED;
	            }
	        }
	    }]);
	
	    return AnomerCarbon;
	}(_enumify.Enum);
	
	exports.default = AnomerCarbon;
	
	
	AnomerCarbon.initEnum({
	    ONE: {
	        value: 1
	    },
	    TWO: {
	        value: 2
	    },
	    THREE: {
	        value: 3
	    },
	    UNDEFINED: {
	        value: 'undefined'
	    }
	});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.copyProperties = copyProperties;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var INITIALIZED = Symbol();
	
	/**
	 * This is an abstract class that is not intended to be
	 * used directly. Extend it to turn your class into an enum
	 * (initialization is performed via `MyClass.initEnum()`).
	 */
	
	var Enum = exports.Enum = function () {
	    /**
	     * `initEnum()` closes the class. Then calling this constructor
	     * throws an exception.
	     * 
	     * If your subclass has a constructor then you can control
	     * what properties are added to `this` via the argument you
	     * pass to `super()`. No arguments are fine, too.
	     */
	
	    function Enum() {
	        var instanceProperties = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
	
	        _classCallCheck(this, Enum);
	
	        // new.target would be better than this.constructor,
	        // but isn’t supported by Babel
	        if ({}.hasOwnProperty.call(this.constructor, INITIALIZED)) {
	            throw new Error('Enum classes can’t be instantiated');
	        }
	        if ((typeof instanceProperties === 'undefined' ? 'undefined' : _typeof(instanceProperties)) === 'object' && instanceProperties !== null) {
	            copyProperties(this, instanceProperties);
	        }
	    }
	    /**
	     * Set up the enum, close the class.
	     * 
	     * @param arg Either an object whose properties provide the names
	     * and values (which must be mutable objects) of the enum constants.
	     * Or an Array whose elements are used as the names of the enum constants
	     * The values are create by instantiating the current class.
	     */
	
	    _createClass(Enum, [{
	        key: 'toString',
	
	        /**
	         * Default `toString()` method for enum constant.
	         */
	        value: function toString() {
	            return this.constructor.name + '.' + this.name;
	        }
	    }], [{
	        key: 'initEnum',
	        value: function initEnum(arg) {
	            Object.defineProperty(this, 'enumValues', {
	                value: [],
	                configurable: false,
	                writable: false,
	                enumerable: true
	            });
	            if (Array.isArray(arg)) {
	                this._enumValuesFromArray(arg);
	            } else {
	                this._enumValuesFromObject(arg);
	            }
	            Object.freeze(this.enumValues);
	            this[INITIALIZED] = true;
	            return this;
	        }
	    }, {
	        key: '_enumValuesFromArray',
	        value: function _enumValuesFromArray(arr) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var key = _step.value;
	
	                    this._pushEnumValue(new this(), key);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_enumValuesFromObject',
	        value: function _enumValuesFromObject(obj) {
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;
	
	            try {
	                for (var _iterator2 = Object.keys(obj)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var key = _step2.value;
	
	                    var value = new this(obj[key]);
	                    this._pushEnumValue(value, key);
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_pushEnumValue',
	        value: function _pushEnumValue(enumValue, name) {
	            enumValue.name = name;
	            enumValue.ordinal = this.enumValues.length;
	            Object.defineProperty(this, name, {
	                value: enumValue,
	                configurable: false,
	                writable: false,
	                enumerable: true
	            });
	            this.enumValues.push(enumValue);
	        }
	
	        /**
	         * Given the name of an enum constant, return its value.
	         */
	
	    }, {
	        key: 'enumValueOf',
	        value: function enumValueOf(name) {
	            return this.enumValues.find(function (x) {
	                return x.name === name;
	            });
	        }
	
	        /**
	         * Make enum classes iterable
	         */
	
	    }, {
	        key: Symbol.iterator,
	        value: function value() {
	            return this.enumValues[Symbol.iterator]();
	        }
	    }]);
	
	    return Enum;
	}();
	
	function copyProperties(target, source) {
	    // Ideally, we’d use Reflect.ownKeys() here,
	    // but I don’t want to depend on a polyfill
	    var _iteratorNormalCompletion3 = true;
	    var _didIteratorError3 = false;
	    var _iteratorError3 = undefined;
	
	    try {
	        for (var _iterator3 = Object.getOwnPropertyNames(source)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            var key = _step3.value;
	
	            var desc = Object.getOwnPropertyDescriptor(source, key);
	            Object.defineProperty(target, key, desc);
	        }
	    } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                _iterator3.return();
	            }
	        } finally {
	            if (_didIteratorError3) {
	                throw _iteratorError3;
	            }
	        }
	    }
	
	    return target;
	}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _enumify = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author:  Davide Alocci
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Version: 0.0.1
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var Anomericity = function (_Enum) {
	  _inherits(Anomericity, _Enum);
	
	  function Anomericity() {
	    _classCallCheck(this, Anomericity);
	
	    return _possibleConstructorReturn(this, (Anomericity.__proto__ || Object.getPrototypeOf(Anomericity)).apply(this, arguments));
	  }
	
	  return Anomericity;
	}(_enumify.Enum);
	
	exports.default = Anomericity;
	
	
	Anomericity.initEnum(['ALPHA', 'BETA', 'UNDEFINED']);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _enumify = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author:  Davide Alocci
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Version: 0.0.1
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var Isomer = function (_Enum) {
	  _inherits(Isomer, _Enum);
	
	  function Isomer() {
	    _classCallCheck(this, Isomer);
	
	    return _possibleConstructorReturn(this, (Isomer.__proto__ || Object.getPrototypeOf(Isomer)).apply(this, arguments));
	  }
	
	  return Isomer;
	}(_enumify.Enum);
	
	exports.default = Isomer;
	
	
	Isomer.initEnum(['L', 'D', 'UNDEFINED']);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _enumify = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author:  Davide Alocci
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Version: 0.0.1
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var LinkedCarbon = function (_Enum) {
	    _inherits(LinkedCarbon, _Enum);
	
	    function LinkedCarbon() {
	        _classCallCheck(this, LinkedCarbon);
	
	        return _possibleConstructorReturn(this, (LinkedCarbon.__proto__ || Object.getPrototypeOf(LinkedCarbon)).apply(this, arguments));
	    }
	
	    _createClass(LinkedCarbon, [{
	        key: 'getLinkedCarbon',
	        value: function getLinkedCarbon(value) {
	            switch (value) {
	                case 1:
	                    return LinkedCarbon.ONE;
	                case 2:
	                    return LinkedCarbon.TWO;
	                case 3:
	                    return LinkedCarbon.THREE;
	                case 4:
	                    return LinkedCarbon.FOUR;
	                case 5:
	                    return LinkedCarbon.FIVE;
	                case 6:
	                    return LinkedCarbon.SIX;
	                case 7:
	                    return LinkedCarbon.SEVEN;
	                case 8:
	                    return LinkedCarbon.EIGHT;
	                case 9:
	                    return LinkedCarbon.NINE;
	                default:
	                    return LinkedCarbon.UNDEFINED;
	            }
	        }
	    }]);
	
	    return LinkedCarbon;
	}(_enumify.Enum);
	
	exports.default = LinkedCarbon;
	
	
	LinkedCarbon.initEnum({
	    ONE: {
	        value: 1
	    },
	    TWO: {
	        value: 2
	    },
	    THREE: {
	        value: 3
	    },
	    FOUR: {
	        value: 4
	    },
	    FIVE: {
	        value: 5
	    },
	    SIX: {
	        value: 6
	    },
	    SEVEN: {
	        value: 7
	    },
	    EIGHT: {
	        value: 8
	    },
	    NINE: {
	        value: 9
	    },
	    UNDEFINED: {
	        value: 'undefined'
	    }
	});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _enumify = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author:  Davide Alocci
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Version: 0.0.1
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var MonosaccharideType = function (_Enum) {
	    _inherits(MonosaccharideType, _Enum);
	
	    function MonosaccharideType() {
	        _classCallCheck(this, MonosaccharideType);
	
	        return _possibleConstructorReturn(this, (MonosaccharideType.__proto__ || Object.getPrototypeOf(MonosaccharideType)).apply(this, arguments));
	    }
	
	    return MonosaccharideType;
	}(_enumify.Enum);
	
	exports.default = MonosaccharideType;
	
	
	MonosaccharideType.initEnum({
	    Hex: {
	        shape: 'circle',
	        color: '#FFFFFF',
	        bisected: false
	    },
	    Glc: {
	        shape: 'circle',
	        color: '#0080FF',
	        bisected: false
	    },
	    Man: {
	        shape: 'circle',
	        color: '#00FF00',
	        bisected: false
	    },
	    Gal: {
	        shape: 'circle',
	        color: '#FFD900',
	        bisected: false
	    },
	    Gul: {
	        shape: 'circle',
	        color: '#FF8000',
	        bisected: false
	    },
	    Alt: {
	        shape: 'circle',
	        color: '#FF87C2',
	        bisected: false
	    },
	    All: {
	        shape: 'circle',
	        color: '#9E1FFF',
	        bisected: false
	    },
	    Tal: {
	        shape: 'circle',
	        color: '#96F2F7',
	        bisected: false
	    },
	    Ido: {
	        shape: 'circle',
	        color: '#977335',
	        bisected: false
	    },
	    HexNAc: {
	        shape: 'square',
	        color: '#FFFFFF',
	        bisected: false
	    },
	    GlcNAc: {
	        shape: 'square',
	        color: '#0080FF',
	        bisected: false
	    },
	    ManNAc: {
	        shape: 'square',
	        color: '#00FF00',
	        bisected: false
	    },
	    GalNAc: {
	        shape: 'square',
	        color: '#FFD900',
	        bisected: false
	    },
	    GulNAc: {
	        shape: 'square',
	        color: '#FF8000',
	        bisected: false
	    },
	    AltNAc: {
	        shape: 'square',
	        color: '#FF87C2',
	        bisected: false
	    },
	    AllNAc: {
	        shape: 'square',
	        color: '#9E1FFF',
	        bisected: false
	    },
	    TalNAc: {
	        shape: 'square',
	        color: '#96F2F7',
	        bisected: false
	    },
	    IdoNAc: {
	        shape: 'square',
	        color: '#977335',
	        bisected: false
	    },
	    HexN: {
	        shape: 'square',
	        color: '#FFFFFF',
	        bisected: true
	    },
	    GlcN: {
	        shape: 'square',
	        color: '#0080FF',
	        bisected: true
	    },
	    ManN: {
	        shape: 'square',
	        color: '#00FF00',
	        bisected: true
	    },
	    GalN: {
	        shape: 'square',
	        color: '#FFD900',
	        bisected: true
	    },
	    GulN: {
	        shape: 'square',
	        color: '#FF8000',
	        bisected: true
	    },
	    AltN: {
	        shape: 'square',
	        color: '#FF87C2',
	        bisected: true
	    },
	    AllN: {
	        shape: 'square',
	        color: '#9E1FFF',
	        bisected: true
	    },
	    TalN: {
	        shape: 'square',
	        color: '#96F2F7',
	        bisected: true
	    },
	    IdoN: {
	        shape: 'square',
	        color: '#977335',
	        bisected: true
	    },
	    HexA: {
	        shape: 'diamond',
	        color: '#FFFFFF',
	        bisected: true
	    },
	    GlcA: {
	        shape: 'diamond',
	        color: '#0080FF',
	        bisected: true
	    },
	    ManA: {
	        shape: 'diamond',
	        color: '#00FF00',
	        bisected: true
	    },
	    GalA: {
	        shape: 'diamond',
	        color: '#FFD900',
	        bisected: true
	    },
	    GulA: {
	        shape: 'diamond',
	        color: '#FF8000',
	        bisected: true
	    },
	    AltA: {
	        shape: 'diamond',
	        color: '#FF87C2',
	        bisected: true
	    },
	    AllA: {
	        shape: 'diamond',
	        color: '#9E1FFF',
	        bisected: true
	    },
	    TalA: {
	        shape: 'diamond',
	        color: '#96F2F7',
	        bisected: true
	    },
	    IdoA: {
	        shape: 'diamond',
	        color: '#977335',
	        bisected: true
	    },
	    dHex: {
	        shape: 'triangle',
	        color: '#FFFFFF',
	        bisected: false
	    },
	    Qui: {
	        shape: 'triangle',
	        color: '#0080FF',
	        bisected: false
	    },
	    Rha: {
	        shape: 'triangle',
	        color: '#00FF00',
	        bisected: false
	    },
	    SixdAlt: {
	        shape: 'triangle',
	        color: '#FF87C2',
	        bisected: false
	    },
	    SixdTal: {
	        shape: 'triangle',
	        color: '#96F2F7',
	        bisected: false
	    },
	    Fuc: {
	        shape: 'triangle',
	        color: '#FF0000',
	        bisected: false
	    },
	    dHexNAc: {
	        shape: 'triangle',
	        color: '#FFFFFF',
	        bisected: true
	    },
	    QuiNAc: {
	        shape: 'triangle',
	        color: '#0080FF',
	        bisected: true
	    },
	    RhaNAc: {
	        shape: 'triangle',
	        color: '#00FF00',
	        bisected: true
	    },
	    FucNAc: {
	        shape: 'triangle',
	        color: '#FF0000',
	        bisected: true
	    },
	    ddHex: {
	        shape: 'rectangle',
	        color: '#FFFFFF',
	        bisected: false
	    },
	    Oli: {
	        shape: 'rectangle',
	        color: '#0080FF',
	        bisected: false
	    },
	    Tyv: {
	        shape: 'rectangle',
	        color: '#00FF00',
	        bisected: false
	    },
	    Abe: {
	        shape: 'rectangle',
	        color: '#FF8000',
	        bisected: false
	    },
	    Par: {
	        shape: 'rectangle',
	        color: '#FF87C2',
	        bisected: false
	    },
	    Dig: {
	        shape: 'rectangle',
	        color: '#9E1FFF',
	        bisected: false
	    },
	    Col: {
	        shape: 'rectangle',
	        color: '#96F2F7',
	        bisected: false
	    },
	    Pen: {
	        shape: 'star',
	        color: '#FFFFFF',
	        bisected: false
	    },
	    Ara: {
	        shape: 'star',
	        color: '#00FF00',
	        bisected: false
	    },
	    Lyx: {
	        shape: 'star',
	        color: '#FFD900',
	        bisected: false
	    },
	    Xyl: {
	        shape: 'star',
	        color: '#FF8000',
	        bisected: false
	    },
	    Rib: {
	        shape: 'star',
	        color: '#FF87C2',
	        bisected: false
	    },
	    Nonu: {
	        shape: 'diamond',
	        color: '#FFFFFF',
	        bisected: false
	    },
	    Kdn: {
	        shape: 'diamond',
	        color: '#00FF00',
	        bisected: false
	    },
	    Neu5Ac: {
	        shape: 'diamond',
	        color: '#9E1FFF',
	        bisected: false
	    },
	    Neu5Gc: {
	        shape: 'diamond',
	        color: '#96F2F7',
	        bisected: false
	    },
	    Neu: {
	        shape: 'diamond',
	        color: '#977335',
	        bisected: false
	    },
	    Sia: {
	        shape: 'diamond',
	        color: '#FF0000',
	        bisected: false
	    },
	
	    Unknown: {
	        shape: 'Hexagon',
	        color: '#FFFFFF',
	        bisected: false
	    },
	    Bac: {
	        shape: 'Hexagon',
	        color: '#0080FF',
	        bisected: false
	    },
	    LDManHep: {
	        shape: 'Hexagon',
	        color: '#00FF00',
	        bisected: false
	    },
	    Kdo: {
	        shape: 'Hexagon',
	        color: '#FFD900',
	        bisected: false
	    },
	    Dha: {
	        shape: 'Hexagon',
	        color: '#FF8000',
	        bisected: false
	    },
	    DDManHep: {
	        shape: 'Hexagon',
	        color: '#FF87C2',
	        bisected: false
	    },
	    MurNAc: {
	        shape: 'Hexagon',
	        color: '#9E1FFF',
	        bisected: false
	    },
	    MurNGc: {
	        shape: 'Hexagon',
	        color: '#96F2F7',
	        bisected: false
	    },
	    Mur: {
	        shape: 'Hexagon',
	        color: '#977335',
	        bisected: false
	    },
	
	    Assigned: {
	        shape: 'Pentagon',
	        color: '#FFFFFF',
	        bisected: false
	    },
	    Api: {
	        shape: 'Pentagon',
	        color: '#0080FF',
	        bisected: false
	    },
	    Fru: {
	        shape: 'Pentagon',
	        color: '#00FF00',
	        bisected: false
	    },
	    Tag: {
	        shape: 'Pentagon',
	        color: '#FFD900',
	        bisected: false
	    },
	    Sor: {
	        shape: 'Pentagon',
	        color: '#FF8000',
	        bisected: false
	    },
	    Psi: {
	        shape: 'Pentagon',
	        color: '#FF87C2',
	        bisected: false
	    }
	});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _enumify = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author:  Davide Alocci
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Version: 0.0.1
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var RingType = function (_Enum) {
	  _inherits(RingType, _Enum);
	
	  function RingType() {
	    _classCallCheck(this, RingType);
	
	    return _possibleConstructorReturn(this, (RingType.__proto__ || Object.getPrototypeOf(RingType)).apply(this, arguments));
	  }
	
	  return RingType;
	}(_enumify.Enum);
	
	exports.default = RingType;
	
	
	RingType.initEnum(['P', 'F', 'OPEN', 'UNDEFINED']);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _enumify = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author:  Davide Alocci
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Version: 0.0.1
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var SubstituentType = function (_Enum) {
	    _inherits(SubstituentType, _Enum);
	
	    function SubstituentType() {
	        _classCallCheck(this, SubstituentType);
	
	        return _possibleConstructorReturn(this, (SubstituentType.__proto__ || Object.getPrototypeOf(SubstituentType)).apply(this, arguments));
	    }
	
	    return SubstituentType;
	}(_enumify.Enum);
	
	exports.default = SubstituentType;
	
	
	SubstituentType.initEnum({
	    Acetyl: {
	        label: 'Ac'
	    },
	    Bromo: {
	        label: 'Br'
	    },
	    Chloro: {
	        label: 'Cl'
	    },
	    Ethyl: {
	        label: 'Et'
	    },
	    Ethanolamine: {
	        label: 'ETA'
	    },
	    Fluoro: {
	        label: 'F'
	    },
	    Formyl: {
	        label: 'Formyl'
	    },
	    Hydroxymethyl: {
	        label: 'HMe'
	    },
	    Imino: {
	        label: 'Imino'
	    },
	    RLactate1: {
	        label: 'RLac1'
	    },
	    SLactate1: {
	        label: 'SLac1'
	    },
	    Amino: {
	        label: 'N'
	    },
	    Methyl: {
	        label: 'Me'
	    },
	    NAcetyl: {
	        label: 'NAc'
	    },
	    NAlanine: {
	        label: 'NAla'
	    },
	    NFormyl: {
	        label: 'NFormyl'
	    },
	    NGlycolyl: {
	        label: 'NGc'
	    },
	    NMethyl: {
	        label: 'NMe'
	    },
	    NSuccinate: {
	        label: 'NSuc'
	    },
	    NSulfate: {
	        label: 'NS'
	    },
	    NTrifluoroacetyl: {
	        label: 'NTFA'
	    },
	    Nitrate: {
	        label: 'NO3'
	    },
	    Phosphate: {
	        label: 'P'
	    },
	    Pyruvate: {
	        label: 'Pyr'
	    },
	    Sulfate: {
	        label: 'S'
	    },
	    Thio: {
	        label: 'Thio'
	    },
	    RPyruvate: {
	        label: 'RPyr'
	    },
	    SPyruvate: {
	        label: 'SPyr'
	    },
	    RLactate2: {
	        label: 'RLac2'
	    },
	    SLactate2: {
	        label: 'SLac2'
	    }
	});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _enumify = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Renaud on 06/07/2017.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var GlycoCTSubstituents = function (_Enum) {
	    _inherits(GlycoCTSubstituents, _Enum);
	
	    function GlycoCTSubstituents() {
	        _classCallCheck(this, GlycoCTSubstituents);
	
	        return _possibleConstructorReturn(this, (GlycoCTSubstituents.__proto__ || Object.getPrototypeOf(GlycoCTSubstituents)).apply(this, arguments));
	    }
	
	    return GlycoCTSubstituents;
	}(_enumify.Enum);
	
	exports.default = GlycoCTSubstituents;
	
	
	GlycoCTSubstituents.initEnum({
	    NAcetyl: {
	        glycoct: "n-acetyl"
	    },
	    Amino: {
	        glycoct: "amino"
	    },
	    NGlycolyl: {
	        glycoct: "n-glycolyl"
	    },
	    Methyl: {
	        glycoct: "methyl"
	    },
	    Acetyl: {
	        glycoct: "acetyl"
	    },
	    Sulfate: {
	        glycoct: "sulfate"
	    },
	    Phosphate: {
	        glycoct: "phosphate"
	    },
	    Bromo: {
	        glycoct: 'bromo'
	    },
	    Chloro: {
	        glycoct: 'chloro'
	    },
	    Ethyl: {
	        glycoct: 'ethyl'
	    },
	    Ethanolamine: {
	        glycoct: 'ethanolamine'
	    },
	    Fluoro: {
	        glycoct: 'fluoro'
	    },
	    Formyl: {
	        glycoct: 'formyl'
	    },
	    Hydroxymethyl: {
	        glycoct: 'hydroxymethyl'
	    },
	    Imino: {
	        glycoct: 'imino'
	    },
	    RLactate1: {
	        glycoct: '(r)-lactate'
	    },
	    SLactate1: {
	        glycoct: '(s)-lactate'
	    },
	    NAlanine: {
	        glycoct: 'n-alanine'
	    },
	    NFormyl: {
	        glycoct: 'n-formyl'
	    },
	    NMethyl: {
	        glycoct: 'n-methyl'
	    },
	    NSuccinate: {
	        glycoct: 'n-succinate'
	    },
	    NSulfate: {
	        glycoct: 'n-sulfate'
	    },
	    NTrifluoroacetyl: {
	        glycoct: 'n-trifluoroacetyl'
	    },
	    Nitrate: {
	        glycoct: 'nitrate'
	    },
	    Pyruvate: {
	        glycoct: 'pyruvate'
	    },
	    Thio: {
	        glycoct: 'thio'
	    },
	    RPyruvate: {
	        glycoct: '(r)-pyruvate'
	    },
	    SPyruvate: {
	        glycoct: '(s)-pyruvate'
	    },
	    RLactate2: {
	        glycoct: '(r)-lactate2'
	    },
	    SLactate2: {
	        glycoct: '(s)-lactate2'
	    },
	    Unknown: {
	        glycoct: 'unknown'
	    }
	});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _enumify = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Renaud on 03/08/2017.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var SubstituentsPositions = function (_Enum) {
	    _inherits(SubstituentsPositions, _Enum);
	
	    function SubstituentsPositions() {
	        _classCallCheck(this, SubstituentsPositions);
	
	        return _possibleConstructorReturn(this, (SubstituentsPositions.__proto__ || Object.getPrototypeOf(SubstituentsPositions)).apply(this, arguments));
	    }
	
	    return SubstituentsPositions;
	}(_enumify.Enum);
	
	exports.default = SubstituentsPositions;
	
	
	SubstituentsPositions.initEnum({
	    HexNAc: {
	        position: 2
	    },
	
	    GlcNAc: {
	        position: 2
	    },
	
	    ManNAc: {
	        position: 2
	    },
	
	    GalNAc: {
	        position: 2
	    },
	
	    GulNAc: {
	        position: 2
	    },
	
	    AltNAc: {
	        position: 2
	    },
	
	    AllNAc: {
	        position: 2
	    },
	
	    TalNAc: {
	        position: 2
	    },
	
	    IdoNAc: {
	        position: 2
	    },
	
	    HexN: {
	        position: 2
	    },
	
	    GlcN: {
	        position: 2
	    },
	
	    ManN: {
	        position: 2
	    },
	
	    GalN: {
	        position: 2
	    },
	
	    GulN: {
	        position: 2
	    },
	
	    AltN: {
	        position: 2
	    },
	
	    AllN: {
	        position: 2
	    },
	
	    TalN: {
	        position: 2
	    },
	
	    IdoN: {
	        position: 2
	    },
	
	    KdnNAc: {
	        position: 5
	    },
	
	    KdnGc: {
	        position: 5
	    },
	
	    KdnNGc: {
	        position: 5
	    },
	
	    KdnN: {
	        position: 5
	    },
	
	    Neu5Ac: {
	        position: 5
	    },
	
	    Neu5Gc: {
	        position: 5
	    },
	
	    Neu: {
	        position: 5
	    },
	
	    dHexNAc: {
	        position: 2
	    },
	
	    QuiNAc: {
	        position: 2
	    },
	
	    RhaNAc: {
	        position: 2
	    },
	
	    SixdAltNAc: {
	        position: 2
	    },
	
	    SixdTalNAc: {
	        position: 2
	    },
	
	    FucNAc: {
	        position: 2
	    },
	
	    MurNAc: {
	        position: 5
	    },
	
	    MurNGc: {
	        position: 5
	    },
	
	    MurGc: {
	        position: 5
	    }
	
	});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _enumify = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Renaud on 21/07/2017.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var MonosaccharideGlycoCT = function (_Enum) {
	    _inherits(MonosaccharideGlycoCT, _Enum);
	
	    function MonosaccharideGlycoCT() {
	        _classCallCheck(this, MonosaccharideGlycoCT);
	
	        return _possibleConstructorReturn(this, (MonosaccharideGlycoCT.__proto__ || Object.getPrototypeOf(MonosaccharideGlycoCT)).apply(this, arguments));
	    }
	
	    return MonosaccharideGlycoCT;
	}(_enumify.Enum);
	
	exports.default = MonosaccharideGlycoCT;
	
	
	MonosaccharideGlycoCT.initEnum({
	    Hex: {
	        glycoct: "HEX",
	        transform: ""
	    },
	
	    Glc: {
	        glycoct: "glc-HEX",
	        transform: ""
	    },
	
	    Man: {
	        glycoct: "man-HEX",
	        transform: ""
	    },
	
	    Gal: {
	        glycoct: "gal-HEX",
	        transform: ""
	    },
	
	    Gul: {
	        glycoct: "gul-HEX",
	        transform: ""
	    },
	
	    Alt: {
	        glycoct: "alt-HEX",
	        transform: ""
	    },
	
	    All: {
	        glycoct: "all-HEX",
	        transform: ""
	    },
	
	    Tal: {
	        glycoct: "tal-HEX",
	        transform: ""
	    },
	
	    Ara: {
	        glycoct: "ara-PEN",
	        transform: ""
	    },
	
	    Lyx: {
	        glycoct: "lyx-PEN",
	        transform: ""
	    },
	
	    Rib: {
	        glycoct: "rib-PEN",
	        transform: ""
	    },
	
	    Bac: {
	        glycoct: "glc-HEX",
	        transform: "|2:d|4:d|6:d"
	    },
	
	    Fuc: {
	        glycoct: "gal-HEX",
	        transform: "|6:d"
	    },
	
	    HexA: {
	        glycoct: "HEX",
	        transform: "|6:a"
	    },
	
	    GlcA: {
	        glycoct: "glc-HEX",
	        transform: "|6:a"
	    },
	
	    ManA: {
	        glycoct: "man-HEX",
	        transform: "|6:a"
	    },
	
	    GalA: {
	        glycoct: "gal-HEX",
	        transform: "|6:a"
	    },
	
	    GulA: {
	        glycoct: "gul-HEX",
	        transform: "|6:a"
	    },
	
	    AltA: {
	        glycoct: "alt-HEX",
	        transform: "|6:a"
	    },
	
	    AllA: {
	        glycoct: "all-HEX",
	        transform: "|6:a"
	    },
	
	    TalA: {
	        glycoct: "tal-HEX",
	        transform: "|6:a"
	    },
	
	    Qui: {
	        glycoct: "glc-HEX",
	        transform: "|6:d"
	    },
	
	    dHex: {
	        glycoct: "HEX",
	        transform: "|6:d"
	    },
	
	    Ido: {
	        glycoct: "ido-HEX",
	        transform: ""
	    },
	
	    IdoA: {
	        glycoct: "ido-HEX",
	        transform: "|6:a"
	    },
	
	    Pen: {
	        glycoct: "PEN-1:4",
	        transform: ""
	    },
	
	    Rha: {
	        glycoct: "man-HEX",
	        transform: "|6:d"
	    },
	
	    SixdAlt: {
	        glycoct: "alt-HEX",
	        transform: "|6:d"
	    },
	
	    SixdTal: {
	        glycoct: "tal-HEX",
	        transform: "|6:d"
	    },
	
	    Xyl: {
	        glycoct: "xyl-PEN",
	        transform: ""
	    },
	
	    ddHex: {
	        glycoct: "HEX",
	        transform: "|2:d|6:d"
	    },
	
	    Unknown: {
	        glycoct: "unknown",
	        transform: ""
	    },
	
	    Oli: {
	        glycoct: "PEN",
	        transform: "|3:d|6:d"
	    },
	
	    Tyv: {
	        glycoct: "ara-HEX",
	        transform: "|3:d|6:d"
	    },
	
	    Abe: {
	        glycoct: "dxyl-HEX",
	        transform: "|3:d|6:d"
	    },
	
	    Par: {
	        glycoct: "rib-HEX",
	        transform: "|3:d|6:d"
	    },
	
	    Col: {
	        glycoct: "lxyl-HEX",
	        transform: "|3:d|6:d"
	    },
	
	    Dig: {
	        glycoct: "rib-HEX",
	        transform: "|2:d|6:d"
	    },
	
	    Nonu: {
	        glycoct: "NON",
	        transform: ""
	    },
	
	    Kdn: {
	        glycoct: "gro-dgal-NON-2:6",
	        transform: "|1:a|2:keto|3:d"
	    },
	
	    Kdo: {
	        glycoct: "man-OCT-2:6",
	        transform: "|1:a|2:keto|3:d"
	    },
	
	    Fru: {
	        glycoct: "ara-HEX-2:5",
	        transform: "|2:keto"
	    },
	
	    // GlycoCT not found
	    Assigned: {
	        glycoct: "assigned-PEN",
	        transform: ""
	    },
	    LDManHep: {
	        glycoct: "ldmanhep-HEX",
	        transform: ""
	    },
	
	    DDManHep: {
	        glycoct: "ddmanhep-HEX",
	        transform: ""
	    },
	
	    Dha: {
	        glycoct: "dha-HEX",
	        transform: ""
	    },
	
	    Mur: {
	        glycoct: "mur-HEX",
	        transform: ""
	    },
	
	    Sia: {
	        glycoct: "sia-NON",
	        transform: ""
	    },
	
	    Api: {
	        glycoct: "api-PEN",
	        transform: ""
	    },
	
	    Tag: {
	        glycoct: "tag-PEN",
	        transform: ""
	    },
	
	    Sor: {
	        glycoct: "sor-PEN",
	        transform: ""
	    },
	
	    Psi: {
	        glycoct: "psi-PEN",
	        transform: ""
	    }
	
	});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _enumify = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Renaud on 11/08/2017.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var QuickModeMonosaccharides = function (_Enum) {
	    _inherits(QuickModeMonosaccharides, _Enum);
	
	    function QuickModeMonosaccharides() {
	        _classCallCheck(this, QuickModeMonosaccharides);
	
	        return _possibleConstructorReturn(this, (QuickModeMonosaccharides.__proto__ || Object.getPrototypeOf(QuickModeMonosaccharides)).apply(this, arguments));
	    }
	
	    return QuickModeMonosaccharides;
	}(_enumify.Enum);
	
	exports.default = QuickModeMonosaccharides;
	
	
	QuickModeMonosaccharides.initEnum({
	
	    Gal: {
	        isomer: "D",
	        ringType: "P",
	        anomerCarbon: "1"
	    },
	
	    Glc: {
	        isomer: "D",
	        ringType: "P",
	        anomerCarbon: "1"
	    },
	
	    Man: {
	        isomer: "D",
	        ringType: "P",
	        anomerCarbon: "1"
	    },
	
	    GalNAc: {
	        isomer: "D",
	        ringType: "P",
	        anomerCarbon: "1"
	    },
	
	    GlcNAc: {
	        isomer: "D",
	        ringType: "P",
	        anomerCarbon: "1"
	    },
	
	    Fuc: {
	        isomer: "L",
	        ringType: "P",
	        anomerCarbon: "1"
	    },
	
	    Kdn: {
	        isomer: "D",
	        ringType: "P",
	        anomerCarbon: "2"
	    },
	
	    Neu5Ac: {
	        isomer: "D",
	        ringType: "P",
	        anomerCarbon: "2"
	    },
	
	    Neu5Gc: {
	        isomer: "D",
	        ringType: "P",
	        anomerCarbon: "2"
	    },
	
	    Neu: {
	        isomer: "D",
	        ringType: "P",
	        anomerCarbon: "2"
	    },
	
	    Xyl: {
	        isomer: "D",
	        ringType: "P",
	        anomerCarbon: "1"
	    }
	
	});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _enumify = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Renaud on 15/08/2017.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var Structures = function (_Enum) {
	    _inherits(Structures, _Enum);
	
	    function Structures() {
	        _classCallCheck(this, Structures);
	
	        return _possibleConstructorReturn(this, (Structures.__proto__ || Object.getPrototypeOf(Structures)).apply(this, arguments));
	    }
	
	    return Structures;
	}(_enumify.Enum);
	
	exports.default = Structures;
	
	
	Structures.initEnum({
	
	    ncore: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dman-HEX-1:5\n6b:a-dman-HEX-1:5\n7b:a-dman-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d\n5:5o(3+1)6d\n6:5o(6+1)7d"
	    },
	
	    ncorefuc: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dman-HEX-1:5\n6b:a-dman-HEX-1:5\n7b:a-dman-HEX-1:5\n8b:a-lgal-HEX-1:5|6:d\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d\n5:5o(3+1)6d\n6:5o(6+1)7d\n7:1o(6+1)8d"
	    },
	
	    ncorebisect: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dman-HEX-1:5\n6b:a-dman-HEX-1:5\n7b:b-dglc-HEX-1:5\n8s:n-acetyl\n9b:a-dman-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d\n5:5o(3+1)6d\n6:5o(4+1)7d\n7:7d(2+1)8n\n8:5o(6+1)9d"
	    },
	
	    ncorebisectfuc: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dman-HEX-1:5\n6b:a-dman-HEX-1:5\n7b:b-dglc-HEX-1:5\n8s:n-acetyl\n9b:a-dman-HEX-1:5\n10b:a-lgal-HEX-1:5|6:d\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d\n5:5o(3+1)6d\n6:5o(4+1)7d\n7:7d(2+1)8n\n8:5o(6+1)9d\n9:1o(6+1)10d"
	    },
	
	    ncorehyb: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dman-HEX-1:5\n6b:a-dman-HEX-1:5\n7b:a-dman-HEX-1:5\n8b:a-dman-HEX-1:5\n9b:a-dman-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d\n5:5o(3+1)6d\n6:5o(6+1)7d\n7:7o(3+1)8d\n8:7o(6+1)9d"
	    },
	
	    ncorehybfuc: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dman-HEX-1:5\n6b:a-dman-HEX-1:5\n7b:a-dman-HEX-1:5\n8b:a-dman-HEX-1:5\n9b:a-dman-HEX-1:5\n10b:a-lgal-HEX-1:5|6:d\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d\n5:5o(3+1)6d\n6:5o(6+1)7d\n7:7o(3+1)8d\n8:7o(6+1)9d\n9:1o(6+1)10d"
	    },
	
	    ncorehybbis: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dman-HEX-1:5\n6b:a-dman-HEX-1:5\n7b:b-dglc-HEX-1:5\n8s:n-acetyl\n9b:a-dman-HEX-1:5\n10b:a-dman-HEX-1:5\n11b:a-dman-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d\n5:5o(3+1)6d\n6:5o(4+1)7d\n7:7d(2+1)8n\n8:5o(6+1)9d\n9:9o(3+1)10d\n10:9o(6+1)11d"
	    },
	
	    ncorehybbisfuc: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dman-HEX-1:5\n6b:a-dman-HEX-1:5\n7b:b-dglc-HEX-1:5\n8s:n-acetyl\n9b:a-dman-HEX-1:5\n10b:a-dman-HEX-1:5\n11b:a-dman-HEX-1:5\n12b:a-lgal-HEX-1:5|6:d\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d\n5:5o(3+1)6d\n6:5o(4+1)7d\n7:7d(2+1)8n\n8:5o(6+1)9d\n9:9o(3+1)10d\n10:9o(6+1)11d\n11:1o(6+1)12d"
	    },
	
	    ncoreman: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dman-HEX-1:5\n6b:a-dman-HEX-1:5\n7b:a-dman-HEX-1:5\n8b:a-dman-HEX-1:5\n9b:a-dman-HEX-1:5\n10b:a-dman-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d\n5:5o(3+1)6d\n6:6o(2+1)7d\n7:5o(6+1)8d\n8:8o(3+1)9d\n9:8o(6+1)10d"
	    },
	
	    ocore1: {
	        glycoct: "RES\n1b:a-dgal-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d"
	    },
	
	    ocore2: {
	        glycoct: "RES\n1b:a-dgal-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:b-dglc-HEX-1:5\n5s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:1o(6+1)4d\n4:4d(2+1)5n"
	    },
	
	    ocore3: {
	        glycoct: "RES\n1b:a-dgal-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3d(2+1)4n"
	    },
	
	    ocore4: {
	        glycoct: "RES\n1b:a-dgal-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dglc-HEX-1:5\n6s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3d(2+1)4n\n4:1o(6+1)5d\n5:5d(2+1)6n"
	    },
	
	    ocore5: {
	        glycoct: "RES\n1b:a-dgal-HEX-1:5\n2s:n-acetyl\n3b:a-dgal-HEX-1:5\n4s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3d(2+1)4n"
	    },
	
	    ocore6: {
	        glycoct: "RES\n1b:a-dgal-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(6+1)3d\n3:3d(2+1)4n"
	    },
	
	    ocore7: {
	        glycoct: "RES\n1b:a-dgal-HEX-1:5\n2s:n-acetyl\n3b:a-dgal-HEX-1:5\n4s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(6+1)3d\n3:3d(2+1)4n"
	    },
	
	    ocore8: {
	        glycoct: "RES\n1b:a-dgal-HEX-1:5\n2s:n-acetyl\n3b:a-dgal-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d"
	    },
	
	    gslarthro: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2b:b-dman-HEX-1:5\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dgal-HEX-1:5\n6s:n-acetyl\nLIN\n1:1o(4+1)2d\n2:2o(3+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d\n5:5d(2+1)6n"
	    },
	
	    gslgala: {
	        glycoct: "RES\n1b:a-dgal-HEX-1:5\n2b:a-dgal-HEX-1:5\nLIN\n1:1o(4+1)2d"
	    },
	
	    gslganglio: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\n3b:b-dgal-HEX-1:5\n4s:n-acetyl\n5b:b-dgal-HEX-1:5\nLIN\n1:1o(4+1)2d\n2:2o(4+1)3d\n3:3d(2+1)4n\n4:3o(3+1)5d"
	    },
	
	    gslglobo: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\n3b:a-dgal-HEX-1:5\n4b:b-dgal-HEX-1:5\n5s:n-acetyl\nLIN\n1:1o(4+1)2d\n2:2o(4+1)3d\n3:3o(3+1)4d\n4:4d(2+1)5n"
	    },
	
	    gslisoglobo: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\n3b:a-dgal-HEX-1:5\n4b:b-dgal-HEX-1:5\n5s:n-acetyl\nLIN\n1:1o(4+1)2d\n2:2o(3+1)3d\n3:3o(3+1)4d\n4:4d(2+1)5n"
	    },
	
	    gsllacto: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dgal-HEX-1:5\nLIN\n1:1o(4+1)2d\n2:2o(3+1)3d\n3:3d(2+1)4n\n4:3o(3+1)5d"
	    },
	
	    gslmollu: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2b:b-dman-HEX-1:5\n3b:a-dman-HEX-1:5\n4b:b-dglc-HEX-1:5\n5s:n-acetyl\nLIN\n1:1o(4+1)2d\n2:2o(3+1)3d\n3:3o(2+1)4d\n4:4d(2+1)5n"
	    },
	
	    gslmuco: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\n3b:b-dgal-HEX-1:5\n4b:b-dgal-HEX-1:5\nLIN\n1:1o(4+1)2d\n2:2o(4+1)3d\n3:3o(3+1)4d"
	    },
	
	    gslneolacto: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dgal-HEX-1:5\nLIN\n1:1o(4+1)2d\n2:2o(3+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d"
	    },
	
	    gaghyaluronic: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5|6:a\n4b:b-dglc-HEX-1:5\n5s:n-acetyl\n6b:b-dglc-HEX-1:5|6:a\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(4+1)4d\n4:4d(2+1)5n\n5:4o(3+1)6d"
	    },
	
	    gagchodroitin4: {
	        glycoct: "RES\n1b:b-dgal-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5|6:a\n4b:b-dgal-HEX-1:5\n5s:n-acetyl\n6b:b-dglc-HEX-1:5|6:a\n7s:sulfate\n8s:sulfate\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(4+1)4d\n4:4d(2+1)5n\n5:4o(3+1)6d\n6:4o(4+-1)7n\n7:1o(4+-1)8n"
	    },
	
	    gagchodroitin6: {
	        glycoct: "RES\n1b:b-dgal-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5|6:a\n4b:b-dgal-HEX-1:5\n5s:n-acetyl\n6b:b-dglc-HEX-1:5|6:a\n7s:sulfate\n8s:sulfate\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(4+1)4d\n4:4d(2+1)5n\n5:4o(3+1)6d\n6:4o(6+-1)7n\n7:1o(6+-1)8n"
	    },
	
	    gagchodroitin26: {
	        glycoct: "RES\n1b:b-dgal-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5|6:a\n4s:sulfate\n5b:b-dgal-HEX-1:5\n6s:n-acetyl\n7b:b-dglc-HEX-1:5|6:a\n8s:sulfate\n9s:sulfate\n10s:sulfate\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(2+-1)4n\n4:3o(4+1)5d\n5:5d(2+1)6n\n6:5o(3+1)7d\n7:7o(2+-1)8n\n8:5o(6+-1)9n\n9:1o(6+-1)10n"
	    },
	
	    gagchodroitin46: {
	        glycoct: "RES\n1b:b-dgal-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5|6:a\n4b:b-dgal-HEX-1:5\n5s:n-acetyl\n6b:b-dglc-HEX-1:5|6:a\n7s:sulfate\n8s:sulfate\n9s:sulfate\n10s:sulfate\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(4+1)4d\n4:4d(2+1)5n\n5:4o(3+1)6d\n6:4o(4+-1)7n\n7:4o(6+-1)8n\n8:1o(4+-1)9n\n9:1o(6+-1)10n"
	    },
	
	    gagdermatan: {
	        glycoct: "RES\n1b:b-dgal-HEX-1:5\n2s:n-acetyl\n3b:b-dido-HEX-1:5|6:a\n4b:b-dgal-HEX-1:5\n5s:n-acetyl\n6b:b-dido-HEX-1:5|6:a\n7s:sulfate\n8s:sulfate\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(4+1)4d\n4:4d(2+1)5n\n5:4o(3+1)6d\n6:4o(4+-1)7n\n7:1o(4+-1)8n"
	    },
	
	    gagkeratan: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:b-dglc-HEX-1:5\n5s:n-acetyl\n6b:b-dgal-HEX-1:5\n7s:sulfate\n8s:sulfate\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3o(3+1)4d\n4:4d(2+1)5n\n5:4o(4+1)6d\n6:4o(6+-1)7n\n7:1o(6+-1)8n"
	    },
	
	    gagheparin: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-sulfate\n3s:sulfate\n4b:a-dido-HEX-1:5|6:a\n5s:sulfate\n6b:b-dglc-HEX-1:5\n7s:n-sulfate\n8s:sulfate\n9b:a-dido-HEX-1:5|6:a\n10s:sulfate\n11s:sulfate\nLIN\n1:1d(2+-1)2n\n2:1o(3+-1)3n\n3:1o(4+1)4d\n4:4o(2+-1)5n\n5:4o(4+1)6d\n6:6d(2+-1)7n\n7:6o(3+-1)8n\n8:6o(4+1)9d\n9:6o(6+-1)10n\n10:1o(6+-1)11n"
	    },
	
	    gagheparan: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:a-dido-HEX-1:5|6:a\n4s:sulfate\n5b:b-dglc-HEX-1:5\n6s:n-sulfate\n7b:a-dido-HEX-1:5|6:a\n8s:sulfate\n9s:sulfate\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3o(2+-1)4n\n4:3o(4+1)5d\n5:5d(2+-1)6n\n6:5o(4+1)7d\n7:5o(6+-1)8n\n8:1o(6+-1)9n"
	    },
	
	    milklac: {
	        glycoct: "RES\n1b:x-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\nLIN\n1:1o(4+1)2d"
	    },
	
	    milk3fuclac: {
	        glycoct: "RES\n1b:x-dglc-HEX-1:5\n2b:a-lgal-HEX-1:5|6:d\n3b:b-dgal-HEX-1:5\nLIN\n1:1o(3+1)2d\n2:1o(4+1)3d"
	    },
	
	    milk2fuclac: {
	        glycoct: "RES\n1b:x-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\n3b:a-lgal-HEX-1:5|6:d\nLIN\n1:1o(4+1)2d\n2:2o(2+1)3d"
	    },
	
	    milkdifuc: {
	        glycoct: "RES\n1b:x-dglc-HEX-1:5\n2b:a-lgal-HEX-1:5|6:d\n3b:b-dgal-HEX-1:5\n4b:a-lgal-HEX-1:5|6:d\nLIN\n1:1o(3+1)2d\n2:1o(4+1)3d\n3:3o(2+1)4d"
	    },
	
	    milktetra: {
	        glycoct: "RES\n1b:x-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dgal-HEX-1:5\nLIN\n1:1o(4+1)2d\n2:2o(3+1)3d\n3:3d(2+1)4n\n4:3o(3+1)5d"
	    },
	
	    milkneotetra: {
	        glycoct: "RES\n1b:x-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dgal-HEX-1:5\nLIN\n1:1o(4+1)2d\n2:2o(3+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d"
	    },
	
	    antigenA: {
	        glycoct: "RES\n1b:b-dgal-HEX-1:5\n2b:a-lgal-HEX-1:5|6:d\n3b:a-dgal-HEX-1:5\n4s:n-acetyl\nLIN\n1:1o(2+1)2d\n2:1o(3+1)3d\n3:3d(2+1)4n"
	    },
	
	    antigenB: {
	        glycoct: "RES\n1b:b-dgal-HEX-1:5\n2b:a-lgal-HEX-1:5|6:d\n3b:b-dgal-HEX-1:5\nLIN\n1:1o(2+1)2d\n2:1o(3+1)3d"
	    },
	
	    antigenH: {
	        glycoct: "RES\n1b:b-dgal-HEX-1:5\n2b:a-lgal-HEX-1:5|6:d\nLIN\n1:1o(2+1)2d"
	    },
	
	    antigenCAD: {
	        glycoct: "RES\n1b:b-dgal-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n5s:n-acetyl\n6b:b-dgal-HEX-1:5\n7s:n-acetyl\n8b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n9s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(3+2)4d\n4:4d(5+1)5n\n5:3o(4+1)6d\n6:6d(2+1)7n\n7:1o(6+2)8d\n8:8d(5+1)9n"
	    },
	
	    antigenP: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\n3b:a-dgal-HEX-1:5\n4b:b-dgal-HEX-1:5\n5s:n-acetyl\nLIN\n1:1o(4+1)2d\n2:2o(4+1)3d\n3:3o(3+1)4d\n4:4d(2+1)5n"
	    },
	
	    antigenPk: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\n3b:a-dgal-HEX-1:5\nLIN\n1:1o(4+1)2d\n2:2o(4+1)3d"
	    },
	
	    antigenSda: {
	        glycoct: "RES\n1b:b-dgal-HEX-1:5\n2b:b-dglc-HEX-1:5\n3s:n-acetyl\n4b:b-dgal-HEX-1:5\n5b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n6s:n-acetyl\n7b:b-dgal-HEX-1:5\n8s:n-acetyl\nLIN\n1:1o(3+1)2d\n2:2d(2+1)3n\n3:2o(4+1)4d\n4:4o(3+2)5d\n5:5d(5+1)6n\n6:4o(4+1)7d\n7:7d(2+1)8n"
	    },
	
	    highMannose: {
	        glycoct: "RES\n1b:a-dman-HEX-1:5\n2b:a-dman-HEX-1:5\nLIN\n1:1o(2+1)2d"
	    },
	
	    lacDiNAc: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3d(2+1)4n"
	    },
	
	    lactoseAmine: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d"
	    },
	
	    neoLactoseAmine: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d"
	    },
	
	    polyLactoseAmine: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:b-dglc-HEX-1:5\n5s:n-acetyl\n6b:b-dgal-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3o(3+1)4d\n4:4d(2+1)5n\n5:4o(4+1)6d"
	    },
	
	    sialyllactoNLSa: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n5s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(3+2)4d\n4:4d(5+1)5n"
	    },
	
	    sialyllactorNLSb: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n5s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(6+2)4d\n4:4d(5+1)5n"
	    },
	
	    sialyllactoNLSc: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n5s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:1o(6+2)4d\n4:4d(5+1)5n"
	    },
	
	    disialyllactorNLDS: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n5s:n-acetyl\n6b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n7s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(3+2)4d\n4:4d(5+1)5n\n5:1o(6+2)6d\n6:6d(5+1)7n"
	    },
	
	    fucosylatedLacDiNAc: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:a-lgal-HEX-1:5|6:d\n4b:b-dgal-HEX-1:5\n5s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:1o(4+1)4d\n4:4d(2+1)5n"
	    },
	
	    sialylatedLacDiNAc: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4s:n-acetyl\n5b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n6s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3d(2+1)4n\n4:3o(6+2)5d\n5:5d(5+1)6n"
	    },
	
	    lewisA: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:a-lgal-HEX-1:5|6:d\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:1o(4+1)4d"
	    },
	
	    lewisB: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:a-lgal-HEX-1:5|6:d\n5b:a-lgal-HEX-1:5|6:d\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(2+1)4d\n4:1o(4+1)5d"
	    },
	
	    lewisC: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d"
	    },
	
	    lewisD: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:a-lgal-HEX-1:5|6:d\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(2+1)4d"
	    },
	
	    lewisX: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:a-lgal-HEX-1:5|6:d\n4b:b-dgal-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:1o(4+1)4d"
	    },
	
	    lewisY: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:a-lgal-HEX-1:5|6:d\n4b:b-dgal-HEX-1:5\n5b:a-lgal-HEX-1:5|6:d\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:1o(4+1)4d\n4:4o(2+1)5d"
	    },
	
	    sialylLewisA: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n5s:n-acetyl\n6b:a-lgal-HEX-1:5|6:d\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(3+2)4d\n4:4d(5+1)5n\n5:1o(4+1)6d"
	    },
	
	    sialylLewisX: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:a-lgal-HEX-1:5|6:d\n4b:b-dgal-HEX-1:5\n5b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n6s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:1o(4+1)4d\n4:4o(3+2)5d\n5:5d(5+1)6n"
	    },
	
	    VIM2: {
	        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n5s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3o(3+2)4d\n4:4d(5+1)5n"
	    }
	
	});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _GraphEdge = __webpack_require__(2);
	
	var _GraphEdge2 = _interopRequireDefault(_GraphEdge);
	
	var _AnomerCarbon = __webpack_require__(4);
	
	var _AnomerCarbon2 = _interopRequireDefault(_AnomerCarbon);
	
	var _LinkedCarbon = __webpack_require__(8);
	
	var _LinkedCarbon2 = _interopRequireDefault(_LinkedCarbon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author:  Davide Alocci
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Version: 0.0.1
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	
	var GlycosidicLinkage = function (_Edge) {
	    _inherits(GlycosidicLinkage, _Edge);
	
	    function GlycosidicLinkage(id, sourceNode, targetNode, anomerCarbon, linkedCarbon) {
	        _classCallCheck(this, GlycosidicLinkage);
	
	        var _this = _possibleConstructorReturn(this, (GlycosidicLinkage.__proto__ || Object.getPrototypeOf(GlycosidicLinkage)).call(this, id, sourceNode, targetNode));
	
	        if (anomerCarbon instanceof _AnomerCarbon2.default) {
	            _this._anomerCarbon = anomerCarbon;
	        } else if (typeof anomerCarbon == 'undefined') {
	            _this._anomerCarbon = _AnomerCarbon2.default.UNDEFINED;
	        } else {
	            throw "The Anomer Carbon must be AnomerCarbon type. Please use the enum under src/js/glycomics/dictionary/AnomerCarbon.js";
	        }
	
	        if (linkedCarbon instanceof _LinkedCarbon2.default) {
	            _this._linkedCarbon = linkedCarbon;
	        } else if (typeof linkedCarbon == 'undefined') {
	            _this._linkedCarbon = _LinkedCarbon2.default.UNDEFINED;
	        } else {
	            throw "The Linked Carbon must be LinkedCarbon type. Please use the enum under src/js/glycomics/dictionary/LinkedCarbonTest.js";
	        }
	        return _this;
	    }
	
	    _createClass(GlycosidicLinkage, [{
	        key: 'anomerCarbon',
	        get: function get() {
	            return this._anomerCarbon;
	        },
	        set: function set(anomerCarbon) {
	            if (anomerCarbon instanceof _AnomerCarbon2.default) {
	                this._anomerCarbon = anomerCarbon;
	            } else {
	                throw "The Anomer Carbon must be AnomerCarbon type. Please use the enum under src/js/glycomics/dictionary/AnomerCarbon.js";
	            }
	            return anomerCarbon;
	        }
	    }, {
	        key: 'linkedCarbon',
	        get: function get() {
	            return this._linkedCarbon;
	        },
	        set: function set(linkedCarbon) {
	            if (linkedCarbon instanceof _LinkedCarbon2.default) {
	                this._linkedCarbon = linkedCarbon;
	            } else {
	                throw "The Linked Carbon must be LinkedCarbon type. Please use the enum under src/js/glycomics/dictionary/LinkedCarbonTest.js";
	            }
	            return linkedCarbon;
	        }
	    }]);
	
	    return GlycosidicLinkage;
	}(_GraphEdge2.default);
	
	exports.default = GlycosidicLinkage;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _GraphEdge = __webpack_require__(2);
	
	var _GraphEdge2 = _interopRequireDefault(_GraphEdge);
	
	var _LinkedCarbon = __webpack_require__(8);
	
	var _LinkedCarbon2 = _interopRequireDefault(_LinkedCarbon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author:  Davide Alocci
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Version: 0.0.1
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	
	var SubstituentLinkage = function (_Edge) {
	    _inherits(SubstituentLinkage, _Edge);
	
	    function SubstituentLinkage(id, target, source, linkedCarbon) {
	        _classCallCheck(this, SubstituentLinkage);
	
	        var _this = _possibleConstructorReturn(this, (SubstituentLinkage.__proto__ || Object.getPrototypeOf(SubstituentLinkage)).call(this, id, target, source));
	
	        if (linkedCarbon instanceof _LinkedCarbon2.default) {
	            _this._linkedCarbon = linkedCarbon;
	        } else if (typeof linkedCarbon == 'undefined') {
	            _this._linkedCarbon = _LinkedCarbon2.default.UNDEFINED;
	        } else {
	            throw "The Linked Carbon must be LinkedCarbon type. Please use the enum under src/js/glycomics/dictionary/LinkedCarbonTest.js";
	        }
	        return _this;
	    }
	
	    _createClass(SubstituentLinkage, [{
	        key: 'linkedCarbon',
	        get: function get() {
	            return this._linkedCarbon;
	        },
	        set: function set(linkedCarbon) {
	            if (linkedCarbon instanceof _LinkedCarbon2.default) {
	                this._linkedCarbon = linkedCarbon;
	            } else {
	                throw "The Linked Carbon must be LinkedCarbon type. Please use the enum under src/js/glycomics/dictionary/LinkedCarbonTest.js";
	            }
	            return linkedCarbon;
	        }
	    }]);
	
	    return SubstituentLinkage;
	}(_GraphEdge2.default);
	
	exports.default = SubstituentLinkage;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _GraphNode = __webpack_require__(3);
	
	var _GraphNode2 = _interopRequireDefault(_GraphNode);
	
	var _Anomericity = __webpack_require__(6);
	
	var _Anomericity2 = _interopRequireDefault(_Anomericity);
	
	var _Isomer = __webpack_require__(7);
	
	var _Isomer2 = _interopRequireDefault(_Isomer);
	
	var _RingType = __webpack_require__(10);
	
	var _RingType2 = _interopRequireDefault(_RingType);
	
	var _MonosaccharideType = __webpack_require__(9);
	
	var _MonosaccharideType2 = _interopRequireDefault(_MonosaccharideType);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author:  Davide Alocci
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Version: 0.0.1
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var Monosaccharide = function (_Node) {
	    _inherits(Monosaccharide, _Node);
	
	    function Monosaccharide(id, monosaccharideType, anomericity, isomer, ringType) {
	        _classCallCheck(this, Monosaccharide);
	
	        var _this = _possibleConstructorReturn(this, (Monosaccharide.__proto__ || Object.getPrototypeOf(Monosaccharide)).call(this, id));
	
	        if (monosaccharideType instanceof _MonosaccharideType2.default) {
	            _this._monosaccharideType = monosaccharideType;
	        } else if (typeof monosaccharideType == 'undefined') {
	            _this._monosaccharideType = _MonosaccharideType2.default.UNDEFINED;
	        } else {
	            throw 'Please use the MonosaccharideType class and forget about string. Extend the enum if you need a specific value';
	        }
	
	        if (anomericity instanceof _Anomericity2.default) {
	            _this._anomericity = anomericity;
	        } else if (typeof anomericity == 'undefined') {
	            _this._anomericity = _Anomericity2.default.UNDEFINED;
	        } else {
	            throw 'Please use the Anomericity class and forget about string. Extend the enum if you need a specific value';
	        }
	
	        if (isomer instanceof _Isomer2.default) {
	            _this._isomer = isomer;
	        } else if (typeof isomer == 'undefined') {
	            _this._isomer = _Isomer2.default.UNDEFINED;
	        } else {
	            throw 'Please use the Isomer class and forget about string. Extend the enum if you need a specific value';
	        }
	
	        if (ringType instanceof _RingType2.default) {
	            _this._ringType = ringType;
	        } else if (typeof ringType == 'undefined') {
	            _this._ringType = _RingType2.default.UNDEFINED;
	        } else {
	            throw 'Please use the RingType class and forget about string. Extend the enum if you need a specific value';
	        }
	
	        return _this;
	    }
	
	    _createClass(Monosaccharide, [{
	        key: 'ringType',
	        get: function get() {
	            return this._ringType;
	        },
	        set: function set(ringType) {
	            if (ringType instanceof _RingType2.default) {
	                this._ringType = ringType;
	            } else {
	                throw 'Please use the RingType class and forget about string. Extend the enum if you need a specific value';
	            }
	        }
	    }, {
	        key: 'monosaccharideType',
	        get: function get() {
	            return this._monosaccharideType;
	        },
	        set: function set(monosaccharideType) {
	            if (monosaccharideType instanceof _MonosaccharideType2.default) {
	                this._monosaccharideType = monosaccharideType;
	            } else {
	                throw 'Please use the MonosaccharideType class and forget about string. Extend the enum if you need a specific value';
	            }
	        }
	    }, {
	        key: 'isomer',
	        get: function get() {
	            return this._isomer;
	        },
	        set: function set(isomer) {
	            if (isomer instanceof _Isomer2.default) {
	                this._isomer = isomer;
	            } else {
	                throw 'Please use the Isomer class and forget about string. Extend the enum if you need a specific value';
	            }
	        }
	    }, {
	        key: 'anomericity',
	        get: function get() {
	            return this._anomericity;
	        },
	        set: function set(anomericity) {
	            if (anomericity instanceof _Anomericity2.default) {
	                this._anomericity = anomericity;
	            } else {
	                throw 'Please use the Anomericity class and forget about string. Extend the enum if you need a specific value';
	            }
	        }
	    }]);
	
	    return Monosaccharide;
	}(_GraphNode2.default);
	
	exports.default = Monosaccharide;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _GraphNode = __webpack_require__(3);
	
	var _GraphNode2 = _interopRequireDefault(_GraphNode);
	
	var _SubstituentType = __webpack_require__(11);
	
	var _SubstituentType2 = _interopRequireDefault(_SubstituentType);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author:  Davide Alocci
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Version: 0.0.1
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var Substituent = function (_Node) {
	    _inherits(Substituent, _Node);
	
	    function Substituent(id, substituentType) {
	        _classCallCheck(this, Substituent);
	
	        var _this = _possibleConstructorReturn(this, (Substituent.__proto__ || Object.getPrototypeOf(Substituent)).call(this, id));
	
	        if (substituentType instanceof _SubstituentType2.default) {
	            _this._substituentType = substituentType;
	        } else if (typeof substituentType == 'undefined') {
	            _this._substituentType = _SubstituentType2.default.UNDEFINED;
	        } else {
	            throw 'Please use the SubstituentType class and forget about string. Extend the enum if you need a specific value';
	        }
	        return _this;
	    }
	
	    _createClass(Substituent, [{
	        key: 'substituentType',
	        get: function get() {
	            return this._substituentType;
	        },
	        set: function set(substituentType) {
	            if (substituentType instanceof _SubstituentType2.default) {
	                this._substituentType = substituentType;
	            } else {
	                throw 'Please use the SubstituentType class and forget about string. Extend the enum if you need a specific value';
	            }
	        }
	    }]);
	
	    return Substituent;
	}(_GraphNode2.default);
	
	exports.default = Substituent;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Author:  Davide Alocci
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Version: 0.0.1
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * TODO: We need to add something to freeze the sugar structure.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * At the moment all the attributes are mutable unless ids with targets and sources.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	var _Monosaccharide = __webpack_require__(19);
	
	var _Monosaccharide2 = _interopRequireDefault(_Monosaccharide);
	
	var _Substituent = __webpack_require__(20);
	
	var _Substituent2 = _interopRequireDefault(_Substituent);
	
	var _GlycosidicLinkage = __webpack_require__(17);
	
	var _GlycosidicLinkage2 = _interopRequireDefault(_GlycosidicLinkage);
	
	var _SubstituentLinkage = __webpack_require__(18);
	
	var _SubstituentLinkage2 = _interopRequireDefault(_SubstituentLinkage);
	
	var _Graph = __webpack_require__(1);
	
	var _Graph2 = _interopRequireDefault(_Graph);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Sugar = function () {
	    function Sugar(id, rootNode) {
	        _classCallCheck(this, Sugar);
	
	        if (typeof id !== 'string' && typeof id !== 'number') {
	            throw 'The sugar must have a string or number id.';
	        } else {
	            this.id = id;
	        }
	
	        this.rootSet = false;
	        //Wrapping of Sigma.js graph datastructure.
	        this.graph = new _Graph2.default.graph();
	
	        if (rootNode instanceof _Monosaccharide2.default) {
	            this.rootNode = rootNode;
	            try {
	                this.graph.addNode(rootNode);
	            } catch (err) {
	                throw 'Error adding node: ' + err;
	            }
	
	            this.rootSet = true;
	        } else if (typeof rootNode !== 'undefined') {
	            throw 'The Root Node cannot be undefined or a Monosaccharide ';
	        }
	    }
	
	    /**
	     * Chech if the root of the Sugar is set.
	     * @returns {boolean}
	     */
	
	    _createClass(Sugar, [{
	        key: 'rootIsSet',
	        value: function rootIsSet() {
	            return this.rootSet;
	        }
	
	        /**
	         * Get the Sugar Id
	         * @returns {string} Sugar Id
	         */
	
	    }, {
	        key: 'getSugarId',
	        value: function getSugarId() {
	            return this.id;
	        }
	
	        /**
	         * Get the root node. Can only be a Monosaccharide
	         * @returns {Monosaccharide} Root Monosaccharide
	         */
	
	    }, {
	        key: 'getRootNode',
	        value: function getRootNode() {
	            return this.rootNode;
	        }
	
	        /**
	         * Set the root node. Can only be a Monosaccharide
	         * @param {Monosaccharide} rootNode The root node
	         * @returns {Monosaccharide} The root node
	         */
	
	    }, {
	        key: 'setRootNode',
	        value: function setRootNode(rootNode) {
	            if (!(rootNode instanceof _Monosaccharide2.default)) {
	                throw 'The Root Node can be only a Monosaccharide ';
	            }
	
	            if (this.rootIsSet()) {
	                throw 'The Root Node can only be set once. Create a new Sugar object.';
	            }
	
	            this.rootNode = rootNode;
	            this.graph.addNode(rootNode);
	            this.rootSet = true;
	            return rootNode;
	        }
	
	        /**
	         * Return the Node with the id specified by the user otherwise throw an error.
	         * @param {string} id The node id
	         * @returns {*} return a node object (Monosaccharide or Substituent in our case).
	         */
	
	    }, {
	        key: 'getNodeById',
	        value: function getNodeById(id) {
	            try {
	                var node = this.graph.nodes(id);
	                if (node) return node;
	            } catch (err) {
	                throw 'Error: ' + err;
	            }
	            throw 'Error: The node does not exist';
	        }
	
	        /**
	         * Return the Edge with the id specified by the user otherwise throw an error.
	         * @param {string} id The Edge id
	         * @returns {*} return a linkage(edge) object (GlycosidicLinkage or SubstituentLinkage in our case).
	         */
	
	    }, {
	        key: 'getEdgeById',
	        value: function getEdgeById(id) {
	            try {
	                var edge = this.graph.edges(id);
	                if (edge) return edge;
	            } catch (err) {
	                throw 'Error: ' + err;
	            }
	            throw 'Error: The node does not exist';
	        }
	
	        /**
	         * Return the Edge within sourceNode and targetNode
	         * Throw an error if the edge does not exist.
	         * TODO: The for loop can ber removed by creating a new method in the graph.js to get specific edges.
	         * @param {string} id The Edge id
	         * @returns {*} return a linkage(edge) object (GlycosidicLinkage or SubstituentLinkage in our case).
	         */
	
	    }, {
	        key: 'getEdge',
	        value: function getEdge(sourceNode, targetNode) {
	            for (var i = 0; i < this.graph.edges().length; i++) {
	                if (this.graph.edges()[i].getEdgeSource() === sourceNode && this.graph.edges()[i].getEdgeTarget() === targetNode) {
	                    return this.graph.edges()[i];
	                }
	            }
	            throw 'No edge found between the sourceNode and targetNode';
	        }
	
	        /**
	         * Return the Monosaccharide with the id specified by the user otherwise throw an error.
	         * @param {string} id The Monosaccharide id
	         * @returns {Monosaccharide} return a Monosaccahride object
	         */
	
	    }, {
	        key: 'getMonosaccharideById',
	        value: function getMonosaccharideById(id) {
	            var monosaccharide = this.getNodeById(id);
	            if (monosaccharide instanceof _Monosaccharide2.default) {
	                return monosaccharide;
	            } else {
	                throw 'This method can only return monosaccharide object';
	            }
	        }
	
	        /**
	         * Return the Substituent with the id specified by the user otherwise throw an error.
	         * @param {string} id The Substituent id
	         * @returns {Substituent} return a Substituent object
	         */
	
	    }, {
	        key: 'getSubstituentById',
	        value: function getSubstituentById(id) {
	            var substituent = this.getNodeById(id);
	            if (substituent instanceof _Substituent2.default) {
	                return substituent;
	            } else {
	                throw 'This method can only return substituent object';
	            }
	        }
	
	        /**
	         * Return the GlycosidicLinkage with the id specified by the user otherwise throw an error.
	         * @param {string} id The Edge id
	         * @returns {GlycosidicLinkage} return a GlycosidicLinkage object
	         */
	
	    }, {
	        key: 'getGlycosidicLinkagebyID',
	        value: function getGlycosidicLinkagebyID(id) {
	            var glyLinkage = this.getEdgeById(id);
	            if (glyLinkage instanceof _GlycosidicLinkage2.default) {
	                return glyLinkage;
	            } else {
	                throw 'This method can only return GlycosidicLinkage object';
	            }
	        }
	
	        /**
	         * Return the SubstituentLinkage with the id specified by the user otherwise throw an error.
	         * @param {string} id The Edge id
	         * @returns {SubstituentLinkage} return a SubstituentLinkage object
	         */
	
	    }, {
	        key: 'getSubstituentLinkagebyId',
	        value: function getSubstituentLinkagebyId(id) {
	            var subLinkage = this.getEdgeById(id);
	            if (subLinkage instanceof _SubstituentLinkage2.default) {
	                return subLinkage;
	            } else {
	                throw 'This method can only return SubstituentLinkage object';
	            }
	        }
	
	        /**
	         * Return the GlycosidicLinkage within sourceNode and targhetNode
	         * @param {string} id The Edge id
	         * @returns {GlycosidicLinkage} return a GlycosidicLinkage object
	         */
	
	    }, {
	        key: 'getGlycosidicLinkage',
	        value: function getGlycosidicLinkage(sourceNode, targetNode) {
	            var glyLinkage = this.getEdge(sourceNode, targetNode);
	            if (glyLinkage instanceof _GlycosidicLinkage2.default) {
	                return glyLinkage;
	            } else {
	                throw 'This method can only return GlycosidicLinkage object';
	            }
	        }
	
	        /**
	         * Return the SubstituentLinkage within sourceNode and targhetNode
	         * @param {string} id The Edge id
	         * @returns {SubstituentLinkage} return a SubstituentLinkage object
	         */
	
	    }, {
	        key: 'getSubstituentLinkage',
	        value: function getSubstituentLinkage(sourceNode, targetNode) {
	            var subLinkage = this.getEdgeById(sourceNode, targetNode);
	            if (subLinkage instanceof _SubstituentLinkage2.default) {
	                return subLinkage;
	            } else {
	                throw 'This method can only return SubstituentLinkage object';
	            }
	        }
	
	        /**
	         * Add a new Monosaccharide to the Sugar with a pre-built Glycosidic Linkage.
	         * @param {Monosaccharide} childNode The monosaccharide to add
	         * @param {GlycosidicLinkage} glycosidicLinkage The edge to add
	         * @returns {Monosaccharide} The monosaccharide added to the Sugar.
	         */
	
	    }, {
	        key: 'addMonosaccharide',
	        value: function addMonosaccharide(childNode, glycosidicLinkage) {
	            if (childNode instanceof _Monosaccharide2.default && glycosidicLinkage instanceof _GlycosidicLinkage2.default) {
	                this.graph.addNode(childNode);
	                this.graph.addEdge(glycosidicLinkage);
	            } else {
	                throw 'Error: the childNode must be a Monosaccharide and the Linkage must be a GlycosidicLinkage';
	            }
	
	            return childNode;
	        }
	
	        /**
	         * Add a new Substituent to the Sugar with a pre-built Substituent Linkage
	         * @param {Substituent} childNode The substituent to add
	         * @param {SubstituentLinkage}substituentLinkage The edge to add
	         * @returns {Substituent} The substituent added to the Substituent.
	         */
	
	    }, {
	        key: 'addSubstituent',
	        value: function addSubstituent(childNode, substituentLinkage) {
	            if (childNode instanceof _Substituent2.default && substituentLinkage instanceof _SubstituentLinkage2.default) {
	                try {
	                    this.graph.addNode(childNode);
	                    this.graph.addEdge(substituentLinkage);
	                } catch (err) {
	                    throw 'Cannot add node and edge to the graph: ' + err;
	                }
	            } else {
	                throw 'The childNode must be a Substituent and the Linkage must be a SubstituentLinkage';
	            }
	            return childNode;
	        }
	
	        /**
	         * Add a new Monosaccharide to the Sugar without Glycosidic Linkage Object
	         * @param {Node} parentNode The parentNode in the graph.(Monosaccharide or Substituent)
	         * @param {Monosaccharide} childNode The Monosaccharide to add
	         * @param {AnomerCarbon} anomerCarbon The anomerCarbon in the Glycosidic Linkage
	         * @param {LinkedCarbon} linkedCarbon The linkedCarbon in the Glycosidic Linkage
	         * @return {GlycosidicLinkage} the linkage created to add the node.
	         */
	
	    }, {
	        key: 'addMonosaccharideWithLinkage',
	        value: function addMonosaccharideWithLinkage(parentNode, childNode, anomerCarbon, linkedCarbon) {
	            if (childNode instanceof _Monosaccharide2.default) {
	                try {
	                    var glycosidicLinkage = new _GlycosidicLinkage2.default('GlyLin:' + parentNode.getId() + '-' + childNode.getId(), parentNode, childNode, anomerCarbon, linkedCarbon);
	                    this.addMonosaccharide(childNode, glycosidicLinkage);
	                    return glycosidicLinkage;
	                } catch (err) {
	                    throw 'Cannot Create a Glycosidic Linkage: ' + err;
	                }
	            }
	        }
	
	        /**
	         * Add a new Monosaccharide to the Sugar without Glycosidic Linkage Object
	         * @param {Node} parentNode The parentNode in the graph.(Monosaccharide or Substituent)
	         * @param {Substituent} childNode The Monosaccharide to add
	         * @param {LinkedCarbon} linkedCarbon The linkedCarbon in the Glycosidic Linkage
	         * @return {SubstituentLinkage} the linkage created to add the node.
	         */
	
	    }, {
	        key: 'addSubstituentWithLinkage',
	        value: function addSubstituentWithLinkage(parentNode, childNode, linkedCarbon) {
	            if (childNode instanceof _Substituent2.default) {
	                try {
	                    var substituentLinkage = new _SubstituentLinkage2.default('SubLin:' + parentNode.getId() + '-' + childNode.getId(), parentNode, childNode, linkedCarbon);
	                    this.addSubstituent(childNode, substituentLinkage);
	                    return substituentLinkage;
	                } catch (err) {
	                    throw 'Cannot Create a Glycosidic Linkage: ' + err;
	                }
	            }
	        }
	        /**
	         * Remove a node from the Sugar graph. This method works with Substituents and Monosaccharides
	         * @param {string} id The id of the node to be removed
	         * @returns {Graph} Updated graph.
	         */
	
	    }, {
	        key: 'removeNodeById',
	        value: function removeNodeById(id) {
	            try {
	                var updatedGraph = this.graph.dropNode(id);
	                return updatedGraph;
	            } catch (err) {
	                throw 'Error removing the Node: ' + err;
	            }
	        }
	
	        /**
	         * Remove a Monosaccharide for the Sugar. It removes all the edges connected to the Monosaccharide.
	         * Be carefull: The children will be detached from the tree.
	         * @param {Monosaccharide} childNode The monosaccharide to be removed
	         * @returns {Graph} Updated graph
	         */
	
	    }, {
	        key: 'removeMonosaccharide',
	        value: function removeMonosaccharide(childNode) {
	            if (childNode instanceof _Monosaccharide2.default) {
	                try {
	                    var updatedGraph = this.removeNodeById(childNode.id);
	                    return updatedGraph;
	                } catch (err) {
	                    throw 'Error removing Monosaccharide: ' + err;
	                }
	            } else {
	                throw 'This method can remove only monosaccharide from the Sugar';
	            }
	        }
	
	        /**
	         * Remove a Substituent for the Sugar. It removes all the edges connected to the Substituent.
	         * Be carefull: The children will be detached from the tree.
	         * @param {Substituent} childNode The substituent to be removed
	         * @returns {Graph} Updated graph
	         */
	
	    }, {
	        key: 'removeSubstituent',
	        value: function removeSubstituent(childNode) {
	            if (childNode instanceof _Substituent2.default) {
	                try {
	                    var updatedGraph = this.graph.dropNode(childNode.id);
	                    return updatedGraph;
	                } catch (err) {
	                    throw 'Error removing Substituent: ' + err;
	                }
	            } else {
	                throw 'This method can remove only substituent from the Sugar';
	            }
	        }
	
	        /**
	         * Remove a edge from the Sugar graph. This method works with Substituents and Monosaccharides
	         * @param {string} id The id of the linkage to be removed
	         * @returns {Graph} Updated graph.
	         */
	
	    }, {
	        key: 'removeLinkageById',
	        value: function removeLinkageById(id) {
	            try {
	                var updatedGraph = this.graph.dropEdge(id);
	                return updatedGraph;
	            } catch (err) {
	                throw 'Error removing the Node: ' + err;
	            }
	        }
	
	        /**
	         * Remove a GlycosidicLinkage for the Sugar.
	         * @param {GlycosidicLinkage} glycosidicLinkage The glycosidicLinkage to be removed
	         * @returns {Graph} Updated graph
	         */
	
	    }, {
	        key: 'removeGlycosidicLinkage',
	        value: function removeGlycosidicLinkage(linkage) {
	            if (linkage instanceof _GlycosidicLinkage2.default) {
	                try {
	                    var updatedGraph = this.removeLinkageById(linkage.id);
	                    return updatedGraph;
	                } catch (err) {
	                    throw 'Error removing GlycosidicLinkage: ' + err;
	                }
	            } else {
	                throw 'This method can remove only GlycosidicLinkages from the Sugar';
	            }
	        }
	
	        /**
	         * Remove a SubstituentLinkage for the Sugar.
	         * @param {SubstituentLinkage} childNode The substituentLinkage to be removed
	         * @returns {Graph} Updated graph
	         */
	
	    }, {
	        key: 'removeSubstituentLinkage',
	        value: function removeSubstituentLinkage(linkage) {
	            if (linkage instanceof _SubstituentLinkage2.default) {
	                try {
	                    var updatedGraph = this.removeLinkageById(linkage.id);
	                    return updatedGraph;
	                } catch (err) {
	                    throw 'Error removing Substituent: ' + err;
	                }
	            } else {
	                throw 'This method can remove only substituent from the Sugar';
	            }
	        }
	
	        /**
	         * This method reads an object and adds a structure.
	         * Please use id root for the root node!
	         * Here is an example:
	         *
	         *   var mySugar = new Sugar();
	         *   mySugar.addStructure({
	         *     nodes: [
	         *       {
	         *         id: 'root',
	         *         nodeType: 'Monosaccharide',
	         *         monosaccharideType: ''
	         *         anomericity: '',
	         *         isomer: '',
	         *         ringType: ''
	         *       },
	         *       {
	         *         id: 'n1',
	         *         nodeType: 'Monosaccharide',
	         *         monosaccharideType: ''
	         *         anomericity: '',
	         *         isomer: '',
	         *         ringType: ''
	         *       }
	         *     ],
	         *     edges: [
	         *       {
	         *         id: 'e0',
	         *         source: 'root',
	         *         target: 'n1',
	         *         linkedCarbon: '',
	         *         anomerCarbon: '',
	         *         linkageType:
	         *       }
	         *     ]
	         *   });
	         *
	         * @param  {object} g The graph object.
	         * @return {object}   The graph instance.
	         */
	
	    }, {
	        key: 'addStructure',
	        value: function addStructure(structure) {
	            var i, a, l;
	
	            a = g.nodes || [];
	            for (i = 0, l = a.length; i < l; i++) {
	                this.addNode(a[i]);
	            }a = g.edges || [];
	            for (i = 0, l = a.length; i < l; i++) {
	                this.addEdge(a[i]);
	            }return this;
	        }
	
	        /**
	         * The actual size of the sugar in terms of nodes.
	         * Each monosaccharide and substituent count as 1
	         * @returns {number} The size of the sugar
	         */
	
	    }, {
	        key: 'size',
	        value: function size() {
	            return this.graph.nodes().length;
	        }
	
	        /**
	         * Clear the sugar object and set Root to undefined.
	         * Only the Id remains set (Id is immutable).
	         */
	
	    }, {
	        key: 'clear',
	        value: function clear() {
	            this.rootSet = false;
	            this.rootNode = undefined;
	            this.graph.clear();
	        }
	    }]);
	
	    return Sugar;
	}();
	
	exports.default = Sugar;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _LinkedCarbon = __webpack_require__(8);
	
	var _LinkedCarbon2 = _interopRequireDefault(_LinkedCarbon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                           * Created by Renaud on 17/07/2017.
	                                                                                                                                                           */
	
	var RepeatingUnit = function RepeatingUnit(id, nodes, min, max, entry, exit, linkedCarbon, anomerCarbon) {
	    _classCallCheck(this, RepeatingUnit);
	
	    this.id = id;
	    this.nodes = nodes;
	    if (min === "?") {
	        this.min = min;
	    } else {
	        this.min = parseInt(min);
	    }
	    if (max === "?") {
	        this.max = max;
	    } else {
	        this.max = parseInt(max);
	    }
	    if (linkedCarbon === "?") {
	        this.linkedCarbon = _LinkedCarbon2.default.UNDEFINED;
	    } else {
	        this.linkedCarbon = linkedCarbon;
	    }
	    if (anomerCarbon === "?") {
	        this.anomerCarbon = _LinkedCarbon2.default.UNDEFINED;
	    } else {
	        this.anomerCarbon = anomerCarbon;
	    }
	};
	
	exports.default = RepeatingUnit;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Author:  Davide Alocci
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Version: 0.0.1
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _Sugar = __webpack_require__(21);
	
	var _Sugar2 = _interopRequireDefault(_Sugar);
	
	var _Anomericity = __webpack_require__(6);
	
	var _Anomericity2 = _interopRequireDefault(_Anomericity);
	
	var _MonosaccharideType = __webpack_require__(9);
	
	var _MonosaccharideType2 = _interopRequireDefault(_MonosaccharideType);
	
	var _Isomer = __webpack_require__(7);
	
	var _Isomer2 = _interopRequireDefault(_Isomer);
	
	var _RingType = __webpack_require__(10);
	
	var _RingType2 = _interopRequireDefault(_RingType);
	
	var _SubstituentType = __webpack_require__(11);
	
	var _SubstituentType2 = _interopRequireDefault(_SubstituentType);
	
	var _Monosaccharide = __webpack_require__(19);
	
	var _Monosaccharide2 = _interopRequireDefault(_Monosaccharide);
	
	var _AnomerCarbon = __webpack_require__(4);
	
	var _AnomerCarbon2 = _interopRequireDefault(_AnomerCarbon);
	
	var _LinkedCarbon = __webpack_require__(8);
	
	var _LinkedCarbon2 = _interopRequireDefault(_LinkedCarbon);
	
	var _Substituent = __webpack_require__(20);
	
	var _Substituent2 = _interopRequireDefault(_Substituent);
	
	var _SubstituentLinkage = __webpack_require__(18);
	
	var _SubstituentLinkage2 = _interopRequireDefault(_SubstituentLinkage);
	
	var _SubstituentsGlycoCT = __webpack_require__(12);
	
	var _SubstituentsGlycoCT2 = _interopRequireDefault(_SubstituentsGlycoCT);
	
	var _MonosaccharideGlycoCT = __webpack_require__(14);
	
	var _MonosaccharideGlycoCT2 = _interopRequireDefault(_MonosaccharideGlycoCT);
	
	var _SubstituentsPositions = __webpack_require__(13);
	
	var _SubstituentsPositions2 = _interopRequireDefault(_SubstituentsPositions);
	
	var _RepeatingUnit = __webpack_require__(22);
	
	var _RepeatingUnit2 = _interopRequireDefault(_RepeatingUnit);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GlycoCTParser = function () {
	    function GlycoCTParser(formula) {
	        _classCallCheck(this, GlycoCTParser);
	
	        this.formula = formula;
	    }
	
	    _createClass(GlycoCTParser, [{
	        key: 'randomString',
	        value: function randomString(length) {
	            // Possible chars in the generated string
	            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');
	
	            if (!length) {
	                // If no length specified, get a random length
	                length = Math.floor(Math.random() * chars.length);
	            }
	
	            var str = '';
	            for (var i = 0; i < length; i++) {
	                // Add random chars till length is the one specified
	                str += chars[Math.floor(Math.random() * chars.length)];
	            }
	            return str;
	        }
	    }, {
	        key: 'getSub',
	        value: function getSub(name) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = _SubstituentType2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var sub = _step.value;
	
	                    if (sub.name === name) return sub;
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'getMono',
	        value: function getMono(name) {
	            switch (name) {
	                case "KdnNAc":
	                    return _MonosaccharideType2.default.Neu5Ac;
	                case "KdnNGc":
	                    return _MonosaccharideType2.default.Neu5Gc;
	                case "KdnN":
	                    return _MonosaccharideType2.default.Neu;
	            }
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;
	
	            try {
	                for (var _iterator2 = _MonosaccharideType2.default[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var mono = _step2.value;
	
	                    if (mono.name === name) return mono;
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'getMonoType',
	        value: function getMonoType(stemType, transform) {
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;
	
	            try {
	                for (var _iterator3 = _MonosaccharideGlycoCT2.default[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var mono = _step3.value;
	
	                    if (mono.glycoct === stemType && mono.transform === transform) {
	                        return mono;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }
	
	            return undefined;
	        }
	    }, {
	        key: 'createResidue',
	        value: function createResidue(residue, linkedCarbon, anomerCarbon, repeatingUnit) {
	            if (residue[0].substring(residue[0].length - 1) === "b") {
	                // monosaccharide
	                var anomericity;
	                var _iteratorNormalCompletion4 = true;
	                var _didIteratorError4 = false;
	                var _iteratorError4 = undefined;
	
	                try {
	                    for (var _iterator4 = _Anomericity2.default[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                        var anom = _step4.value;
	
	                        if (residue[1].substring(0, 1) === "a") {
	                            anomericity = _Anomericity2.default.ALPHA;
	                        } else if (residue[1].substring(0, 1) === "b") {
	                            anomericity = _Anomericity2.default.BETA;
	                        } else {
	                            anomericity = _Anomericity2.default.UNDEFINED;
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError4 = true;
	                    _iteratorError4 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                            _iterator4.return();
	                        }
	                    } finally {
	                        if (_didIteratorError4) {
	                            throw _iteratorError4;
	                        }
	                    }
	                }
	
	                var dashSplit = residue[1].split("-");
	                var stemType = dashSplit[1];
	                var isomer;
	                var _iteratorNormalCompletion5 = true;
	                var _didIteratorError5 = false;
	                var _iteratorError5 = undefined;
	
	                try {
	                    for (var _iterator5 = _Isomer2.default[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                        var isom = _step5.value;
	
	                        if (stemType.substring(0, 1) === "x") {
	                            isomer = _Isomer2.default.UNDEFINED;
	                        }
	                        if (stemType.substring(0, 1) === isom.name.toLowerCase()) {
	                            isomer = isom;
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError5 = true;
	                    _iteratorError5 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                            _iterator5.return();
	                        }
	                    } finally {
	                        if (_didIteratorError5) {
	                            throw _iteratorError5;
	                        }
	                    }
	                }
	
	                var glycoct = residue[1].substring(3, residue[1].length - 2);
	                var firstTransform = residue[2].split("|");
	                var transform = "";
	                if (firstTransform.length > 1) // at least one transformation
	                    {
	                        transform = "|" + firstTransform[1];
	                        for (var k = 3; k < residue.length; k++) {
	                            transform += ":" + residue[k];
	                        }
	                    }
	                var monoType = this.getMonoType(glycoct, transform);
	                if (monoType === undefined) {
	                    // if monosaccharide is amond the simple HEX cases
	                    glycoct = residue[1].substring(2, residue[1].length - 2);
	                    monoType = this.getMonoType(glycoct, transform);
	                    if (monoType === undefined) {
	                        // if monosaccharide is among the exceptions for the ring type
	                        glycoct = residue[1].substring(3) + ":" + firstTransform[0];
	                        monoType = this.getMonoType(glycoct, transform);
	                        if (monoType === undefined) {
	                            monoType = _MonosaccharideGlycoCT2.default.Unknown;
	                        }
	                    }
	                }
	                monoType = _MonosaccharideType2.default[monoType.name];
	                var ringStop = residue[2].substring(0, 1);
	                var ringType;
	                if (ringStop === "4") {
	                    ringType = _RingType2.default.F;
	                } else if (ringStop === "5") {
	                    ringType = _RingType2.default.P;
	                } else {
	                    ringType = _RingType2.default.UNDEFINED;
	                }
	
	                var nodeId = this.randomString(7);
	                var node = new _Monosaccharide2.default(nodeId, monoType, anomericity, isomer, ringType);
	                if (repeatingUnit !== undefined) {
	                    node.repeatingUnit = repeatingUnit;
	                }
	                if (linkedCarbon === "r" && anomerCarbon === "r") // Root
	                    {
	                        this.sugar = new _Sugar2.default("Sugar", node);
	                    } else {
	                    var ac;
	                    var _iteratorNormalCompletion6 = true;
	                    var _didIteratorError6 = false;
	                    var _iteratorError6 = undefined;
	
	                    try {
	                        for (var _iterator6 = _AnomerCarbon2.default[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	                            var anomC = _step6.value;
	
	                            if (anomerCarbon === "?") {
	                                ac = _AnomerCarbon2.default.UNDEFINED;
	                            }
	                            if (parseInt(anomerCarbon) === anomC.value) {
	                                ac = anomC;
	                            }
	                        }
	                    } catch (err) {
	                        _didIteratorError6 = true;
	                        _iteratorError6 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                                _iterator6.return();
	                            }
	                        } finally {
	                            if (_didIteratorError6) {
	                                throw _iteratorError6;
	                            }
	                        }
	                    }
	
	                    var lc;
	                    var _iteratorNormalCompletion7 = true;
	                    var _didIteratorError7 = false;
	                    var _iteratorError7 = undefined;
	
	                    try {
	                        for (var _iterator7 = _LinkedCarbon2.default[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	                            var linkedC = _step7.value;
	
	                            if (linkedCarbon === "?") {
	                                lc = _LinkedCarbon2.default.UNDEFINED;
	                            }
	                            if (parseInt(linkedCarbon) === linkedC.value) {
	                                lc = linkedC;
	                            }
	                        }
	                    } catch (err) {
	                        _didIteratorError7 = true;
	                        _iteratorError7 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion7 && _iterator7.return) {
	                                _iterator7.return();
	                            }
	                        } finally {
	                            if (_didIteratorError7) {
	                                throw _iteratorError7;
	                            }
	                        }
	                    }
	
	                    this.sugar.addMonosaccharideWithLinkage(this.clickedNode, node, ac, lc);
	                }
	                return nodeId;
	            } else if (residue[0].substring(residue[0].length - 1) === "s") {
	                // substituent
	                var subName = residue[1];
	                var substituentType;
	                var _iteratorNormalCompletion8 = true;
	                var _didIteratorError8 = false;
	                var _iteratorError8 = undefined;
	
	                try {
	                    for (var _iterator8 = _SubstituentsGlycoCT2.default[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	                        var sub = _step8.value;
	
	                        if (subName === sub.glycoct) {
	                            subName = sub.name;
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError8 = true;
	                    _iteratorError8 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion8 && _iterator8.return) {
	                            _iterator8.return();
	                        }
	                    } finally {
	                        if (_didIteratorError8) {
	                            throw _iteratorError8;
	                        }
	                    }
	                }
	
	                var _iteratorNormalCompletion9 = true;
	                var _didIteratorError9 = false;
	                var _iteratorError9 = undefined;
	
	                try {
	                    for (var _iterator9 = _SubstituentType2.default[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	                        var subType = _step9.value;
	
	                        if (subName.toLowerCase() === subType.name.toLowerCase()) {
	                            substituentType = subType;
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError9 = true;
	                    _iteratorError9 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion9 && _iterator9.return) {
	                            _iterator9.return();
	                        }
	                    } finally {
	                        if (_didIteratorError9) {
	                            throw _iteratorError9;
	                        }
	                    }
	                }
	
	                var lcs;
	                var _iteratorNormalCompletion10 = true;
	                var _didIteratorError10 = false;
	                var _iteratorError10 = undefined;
	
	                try {
	                    for (var _iterator10 = _LinkedCarbon2.default[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
	                        var linkedCS = _step10.value;
	
	                        if (linkedCarbon === "?") {
	                            lcs = _LinkedCarbon2.default.UNDEFINED;
	                        }
	                        if (parseInt(linkedCarbon) === linkedCS.value) {
	                            lcs = linkedCS;
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError10 = true;
	                    _iteratorError10 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion10 && _iterator10.return) {
	                            _iterator10.return();
	                        }
	                    } finally {
	                        if (_didIteratorError10) {
	                            throw _iteratorError10;
	                        }
	                    }
	                }
	
	                var subId = this.randomString(7); // If the Mono-Sub combination has a predefined code, change the monosaccharide
	                var substituent = new _Substituent2.default(subId, substituentType);
	                var newType = this.getMono(this.clickedNode.monosaccharideType.name + this.getSub(subName).label);
	                if (newType && _SubstituentsPositions2.default[newType.name].position == linkedCarbon) {
	                    this.updateNodeType(this.clickedNode, newType);
	                } else {
	                    var subLinkage = new _SubstituentLinkage2.default(this.randomString(7), this.clickedNode, substituent, lcs);
	                    this.sugar.addSubstituent(substituent, subLinkage);
	                }
	            }
	        }
	    }, {
	        key: 'updateNodeType',
	        value: function updateNodeType(node, type) {
	            var _iteratorNormalCompletion11 = true;
	            var _didIteratorError11 = false;
	            var _iteratorError11 = undefined;
	
	            try {
	                for (var _iterator11 = this.sugar.graph.nodes()[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
	                    var sugarNode = _step11.value;
	
	                    if (node === sugarNode) {
	                        sugarNode.monosaccharideType = type;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError11 = true;
	                _iteratorError11 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion11 && _iterator11.return) {
	                        _iterator11.return();
	                    }
	                } finally {
	                    if (_didIteratorError11) {
	                        throw _iteratorError11;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'parseGlycoCT',
	        value: function parseGlycoCT() {
	            if (this.formula === "") {
	                return new _Sugar2.default("Sugar");
	            }
	            var res = this.getSection("RES", this.formula);
	            var links;
	            if (!this.formula.split("LIN")[1]) // Only one node without links
	                {
	                    if (!res[0]) // wrong formula
	                        {
	                            return new _Sugar2.default("Sugar");
	                        }
	                    this.createResidue(res[0].split(":"), "r", "r");
	                    return this.sugar;
	                } else {
	                links = this.getSection("LIN", this.formula);
	            }
	            var repSection = this.getSection("REP", this.formula);
	            var reps = this.getRepeatingUnit(repSection);
	
	            var nodesIds = {};
	
	            var repInfo = [];
	
	            if (reps.length != 0) {
	                var merge = this.mergeRep(reps, res, links);
	                res = merge[0];
	                links = merge[1];
	                repInfo = merge[2];
	
	                console.log(repInfo);
	            }
	
	            console.log(res);
	            console.log(links);
	
	            this.generateNodes(links, nodesIds, res, repInfo);
	
	            return this.sugar;
	        }
	    }, {
	        key: 'mergeRep',
	        value: function mergeRep(reps, res, links) {
	
	            var repeatingUnitsObjects = []; // Contains all the instanciated Rep objects
	            var repeatingUnit;
	            var repInfo = {}; // Shows which node is associated to which Rep
	
	            // First merge the RES
	            var finalRes = [];
	            var repUnitRead = 0;
	            var repUnitOffsets = [];
	            var repUnitIndices = {};
	            for (var i in res) {
	                if (res[i].split(":")[0].indexOf("r") == -1) // Not a repeating unit
	                    {
	                        finalRes.push(res[i]);
	                    } else {
	                    repUnitIndices[parseInt(i) + 1] = reps[repUnitRead];
	                    finalRes = finalRes.concat(reps[repUnitRead].res);
	                    repUnitOffsets.push(reps[repUnitRead].res.length);
	                    repUnitRead++;
	                }
	            }
	
	            // Then links
	            var finalLinks = [];
	            repUnitRead = 0;
	            var allLinks = [];
	            // STEP 1: Insert all the links
	            for (i in links) {
	                allLinks.push(links[i]);
	                finalLinks.push(links[i]);
	                if (this.isTargetARep(links[i], repUnitIndices)) // target node is a repeating unit
	                    {
	                        finalLinks = finalLinks.concat(reps[repUnitRead].lin);
	                        repUnitRead++;
	                    }
	            }
	
	            // STEP 2: Edit the links' sources and targets to make them match with the RES new order
	            var flagInRep = false;
	            var addedLines = 0;
	            var curRepIndex;
	            repUnitRead = 0;
	            var _iteratorNormalCompletion12 = true;
	            var _didIteratorError12 = false;
	            var _iteratorError12 = undefined;
	
	            try {
	                for (var _iterator12 = reps[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
	                    var r = _step12.value;
	
	                    allLinks = allLinks.concat(r.lin);
	                }
	            } catch (err) {
	                _didIteratorError12 = true;
	                _iteratorError12 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion12 && _iterator12.return) {
	                        _iterator12.return();
	                    }
	                } finally {
	                    if (_didIteratorError12) {
	                        throw _iteratorError12;
	                    }
	                }
	            }
	
	            for (i in finalLinks) {
	                var offset = allLinks.indexOf(finalLinks[i]) - finalLinks.indexOf(finalLinks[i]) + repUnitRead + 1;
	                if (!this.isSourceARep(finalLinks[i], repUnitIndices) && this.isTargetARep(finalLinks[i], repUnitIndices)) // Entering a rep
	                    {
	                        flagInRep = true;
	                        curRepIndex = parseInt(this.getLinkTarget(finalLinks[i]));
	                        finalLinks[i] = this.updateLinkTarget(finalLinks[i], parseInt(this.getLinkTarget(finalLinks[i])) + this.totalRepOffset(reps, repUnitRead));
	                        finalLinks[i] = this.updateLinkSource(finalLinks[i], parseInt(this.getLinkSource(finalLinks[i])) + this.totalRepOffset(reps, repUnitRead));
	                        repeatingUnit = new _RepeatingUnit2.default(this.randomString(7), [], reps[repUnitRead].info.min, reps[repUnitRead].info.max, this.getLinkTarget(finalLinks[i]), -1, reps[repUnitRead].info.linkedCarbon, reps[repUnitRead].info.anomerCarbon);
	                        repeatingUnitsObjects.push(repeatingUnit);
	                        repInfo[parseInt(this.getLinkTarget(finalLinks[i]))] = repeatingUnitsObjects[repUnitRead];
	                    } else if (!this.isSourceARep(finalLinks[i], repUnitIndices) && !this.isTargetARep(finalLinks[i], repUnitIndices)) // Totally inside or totally outside a rep
	                    {
	                        if (flagInRep) // Inside a rep
	                            {
	                                finalLinks[i] = this.updateLinkSource(finalLinks[i], parseInt(this.getLinkSource(finalLinks[i])) - offset);
	                                finalLinks[i] = this.updateLinkTarget(finalLinks[i], parseInt(this.getLinkTarget(finalLinks[i])) - offset);
	                                repInfo[parseInt(this.getLinkSource(finalLinks[i]))] = repeatingUnitsObjects[repUnitRead];
	                                repInfo[parseInt(this.getLinkTarget(finalLinks[i]))] = repeatingUnitsObjects[repUnitRead];
	                            } else {
	                            finalLinks[i] = this.updateLinkSource(finalLinks[i], parseInt(this.getLinkSource(finalLinks[i])) + this.totalRepOffset(reps, repUnitRead));
	                            finalLinks[i] = this.updateLinkTarget(finalLinks[i], parseInt(this.getLinkTarget(finalLinks[i])) + this.totalRepOffset(reps, repUnitRead));
	                        }
	                    } else if (this.isSourceARep(finalLinks[i], repUnitIndices) && this.isTargetARep(finalLinks[i], repUnitIndices)) // Transition between 2 reps
	                    {
	                        finalLinks[i] = this.updateLinkSource(finalLinks[i], parseInt(this.getLinkSource(finalLinks[i])) + this.totalRepOffset(reps, repUnitRead + 1));
	                        curRepIndex = parseInt(this.getLinkTarget(finalLinks[i]));
	                        repInfo[parseInt(this.getLinkSource(finalLinks[i]))] = repeatingUnitsObjects[repUnitRead];
	
	                        finalLinks[i] = this.updateLinkTarget(finalLinks[i], parseInt(this.getLinkTarget(finalLinks[i])) + this.totalRepOffset(reps, repUnitRead + 1));
	                        repUnitRead++;
	                        repeatingUnit = new _RepeatingUnit2.default(this.randomString(7), [], reps[repUnitRead].info.min, reps[repUnitRead].info.max, this.getLinkTarget(finalLinks[i]), -1, reps[repUnitRead].info.linkedCarbon, reps[repUnitRead].info.anomerCarbon);
	                        repeatingUnitsObjects.push(repeatingUnit);
	                        repInfo[parseInt(this.getLinkTarget(finalLinks[i]))] = repeatingUnitsObjects[repUnitRead];
	                    } else if (this.isSourceARep(finalLinks[i], repUnitIndices) && !this.isTargetARep(finalLinks[i], repUnitIndices)) // Ending a rep
	                    {
	                        if (i == 0) {
	                            repeatingUnit = new _RepeatingUnit2.default(this.randomString(7), [], reps[repUnitRead].info.min, reps[repUnitRead].info.max, this.getLinkTarget(finalLinks[i]), -1, reps[repUnitRead].info.linkedCarbon, reps[repUnitRead].info.anomerCarbon);
	                            repeatingUnitsObjects.push(repeatingUnit);
	                        }
	
	                        finalLinks[i] = this.updateLinkSource(finalLinks[i], parseInt(this.getLinkSource(finalLinks[i])) + this.totalRepOffset(reps, repUnitRead + 1));
	                        finalLinks[i] = this.updateLinkTarget(finalLinks[i], parseInt(this.getLinkTarget(finalLinks[i])) + this.totalRepOffset(reps, repUnitRead + 1));
	                        repInfo[parseInt(this.getLinkSource(finalLinks[i]))] = repeatingUnitsObjects[repUnitRead];
	                        flagInRep = false;
	                        repUnitRead++;
	                    }
	            }
	
	            return [finalRes, finalLinks, repInfo];
	        }
	    }, {
	        key: 'getLinkSource',
	        value: function getLinkSource(link) {
	            return link.split("o")[0].split(":")[1];
	        }
	    }, {
	        key: 'getLinkTarget',
	        value: function getLinkTarget(link) {
	            return link.split(")")[1].split("d")[0];
	        }
	    }, {
	        key: 'updateLinkTarget',
	        value: function updateLinkTarget(link, target) {
	            var output = link.split(")")[0] + ")" + target + "d";
	            return output;
	        }
	    }, {
	        key: 'updateLinkSource',
	        value: function updateLinkSource(link, source) {
	            var output = link.split(":")[0] + ":" + source + "o" + link.split("o")[1];
	            return output;
	        }
	    }, {
	        key: 'isTargetARep',
	        value: function isTargetARep(link, repUnitIndices) {
	            var target = link.split(")")[1].split("d")[0];
	            if (repUnitIndices[target]) return true;
	            return false;
	        }
	    }, {
	        key: 'isSourceARep',
	        value: function isSourceARep(link, repUnitIndices) {
	            var source = link.split("o")[0].split(":")[1];
	            if (repUnitIndices[source]) return true;
	            return false;
	        }
	    }, {
	        key: 'totalRepOffset',
	        value: function totalRepOffset(reps, repUnitRead) {
	            if (repUnitRead == 0) {
	                return 0;
	            }
	            var total = 0;
	            for (var i = 0; i < repUnitRead; i++) {
	                total += reps[i].lin.length;
	            }
	            return total;
	        }
	    }, {
	        key: 'generateNodes',
	        value: function generateNodes(links, nodesIds, res, repInfo) {
	            var repeatingUnit;
	            var residueListById = [""]; // "" is for the offset so that node number 1 is at index 1
	            var _iteratorNormalCompletion13 = true;
	            var _didIteratorError13 = false;
	            var _iteratorError13 = undefined;
	
	            try {
	                for (var _iterator13 = res[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
	                    var residue = _step13.value;
	
	                    residueListById.push(residue.split(":"));
	                }
	            } catch (err) {
	                _didIteratorError13 = true;
	                _iteratorError13 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion13 && _iterator13.return) {
	                        _iterator13.return();
	                    }
	                } finally {
	                    if (_didIteratorError13) {
	                        throw _iteratorError13;
	                    }
	                }
	            }
	
	            for (var linkId in links) {
	                if (links[linkId] !== "") {
	                    var link = links[linkId];
	                    var sourceId = parseInt(link.split(":")[1].split("(")[0]);
	                    var nodeId;
	                    if (residueListById[sourceId] !== "") // Root
	                        {
	                            repeatingUnit = undefined;
	                            if (repInfo.hasOwnProperty(sourceId)) {
	                                repeatingUnit = repInfo[sourceId];
	                            }
	                            nodeId = this.createResidue(residueListById[sourceId], "r", "r", repeatingUnit);
	                            residueListById[sourceId] = "";
	                            nodesIds[sourceId] = nodeId;
	                        }
	                    var targetId = parseInt(link.split(")")[1]);
	                    var linkages = link.split(/[\(\)]+/)[1];
	                    var linkedCarbon, anomerCarbon;
	                    linkedCarbon = linkages.split("+")[0] === "-1" ? "?" : linkages.split("+")[0];
	                    anomerCarbon = linkages.split("+")[1] === "-1" ? "?" : linkages.split("+")[1];
	                    var _iteratorNormalCompletion14 = true;
	                    var _didIteratorError14 = false;
	                    var _iteratorError14 = undefined;
	
	                    try {
	                        for (var _iterator14 = this.sugar.graph.nodes()[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
	                            var node = _step14.value;
	                            // clickedNode = sourceNode
	                            if (node.id === nodesIds[sourceId]) {
	                                this.clickedNode = node;
	                            }
	                        }
	                    } catch (err) {
	                        _didIteratorError14 = true;
	                        _iteratorError14 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion14 && _iterator14.return) {
	                                _iterator14.return();
	                            }
	                        } finally {
	                            if (_didIteratorError14) {
	                                throw _iteratorError14;
	                            }
	                        }
	                    }
	
	                    repeatingUnit = undefined;
	                    if (repInfo.hasOwnProperty(targetId)) {
	                        repeatingUnit = repInfo[targetId];
	                    }
	                    nodeId = this.createResidue(residueListById[targetId], linkedCarbon, anomerCarbon, repeatingUnit);
	                    residueListById[targetId] = "";
	                    nodesIds[targetId] = nodeId;
	                }
	            }
	        }
	    }, {
	        key: 'findNodeById',
	        value: function findNodeById(id) {
	            var _iteratorNormalCompletion15 = true;
	            var _didIteratorError15 = false;
	            var _iteratorError15 = undefined;
	
	            try {
	                for (var _iterator15 = this.sugar.graph.nodes()[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
	                    var node = _step15.value;
	
	                    if (node.id == id) {
	                        return node;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError15 = true;
	                _iteratorError15 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion15 && _iterator15.return) {
	                        _iterator15.return();
	                    }
	                } finally {
	                    if (_didIteratorError15) {
	                        throw _iteratorError15;
	                    }
	                }
	            }
	
	            return undefined;
	        }
	    }, {
	        key: 'getSection',
	        value: function getSection(section, formula) {
	            var sections = ["RES", "LIN", "REP", "UND", "ALT"];
	            sections.splice(sections.indexOf(section), 1);
	            if (section === "REP") {
	                sections.splice(0, 2); // Remove RES and LIN because in REP we want to keep them
	            }
	            var formulaArray;
	            if (!(formula instanceof Array)) {
	                formulaArray = formula.split("\n");
	            } else {
	                formulaArray = formula;
	            }
	            var output = [];
	            var flag = false;
	            var _iteratorNormalCompletion16 = true;
	            var _didIteratorError16 = false;
	            var _iteratorError16 = undefined;
	
	            try {
	                for (var _iterator16 = formulaArray[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
	                    var line = _step16.value;
	
	                    if (flag && sections.includes(line)) // If other section encountered
	                        {
	                            return output;
	                        }
	                    if (line === section) // If the right section is encountered...
	                        {
	                            if (flag) // Second section word encountered
	                                {
	                                    return output;
	                                } else // .. Only once
	                                {
	                                    flag = true;
	                                }
	                        } else {
	                        if (flag) {
	                            output.push(line);
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError16 = true;
	                _iteratorError16 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion16 && _iterator16.return) {
	                        _iterator16.return();
	                    }
	                } finally {
	                    if (_didIteratorError16) {
	                        throw _iteratorError16;
	                    }
	                }
	            }
	
	            return output;
	        }
	    }, {
	        key: 'getRepeatingUnit',
	        value: function getRepeatingUnit(array) {
	            var info;
	            var output = [],
	                value = [],
	                key = "";
	            var _iteratorNormalCompletion17 = true;
	            var _didIteratorError17 = false;
	            var _iteratorError17 = undefined;
	
	            try {
	                for (var _iterator17 = array[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
	                    var line = _step17.value;
	
	                    var split = line.split(/REP\d+:/);
	                    if (split[1]) {
	                        if (value.length != 0 && key !== "") {
	                            info = { "linkedCarbon": key.split("(")[1].split("+")[0], "anomerCarbon": key.split(")")[0].split("+")[1],
	                                "min": key.split("=")[1].split("-")[0], "max": key.split("=")[1].split("-")[1] };
	                            output.push({ "info": info, "res": this.getSection("RES", value), "lin": this.getSection("LIN", value) });
	                        }
	                        value = [];
	                        key = split[1];
	                    } else {
	                        value.push(line);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError17 = true;
	                _iteratorError17 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion17 && _iterator17.return) {
	                        _iterator17.return();
	                    }
	                } finally {
	                    if (_didIteratorError17) {
	                        throw _iteratorError17;
	                    }
	                }
	            }
	
	            if (value.length !== 0) {
	                info = { "linkedCarbon": key.split("(")[1].split("+")[0], "anomerCarbon": key.split(")")[0].split("+")[1],
	                    "min": key.split("=")[1].split("-")[0], "max": key.split("=")[1].split("-")[1] };
	                output.push({ "info": info, "res": this.getSection("RES", value), "lin": this.getSection("LIN", value) });
	            }
	            return output;
	        }
	    }]);
	
	    return GlycoCTParser;
	}();
	
	exports.default = GlycoCTParser;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Renaud on 05/07/2017.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _Substituent = __webpack_require__(20);
	
	var _Substituent2 = _interopRequireDefault(_Substituent);
	
	var _SubstituentType = __webpack_require__(11);
	
	var _SubstituentType2 = _interopRequireDefault(_SubstituentType);
	
	var _GlycosidicLinkage = __webpack_require__(17);
	
	var _GlycosidicLinkage2 = _interopRequireDefault(_GlycosidicLinkage);
	
	var _SubstituentsGlycoCT = __webpack_require__(12);
	
	var _SubstituentsGlycoCT2 = _interopRequireDefault(_SubstituentsGlycoCT);
	
	var _MonosaccharideType = __webpack_require__(9);
	
	var _MonosaccharideType2 = _interopRequireDefault(_MonosaccharideType);
	
	var _EdgeComparator = __webpack_require__(25);
	
	var _EdgeComparator2 = _interopRequireDefault(_EdgeComparator);
	
	var _RepeatingUnit = __webpack_require__(22);
	
	var _RepeatingUnit2 = _interopRequireDefault(_RepeatingUnit);
	
	var _MonosaccharideGlycoCT = __webpack_require__(14);
	
	var _MonosaccharideGlycoCT2 = _interopRequireDefault(_MonosaccharideGlycoCT);
	
	var _SubstituentLinkage = __webpack_require__(18);
	
	var _SubstituentLinkage2 = _interopRequireDefault(_SubstituentLinkage);
	
	var _SubstituentsPositions = __webpack_require__(13);
	
	var _SubstituentsPositions2 = _interopRequireDefault(_SubstituentsPositions);
	
	var _LinkedCarbon = __webpack_require__(8);
	
	var _LinkedCarbon2 = _interopRequireDefault(_LinkedCarbon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GlycoCTWriter = function () {
	    function GlycoCTWriter(sugar, tree) {
	        _classCallCheck(this, GlycoCTWriter);
	
	        this.sugar = sugar;
	        this.tree = tree;
	        this.res = [];
	        this.rep = [];
	        this.edges = [];
	    }
	
	    _createClass(GlycoCTWriter, [{
	        key: "randomString",
	        value: function randomString(length) {
	            // Possible chars in the generated string
	            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');
	
	            if (!length) {
	                // If no length specified, get a random length
	                length = Math.floor(Math.random() * chars.length);
	            }
	
	            var str = '';
	            for (var i = 0; i < length; i++) {
	                // Add random chars till length is the one specified
	                str += chars[Math.floor(Math.random() * chars.length)];
	            }
	            return str;
	        }
	    }, {
	        key: "getSub",
	        value: function getSub(label) {
	            if (label === "Gc") {
	                return _SubstituentType2.default.NGlycolyl;
	            }
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = _SubstituentType2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var sub = _step.value;
	
	                    if (sub.label.toLowerCase() === label.toLowerCase()) return sub;
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: "getMono",
	        value: function getMono(name) {
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;
	
	            try {
	                for (var _iterator2 = _MonosaccharideType2.default[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var mono = _step2.value;
	
	                    if (mono.name.toLowerCase() === name.toLowerCase()) return mono;
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	        }
	    }, {
	        key: "writeSub",
	        value: function writeSub(i, substituent) {
	            var formula = "";
	            formula += i + 1 + "s:";
	            var subName = substituent.substituentType.name;
	            var substituentType = "";
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;
	
	            try {
	                for (var _iterator3 = _SubstituentsGlycoCT2.default[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var sub = _step3.value;
	
	                    if (subName.toLowerCase() === sub.name.toLowerCase()) {
	                        substituentType = sub.glycoct;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }
	
	            if (substituentType === "") {
	                var _iteratorNormalCompletion4 = true;
	                var _didIteratorError4 = false;
	                var _iteratorError4 = undefined;
	
	                try {
	                    for (var _iterator4 = _SubstituentType2.default[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                        sub = _step4.value;
	
	                        if (subName.toLowerCase() === sub.name.toLowerCase()) {
	                            substituentType = sub.name.toLowerCase();
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError4 = true;
	                    _iteratorError4 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                            _iterator4.return();
	                        }
	                    } finally {
	                        if (_didIteratorError4) {
	                            throw _iteratorError4;
	                        }
	                    }
	                }
	            }
	            formula += substituentType + "\n";
	            return formula;
	        }
	    }, {
	        key: "writeSubLink",
	        value: function writeSubLink(i, source, target, linkedCarbon, anomerCarbon) {
	            var formula = "";
	            formula += i + 1 + ":" + source + "d";
	
	            formula += "(" + linkedCarbon;
	            formula += "+";
	            formula += anomerCarbon + ")";
	
	            formula += target + "n";
	
	            formula += "\n";
	
	            return formula;
	        }
	    }, {
	        key: "writeMonoLink",
	        value: function writeMonoLink(i, source, target, linkedCarbon, anomerCarbon) {
	            var formula = "";
	            formula += i + ":" + source + "o";
	
	            formula += "(" + linkedCarbon;
	            formula += "+";
	            formula += anomerCarbon + ")";
	
	            formula += target + "d";
	
	            formula += "\n";
	
	            return formula;
	        }
	    }, {
	        key: "comparatorFunction",
	        value: function comparatorFunction(a, b) {
	            if (b === undefined) {
	                return -1;
	            }
	            var comp = new _EdgeComparator2.default();
	            var edge1 = this.getLink(a.parent.node.id, a.node.id);
	            var edge2 = this.getLink(b.parent.node.id, b.node.id);
	            return comp.compare(edge1, edge2);
	        }
	    }, {
	        key: "sort",
	        value: function sort(arr) {
	
	            var arr2 = Object.assign({}, arr);
	            var len = arr.length;
	
	            for (var i = 0; i < len; i++) {
	                while (i > -1) {
	                    if (this.comparatorFunction(arr[i], arr[i + 1]) > 0) {
	                        var temp = arr[i];
	                        arr[i] = arr[i + 1];
	                        arr[i + 1] = temp;
	                        i--;
	                    } else {
	                        break;
	                    }
	                }
	            }
	            return arr;
	        }
	    }, {
	        key: "getLink",
	        value: function getLink(id1, id2) {
	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;
	
	            try {
	                for (var _iterator5 = this.sugar.graph.edges()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var edge = _step5.value;
	
	                    if (edge.source == id1 && edge.target == id2 || edge.source == id2 && edge.target == id1) {
	                        return edge;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }
	        }
	    }, {
	        key: "generateArrays",
	        value: function generateArrays(root) {
	            var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
	
	            this.res = [];
	            this.edges = [];
	            if (root === undefined) {
	                this.res = [];
	                this.edges = [];
	                this.rep = [];
	                return;
	            }
	            var stack = [];
	            stack.push(root);
	            if (root.node !== undefined) {
	                while (stack.length > 0) {
	                    var node = stack.pop();
	                    var nodeUnit = node.node.repeatingUnit;
	                    if (unit === "" && nodeUnit === undefined || unit !== "" && nodeUnit !== undefined && nodeUnit.id === unit) {
	                        this.res.push(node);
	                        if (this.res.length > 1) // if we have at least 2 nodes : add link
	                            {
	                                this.edges.push(this.getLink(node.parent.node.id, node.node.id));
	                            }
	                    } else {
	                        if (unit === "") {
	                            if (node.parent !== undefined && node.parent.node.repeatingUnit !== nodeUnit) // If child is the first of the repeating unit
	                                {
	                                    this.edges.push(this.getLink(node.parent.node.id, node.node.id));
	                                } else if (nodeUnit !== undefined) {
	                                if (node.children !== undefined) {
	                                    var _iteratorNormalCompletion6 = true;
	                                    var _didIteratorError6 = false;
	                                    var _iteratorError6 = undefined;
	
	                                    try {
	                                        for (var _iterator6 = node.children[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	                                            var rootChild = _step6.value;
	
	                                            if (rootChild.node.repeatingUnit !== nodeUnit) {
	                                                this.edges.push(this.getLink(rootChild.node.id, node.node.id));
	                                            }
	                                        }
	                                    } catch (err) {
	                                        _didIteratorError6 = true;
	                                        _iteratorError6 = err;
	                                    } finally {
	                                        try {
	                                            if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                                                _iterator6.return();
	                                            }
	                                        } finally {
	                                            if (_didIteratorError6) {
	                                                throw _iteratorError6;
	                                            }
	                                        }
	                                    }
	                                }
	                            }
	                            if (!this.res.includes(nodeUnit)) {
	                                this.res.push(nodeUnit);
	                            }
	                        }
	                    }
	
	                    var children = node.children;
	                    if (children !== undefined) {
	                        if (children.length > 1) {
	                            children = this.sort(children);
	                        }
	                        var _iteratorNormalCompletion7 = true;
	                        var _didIteratorError7 = false;
	                        var _iteratorError7 = undefined;
	
	                        try {
	                            for (var _iterator7 = children[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	                                var child = _step7.value;
	
	                                stack.push(child);
	                            }
	                        } catch (err) {
	                            _didIteratorError7 = true;
	                            _iteratorError7 = err;
	                        } finally {
	                            try {
	                                if (!_iteratorNormalCompletion7 && _iterator7.return) {
	                                    _iterator7.return();
	                                }
	                            } finally {
	                                if (_didIteratorError7) {
	                                    throw _iteratorError7;
	                                }
	                            }
	                        }
	                    }
	                }
	            } else {
	                this.res = [];
	            }
	        }
	    }, {
	        key: "generateRES",
	        value: function generateRES(resId, repId, res, associatedSubs, repNumber) {
	            var offset = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
	            // Offset: if we have some Repeating Units, we generate the RES section within the REP
	            // with this function, but the offset will create a continuity with the previous indexes
	            var formula = "RES\n";
	            var i;
	            for (i = 0; i < res.length; i++) {
	                if (res[i] instanceof _RepeatingUnit2.default) {
	                    formula += i + 1 + offset + "r:r" + repNumber;
	                    resId[res[i].id] = i + 1 + offset;
	                    repId[res[i].id] = repNumber;
	                    repNumber++;
	                    formula += "\n";
	                } else if (res[i].node instanceof _Substituent2.default) {
	                    formula += this.writeSub(i + offset, res[i].node);
	                    resId[res[i].node.id] = i + 1 + offset;
	                } else {
	                    resId[res[i].node.id] = i + 1 + offset;
	                    formula += i + 1 + offset + "b:";
	                    switch (res[i].node._anomericity.name) {
	                        case "ALPHA":
	                            formula += "a";
	                            break;
	                        case "BETA":
	                            formula += "b";
	                            break;
	                        default:
	                            formula += "x";
	                            break;
	                    }
	                    formula += "-";
	
	                    var resName = res[i].node._monosaccharideType.name;
	
	                    // Nonulosonates exceptions:
	                    switch (resName) {
	                        case "Neu5Ac":
	                            resName = "KdnNAc";
	                            break;
	                        case "Neu5Gc":
	                            resName = "KdnGc";
	                            break;
	                        case "Neu":
	                            resName = "KdnN";
	                            break;
	                        case "MurNGc":
	                            resName = "MurGc";
	                            break;
	                    }
	
	                    var transform;
	
	                    var isoExceptions = ["Hex", "dHex", "HexA", "HexN", "ddHex", "HexNAc", "dHexNAc", "Pen", "Oli", "Abe", "Col", "Nonu", "LDManHep", "DDManHep"];
	
	                    if (!isoExceptions.includes(resName)) // Exceptions
	                        {
	                            switch (res[i].node._isomer.name) {
	                                case "L":
	                                    formula += "l";
	                                    break;
	                                case "D":
	                                    formula += "d";
	                                    break;
	                                default:
	                                    formula += "x";
	                                    break;
	                            }
	                        }
	
	                    if (_MonosaccharideGlycoCT2.default[resName] !== undefined) // if the residue has a defined name
	                        {
	                            formula += _MonosaccharideGlycoCT2.default[resName].glycoct;
	                            transform = _MonosaccharideGlycoCT2.default[resName].transform;
	                        } else {
	                        var monoName, subName, assocSubType, assocSub, linkedCarbon;
	                        if (_MonosaccharideGlycoCT2.default[resName.substring(0, 3)] !== undefined) // If the 3 first letters make a monosaccharide
	                            {
	                                monoName = resName.substring(0, 3);
	                                subName = resName.substring(3);
	                                formula += _MonosaccharideGlycoCT2.default[monoName].glycoct;
	                                transform = _MonosaccharideGlycoCT2.default[monoName].transform;
	                                assocSubType = this.getSub(subName);
	                                assocSub = new _Substituent2.default(this.randomString(7), assocSubType);
	                                if (_SubstituentsPositions2.default[resName] !== undefined) // Should always be defined
	                                    {
	                                        linkedCarbon = _SubstituentsPositions2.default[resName].position;
	                                    }
	                                associatedSubs.push([assocSub, i + 1 + offset, linkedCarbon]);
	                            } else if (_MonosaccharideGlycoCT2.default[resName.substring(0, 4)] !== undefined) // If the 4 first letters make a monosaccharide. e.g Nonu
	                            {
	                                monoName = resName.substring(0, 4);
	                                subName = resName.substring(4);
	                                formula += _MonosaccharideGlycoCT2.default[monoName].glycoct;
	                                transform = _MonosaccharideGlycoCT2.default[monoName].transform;
	                                assocSubType = this.getSub(subName);
	                                assocSub = new _Substituent2.default(this.randomString(7), assocSubType);
	                                if (_SubstituentsPositions2.default[resName] !== undefined) // Should always be defined
	                                    {
	                                        linkedCarbon = _SubstituentsPositions2.default[resName].position;
	                                    }
	                                associatedSubs.push([assocSub, i + 1 + offset, linkedCarbon]);
	                            }
	                    }
	
	                    var ringExceptions = ["Kdn", "KdnNAc", "KdnGc", "KdnN", "Kdo", "Fru"];
	                    if (!ringExceptions.includes(resName)) // Ring exceptions
	                        {
	                            formula += "-";
	                            switch (res[i].node._ringType.name) {
	                                case "P":
	                                    formula += "1:5";
	                                    break;
	                                case "F":
	                                    formula += "1:4";
	                                    break;
	                                default:
	                                    formula += "x:x";
	                                    break;
	                            }
	                        }
	
	                    formula += transform;
	
	                    formula += "\n";
	                }
	            }
	            var _iteratorNormalCompletion8 = true;
	            var _didIteratorError8 = false;
	            var _iteratorError8 = undefined;
	
	            try {
	                for (var _iterator8 = associatedSubs[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	                    var pair = _step8.value;
	
	                    var associatedSub = pair[0];
	                    formula += this.writeSub(i + offset, associatedSub);
	                    i++;
	                    pair[0] = i;
	                }
	            } catch (err) {
	                _didIteratorError8 = true;
	                _iteratorError8 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
	                        _iterator8.return();
	                    }
	                } finally {
	                    if (_didIteratorError8) {
	                        throw _iteratorError8;
	                    }
	                }
	            }
	
	            return [i + offset, formula];
	        }
	    }, {
	        key: "generateLIN",
	        value: function generateLIN(resId, associatedSubs) {
	            var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	            var unit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
	
	            var formula = "";
	            var i;
	            if (this.res.length + associatedSubs.length > 1) {
	                formula += "LIN\n";
	                var edges = this.edges;
	                var prevSource = 0,
	                    prevTarget = 0;
	                for (i = 0; i < edges.length; i++) {
	                    var source = edges[i].sourceNode.repeatingUnit === undefined || unit !== "" ? resId[edges[i].sourceNode.getId()] : resId[edges[i].sourceNode.repeatingUnit.id];
	                    var linkedCarbon = edges[i].linkedCarbon.value === "undefined" ? -1 : edges[i].linkedCarbon.value;
	                    var anomerCarbon;
	                    if (edges[i] instanceof _SubstituentLinkage2.default) anomerCarbon = 1;else if (edges[i].anomerCarbon.value === "undefined") anomerCarbon = 1;else anomerCarbon = edges[i].anomerCarbon.value;
	
	                    var target = edges[i].targetNode.repeatingUnit === undefined || unit !== "" ? resId[edges[i].targetNode.getId()] : resId[edges[i].targetNode.repeatingUnit.id];
	
	                    if (prevSource !== source || prevTarget !== target) // When operating with repeating units, some links are duplicated
	                        {
	                            prevSource = source;
	                            prevTarget = target;
	
	                            if (edges[i] instanceof _GlycosidicLinkage2.default) {
	                                formula += this.writeMonoLink(i + 1 + offset, source, target, linkedCarbon, anomerCarbon);
	                            } else {
	                                formula += this.writeSubLink(i + offset, source, target, linkedCarbon, anomerCarbon);
	                            }
	                        }
	                }
	
	                var _iteratorNormalCompletion9 = true;
	                var _didIteratorError9 = false;
	                var _iteratorError9 = undefined;
	
	                try {
	                    for (var _iterator9 = associatedSubs[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	                        var pair = _step9.value;
	
	                        formula += this.writeSubLink(i + offset, pair[1], pair[0] + offset, pair[2], 1);
	                        i++;
	                    }
	                } catch (err) {
	                    _didIteratorError9 = true;
	                    _iteratorError9 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion9 && _iterator9.return) {
	                            _iterator9.return();
	                        }
	                    } finally {
	                        if (_didIteratorError9) {
	                            throw _iteratorError9;
	                        }
	                    }
	                }
	            }
	            return [i + offset, formula];
	        }
	    }, {
	        key: "exportGlycoCT",
	        value: function exportGlycoCT() {
	            var resId = {};
	            var repId = {};
	            this.generateArrays(this.tree);
	            var res = this.res;
	            var associatedSubs = [];
	            if (res.length === 0) {
	                return "";
	            }
	            var repNumber = 1;
	
	            // RES
	            var resInfo = this.generateRES(resId, repId, res, associatedSubs, repNumber);
	            var formula = resInfo[1];
	            var lastResId = resInfo[0];
	
	            // LIN
	            var linInfo = this.generateLIN(resId, associatedSubs);
	            formula += linInfo[1];
	            var lastLinId = resInfo[0];
	
	            // REP
	
	            var _iteratorNormalCompletion10 = true;
	            var _didIteratorError10 = false;
	            var _iteratorError10 = undefined;
	
	            try {
	                for (var _iterator10 = this.res[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
	                    var residue = _step10.value;
	
	                    if (residue instanceof _RepeatingUnit2.default) {
	                        this.rep.push(residue);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError10 = true;
	                _iteratorError10 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion10 && _iterator10.return) {
	                        _iterator10.return();
	                    }
	                } finally {
	                    if (_didIteratorError10) {
	                        throw _iteratorError10;
	                    }
	                }
	            }
	
	            if (this.rep.length !== 0) {
	                formula += "REP\n";
	                var _iteratorNormalCompletion11 = true;
	                var _didIteratorError11 = false;
	                var _iteratorError11 = undefined;
	
	                try {
	                    for (var _iterator11 = this.rep[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
	                        var rep = _step11.value;
	
	                        this.generateArrays(this.findRepMinDepth(rep), rep.id);
	                        var entryId = lastResId + 1;
	                        associatedSubs = [];
	                        resInfo = this.generateRES(resId, repId, this.res, associatedSubs, repNumber, lastResId);
	                        lastResId = resInfo[0];
	                        var exitId = lastResId;
	                        formula += "REP" + repId[rep.id] + ":" + exitId + "o(";
	                        formula += rep.linkedCarbon === _LinkedCarbon2.default.UNDEFINED ? "-1" : rep.linkedCarbon;
	                        formula += "+";
	                        formula += rep.anomerCarbon === _LinkedCarbon2.default.UNDEFINED ? "-1" : rep.anomerCarbon;
	                        formula += ")" + entryId + "d=" + rep.min + "-" + rep.max + "\n";
	                        formula += resInfo[1];
	                        linInfo = this.generateLIN(resId, associatedSubs, lastLinId, rep.id);
	                        lastLinId = linInfo[0];
	                        formula += linInfo[1];
	                    }
	                } catch (err) {
	                    _didIteratorError11 = true;
	                    _iteratorError11 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion11 && _iterator11.return) {
	                            _iterator11.return();
	                        }
	                    } finally {
	                        if (_didIteratorError11) {
	                            throw _iteratorError11;
	                        }
	                    }
	                }
	            }
	
	            if (formula.substring(formula.length - 1) == '\n') // Remove final \n
	                {
	                    formula = formula.substring(0, formula.length - 1);
	                }
	
	            return formula;
	        }
	    }, {
	        key: "findRepMinDepth",
	        value: function findRepMinDepth(rep) {
	            var minVal = rep.nodes[0].depth;
	            var minNode = rep.nodes[0];
	            var _iteratorNormalCompletion12 = true;
	            var _didIteratorError12 = false;
	            var _iteratorError12 = undefined;
	
	            try {
	                for (var _iterator12 = rep.nodes[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
	                    var node = _step12.value;
	
	                    if (node.depth < minVal) {
	                        minVal = node.depth;
	                        minNode = node;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError12 = true;
	                _iteratorError12 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion12 && _iterator12.return) {
	                        _iterator12.return();
	                    }
	                } finally {
	                    if (_didIteratorError12) {
	                        throw _iteratorError12;
	                    }
	                }
	            }
	
	            return minNode;
	        }
	    }]);
	
	    return GlycoCTWriter;
	}();
	
	exports.default = GlycoCTWriter;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Renaud on 11/07/2017.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	/**
	 * Created by Renaud on 10/07/2017.
	 */
	
	var _NodeComparator = __webpack_require__(26);
	
	var _NodeComparator2 = _interopRequireDefault(_NodeComparator);
	
	var _GlycosidicLinkage = __webpack_require__(17);
	
	var _GlycosidicLinkage2 = _interopRequireDefault(_GlycosidicLinkage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EdgeComparator = function () {
	    function EdgeComparator() {
	        _classCallCheck(this, EdgeComparator);
	    }
	
	    _createClass(EdgeComparator, [{
	        key: "compare",
	        value: function compare(e1, e2) {
	            var bondsE1 = this.bonds(e1);
	            var bondsE2 = this.bonds(e2);
	            if (bondsE1 > bondsE2) {
	                return 1;
	            } else if (bondsE1 === bondsE2) {
	                var parentLinkPosE1 = this.parentLinkPos(e1);
	                var parentLinkPosE2 = this.parentLinkPos(e2);
	                if (parentLinkPosE1 > parentLinkPosE2) {
	                    return 1;
	                } else if (parentLinkPosE1 === parentLinkPosE2) {
	                    var childLinkPosE1 = this.childLinkPos(e1);
	                    var childLinkPosE2 = this.childLinkPos(e2);
	                    if (childLinkPosE1 > childLinkPosE2) {
	                        return 1;
	                    } else if (childLinkPosE1 === childLinkPosE2) {
	                        var linkageTypeE1 = this.linkageType(e1);
	                        var linkageTypeE2 = this.linkageType(e2);
	                        if (linkageTypeE1 > linkageTypeE2) {
	                            return 1;
	                        } else if (linkageTypeE1 === linkageTypeE2) {
	                            return this.compareNodes(e1, e2);
	                        }
	                    }
	                }
	            }
	
	            return -1;
	        }
	    }, {
	        key: "parentLinkPos",
	        value: function parentLinkPos(edge) {
	            return edge.linkedCarbon.value === "undefined" ? 0 : edge.linkedCarbon.value;
	        }
	    }, {
	        key: "bonds",
	        value: function bonds(edge) {
	            return 1; // always 1 bond in our application
	        }
	    }, {
	        key: "childLinkPos",
	        value: function childLinkPos(edge) {
	            return edge.anomerCarbon.value === "undefined" ? 0 : edge.anomerCarbon.value;
	        }
	    }, {
	        key: "linkageType",
	        value: function linkageType(edge) {
	            if (edge instanceof _GlycosidicLinkage2.default) {
	                return 1;
	            } else {
	                return 0;
	            }
	        }
	    }, {
	        key: "compareNodes",
	        value: function compareNodes(edge1, edge2) {
	            var comp = new _NodeComparator2.default();
	            return comp.compare(edge1.targetNode, edge2.targetNode);
	        }
	    }]);
	
	    return EdgeComparator;
	}();
	
	exports.default = EdgeComparator;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Renaud on 10/07/2017.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _EdgeComparator = __webpack_require__(25);
	
	var _EdgeComparator2 = _interopRequireDefault(_EdgeComparator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var NodeComparator = function () {
	    function NodeComparator() {
	        _classCallCheck(this, NodeComparator);
	    }
	
	    _createClass(NodeComparator, [{
	        key: "compare",
	        value: function compare(n1, n2) {
	            var childrenN1 = this.children(n1);
	            var childrenN2 = this.children(n2);
	            if (childrenN1 > childrenN2) {
	                return 1;
	            } else if (childrenN1 === childrenN2) {
	                var longestN1 = this.longestBranch(n1) - n1.depth;
	                var longestN2 = this.longestBranch(n2) - n2.depth;
	                if (longestN1 > longestN2) {
	                    return 1;
	                } else if (longestN1 === longestN2) {
	                    var terminalsN1 = this.terminals(n1);
	                    var terminalsN2 = this.terminals(n2);
	                    if (terminalsN1 > terminalsN2) {
	                        return 1;
	                    } else if (terminalsN1 === terminalsN2) {
	                        var branchingN1 = this.branching(n1);
	                        var branchingN2 = this.branching(n2);
	                        if (branchingN1 > branchingN2) {
	                            return 1;
	                        } else if (branchingN1 === branchingN2) {
	                            if (n1.node.monosaccharideType.name >= n2.node.monosaccharideType.name) {
	                                return 1;
	                            }
	                        }
	                    }
	                }
	            }
	
	            return -1;
	        }
	    }, {
	        key: "longestBranch",
	        value: function longestBranch(node) {
	            if (node.children === undefined) {
	                return node.depth;
	            }
	            var depths = [];
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = node.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var child = _step.value;
	
	                    depths.push(this.longestBranch(child));
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;
	
	            try {
	                for (var _iterator2 = depths[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var depth = _step2.value;
	
	                    if (node.depth > depth) {
	                        return node.depth;
	                    } else {
	                        return Math.max.apply(null, depths);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	        }
	    }, {
	        key: "children",
	        value: function children(node) {
	            if (node.children === undefined) {
	                return 1;
	            }
	            var nodes = [];
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;
	
	            try {
	                for (var _iterator3 = node.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var child = _step3.value;
	
	                    nodes.push(this.children(child));
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }
	
	            return nodes.reduce(function (a, b) {
	                return a + b;
	            }, 0) + 1;
	        }
	    }, {
	        key: "terminals",
	        value: function terminals(node) {
	            if (node.children === undefined) {
	                return 1;
	            }
	            var nodes = [];
	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;
	
	            try {
	                for (var _iterator4 = node.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var child = _step4.value;
	
	                    nodes.push(this.terminals(child));
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }
	
	            return nodes.reduce(function (a, b) {
	                return a + b;
	            }, 0);
	        }
	    }, {
	        key: "branching",
	        value: function branching(node) {
	            if (node.children === undefined) {
	                return 0;
	            }
	            var branches = [];
	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;
	
	            try {
	                for (var _iterator5 = node.children[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var child = _step5.value;
	
	                    branches.push(this.branching(child));
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }
	
	            return node.children.length > 1 ? branches.reduce(function (a, b) {
	                return a + b;
	            }, 0) + 1 : branches.reduce(function (a, b) {
	                return a + b;
	            }, 0);
	        }
	    }]);
	
	    return NodeComparator;
	}();
	
	exports.default = NodeComparator;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Created by Renaud on 26/07/2017.
	 */
	
	var Controller = function Controller() {
	    _classCallCheck(this, Controller);
	};
	
	exports.default = Controller;

/***/ })
/******/ ])
});
;
//# sourceMappingURL=sb.js.map