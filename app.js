var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SNRGameEngine;
(function (SNRGameEngine) {
    var Game = (function () {
        function Game(canvas) {
            this.canvas = canvas;
            this.currentScreen = null;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            this.ctx = canvas.getContext("2d");
        }
        Game.prototype.setScreen = function (screen) {
            this.currentScreen = screen;
        };
        Game.prototype.getScreen = function () {
            return this.currentScreen;
        };
        return Game;
    })();
    SNRGameEngine.Game = Game;
    var Screen = (function () {
        function Screen() {
            this.layers = [];
        }
        Screen.prototype.addLayer = function (layer) {
            this.layers.push(layer);
        };
        Screen.prototype.getLayers = function () {
            return this.layers;
        };
        Screen.prototype.draw = function (ctx) {
            this.getLayers().forEach(function (layer) {
                layer.draw(ctx);
            });
        };
        return Screen;
    })();
    SNRGameEngine.Screen = Screen;
    var Layer = (function () {
        function Layer() {
            this.nodes = [];
        }
        Layer.prototype.addNode = function (node) {
            this.nodes.push(node);
        };
        Layer.prototype.getNodes = function () {
            return this.nodes;
        };
        Layer.prototype.draw = function (ctx) {
            this.getNodes().forEach(function (node) {
                node.draw(ctx);
            });
        };
        return Layer;
    })();
    SNRGameEngine.Layer = Layer;
    var Node = (function () {
        function Node(x, y) {
            this.x = x;
            this.y = y;
        }
        Node.prototype.draw = function (ctx) {
            // Abstract
        };
        return Node;
    })();
    SNRGameEngine.Node = Node;
})(SNRGameEngine || (SNRGameEngine = {}));
var TapTheCat;
(function (TapTheCat) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.apply(this, arguments);
        }
        Game.prototype.load = function () {
            this.setScreen(new DemoScreen());
        };
        Game.prototype.run = function () {
            this.getScreen().draw(this.ctx);
        };
        return Game;
    })(SNRGameEngine.Game);
    TapTheCat.Game = Game;
    var DemoScreen = (function (_super) {
        __extends(DemoScreen, _super);
        function DemoScreen() {
            _super.call(this);
            var layer = new SNRGameEngine.Layer();
            for (var x = 10; x < 100; x++) {
                var box = new Box(Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000));
                layer.addNode(box);
            }
            this.addLayer(layer);
        }
        return DemoScreen;
    })(SNRGameEngine.Screen);
    var Box = (function (_super) {
        __extends(Box, _super);
        function Box() {
            _super.apply(this, arguments);
        }
        Box.prototype.draw = function (ctx) {
            ctx.fillStyle = "#00FF00";
            ctx.fillRect(this.x, this.y, 20, 20);
        };
        return Box;
    })(SNRGameEngine.Node);
})(TapTheCat || (TapTheCat = {}));
var game = new TapTheCat.Game(document.getElementById('gameCanvas'));
game.load();
game.run();
