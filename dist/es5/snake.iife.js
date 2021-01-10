var snake = (function (exports) {
    'use strict';

    const random_location = (boxPoint) => ({ x: Math.random() * boxPoint.x, y: Math.random() * boxPoint.y });
    const create_food = (location, color) => ({ location, color });

    const start_game = () => {
        const canvas = document.createElement("canvas");
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        const screen = canvas.getContext("2d");
        document.body.append(canvas);
        const exFood = create_food(random_location({ x: 3, y: 30 }), "red");
        draw_food(exFood, screen);
    };
    const draw_square = (square, screen) => {
        screen.fillStyle = square.color;
        screen.fillRect(square.location.x, square.location.y, square.size, square.size);
    };
    const draw_food = (food, screen) => draw_square(Object.assign(Object.assign({}, food), { size: 20 }), screen);
    start_game();

    exports.start_game = start_game;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
