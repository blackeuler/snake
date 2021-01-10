(function () {
    'use strict';

    const translate_point = (point, translateBy) => ({ x: point.x + translateBy.x,
        y: point.y + translateBy.y
    });
    const reflect_point = ({ x, y }) => ({ x: -x, y: -y });
    const center_location = (boxPoint) => ({ x: boxPoint.x / 2, y: boxPoint.y / 2 });
    const random_location = (boxPoint) => ({ x: Math.random() * boxPoint.x, y: Math.random() * boxPoint.y });
    const eq_location = (point1, point2) => (point1.x === point2.x && point1.y === point2.y);
    const gen_rand_uni_loc = (amount, boxPoint) => {
        const locations = [];
        for (var x = 0; x < amount; x++) {
            locations.push(random_location(boxPoint));
        }
        return locations;
    };
    const collision = (p1, p2) => {
        return ((p1.x < (p2.x + 20) &&
            ((p1.x + 20) > p2.x) &&
            (p1.y < (p2.y + 20)) &&
            ((p1.y + 20) > p2.y)));
    };

    const create_food = (location, color) => ({ location, color });
    const create_snake = (snakePos, snakeColor) => ([create_food(snakePos, snakeColor)]);
    const is_touching = (snake, food) => {
        for (let x = 0; x < food.length; x++) {
            if (collision(snake[0].location, food[x].location)) {
                return true;
            }
        }
        return false;
    };
    const direction_translate_by = {
        "up": { x: 0, y: -1 },
        "down": { x: 0, y: 1 },
        "left": { x: -1, y: 0 },
        "right": { x: 1, y: 0 }
    };
    const move_snake = (direction, snake) => {
        if (snake.length == 1) {
            return [{
                    location: translate_point(snake[0].location, direction_translate_by[direction]),
                    color: snake[0].color
                }];
        }
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

    const game_screen_bound = { x: window.innerWidth, y: window.innerHeight };
    const create_game = () => {
        const snake = create_snake(center_location(game_screen_bound), "blue");
        const food = generate_game_food();
        return { snake, food };
    };
    const play_game = (game, screen) => {
        const new_game = update_game(game);
        draw_game(new_game, screen);
        window.requestAnimationFrame((t) => {
            play_game(new_game, screen);
        });
    };
    const update_game = (game) => {
        if (is_touching(game.snake, game.food)) {
            return { snake: update_snake(grow_snake("up", game.snake)), food: game.food };
        }
        const new_game = { snake: update_snake(game.snake), food: game.food };
        return new_game;
    };
    const update_snake = (snake) => (move_snake("down", snake));
    const generate_game_food = () => {
        return gen_rand_uni_loc(50, game_screen_bound).map(p => create_food(p, "red"));
    };
    const start_game = (game) => {
        const screen = create_screen();
        draw_game(game, screen);
        window.requestAnimationFrame(() => {
            play_game(game, screen);
        });
    };
    start_game(create_game());

}());
