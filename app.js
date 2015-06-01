var Game = (function () {
    function Game(canvas) {
        this.canvas = canvas;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.ctx = canvas.getContext("2d");
    }
    return Game;
})();
