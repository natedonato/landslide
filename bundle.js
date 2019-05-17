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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./game.js":
/*!*****************!*\
  !*** ./game.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Rock = __webpack_require__(/*! ./rock */ \"./rock.js\");\nconst Guy = __webpack_require__(/*! ./guy */ \"./guy.js\");\n\nclass Game {\n    constructor(canvasheight, canvaswidth){\n\n        //player options can be set here\n        this.guyspeed = 10;\n        this.friction = 0.85;\n        this.gravity = 0.3;\n        this.guy = new Guy(canvasheight, canvaswidth, this.guyspeed);\n\n        //rock related options can be set here\n        this.minSize = 80;\n        this.maxSize = 180;\n        this.maxX = canvaswidth;\n        this.lastRock = 0;\n        this.rockInterval = 2000;\n        this.rockspeed = 2;\n\n        //water related options can be set here\n        this.water = {x: 0, \n            y: canvasheight + 800, \n            w : canvaswidth, \n            h: canvasheight + 800, \n            speed: 0.5};\n\n        //canvas & height related variables\n        this.canvasheight = canvasheight;\n        this.canvaswidth = canvaswidth;\n        this.maxrockheight = 0;\n        this.currHeight = 0;\n        this.maxHeight = 0;\n\n        this.rocks = [];\n    }\n\n    reset(){\n        this.rocks = [];\n        this.maxrockheight = 0;\n        this.currHeight = 190;\n        this.maxHeight = 0;\n        this.lastRock = 0;\n        this.guy = new Guy(this.canvasheight, this.canvaswidth, this.guyspeed);\n        this.water.y = this.canvasheight + 500;\n        return this.guy;\n    }\n\n\n    addRock(rock){\n        this.rocks.push(rock);\n    }\n\n    rockGenerator(timestamp){\n        if (timestamp - this.lastRock > this.rockInterval) {\n            this.lastRock = timestamp;\n            this.addRock(Rock.generate(this.minSize, this.maxSize, this.maxrockheight, this.maxX));\n        }\n    }\n\n    checkRockCollision(rock1, rock2) {\n        if (rock1.pos.x < rock2.pos.x + rock2.width &&\n            rock2.pos.x < rock1.pos.x + rock1.width &&\n            rock1.pos.y < rock2.pos.y + rock2.height &&\n            rock2.pos.y < rock1.pos.y + rock1.height\n        ) {\n            //collision has occured\n            rock1.falling = false;\n            rock2.falling = false;\n            //pushes rock generator upwards with height of rock\n            if (this.canvasheight - rock1.pos.y > this.maxrockheight) {\n                this.maxrockheight = this.canvasheight - rock1.pos.y;\n            }\n        }\n    }\n\n    checkPlayerCollision(rock) {\n        let collisionSide = \"none\";\n        let vectorx = (this.guy.pos.x + (this.guy.width / 2)) - (rock.pos.x + (rock.width / 2));\n        let vectory = (this.guy.pos.y + (this.guy.height / 2)) - (rock.pos.y + (rock.height / 2));\n        let avectorx = Math.abs(vectorx);\n        let avectory = Math.abs(vectory);\n        //can't be closer than half of each width\n        let minwidth = (this.guy.width / 2) + (rock.width / 2);\n        let minheight = (this.guy.height / 2) + (rock.height / 2);\n\n\n        if (avectorx < minwidth && avectory < minheight) {\n            let offsetx = minwidth - avectorx;\n            let offsety = minheight - avectory;\n            let xcollisiontime;\n            let ycollisiontime;\n            //calculates whether we hit the side first or the top or bottom first\n            xcollisiontime = Math.abs((offsetx / this.guy.vel.x));\n            ycollisiontime = Math.abs((offsety / this.guy.vel.y));\n            if (ycollisiontime < xcollisiontime || (this.guy.vel.y === 0 && this.guy.airborne === false)) {\n                if (vectory <= 0) {\n\n                    //let him coast on top of falling rock and reset jumps\n                    collisionSide = \"top\";\n                    this.guy.pos.y -= offsety;\n                    if (rock.falling) {\n                        this.guy.vel.y = this.rockspeed;\n                    }\n                    else {\n                        this.guy.vel.y = 1;\n                    }\n                    this.guy.airborne = false;\n                    this.guy.jumps = 2;\n                }\n\n                else {\n                    collisionSide = \"bottom\";\n                \n                    if (!this.guy.airborne && rock.falling) {\n                        console.log(\"dead\");\n                        this.guy.dead = true;\n                    }\n                    if (this.guy.pos.y + offsety >= this.canvasheight - this.guy.height) { this.guy.pos.y = this.canvasheight - this.guy.height; }\n                    else {\n                        this.guy.pos.y += offsety;\n                        this.guy.vel.y = -this.guy.vel.y;\n                    }\n                }\n            }\n            else {\n                if (vectorx > 0) {\n                    collisionSide = \"right\";\n                    this.guy.pos.x += offsetx;\n                    this.guy.wallcling = 1;\n                }\n                else {\n                    collisionSide = \"left\";\n                    this.guy.pos.x -= offsetx;\n                    this.guy.wallcling = -1;\n                }\n            }\n        }\n        return collisionSide;\n    }\n\n    checkWaterCollision(){\n        if(this.guy.pos.y + this.guy.height > this.water.y){\n            this.guy.dead = true;\n        }\n    }\n\n    updateWaterPos(dt){\n        this.water.y -= this.water.speed * dt;\n        this.checkWaterCollision();\n    }\n\n    updateRockPos(dt) {\n        this.rocks.forEach(rock => {\n            if (rock.falling) {\n                rock.pos.y += this.rockspeed * dt;\n                if (rock.pos.y + rock.height >= this.canvasheight) {\n                    rock.pos.y = this.canvasheight - rock.height;\n                    rock.falling = false;\n                }\n                this.rocks.forEach(rock2 => {\n                    if (rock2 !== rock)\n                        this.checkRockCollision(rock, rock2);\n                });\n            }\n            this.checkPlayerCollision(rock);\n        });\n    }\n \n\n    updateGuyPos(dt){\n        //applies friction and gravity to guys velocities\n        this.guy.vel.x *= this.friction;\n        this.guy.vel.y += this.gravity;\n        if(this.guy.wallcling !== 0 && this.guy.vel.y > 0){\n            this.guy.vel.y -= this.gravity / 2;\n        }\n        if(this.guy.vel.y > this.gravity + 1){\n            this.guy.airborne = true;\n            this.guy.jumps = 0;\n        }\n\n        //screen wraparound for guy\n        if (this.guy.pos.x > this.canvaswidth - this.guy.width / 2) { this.guy.pos.x = -4; }\n        else if (this.guy.pos.x < -this.guy.width / 2) { this.guy.pos.x = this.canvaswidth - this.guy.width / 2 - 2; }\n\n        //updates dudes position using velocity over time\n        this.guy.pos.x += this.guy.vel.x * dt;\n        this.guy.pos.y += this.guy.vel.y * dt;\n\n        //allows guy to jump off ground, could be removed after refactor ground code\n        if (this.guy.pos.y >= this.canvasheight - this.guy.height) {\n            this.guy.pos.y = this.canvasheight - this.guy.height;\n            this.guy.jumps = 2;\n            this.guy.airborne = false;\n        }\n\n        //keeps track of current height and max height\n        // & pushes rock generator upwards if this.guy is hella high up\n        this.currHeight = (500 - this.guy.pos.y - this.guy.height);\n        if (this.currHeight > this.maxHeight) { this.maxHeight = this.currHeight; }\n        if (this.currHeight + this.canvasheight > this.maxrockheight) {\n            this.maxrockheight = this.currHeight + this.canvasheight;\n        }\n        this.guy.wallcling = 0;\n    }\n\n\n    updatePos(dt){\n        //avoids the curse of the NaN on initial render\n        if (isNaN(dt)) {\n            dt = 1;\n        }\n        this.updateGuyPos(dt);\n        this.updateRockPos(dt);\n        this.updateWaterPos(dt);\n    }\n\n    step(timestamp, dt) {\n        this.rockGenerator(timestamp);\n        this.updatePos(dt);\n    }\n}\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./game.js?");

/***/ }),

/***/ "./gameview.js":
/*!*********************!*\
  !*** ./gameview.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GameView{\n    constructor(game, ctx, canvasheight, canvaswidth){\n        this.game = game;\n        this.ctx = ctx;\n        this.guy = game.guy;\n        this.keys = {};\n        this.canvasheight = canvasheight;\n        this.canvaswidth = canvaswidth;\n        this.lastUpdated = 0;\n        this.water = game.water;\n        \n\n        //for throttling key presses\n        this.tooSoon = false;\n\n        //color options\n        this.bgcolor = '#FFA500';\n        this.rockcolor = '#000000';\n        this.playercolor = \"#ff1919\";\n        this.watercolor = 'blue';\n        this.colorChangeHeight = 300;\n\n        //initial background fill\n        this.colorChangeCurrent = this.colorChangeHeight;\n        this.ctx.fillStyle = this.bgcolor;\n        this.ctx.fillRect(0, 0, this.game.canvaswidth, this.game.canvasheight);\n    }\n\n    bindkeys(){\n        let gameview = this;\n        window.addEventListener(\"keydown\", function (e) {\n        e.preventDefault();\n        gameview.keys[e.keyCode] = true;\n    });\n\n    window.addEventListener(\"keyup\", function (e) {\n        gameview.keys[e.keyCode] = false;\n    });\n\n    }\n\n    handleKeys (){\n        if (this.keys[38]) {\n            if (this.guy.wallcling !== 0 && this.guy.airborne === true && this.tooSoon === false){\n                this.tooSoon = true;\n                this.guy.vel.y = -8;\n                this.guy.vel.x = this.guy.wallcling * 6;\n                setTimeout(() => this.tooSoon = false, 300);\n            }\n            else if (this.guy.jumps > 0 && this.tooSoon === false) {\n                this.tooSoon = true;\n\n                if (this.guy.jumps === 2) {\n                    this.guy.vel.y = -8;\n                } else { this.guy.vel.y = -6; }\n                this.guy.airborne = true;\n                this.guy.jumps -= 2;\n                setTimeout(() => this.tooSoon = false, 300);\n            }\n        }\n\n        if (this.keys[39]) {\n            if (this.guy.vel.x < this.guy.maxspeed) {\n                this.guy.vel.x += 1;\n            }\n        }\n\n        if (this.keys[37]) {\n            if (this.guy.vel.x > -this.guy.maxspeed) {\n                this.guy.vel.x -= 1;\n            }\n        }\n        if (this.keys[13]){\n            this.reset();\n        }\n    }\n\n    reset(){\n        this.guy = this.game.reset();\n        this.colorChangeCurrent = this.colorChangeHeight;\n        this.bgcolor = '#FFA500';\n    }\n\n\n    drawGuy(offset){\n        this.ctx.fillStyle = this.playercolor;\n        //leans guy to side with x - velocity\n        this.ctx.save();\n        this.ctx.translate(this.guy.pos.x + this.guy.width / 2, this.guy.pos.y + this.guy.height);\n        this.ctx.rotate(this.guy.vel.x * 2 * Math.PI / 180);\n        this.ctx.fillRect(-this.guy.width / 2, -this.guy.height, this.guy.width, this.guy.height);\n        this.ctx.restore();\n\n        this.ctx.fillStyle = \"#ffffff\";\n        this.ctx.textAlign = \"end\";\n        this.ctx.font = \"30px Arial\";\n        this.ctx.fillText(Math.floor(this.game.maxHeight / 10) + ' ft', this.canvaswidth - 10, 35 - offset);\n        this.ctx.font = \"10px Arial\";\n        this.ctx.fillText(Math.floor(this.game.currHeight / 10) + ' ft', this.canvaswidth - 10 - 2, 50 - offset);\n    }\n\n    drawRocks(){\n        this.game.rocks.forEach(rock => {\n            this.ctx.fillStyle = this.rockcolor;\n            this.ctx.fillRect(rock.pos.x, rock.pos.y, rock.width, rock.height);\n            this.ctx.fillStyle = this.bgcolor;\n            this.ctx.beginPath();\n            this.ctx.arc(rock.pos.x + (rock.width / 2), rock.pos.y + (rock.width / 2), rock.width / 2 * 0.7, 0, 2 * Math.PI);\n            this.ctx.fill();\n        }\n        );\n    };\n\n    drawWater(){\n        this.ctx.globalAlpha = 0.5;\n        this.ctx.fillStyle = this.watercolor;\n        this.ctx.fillRect(this.water.x, this.water.y, this.water.w, this.water.h);\n        this.ctx.globalAlpha = 1.0;\n    }\n\n    draw(){\n\n\n\n        if(this.game.maxHeight > this.colorChangeCurrent){\n            this.colorChangeCurrent += this.colorChangeHeight;\n            let hue = Math.random()*290 + 20;\n            this.bgcolor = 'hsl(' + hue + ',100%, 50%)';\n            console.log(this.bgcolor);\n            this.rockcolor === 'white' ? this.rockcolor = 'black' : this.rockcolor = 'white';\n        }\n\n        //moves \"camera\" with current player\n        this.ctx.save();\n        let offset = this.game.currHeight - 190;\n        this.ctx.translate(0, offset);\n\n        //clears and fills background\n        this.ctx.clearRect(0, 0 - offset, this.canvaswidth, this.canvasheight);\n        this.ctx.fillStyle = this.bgcolor;\n        this.ctx.fillRect(0, 0 - offset, this.canvaswidth, this.canvasheight);\n\n        //adds floor\n        this.ctx.fillStyle = '#000000';\n        this.ctx.fillRect(0, this.canvasheight, this.canvaswidth * 2 / 3, 500);\n        this.ctx.fillRect(this.canvaswidth * 2 / 3 + 5, this.canvasheight, this.canvaswidth * 1 / 3, 500);\n\n        this.drawRocks();\n        this.drawGuy(offset);\n        this.drawWater();\n        this.ctx.restore();\n    }\n\n    start(){\n        this.bindkeys();\n        this.update(0);\n    }\n\n\n    update(timestamp) {\n        const dt = (timestamp - this.lastUpdated) / 10;\n        this.handleKeys();\n        this.game.step(timestamp, dt);\n        if(this.guy.dead){\n                this.reset();\n        }\n        this.draw();\n        this.lastUpdated = timestamp;\n        requestAnimationFrame(this.update.bind(this));\n    }\n}\n\n\n\nmodule.exports = GameView;\n\n\n//# sourceURL=webpack:///./gameview.js?");

/***/ }),

/***/ "./guy.js":
/*!****************!*\
  !*** ./guy.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Guy{\n    constructor(canvaswidth, canvasheight, guyspeed){\n\n        this.pos = {\n            x: canvaswidth / 2,\n            y: canvasheight - 50\n        };\n\n        this.vel = {\n                x: 0,\n            y: 5,\n        };\n\n        this.width = 22;\n        this.height = 32;\n        this.maxspeed = guyspeed;\n        this.jumps = 0;\n        this.airborne = true;\n        this.dead = false;\n        this.wallcling = 0;\n    }\n}\n\nmodule.exports = Guy;\n\n//# sourceURL=webpack:///./guy.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./game.js\");\nconst GameView = __webpack_require__(/*! ./gameview */ \"./gameview.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const canvas = document.getElementById(\"game\");\n    canvas.width = 640;\n    canvas.height = 500;\n    ctx = canvas.getContext(\"2d\");\n\n    const game = new Game(canvas.height, canvas.width);\n    new GameView(game, ctx, canvas.height, canvas.width).start();\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./rock.js":
/*!*****************!*\
  !*** ./rock.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Rock {\n    constructor(posx, posy, size){\n        this.pos = {x: posx, y: posy};\n        this.width = size;\n        this.height = size;\n        this.falling = true;\n    }\n\n    static generate(minSize, maxSize, maxrockHeight, maxX) {\n        let size = minSize + Math.random() * (maxSize - minSize);\n        let x = (Math.random() * (maxX - size));\n        let y = -220 - maxrockHeight;\n        return new Rock(x, y, size);\n    }\n}\nmodule.exports = Rock;\n\n\n//# sourceURL=webpack:///./rock.js?");

/***/ })

/******/ });