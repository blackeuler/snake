const start = () => console.log('todo');
const random_location = (boxPoint) => ({ x: Math.random() * boxPoint.x, y: Math.random() * boxPoint.y });
const create_food = (location, color) => ({ location, color });
const create_snake = (snakePos, snakeColor) => [create_food(snakePos, snakeColor)];
export { start, create_snake, create_food, random_location };
