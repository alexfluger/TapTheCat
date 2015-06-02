module SNRGameEngine
{
	export class Game
	{
		protected ctx: CanvasRenderingContext2D;
		private currentScreen: Screen = null;
		
		constructor(private canvas: HTMLCanvasElement)
		{
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			this.ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
		}
		
		setScreen(screen: Screen): void
		{
			this.currentScreen = screen;
		}
		
		getScreen(): Screen
		{
			return this.currentScreen;
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
	export class Game extends SNRGameEngine.Game {
		load(): void
		{
			this.setScreen(new DemoScreen());
		}
		
		run(): void
		{
			this.getScreen().draw(this.ctx);
		}
	}
	
	class DemoScreen extends SNRGameEngine.Screen {
		constructor() {
			super();
			var layer = new SNRGameEngine.Layer();
			for (var x = 10; x < 100; x++) {
				var box = new Box(
					Math.floor(Math.random() * 1000),
					Math.floor(Math.random() * 1000)
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

var game = new TapTheCat.Game(<HTMLCanvasElement>document.getElementById('gameCanvas'));
game.load();
game.run();