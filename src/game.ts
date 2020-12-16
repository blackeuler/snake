import { clear, draw_food, create_screen } from "./draw";
import { create_food, random_food,move_snake, random_snake } from "./snake";
import { Screen, Document, Game } from "./types";

const start_game = (document: Document) => {
	const screen = create_screen(document);
	let   game: Game = { screen: screen, current_direction: "right", snakes:[random_snake({x: screen.width, y:screen.height})], food:[]}
	setInterval(step, 1000, 0, game);
}

const update_game = (game: Game): Game => {
	return {...game, snakes: game.snakes.forEach(snake => move_snake(game.current_direction,snake))};

}



const step      =  ( timestep: number, game: Game ) => {
	clear(game.screen);
	game = update_game(game);
	const food    = random_food({ x: game.screen.width, y: game.screen.height });

	draw_food(food, game.screen);
	return timestep + 1;
}

export {start_game};
