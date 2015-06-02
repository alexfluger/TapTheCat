module SNRGameEngine
{
	export class Game
	{
		private static instance: Game = new Game();
		private currentScreen: Screen = null;
		protected ctx: CanvasRenderingContext2D;
		private screenW: number;
		private screenH: number;
		
		constructor()
		{
			if (Game.instance) {
				throw "Use Game.getInstance()";
			} else {
				Game.instance = this;
			}
		}
		
		public static getInstance(): Game
		{
			return Game.instance;
		}

		setScreen(screen: Screen): void
		{
			this.currentScreen = screen;
		}
		
		getScreen(): Screen
		{
			return this.currentScreen;
		}
		
		getScreenHeight(): number
		{
			return this.screenH;
		}
		
		getScreenWidth(): number
		{
			return this.screenW;
		}
		
		attachCanvas(canvas: HTMLCanvasElement)
		{
			canvas.width = this.screenW = window.innerWidth;
			canvas.height = this.screenH = window.innerHeight;
			this.ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
		}
		
		run(): void
		{
			this.getScreen().draw(this.ctx);
		}
	}
	
	export class Screen
	{
		private layers: Layer[] = [];
		
		addLayer(layer: Layer): void
		{
			this.layers.push(layer);
		}
		
		getLayers(): Layer[]
		{
			return this.layers;
		}
		
		draw(ctx: CanvasRenderingContext2D): void
		{
			this.getLayers().forEach(function(layer: Layer) {
				layer.draw(ctx);
			});
		}
	}
	
	export class Layer
	{
		private nodes: Node[] = [];
		
		addNode(node: Node): void
		{
			this.nodes.push(node);
		}
		
		getNodes(): Node[]
		{
			return this.nodes;
		}
		
		draw(ctx: CanvasRenderingContext2D): void
		{
			this.getNodes().forEach(function(node: Node) {
				node.draw(ctx);
			});
		}
	}
	
	export class Node
	{
		constructor(public x: number, public y: number)
		{
						
		}
		
		draw(ctx: CanvasRenderingContext2D): void
		{
			// Abstract
		}
	}
}

module TapTheCat
{
	export class DemoScreen extends SNRGameEngine.Screen {
		constructor() {
			super();
			var game = SNRGameEngine.Game.getInstance();
			var layer = new SNRGameEngine.Layer();
			for (var x = 10; x < 100; x++) {
				var box = new Box(
					Math.floor(Math.random() * game.getScreenWidth()),
					Math.floor(Math.random() * game.getScreenHeight())
				);
				layer.addNode(box);	
			}
			this.addLayer(layer);			
		}
	}
	
	class Box extends SNRGameEngine.Node {
		draw(ctx: CanvasRenderingContext2D): void
		{
			ctx.fillStyle = "#00FF00";
			ctx.fillRect(this.x, this.y, 20, 20);
		}
	}
}

var game = SNRGameEngine.Game.getInstance();
game.attachCanvas(<HTMLCanvasElement>document.getElementById('gameCanvas'));
game.setScreen(new TapTheCat.DemoScreen());
game.run();