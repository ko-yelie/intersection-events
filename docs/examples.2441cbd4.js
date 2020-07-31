parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Llmo":[function(require,module,exports) {
"use strict";function e(){}function t(e){return e?Array.prototype.slice.call(e,0):[]}function r(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document;return"string"==typeof e?t(r.querySelectorAll(e)):e.length?e.map?e:t(e):[e]}Object.defineProperty(exports,"__esModule",{value:!0}),exports.noop=e,exports.getElements=r;
},{}],"2u/B":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./modules/utility");function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var s=0;s<t.length;s++){var r=t[s];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function r(e,t,r){return t&&s(e.prototype,t),r&&s(e,r),e}var n=.99,i=function(){function s(r){var n=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t(this,s);var h=i.onEnter,a=(0,e.getElements)(r);"IntersectionObserver"in window&&!(document.body.offsetWidth>window.innerWidth)?(this._ieEls=[],a.forEach(function(e){n._ieEls.push(new o(e,i))})):a.forEach(function(e){h(e)})}return r(s,[{key:"execute",value:function(){this._ieEls&&this._ieEls.forEach(function(e){e.execute(e._observer.takeRecords())})}},{key:"destroy",value:function(){this._ieEls&&this._ieEls.forEach(function(e){e.destroy()})}}]),s}();exports.default=i;var o=function(){function s(r){var i=this,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t(this,s);var h=o.onEnter,a=o.onLeave,l=void 0===a?e.noop:a,c=o.isSP,d=void 0===c?e.noop:c,v=o.isOnce,f=void 0!==v&&v;this._onEnter=h,this._onLeave=l,this._isOnce=f;var u=o.enterThreshold,_=void 0===u?n:u,E=o.leaveThreshold,T=void 0===E?0:E,p=o.enterThresholdSp,b=void 0===p?_:p,y=o.leaveThresholdSp,g=void 0===y?T:y;this._el=r,this._isSP=d;var L=d();this._selfEnterThreshold=L?parseFloat(r.dataset.enterThresholdSp)||b:parseFloat(r.dataset.enterThreshold)||_,this._selfLeaveThreshold=L?parseFloat(r.dataset.leaveThresholdSp)||g:parseFloat(r.dataset.leaveThreshold)||T,this._selfEnterThreshold=Math.min(this._selfEnterThreshold,n),this._selfLeaveThreshold=Math.min(this._selfLeaveThreshold,n),this._selfEnterThreshold===this._selfLeaveThreshold?(this._checkEnter=function(e){return e.isIntersecting},this._checkLeave=function(e){return 0===i._selfLeaveThreshold?!e.isIntersecting:e.isIntersecting}):(this._checkEnter=function(e,t,s){return e.isIntersecting&&t<=s},this._checkLeave=function(e,t,s){return t>=s}),this._isEnter=!1,this._prevTop=document.body.offsetHeight;var k=window.innerHeight/r.offsetHeight;this._selfEnterThreshold>k&&(this._selfEnterThreshold*=k),this._selfLeaveThreshold>k&&(this._selfLeaveThreshold*=k),this._observer=new IntersectionObserver(this.execute.bind(this),{threshold:[this._selfLeaveThreshold,this._selfEnterThreshold]}),this._observer.observe(r)}return r(s,[{key:"execute",value:function(e){var t=this;e.forEach(function(e){var s=e.target,r=e.intersectionRatio,n=e.boundingClientRect,i=e.rootBounds,o=Math.abs(r-t._selfEnterThreshold),h=Math.abs(r-t._selfLeaveThreshold),a=n.top,l=a>t._prevTop,c=a+n.height*r,d=Math.abs(c-i.top)<Math.abs(c-i.bottom);t._prevTop=a,!t._isEnter&&((!l&&!d||l&&d)&&t._checkEnter(e,o,h)||e.intersectionRatio>=t._selfEnterThreshold)?(t._isEnter=!0,t._onEnter(s,l),t._isOnce&&t.destroy()):t._isEnter&&((!l&&d||l&&!d)&&t._checkLeave(e,o,h)||e.intersectionRatio<t._selfEnterThreshold)&&(t._isEnter=!1,t._onLeave(s,l))})}},{key:"destroy",value:function(){this._observer.unobserve(this._el)}}]),s}();
},{"./modules/utility":"Llmo"}],"Focm":[function(require,module,exports) {
"use strict";var e=n(require("../src/index.js"));function n(e){return e&&e.__esModule?e:{default:e}}var t=new e.default(".js-target",{onEnter:function(e,n){e.innerText="enter\nisUp: ".concat(n),e.classList.add("show")},onLeave:function(e,n){e.innerText="leave\nisUp: ".concat(n),e.classList.remove("show")}});
},{"../src/index.js":"2u/B"}]},{},["Focm"], null)