import { create_food, random_location } from './snake';
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
export { start_game };
