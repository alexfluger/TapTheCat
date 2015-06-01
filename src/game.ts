class Game
{
	private ctx: CanvasRenderingContext2D;
	
	constructor(private canvas: HTMLCanvasElement)
	{
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		this.ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
	}
}