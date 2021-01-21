import { update_state, init_state } from './state';
import { create_screen, draw_state } from './draw';
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
