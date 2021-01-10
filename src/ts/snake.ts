import { Direction, Food, FoodColor, Point, Snake } from './types';
import { translate_point,
         random_location,
         reflect_point,
  eq_location,
  collision} from './point'


const create_food = (location: Point, color: FoodColor): Food =>
  ({ location, color });

const create_snake = (snakePos: Point, snakeColor: FoodColor): Snake =>
  ([ create_food( snakePos, snakeColor) ]);

const random_snake = (box_point: Point): Snake =>
  create_snake( random_location( box_point ), "red" )


const is_touching = (snake: Snake, food: Food[]): Boolean => {
  for(let x = 0; x < food.length; x++){
    if( collision(snake[0].location,food[x].location)){
      return true;
    }
  }
  return false;

}








const direction_translate_by = {
    "up": { x:  0, y: -1 },
  "down": { x:  0, y:  1 },
  "left": { x: -1, y:  0 },
 "right": { x:  1, y:  0 }
}










const move_snake =  (direction: Direction, snake: Snake) =>{
  if(snake.length == 1){
  return [{
    location: translate_point( snake[0].location, direction_translate_by[direction] ) ,
    color   : snake[0].color
  }];
  }
  const head = snake[0];
  const body = snake.slice(1,snake.length);

  //TODO Clean Up
  const new_head = { 
    location: translate_point( head.location, direction_translate_by[direction] ) ,
    color   : head.color
  };

  const new_snake = [new_head,head, ...body.slice(0,body.length - 1)]

  return eq_location(new_head.location,body[0].location) ? snake : new_snake;

}



const grow_snake = ( direction: Direction, snake: Snake ): Snake =>{
  //TODO Clean Up
  const new_tail = {
    location: translate_point( snake[snake.length -1].location,
                               reflect_point(direction_translate_by[direction])
                             ),
    color: snake[snake.length-1].color}
  return [...snake, new_tail]
}
  





  export {  is_touching,create_snake, random_snake, create_food,  move_snake, grow_snake };
