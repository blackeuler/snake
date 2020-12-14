
import { Direction, Food, FoodColor, Point, Snake } from './types';





const start = () =>
  console.log('todo');

const random_location = (boxPoint: Point): Point =>
  ({ x: Math.random() * boxPoint.x, y: Math.random() * boxPoint.y});

const eq_location = (point1: Point, point2: Point): Boolean =>
  (point1.x === point2.x && point1.y === point2.y)

const create_food = (location: Point, color: FoodColor): Food =>
  ({ location, color });

const create_snake = (snakePos: Point, snakeColor: FoodColor): Snake =>
  ([ create_food( snakePos, snakeColor) ]);

const random_snake = (box_point: Point): Snake =>
  create_snake( random_location( box_point ), "red" )


const direction_translate_by = {
    "up": { x:  0, y:  1 },
  "down": { x:  0, y: -1 },
  "left": { x: -1, y:  0 },
 "right": { x:  1, y:  0 }
}


const move_snake =  (direction: Direction, snake: Snake) =>{
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
    location: translate_point( snake[snake.length -1].location, reflect_point(direction_translate_by[direction]) ), 
    color: snake[snake.length-1].color}
  return [...snake, new_tail]
}
  


const translate_point = (point: Point, translateBy: Point): Point =>
  ({ x: point.x + translateBy.x, 
     y: point.y + translateBy.y 
  })
const reflect_point = ({ x, y }: Point): Point =>
  ({ x: -x, y: -y})



  export { start, create_snake, random_snake, create_food, random_location, translate_point, move_snake, eq_location, reflect_point, grow_snake };

