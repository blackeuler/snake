var snake = (function (exports) {
    'use strict';

    const start = () => console.log('todo');
    const random_location = (boxPoint) => ({ x: Math.random() * boxPoint.x, y: Math.random() * boxPoint.y });
    const eq_location = (point1, point2) => (point1.x === point2.x && point1.y === point2.y);
    const create_food = (location, color) => ({ location, color });
    const create_snake = (snakePos, snakeColor) => ([create_food(snakePos, snakeColor)]);
    const random_snake = (box_point) => create_snake(random_location(box_point), "red");
    const direction_translate_by = {
        "up": { x: 0, y: 1 },
        "down": { x: 0, y: -1 },
        "left": { x: -1, y: 0 },
        "right": { x: 1, y: 0 }
    };
    const move_snake = (direction, snake) => {
        const head = snake[0];
        const body = snake.slice(1, snake.length);
        //TODO Clean Up
        const new_head = {
            location: translate_point(head.location, direction_translate_by[direction]),
            color: head.color
        };
        const new_snake = [new_head, head, ...body.slice(0, body.length - 1)];
        return eq_location(new_head.location, body[0].location) ? snake : new_snake;
    };
    const grow_snake = (direction, snake) => {
        //TODO Clean Up
        const new_tail = {
            location: translate_point(snake[snake.length - 1].location, reflect_point(direction_translate_by[direction])),
            color: snake[snake.length - 1].color
        };
        return [...snake, new_tail];
    };
    const translate_point = (point, translateBy) => ({ x: point.x + translateBy.x,
        y: point.y + translateBy.y
    });
    const reflect_point = ({ x, y }) => ({ x: -x, y: -y });

    exports.create_food = create_food;
    exports.create_snake = create_snake;
    exports.eq_location = eq_location;
    exports.grow_snake = grow_snake;
    exports.move_snake = move_snake;
    exports.random_location = random_location;
    exports.random_snake = random_snake;
    exports.reflect_point = reflect_point;
    exports.start = start;
    exports.translate_point = translate_point;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
