/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__circle__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(2);


console.clear();
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var bound = new __WEBPACK_IMPORTED_MODULE_0__circle__["b" /* Vector */](0, 0);
var circles = [];
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    bound = new __WEBPACK_IMPORTED_MODULE_0__circle__["b" /* Vector */](canvas.width, canvas.height);
}
function init() {
    window.onload = function () {
        resizeCanvas();
        createCircles();
        window.requestAnimationFrame(draw);
    };
    window.onresize = resizeCanvas;
}
function createCircles() {
    for (var i = 0; i < 100; ++i) {
        var radius = Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* getRandom */])(1, 5);
        var x = Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* getRandom */])(0, canvas.width);
        var y = Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* getRandom */])(0, canvas.height);
        var circle = new __WEBPACK_IMPORTED_MODULE_0__circle__["a" /* Circle */](new __WEBPACK_IMPORTED_MODULE_0__circle__["b" /* Vector */](x, y), radius);
        var speedX = Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* getRandom */])(-1, 1);
        var speedY = Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* getRandom */])(-1, 1);
        circle.speed = new __WEBPACK_IMPORTED_MODULE_0__circle__["b" /* Vector */](speedX, speedY);
        circles.push(circle);
    }
}
function cleanCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function draw() {
    cleanCanvas();
    circles.forEach(function (c) {
        c.update(bound);
        c.draw(ctx);
    });
    window.requestAnimationFrame(draw);
}
function drawLine(from, to) {
    var dist = from.distTo(to);
    var opacity = 1 - Math.min(dist / 200, 1);
    if (!opacity)
        return;
    ctx.lineWidth = opacity * 3;
    ctx.strokeStyle = "rgba(0,255,255," + opacity;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
}
init();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Vector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Circle; });
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.prototype.distTo = function (v) {
        return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2));
    };
    Vector.prototype.move = function (v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    };
    return Vector;
}());

var Circle = /** @class */ (function () {
    function Circle(center, radius) {
        this.center = center;
        this.radius = radius;
        this.speed = new Vector(0, 0);
    }
    Circle.prototype.update = function (bound) {
        this.center.move(this.speed);
        this.bounce(bound);
        return this;
    };
    Circle.prototype.draw = function (ctx) {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        return this;
    };
    Circle.prototype.bounce = function (bound) {
        if (this.center.x <= 0) {
            this.center.x *= -1;
            this.speed.x *= -1;
        }
        else if (this.center.x >= bound.x) {
            this.center.x = bound.x * 2 - this.center.x;
            this.speed.x *= -1;
        }
        if (this.center.y <= 0) {
            this.center.y *= -1;
            this.speed.y *= -1;
        }
        else if (this.center.y >= bound.y) {
            this.center.y = bound.y * 2 - this.center.y;
            this.speed.y *= -1;
        }
    };
    return Circle;
}());



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getRandom;
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTI1ZWE0YTkyMzVkZTk0N2EwOGMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9jaXJjbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQzdEMEM7QUFDUDtBQUVuQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDaEIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQXNCLENBQUM7QUFDcEUsSUFBSSxHQUFHLEdBQTZCLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDNUQsSUFBSSxLQUFLLEdBQUcsSUFBSSx1REFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM3QixJQUFJLE9BQU8sR0FBYSxFQUFFLENBQUM7QUFFM0I7SUFDSSxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDakMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ25DLEtBQUssR0FBRyxJQUFJLHVEQUFNLENBQUMsTUFBTSxDQUFDLEtBQUss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LEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQztJQUNMLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7OztBQ2xESyxtQkFBb0IsR0FBVyxFQUFFLEdBQVc7SUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDN0MsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA5MjVlYTRhOTIzNWRlOTQ3YTA4YyIsImltcG9ydCB7IFZlY3RvciwgQ2lyY2xlIH0gZnJvbSAnLi9jaXJjbGUnO1xyXG5pbXBvcnQgeyBnZXRSYW5kb20gfSBmcm9tICcuL3V0aWwnO1xyXG5cclxuY29uc29sZS5jbGVhcigpO1xyXG52YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbnZhciBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbnZhciBib3VuZCA9IG5ldyBWZWN0b3IoMCwgMCk7XHJcbnZhciBjaXJjbGVzOiBDaXJjbGVbXSA9IFtdO1xyXG5cclxuZnVuY3Rpb24gcmVzaXplQ2FudmFzKCkge1xyXG4gICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgYm91bmQgPSBuZXcgVmVjdG9yKGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB3aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJlc2l6ZUNhbnZhcygpO1xyXG4gICAgICAgIGNyZWF0ZUNpcmNsZXMoKTtcclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cub25yZXNpemUgPSByZXNpemVDYW52YXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNpcmNsZXMoKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwMDsgKytpKSB7XHJcbiAgICAgICAgdmFyIHJhZGl1cyA9IGdldFJhbmRvbSgxLCA1KTtcclxuICAgICAgICB2YXIgeCA9IGdldFJhbmRvbSgwLCBjYW52YXMud2lkdGgpO1xyXG4gICAgICAgIHZhciB5ID0gZ2V0UmFuZG9tKDAsIGNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIHZhciBjaXJjbGUgPSBuZXcgQ2lyY2xlKG5ldyBWZWN0b3IoeCwgeSksIHJhZGl1cyk7XHJcbiAgICAgICAgdmFyIHNwZWVkWCA9IGdldFJhbmRvbSgtMSwgMSk7XHJcbiAgICAgICAgdmFyIHNwZWVkWSA9IGdldFJhbmRvbSgtMSwgMSk7XHJcbiAgICAgICAgY2lyY2xlLnNwZWVkID0gbmV3IFZlY3RvcihzcGVlZFgsIHNwZWVkWSk7XHJcbiAgICAgICAgY2lyY2xlcy5wdXNoKGNpcmNsZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFuQ2FudmFzKCkge1xyXG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3KCkge1xyXG4gICAgY2xlYW5DYW52YXMoKTtcclxuXHJcbiAgICBjaXJjbGVzLmZvckVhY2goKGMpID0+IHtcclxuICAgICAgICBjLnVwZGF0ZShib3VuZCk7XHJcbiAgICAgICAgYy5kcmF3KGN0eCk7XHJcbiAgICB9KVxyXG5cclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdMaW5lKGZyb206IFZlY3RvciwgdG86IFZlY3Rvcikge1xyXG4gICAgdmFyIGRpc3QgPSBmcm9tLmRpc3RUbyh0byk7XHJcbiAgICB2YXIgb3BhY2l0eSA9IDEgLSBNYXRoLm1pbihkaXN0IC8gMjAwLCAxKTtcclxuICAgIGlmICghb3BhY2l0eSkgcmV0dXJuO1xyXG4gICAgY3R4LmxpbmVXaWR0aCA9IG9wYWNpdHkgKiAzO1xyXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gYHJnYmEoMCwyNTUsMjU1LCR7b3BhY2l0eX1gO1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4Lm1vdmVUbyhmcm9tLngsIGZyb20ueSk7XHJcbiAgICBjdHgubGluZVRvKHRvLngsIHRvLnkpO1xyXG4gICAgY3R4LnN0cm9rZSgpO1xyXG59XHJcblxyXG5pbml0KCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LnRzIiwiaW50ZXJmYWNlIERyYXdhYmxlIHtcclxuICAgIHVwZGF0ZShib3VuZDogVmVjdG9yKTogdGhpcztcclxuICAgIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB0aGlzO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVmVjdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB4OiBudW1iZXIsIHB1YmxpYyB5OiBudW1iZXIpIHsgfVxyXG5cclxuICAgIGRpc3RUbyh2OiBWZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMueCAtIHYueCwgMikgKyBNYXRoLnBvdyh0aGlzLnkgLSB2LnksIDIpKTtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlKHY6IFZlY3Rvcikge1xyXG4gICAgICAgIHRoaXMueCArPSB2Lng7XHJcbiAgICAgICAgdGhpcy55ICs9IHYueTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENpcmNsZSBpbXBsZW1lbnRzIERyYXdhYmxlIHtcclxuICAgIHB1YmxpYyBzcGVlZDogVmVjdG9yID0gbmV3IFZlY3RvcigwLCAwKTtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjZW50ZXI6IFZlY3RvciwgcHVibGljIHJhZGl1czogbnVtYmVyKXt9XHJcbiAgICB1cGRhdGUoYm91bmQ6IFZlY3Rvcikge1xyXG4gICAgICAgIHRoaXMuY2VudGVyLm1vdmUodGhpcy5zcGVlZCk7XHJcbiAgICAgICAgdGhpcy5ib3VuY2UoYm91bmQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiNmZmZcIjtcclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY3R4LmFyYyh0aGlzLmNlbnRlci54LCB0aGlzLmNlbnRlci55LCB0aGlzLnJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xyXG4gICAgICAgIGN0eC5maWxsKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGJvdW5jZShib3VuZDogVmVjdG9yKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2VudGVyLnggPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNlbnRlci54ICo9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLnNwZWVkLnggKj0gLTE7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNlbnRlci54ID49IGJvdW5kLngpIHtcclxuICAgICAgICAgICAgdGhpcy5jZW50ZXIueCA9IGJvdW5kLnggKiAyIC0gdGhpcy5jZW50ZXIueDtcclxuICAgICAgICAgICAgdGhpcy5zcGVlZC54ICo9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jZW50ZXIueSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2VudGVyLnkgKj0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMuc3BlZWQueSAqPSAtMTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2VudGVyLnkgPj0gYm91bmQueSkge1xyXG4gICAgICAgICAgICB0aGlzLmNlbnRlci55ID0gYm91bmQueSAqIDIgLSB0aGlzLmNlbnRlci55O1xyXG4gICAgICAgICAgICB0aGlzLnNwZWVkLnkgKj0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NpcmNsZS50cyIsImV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kb20obWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC50cyJdLCJzb3VyY2VSb290IjoiIn0=