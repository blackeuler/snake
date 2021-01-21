import { update_state,  init_state } from './state';
import { create_screen, draw_state } from './draw'
import { Game, Direction } from './types';


const create_game = (): Game =>
  ({screen: create_screen(), state: init_state()})



const start_game  = (game: Game): void =>
  step_game(game);

const hkpHandlers: {[key:string]: Direction} = {
  ArrowUp    : "up",
  ArrowDown  : "down",
  ArrowRight : "right",
  ArrowLeft  : "left"
};

const oppositeDirection : {[key in Direction]: Direction} = {
  "up":"down",
  "down": "up",
  "left": "right",
  "right": "left"
}
const step_game  = ({state,screen}: Game): void => {
  draw_state(state,screen);
  const handleKeyPress = ({ key }: KeyboardEvent) => {
    const handler = hkpHandlers[key];
    if (handler && handler!= oppositeDirection[state.playerDirection]) { state.playerDirection = handler; }
  };
  document.addEventListener("keydown",handleKeyPress);
  setTimeout(function (){
  window.requestAnimationFrame((t)=>{
    step_game( {state: update_state(state), screen: screen});
  });},1000/60);
}







start_game(create_game());
