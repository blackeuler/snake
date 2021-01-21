import { translate_point, random_location, reflect_point, collision } from './point';
const create_food = (location, color) => ({ location, color });
const translate_food = (food, direction) => (Object.assign(Object.assign({}, food), { location: translate_point(food.location, direction_grow_by[direction]) }));
const create_snake = (snakePos, snakeColor) => ([create_food(snakePos, snakeColor)]);
const c_snake_l = (len, snakePos, snakeColor) => {
    var snake = create_snake(snakePos, snakeColor);
    for (var x = 0; x < len; x++) {
        snake = grow_snake("right", snake);
    }
    return snake;
};
const random_snake = (box_point) => create_snake(random_location(box_point), "red");
const is_touching = (snake, food) => {
    for (let x = 0; x < food.length; x++) {
        if (collision(snake[0].location, food[x].location)) {
            return true;
        }
    }
    return false;
};
const touches = (snake, food) => (collision((snake[0]).location, food.location));
const direction_translate_by = {
    "up": { x: 0, y: -1 },
    "down": { x: 0, y: 1 },
    "left": { x: -1, y: 0 },
    "right": { x: 1, y: 0 }
};
const direction_grow_by = {
    "up": { x: 0, y: -5.20 },
    "down": { x: 0, y: 5.20 },
    "left": { x: -5.20, y: 0 },
    "right": { x: 5.20, y: 0 }
};
const move_snake = (direction, snake) => {
    const new_head = translate_food(snake[0], direction);
    return [new_head, ...snake.slice(0, snake.length - 1)];
};
const grow_snake = (direction, snake) => {
    //TODO Clean Up
    const new_tail = {
        location: translate_point(snake[snake.length - 1].location, reflect_point(direction_grow_by[direction])),
        color: snake[snake.length - 1].color
    };
    return [...snake, new_tail];
};
export { collision, c_snake_l, touches, create_snake, random_snake, create_food, move_snake, grow_snake };
