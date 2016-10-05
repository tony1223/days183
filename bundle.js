/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, ReactDOM, $) {__webpack_require__(5);
	__webpack_require__(9);

	var Inputs = __webpack_require__(10);
	var Records = __webpack_require__(13);
	var serializer = __webpack_require__(16)


	console.clear();



	/*
	 █████  ██████  ██████
	██   ██ ██   ██ ██   ██
	███████ ██████  ██████
	██   ██ ██      ██
	██   ██ ██      ██
	*/
	var App = React.createClass({displayName: "App",
		getInitialState: function() {
			return {
				records:[],
				hash:''
			};
		},





		/*
		██████  ███████  ██████  ██████  ██████  ██████  ███████
		██   ██ ██      ██      ██    ██ ██   ██ ██   ██ ██
		██████  █████   ██      ██    ██ ██████  ██   ██ ███████
		██   ██ ██      ██      ██    ██ ██   ██ ██   ██      ██
		██   ██ ███████  ██████  ██████  ██   ██ ██████  ███████
		*/
		addRecord:function(r){
			var rr = this.state.records;
			rr.push(r);
			this.setRecords(rr);
		},
		removeRecord:function(idx){
			var rr = this.state.records;
			rr.splice(idx,1)
			this.setRecords(rr)
		},
		toggleRecord:function(idx){
			var rr = this.state.records;
			rr[idx].dep = !rr[idx].dep;
			this.setRecords(rr)
		},


		setRecords:function(rr){
			rr = rr.sort(function(r1,r2){
				return r1.date.getTime()-r2.date.getTime()
			});		
			var hash = serializer.stringify(rr);
			window.location.hash=hash;
			this.setState({
				records: rr,
				hash: hash
			})
		},






		/*
		 ██████ ██████  ███    ███
		██      ██   ██ ████  ████
		██      ██   ██ ██ ████ ██
		██      ██   ██ ██  ██  ██
		 ██████ ██████  ██      ██
		*/
		componentDidMount: function() {
			var hash = window.location.hash.replace(/^#/,'');
			var rr = serializer.parse(hash);
			this.setRecords(rr);
		},

		/*
		██████  ███████ ███    ██ ██████  ███████ ██████
		██   ██ ██      ████   ██ ██   ██ ██      ██   ██
		██████  █████   ██ ██  ██ ██   ██ █████   ██████
		██   ██ ██      ██  ██ ██ ██   ██ ██      ██   ██
		██   ██ ███████ ██   ████ ██████  ███████ ██   ██
		*/
		render:function(){
			var hashURL = window.location.origin+window.location.pathname+'#'+this.state.hash;
			return(
				React.createElement("div", {className: "app"}, 
					React.createElement("h1", null, "1 8 3"), 

					React.createElement(Inputs, {setRecords: this.setRecords, addRecord: this.addRecord}), 
					"日期格式: 1030602", React.createElement("br", null), 


					React.createElement(Records, {
						records: this.state.records, 
						removeRecord: this.removeRecord, 
						toggleRecord: this.toggleRecord}
						), 

					React.createElement("br", null), 

					this.state.hash==''?null:
						React.createElement("div", null, 
							"記錄網址: ", React.createElement("a", {href: hashURL}, hashURL)
						), 
					
					React.createElement("br", null), 
					React.createElement("br", null), 
					React.createElement("div", {className: "tips"}, 
						React.createElement("p", null, 
							"輸入框中", React.createElement("br", null), 
							"按 Q 或 Numpad+ 可切換為 [入境]", React.createElement("br", null), 
							"按 W 或 Numpad- 可切換為 [出境]", React.createElement("br", null), 
							"按 E 或 Numpad/ 可切換[出境]與[入境]", React.createElement("br", null)
						), 
						React.createElement("p", null, 
							"記錄的出入境標記可點擊以切換", React.createElement("br", null), 
							"Ctrl-點擊記錄的移除標記可略過確認框"
						)
					), 
					React.createElement("br", null), 
					React.createElement("a", {href: "https://github.com/scars377/days183", style: {fontSize:'12px'}, target: "_blank"}, 
						"https://github.com/scars377/days183"
					)
				)
			);
		}
	});

	module.exports = App;
	ReactDOM.render(React.createElement(App, null),$('#wrapper')[0])

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3), __webpack_require__(4)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/autoprefixer-loader/index.js?browsers=last 4 versions!./../../node_modules/sass-loader/index.js!./App.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/autoprefixer-loader/index.js?browsers=last 4 versions!./../../node_modules/sass-loader/index.js!./App.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "body {\n  background-color: #333;\n  color: #fff;\n  font-family: \"Consolas\", \"Microsoft JhengHei\"; }\n\n.app {\n  line-height: 30px;\n  text-align: center;\n  padding: 12px 0; }\n\nh1 {\n  font-size: 48px;\n  font-family: 'Arial Black';\n  font-weight: bold;\n  margin-bottom: 48px;\n  -webkit-filter: drop-shadow(2px 2px 1px #000);\n          filter: drop-shadow(2px 2px 1px #000); }\n\na {\n  color: #69f; }\n\n.tips {\n  width: auto;\n  padding: 8px 16px;\n  display: inline-block;\n  background-color: #444;\n  text-align: left;\n  line-height: 14px;\n  font-size: 12px;\n  color: #ccc; }\n", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html";

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, ReactDOM) {__webpack_require__(11);





	var Inputs = React.createClass({displayName: "Inputs",
		getInitialState: function() {
			return {
				dep: false,
				input: '',
				enabled:false,
			};
		},

		getDateFromString: function(s){

			var m=s.match(/^(\d{2,3})(\d{2})(\d{2})$/);
			if(!m) return null;

			var d = new Date((parseInt(m[1],10)+1911)+'-'+m[2]+'-'+m[3])
			if(isNaN(d.getTime())) return null;

			var y = d.getFullYear();
			if(y < 2000 || y > 2063) return null;

			return d
		},

		getDateFromString2: function(s){

			var m=s.match(/^(\d{4})(\d{2})(\d{2})$/);
			if(!m) return null;

			var d = new Date((parseInt(m[1],10))+'/'+m[2]+'/'+m[3])
			if(isNaN(d.getTime())) return null;

			var y = d.getFullYear();
			if(y < 2000 || y > 2063) return null;

			return d
		},


		setDep:function(dep){
			return function(){
				this.setState({dep:dep})
			}.bind(this)
		},
		inputChange:function(e){
			var s = e.target.value.replace(/\D/g,'').substr(0,7)
			var enabled = this.getDateFromString(s)!=null;
			this.setState({
				input:s,
				enabled:enabled,
			})
		},
		inputDown:function(e){
			switch(e.keyCode){
				case 13://enter
					if(this.state.enabled) this.addRecord()
					break;
				case 81: // Q
				case 109: //-
					this.setState({dep:true});
					break;
				case 87: // W
				case 107: //+
					this.setState({dep:false});
					break;
				case 69:  // E
				case 111:  // /
					this.setState({dep:!this.state.dep})
					break;

				default:
					// console.log(e.keyCode);
			}
		},
		addRecord:function(){
			this.props.addRecord({
				date:this.getDateFromString(this.state.input),
				dep: this.state.dep,
			})
			this.setState({
				input:'',
				enabled:false,
				dep: !this.state.dep
			})
		},
		importFromText:function(){

			var val = React.findDOMNode(this.refs.import).value;

			var lines = val.split("\n");
			var records = [];
			var that = this;


			lines.forEach(function(line){
				if(line){
					var tokens = line.split(/[ \t]+/);

					if(tokens[1] == "出境" || tokens[1] =="入境"){
						var dep = null;

						if(tokens[1] == "出境"){
							dep = true;
						}else if(tokens[1] == "入境"){
							dep = false;
						}

						if(dep != null ){
							records.push({
								date:that.getDateFromString2(tokens[2]),
								dep: dep
							});
							debugger;
						}
					}
					
				}
			});


			this.props.setRecords(records);

			// date:this.getDateFromString(this.state.input),
			// dep: this.state.dep,

			// this.props.setRecords();
		},
		componentDidMount: function() {
			ReactDOM.findDOMNode(this.refs.input).focus();
		},
		render:function(){
			return(
				React.createElement("div", null, 
					React.createElement("h2", null, "移民署格式匯入（承辦作業專用）"), 
					React.createElement("textarea", {ref: "import", onChange: this.importFromText, style: {width:"60%",height:"200px"}}), 

					React.createElement("hr", null), 

					React.createElement("h2", null, "手動輸入"), 
					React.createElement("div", {className: "inputs"}, 

						React.createElement("button", {
							className: 'dep '+( this.state.dep?'active':'deactive'), 
							onClick: this.setDep(true)
							}, 
							"出境"
						), 

						React.createElement("button", {
							className: 'arr '+(!this.state.dep?'active':'deactive'), 
							onClick: this.setDep(false)
							}, 
							"入境"
						), 

						React.createElement("input", {
							type: "text", 
							ref: "input", 
							placeholder: "輸入日期", 
							value: this.state.input, 
							onKeyDown: this.inputDown, 
							onChange: this.inputChange}), 

						React.createElement("button", {
							className: this.state.enabled?'enabled':'disabled', 
							onClick: this.addRecord
							}, 
							"加入"
						)
					), 
					React.createElement("hr", null)
				)
			);
		}
	});

	module.exports = Inputs;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/autoprefixer-loader/index.js?browsers=last 4 versions!./../../node_modules/sass-loader/index.js!./Inputs.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/autoprefixer-loader/index.js?browsers=last 4 versions!./../../node_modules/sass-loader/index.js!./Inputs.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "input[type='text'] {\n  vertical-align: middle;\n  padding: 4px;\n  font-size: 18px;\n  font-family: \"Consolas\", \"Microsoft JhengHei\";\n  margin: 0 12px 0 16px;\n  width: 150px; }\n  @media (max-width: 768px) {\n    input[type='text'] {\n      font-size: 14px;\n      width: 100px; } }\n\nbutton {\n  vertical-align: middle;\n  padding: 7px 16px;\n  font-size: 16px;\n  font-family: \"Consolas\", \"Microsoft JhengHei\";\n  border: none;\n  cursor: pointer;\n  border-radius: 6px; }\n  @media (max-width: 768px) {\n    button {\n      font-size: 12px; } }\n  button.dep {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n    background-color: #f99; }\n  button.arr {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n    background-color: #9f9; }\n  button.deactive {\n    background-color: #666; }\n  button.enabled {\n    background-color: #69c; }\n  button.disabled {\n    pointer-events: none;\n    color: #333;\n    background-color: #666; }\n", ""]);

	// exports


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React) {__webpack_require__(14);


	/*
	 ██████ ██   ██
	██       ██ ██
	██        ███
	██       ██ ██
	 ██████ ██   ██
	*/
	function cx(o) {
		return Object.keys(o).filter(function(k) {
			return o[k]
		}).join(' ');
	}


	/*
	████████  ██████  ██████   █████  ████████ ███████ ███████ ████████ ██████  ██ ███    ██  ██████
	   ██    ██    ██ ██   ██ ██   ██    ██    ██      ██         ██    ██   ██ ██ ████   ██ ██
	   ██    ██    ██ ██   ██ ███████    ██    █████   ███████    ██    ██████  ██ ██ ██  ██ ██   ███
	   ██    ██    ██ ██   ██ ██   ██    ██    ██           ██    ██    ██   ██ ██ ██  ██ ██ ██    ██
	   ██     ██████  ██████  ██   ██    ██    ███████ ███████    ██    ██   ██ ██ ██   ████  ██████
	*/
	function toDateString(d){
		if(!d)return ''

		return (d.getFullYear()-1911)+'-'+
			('0'+(d.getMonth()+1)).substr(-2)+'-'+
			('0'+d.getDate()).substr(-2);
	}




	/*
	 ██████  ███████ ████████ ██████  ███████ ██████  ██████   █████  ██    ██ ███████
	██       ██         ██    ██   ██ ██      ██   ██ ██   ██ ██   ██  ██  ██  ██
	██   ███ █████      ██    ██   ██ █████   ██████  ██   ██ ███████   ████   ███████
	██    ██ ██         ██    ██   ██ ██      ██      ██   ██ ██   ██    ██         ██
	 ██████  ███████    ██    ██████  ███████ ██      ██████  ██   ██    ██    ███████
	*/
	function getDepDays(rt){
		return rt.reduce(function(a,b){
			if(b.dep) return a+b.days;
			else return a;
		},0)
	}


	/*
	 ██████  █████  ██       ██████ ██████  ███████  ██████  ██████  ██████  ██████
	██      ██   ██ ██      ██      ██   ██ ██      ██      ██    ██ ██   ██ ██   ██
	██      ███████ ██      ██      ██████  █████   ██      ██    ██ ██████  ██   ██
	██      ██   ██ ██      ██      ██   ██ ██      ██      ██    ██ ██   ██ ██   ██
	 ██████ ██   ██ ███████  ██████ ██   ██ ███████  ██████  ██████  ██   ██ ██████
	*/
	//直接 modify r
	function calcRecord(r,rt){
		//複製 rt, 不知道有沒有更好的方式
		rt=rt.map(function(r){
			return {dep:r.dep,days:r.days}
		})



		//把區間縮減到最後一筆記錄的一年內
		var days=0;
		for(var i=rt.length-1;i>=0;i--){
			if(days + rt[i].days > 365){
				rt[i].days = 365-days
				rt.splice(0,i)
				break;
			}
			days+=rt[i].days;
		}
		//rt不會短於一年, 因為有在最前插入一整年


		//記錄時點是否符合資格
		r.qualified = getDepDays(rt) < 183;
		r.rt=rt;

		if(r.qualified != r.dep){
			//記錄時已符合資格, 且記錄為入境
			//記錄時不符合資格, 且記錄為出境

			//只要不再出入境，資格維持不變
			r.invertDate = null;
		}else{
			//記錄時已符合資格, 但記錄為出境
			//記錄時不符合資格, 但記錄為入境

			//依記錄在最後插入虛擬的在/離境區間
			var lastDur ={
				days:0,
				dep:r.dep
			}
			rt.push(lastDur)

			//最前區間-1 最後區間+1 while到 qualified 反轉為止
			do{
				if(rt[0].days == 0){  //for edge case rt[0].days == 0 cause infinite loop
				    rt.shift();
				}
				rt[0].days-=1;
				if(rt[0].days==0) rt.shift()
				lastDur.days+=1;
			}while(r.qualified==(getDepDays(rt) < 183))

			//最後記錄時間加上最後區間的天數即為反轉日期
			var t = r.date.getTime()+lastDur.days*86400000;
			r.invertDate = new Date(t);
		}
	}





	/*
	 ██████  █████  ██       ██████ ██████  ███████  ██████  ██████  ██████  ██████  ███████
	██      ██   ██ ██      ██      ██   ██ ██      ██      ██    ██ ██   ██ ██   ██ ██
	██      ███████ ██      ██      ██████  █████   ██      ██    ██ ██████  ██   ██ ███████
	██      ██   ██ ██      ██      ██   ██ ██      ██      ██    ██ ██   ██ ██   ██      ██
	 ██████ ██   ██ ███████  ██████ ██   ██ ███████  ██████  ██████  ██   ██ ██████  ███████
	*/
	//直接 modify rr
	function calcRecords(rr){
		if(rr.length==0) return rr;

		//偵測衝突
		var conflict=false;
		var lastDep = !rr[0].dep;
		rr.forEach(function(r){
			r.conflict = r.dep==lastDep;
			if(r.conflict) conflict=true;
			lastDep=r.dep;
		})
		if(conflict) return rr;


		//以出入境紀錄算出在境/離境區間
		var rt=[];
		for(var i=0;i < rr.length-1;i++){
			var days = Math.round((rr[i+1].date.getTime()-rr[i].date.getTime())/86400000);
			rt.push({
				dep:rr[i].dep,
				days: days
			})
		}
		//在最前面插入一整年的區間
		//例如第一筆資料是出境，就當作在這之前都是在境
		rt.unshift({
			dep:!rr[0].dep,
			days:365
		})
		//至此 rr 跟 rt 的 length 應該一樣


		//針對每一筆記錄計算資格
		var lastDate=null;
		for(var i=rr.length-1;i>=0;i--){
			//從後往前建立資格資料
			var r = rr[i]
			calcRecord(r, rt.slice(0,i+1))

			//若 invert 超過後一筆記錄日期則無效
			if(r.invertDate && lastDate){
				if(r.invertDate.getTime()>=lastDate.getTime()){
					r.invertDate=null;
				}
			}
			lastDate=r.date;
		}
	}












	/*
	██████  ███████  ██████  ██████  ██████  ██████
	██   ██ ██      ██      ██    ██ ██   ██ ██   ██
	██████  █████   ██      ██    ██ ██████  ██   ██
	██   ██ ██      ██      ██    ██ ██   ██ ██   ██
	██   ██ ███████  ██████  ██████  ██   ██ ██████
	*/
	var Record = React.createClass({displayName: "Record",
		toggleRecord:function(){
			this.props.toggleRecord(this.props.idx);
		},
		removeRecord:function(e){
			if(e.ctrlKey || confirm('確定刪除這筆 '+toDateString(this.props.record.date)+' 的資料?')){
				this.props.removeRecord(this.props.idx);
			}
		},
		render:function(){
			var r = this.props.record;

			var divCN = cx({
				record:true,
				dep: r.dep,
				arr:!r.dep,
				conflict: r.conflict
			})

			var spanCN = cx({
				dep: r.dep,
				arr:!r.dep,
			})

			var statusCN = cx({
				status: true,
				qualified: r.qualified,
				empty: this.props.redundant
			})

			var invertCN = cx({
				invert: true,
				qualified: !r.qualified,
				empty: r.invertDate==null
			})


			return(
				React.createElement("div", {className: divCN}, 
					React.createElement("span", {className: "close", onClick: this.removeRecord}), 
					React.createElement("span", {className: "date"}, toDateString(r.date)), 
					React.createElement("span", {className: spanCN, onClick: this.toggleRecord}), 
					React.createElement("div", {className: "qualify"}, 
						React.createElement("span", {className: statusCN}), 
						React.createElement("span", {className: invertCN}, toDateString(r.invertDate))
					)
				)
			);
		}
	});

	/*
	██████  ███████  ██████  ██████  ██████  ██████  ███████
	██   ██ ██      ██      ██    ██ ██   ██ ██   ██ ██
	██████  █████   ██      ██    ██ ██████  ██   ██ ███████
	██   ██ ██      ██      ██    ██ ██   ██ ██   ██      ██
	██   ██ ███████  ██████  ██████  ██   ██ ██████  ███████
	*/
	var Records = React.createClass({displayName: "Records",
		render:function(){
			var rr = this.props.records;
			calcRecords(rr);
			if(rr.length>0){
				var lastQualified = !rr[0].qualified;

				var conflict = false;
				if(rr.length>0){
					var depFlag=rr[0].dep;
					conflict = rr.some(function(r,i){
						//與第一項作 XOR, 應該奇數列為0, 偶數列為1
						//偶數列反轉, 應該最後為全0, 有1就是衝突
						return r.dep^depFlag^(i%2) !=0;
					})
				}
				//前面也有偵測衝突，應該可精簡


			}
			return(
				React.createElement("div", {className: "records"}, 
					rr.map(function(r,i){
						var redundant = r.qualified==lastQualified;
						lastQualified=r.qualified;
						return(
							React.createElement(Record, {
								idx: i, 
								record: r, 
								redundant: redundant, 
								key: JSON.stringify(r), 
								toggleRecord: this.props.toggleRecord, 
								removeRecord: this.props.removeRecord}
								)
						);
					}.bind(this)), 
					conflict?React.createElement("span", {className: "conflict"}, "出入境記錄有衝突"):''
				)
			);
		}
	});

	module.exports = Records;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(15);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/autoprefixer-loader/index.js?browsers=last 4 versions!./../../node_modules/sass-loader/index.js!./Records.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/autoprefixer-loader/index.js?browsers=last 4 versions!./../../node_modules/sass-loader/index.js!./Records.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\n.records {\n  position: relative;\n  width: 460px;\n  border: 3px solid #666;\n  display: inline-block;\n  margin: 32px 0; }\n  @media (max-width: 768px) {\n    .records {\n      border-width: 1px;\n      width: 316px; } }\n  .records .conflict {\n    color: #f96; }\n\n/*\r\n██████  ███████  ██████  ██████  ██████  ██████\r\n██   ██ ██      ██      ██    ██ ██   ██ ██   ██\r\n██████  █████   ██      ██    ██ ██████  ██   ██\r\n██   ██ ██      ██      ██    ██ ██   ██ ██   ██\r\n██   ██ ███████  ██████  ██████  ██   ██ ██████\r\n*/\n.record {\n  font-size: 18px;\n  position: relative;\n  width: 100%;\n  padding: 4px 16px;\n  box-sizing: border-box;\n  text-align: left;\n  /*\r\n\t██████   █████  ████████ ███████\r\n\t██   ██ ██   ██    ██    ██\r\n\t██   ██ ███████    ██    █████\r\n\t██   ██ ██   ██    ██    ██\r\n\t██████  ██   ██    ██    ███████\r\n\t*/\n  /*\r\n\t ██████ ██       ██████  ███████ ███████\r\n\t██      ██      ██    ██ ██      ██\r\n\t██      ██      ██    ██ ███████ █████\r\n\t██      ██      ██    ██      ██ ██\r\n\t ██████ ███████  ██████  ███████ ███████\r\n\t*/ }\n  @media (max-width: 768px) {\n    .record {\n      font-size: 16px;\n      padding: 8px;\n      line-height: 22px;\n      text-align: center; } }\n  .record.dep {\n    background-color: #3a3333; }\n  .record.arr {\n    background-color: #333a33; }\n  .record.conflict {\n    background-color: #930; }\n  .record > span {\n    display: inline-block;\n    text-align: center;\n    vertical-align: middle; }\n  .record .date {\n    margin-right: 12px; }\n  .record .dep,\n  .record .arr {\n    font-size: 12px;\n    width: 32px;\n    height: 20px;\n    line-height: 20px;\n    border-radius: 4px;\n    color: #000;\n    cursor: pointer;\n    margin-right: 12px; }\n    @media (max-width: 768px) {\n      .record .dep,\n      .record .arr {\n        width: 30px;\n        height: 18px;\n        line-height: 18px; } }\n  .record .dep {\n    background-color: #f99; }\n    .record .dep:before {\n      content: '\\51FA\\5883'; }\n  .record .arr {\n    background-color: #9f9; }\n    .record .arr:before {\n      content: '\\5165\\5883'; }\n  .record.conflict > .close {\n    border: 1px solid #fff; }\n  .record .close {\n    width: 14px;\n    height: 14px;\n    margin-right: 16px;\n    border: 1px solid transparent;\n    border-radius: 50%;\n    background-color: #c44;\n    cursor: pointer;\n    display: inline-block;\n    position: relative;\n    opacity: .3; }\n    .record .close:hover {\n      opacity: 1; }\n    @media (max-width: 768px) {\n      .record .close {\n        opacity: 1;\n        margin-right: 8px; } }\n    .record .close:before {\n      width: 8px;\n      height: 2px;\n      background-color: #fff;\n      display: block;\n      position: absolute;\n      left: 3px;\n      top: 6px;\n      content: ''; }\n  .record .qualify {\n    display: inline-block;\n    font-size: 14px; }\n    @media (max-width: 768px) {\n      .record .qualify {\n        font-size: 12px;\n        display: block; } }\n    .record .qualify > span {\n      display: inline-block;\n      vertical-align: middle; }\n    .record .qualify .status:after {\n      content: '\\4E0D\\7B26\\5408\\8CC7\\683C'; }\n    .record .qualify .status.qualified:after {\n      content: '\\3000\\7B26\\5408\\8CC7\\683C'; }\n    .record .qualify .invert:before {\n      content: ', '; }\n    .record .qualify .invert:after {\n      content: ' \\5F8C\\8A3B\\92B7\\8CC7\\683C'; }\n    .record .qualify .invert.qualified:after {\n      content: ' \\5F8C\\7B26\\5408\\8CC7\\683C'; }\n    .record .qualify .invert.empty {\n      display: none; }\n", ""]);

	// exports


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports={

		//將 records 陣列轉為 base64
		stringify:function(rr){
			var m = rr.reduce(function(a,r){
				var d=r.date;
				var n = d.getFullYear()-2000 //0-64 6bits
				n = n << 4 | d.getMonth()    //0-11 4bits
				n = n << 5 | d.getDate()     //1-31 5bits
				n = n << 1 | (r.dep?1:0)     //     1bit

				//n 為 2bytes 整數，拆為兩個字元
				return a+String.fromCharCode(n>>8&0xff)+String.fromCharCode(n&0xff);

			},'')
			return btoa(m);
		},

		//將 base64 字串轉為 records
		parse:function(h){
			h=h.replace(/^#/,'');
			var rr=[];
			try{
				var m = atob(h); //這裡可能有 error

				for(var i=0;i < m.length;i+=2){
					var n = m.charCodeAt(i) << 8 | m.charCodeAt(i+1); //可能有溢位error
					var year = (n>>10) + 2000;
					var month= (n>>6) & 0x0f
					var date = (n>>1) & 0x1f;
					var dep = (n&1)==1;
					var d = new Date(year,month,date) //d可能 invalid, 這裡不會有 error, 或許應該要檢查
					rr.push({
						date:d,
						dep:dep
					})
				}

			}catch(err){
			}
			return rr;
		}
	}


/***/ }
/******/ ]);
