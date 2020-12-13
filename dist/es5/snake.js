"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random_location = exports.create_food = exports.create_snake = exports.start = void 0;
var start = function () {
    return console.log('todo');
};
exports.start = start;
var random_location = function (boxPoint) {
    return ({ x: Math.random() * boxPoint.x, y: Math.random() * boxPoint.y });
};
exports.random_location = random_location;
var create_food = function (location, color) {
    return ({ location: location, color: color });
};
exports.create_food = create_food;
var create_snake = function (snakePos, snakeColor) {
    return [create_food(snakePos, snakeColor)];
};
exports.create_snake = create_snake;
