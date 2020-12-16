import { Food, Screen, Document, Snake } from "./types";


const create_screen = (document: Document) => {
	const canvas   = document.createElement("canvas");
	canvas.height  = window.innerHeight;
	canvas.width   = window.innerWidth;
	const ctx = canvas.getContext("2d");
	document.body.append(canvas);
	return { ctx: ctx, width: canvas.width, height: canvas.height};
}

const draw_food = (food: Food, {ctx}: Screen) => {
	ctx.fillStyle = food.color;
	// TODO Figure out why the arc produces strange behavior
	// ctx.arc(food.location.x, food.location.y, 5,0, 2 * Math.PI);
	ctx.fillRect(food.location.x, food.location.y, 20, 20);
	// ctx.stroke();
	ctx.fillStyle = "";
}

const draw_snake = ( snake: Snake, screen: Screen ) =>
	snake.forEach((f) => draw_food(f,screen))

const clear = ({ ctx, width, height}: Screen) => {
 	ctx.clearRect(0, 0, width, height);
}

export {draw_food, draw_snake, clear, create_screen};
