import { create_food } from './snake';
import { Game, Square, Screen, Food} from './types';
import { random_location } from './point';

const create_screen = (): Screen => {
  const canvas  = document.createElement("canvas");
  canvas.height = window.innerHeight;
  canvas.width  = window.innerWidth;
  const screen  = canvas.getContext("2d")!;
  document.body.append(canvas);
  return screen;

}


const draw_square = (square: Square, screen: Screen): void => {
  screen.fillStyle = square.color;
  screen.fillRect(square.location.x,
                  square.location.y,
                  square.size,
                  square.size);
}
const clear_screen = (screen: Screen): void =>{
  screen.fillStyle = "white";
  screen.fillRect(0,0, window.innerWidth,window.innerHeight);
}
const draw_food  = ( food: Food, screen: Screen ): void =>
  draw_square( {...food, size: 20} ,screen)

const draw_game_food = (food: Food[], screen: Screen): void =>{
  food.map(f => draw_food(f,screen));
}

const draw_game  = ( game: Game, screen: Screen ): void =>{
  clear_screen(screen);
  draw_game_food(game.food, screen);
  draw_game_food(game.snake, screen);
}


export {create_screen, draw_game}
