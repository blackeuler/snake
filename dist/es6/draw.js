const create_screen = () => {
    const canvas = document.createElement("canvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    const screen = canvas.getContext("2d");
    document.body.append(canvas);
    return screen;
};
const draw_square = (square, screen) => {
    screen.fillStyle = square.color;
    screen.fillRect(square.location.x, square.location.y, square.size, square.size);
};
const clear_screen = (screen) => {
    screen.fillStyle = "white";
    screen.fillRect(0, 0, window.innerWidth, window.innerHeight);
};
const draw_food = (food, screen) => draw_square(Object.assign(Object.assign({}, food), { size: 20 }), screen);
const draw_game_food = (food, screen) => {
    food.map(f => draw_food(f, screen));
};
const draw_game = (game, screen) => {
    clear_screen(screen);
    draw_game_food(game.food, screen);
    draw_game_food(game.snake, screen);
};
export { create_screen, draw_game };
