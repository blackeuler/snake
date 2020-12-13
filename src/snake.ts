
const start = () =>

  console.log('todo');

const FOOD_COLORS  =  [ "red", "blue", "green" ];

type Point = { x: number, y: number };
type Food  = { location: Point, color: string };


const random_location = function (boxPoint: Point) : Point {
  return { x: Math.random() * boxPoint.x, y: Math.random() * boxPoint.y}
}


const create_food  =  (location: Point, color: string) => ({ location, color });


const create_snake = (snakePos: Point, snakeColor: string) => 
  [ create_food( snakePos, snakeColor) ];


export { start, create_snake, create_food, random_location };
