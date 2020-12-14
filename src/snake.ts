
import { Food, FoodColor, Point, Snake } from './types';





const start = () =>
  console.log('todo');

const random_location = (boxPoint: Point): Point =>
  ({ x: Math.random() * boxPoint.x, y: Math.random() * boxPoint.y});

const create_food = (location: Point, color: FoodColor): Food =>
  ({ location, color });

const create_snake = (snakePos: Point, snakeColor: FoodColor): Snake =>
  ([ create_food( snakePos, snakeColor) ]);

const random_snake = (box_point: Point): Snake =>
  create_snake( random_location( box_point ), "red" )




export { start, create_snake, random_snake, create_food, random_location };
