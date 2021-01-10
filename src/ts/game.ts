import { Game,
         Food,
         Snake,
         Screen } from './types';
import { create_snake,
         create_food,
  move_snake,
  is_touching,
  grow_snake} from './snake';
import { center_location, gen_rand_uni_loc } from './point';
import { create_screen, draw_game } from './draw';


const game_screen_bound = {x: window.innerWidth, y: window.innerHeight};





const create_game = (): Game =>{
  const snake = create_snake(center_location(game_screen_bound),"blue");
  const food = generate_game_food();
  return { snake, food };
}






const play_game     = (game: Game, screen: Screen):void => {
  const new_game    = update_game(game);
  draw_game(new_game, screen);
  window.requestAnimationFrame((t)=>{
    play_game(new_game,screen)
  })
}





const update_game   = (game: Game): Game => {
  if (is_touching(game.snake,game.food)){
    return { snake: update_snake(grow_snake("up",game.snake)), food: game.food}
  }
  const new_game = {snake: update_snake(game.snake), food: game.food};
  return new_game;
}



const update_snake  = (snake: Snake): Snake =>
    (move_snake("down",snake))


const generate_game_food = (): Food[] => {
 return gen_rand_uni_loc(50,game_screen_bound).map(p => create_food(p,"red"))
}




const start_game = (game: Game): void =>{
  const screen =  create_screen();
  draw_game(game,screen);
  window.requestAnimationFrame(()=>{
    play_game(game,screen)
  })
}

start_game(create_game());
