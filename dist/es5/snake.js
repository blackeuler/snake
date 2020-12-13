var snake = (function (exports) {
	'use strict';

	const start = () => console.log('todo');
	const random_location = (boxPoint) => ({ x: Math.random() * boxPoint.x, y: Math.random() * boxPoint.y });
	const create_food = (location, color) => ({ location, color });
	const create_snake = (snakePos, snakeColor) => [create_food(snakePos, snakeColor)];

	exports.create_food = create_food;
	exports.create_snake = create_snake;
	exports.random_location = random_location;
	exports.start = start;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

}({}));
