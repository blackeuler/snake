
import { FoodColor, Point, Food, Snake } from './types';





const start = () =>
  console.log('todo');

const random_location = (boxPoint: Point): Point =>
  ({ x: Math.random() * boxPoint.x, y: Math.random() * boxPoint.y});

const create_food = (location: Point, color: FoodColor): Food =>
  ({ location, color });

const create_snake = (snakePos: Point, snakeColor: FoodColor): Snake =>
  [ create_food( snakePos, snakeColor) ];





export { start, create_snake, create_food, random_location };
