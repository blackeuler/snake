(function () {
    'use strict';

    const translate_point = (point, translateBy) => ({ x: point.x + translateBy.x,
        y: point.y + translateBy.y
    });
    const reflect_point = ({ x, y }) => ({ x: -x, y: -y });
    const center_location = (boxPoint) => ({ x: boxPoint.x / 2, y: boxPoint.y / 2 });
    const random_location = (boxPoint) => ({ x: Math.random() * boxPoint.x, y: Math.random() * boxPoint.y });
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
    const translate_food = (food, direction) => (Object.assign(Object.assign({}, food), { location: translate_point(food.location, direction_grow_by[direction]) }));
    const create_snake = (snakePos, snakeColor) => ([create_food(snakePos, snakeColor)]);
    const c_snake_l = (len, snakePos, snakeColor) => {
        var snake = create_snake(snakePos, snakeColor);
        for (var x = 0; x < len; x++) {
            snake = grow_snake("right", snake);
        }
        return snake;
    };
    const touches = (snake, food) => (collision((snake[0]).location, food.location));
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

    const generate_game_food = (bound) => {
        return gen_rand_uni_loc(30, bound).map(p => create_food(p, "red"));
    };
    const init_state = () => {
        const game_screen_bound = { x: window.innerWidth, y: window.innerHeight };
        const snake = c_snake_l(5, center_location(game_screen_bound), "blue");
        const food = generate_game_food(game_screen_bound);
        return { bound: game_screen_bound, snake, food, playerDirection: "down" };
    };
    const update_state = (state) => {
        var moved_snakes_state = Object.assign(Object.assign({}, state), { snake: move_snake(state.playerDirection, state.snake) });
        var collision_checked_state = check_collision(moved_snakes_state);
        if (state.food.length < 15) {
            return Object.assign(Object.assign({}, collision_checked_state), { food: state.food.concat(generate_game_food(state.bound)) });
        }
        return collision_checked_state;
    };
    const check_collision = (state) => {
        var new_food = [];
        var new_snake = state.snake;
        for (var s = 0; s < state.food.length; s++) {
            if (touches(state.snake, state.food[s])) {
                new_snake = grow_snake(state.playerDirection, state.snake);
            }
            else {
                new_food.push(state.food[s]);
            }
        }
        if (state.snake[0].location.x > state.bound.x || state.snake[0].location.x < 0) {
            new_snake = c_snake_l(5, center_location(state.bound), "blue");
        }
        if (state.snake[0].location.y > state.bound.y || state.snake[0].location.y < 0) {
            new_snake = c_snake_l(5, center_location(state.bound), "blue");
        }
        return Object.assign(Object.assign({}, state), { snake: new_snake, food: new_food });
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
    const draw_state = (state, screen) => {
        clear_screen(screen);
        draw_game_food(state.snake, screen);
        draw_game_food(state.food, screen);
    };

    const create_game = () => ({ screen: create_screen(), state: init_state() });
    const start_game = (game) => step_game(game);
    const hkpHandlers = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowRight: "right",
        ArrowLeft: "left"
    };
    const oppositeDirection = {
        "up": "down",
        "down": "up",
        "left": "right",
        "right": "left"
    };
    const step_game = ({ state, screen }) => {
        draw_state(state, screen);
        const handleKeyPress = ({ key }) => {
            const handler = hkpHandlers[key];
            if (handler && handler != oppositeDirection[state.playerDirection]) {
                state.playerDirection = handler;
            }
        };
        document.addEventListener("keydown", handleKeyPress);
        setTimeout(function () {
            window.requestAnimationFrame((t) => {
                step_game({ state: update_state(state), screen: screen });
            });
        }, 1000 / 60);
    };
    start_game(create_game());

}());
