import {State, Food, Point} from './types';
import {center_location, gen_rand_uni_loc} from './point'
import {collision,c_snake_l,grow_snake,move_snake, touches, create_food} from './snake';




  const generate_game_food = (bound: Point): Food[] => {
    return gen_rand_uni_loc(30,bound).map(p => create_food(p,"red"))
  }
const init_state = (): State =>{
  const game_screen_bound = {x: window.innerWidth, y: window.innerHeight};
  const snake = c_snake_l(5,center_location(game_screen_bound),"blue");
  const food = generate_game_food(game_screen_bound);
  return {bound: game_screen_bound, snake, food,playerDirection: "down" };
}







const update_state   = (state: State): State =>{
  var moved_snakes_state = {...state,
                            snake: move_snake(state.playerDirection,
                                                        state.snake)}
  var collision_checked_state = check_collision(moved_snakes_state);
  if (state.food.length < 15) {
   return {...collision_checked_state,food: state.food.concat(generate_game_food(state.bound))}
  }

  return collision_checked_state;
}


const check_collision  = (state: State): State => {
  var new_food: Food[] = []
  var new_snake = state.snake;
  for (var s = 0;s < state.food.length;s++) {
    if(touches(state.snake,state.food[s])){
      new_snake = grow_snake(state.playerDirection,state.snake);
    }
    else{
      new_food.push(state.food[s]);
    }
  }
  if(state.snake[0].location.x > state.bound.x || state.snake[0].location.x < 0){
    new_snake = c_snake_l(5,center_location(state.bound),"blue");
  }
  if(state.snake[0].location.y > state.bound.y || state.snake[0].location.y < 0){
    new_snake = c_snake_l(5,center_location(state.bound),"blue");
  }
  return {...state,snake: new_snake, food:new_food}
}
// Move Snake in Direction of current Direction
// check for collisions
// Grow Snake

export {
  init_state,
  update_state
}
