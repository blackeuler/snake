
const canvas = document.createElement("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext("2d");
document.body.append(canvas);

const using_debug = true;

const debug_log = l =>
  using_debug? console.log(l) : true;





// What do I want to work with for now
// A snake, on a black background,
// I want movement and will need location of a snake
// How might I represent a snake, a list of coordinates, with color
// ok lets go with a list what is a coordineate (x,y) value lets use
const speed = 2;
const randomLocation = () => { glocation(Math.random() * canvas.width, Math.random() * canvas.height) }





const glocation = (x, y) => ({ x, y });

const glocation_left  = ({ x, y, ... model }) => ({ x: x-speed, y,          ... model });
const glocation_right = ({ x, y, ... model }) => ({ x: x+speed, y,          ... model });
const glocation_up    = ({ x, y, ... model }) => ({ x,          y: y-speed, ... model });
const glocation_down  = ({ x, y, ... model }) => ({ x,          y: y+speed, ... model });





const growBy = (snake, x_value, growth_func) => {

  if (x_value === 0) {
    return s;
  } else {
    w = g(s)
    console.log(w)
    return growBy(w, x_value - 1, growth_func)
  }

}





const snake = () => [];
const createFood = (x, y) => ({ ...glocation(x, y), width: 15, height: 15 })
const createSnake = (x, y) => [{ ...glocation(x, y), width: 15, height: 15 }];
const randomSnake = () => createSnake(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));
const snakeHead = s => {
    return s[0]
};
const snakeTail = s => s.slice(1, s.length);





const grow_right = s => [ glocation_right(snakeHead(s)), ... s.slice(0, s.length) ];
const grow_left  = s => [ glocation_left(snakeHead(s)),  ... s.slice(0, s.length) ];
const grow_up    = s => [ glocation_up(snakeHead(s)),    ... s.slice(0, s.length) ];
const grow_down  = s => [ glocation_down(snakeHead(s)),  ... s.slice(0, s.length) ];

const move_right = s => [ glocation_right(snakeHead(s)), ... s.slice(0, s.length - 1) ];
const move_left  = s => [ glocation_left(snakeHead(s)),  ... s.slice(0, s.length - 1) ];
const move_up    = s => [ glocation_up(snakeHead(s)),    ... s.slice(0, s.length - 1) ];
const move_down  = s => [ glocation_down(snakeHead(s)),  ... s.slice(0, s.length - 1) ];





const initialState = () => ({
    snakes      : [ randomSnake(), randomSnake(), randomSnake() ],  // colliding snakes are not the bees knees at all
    currentMove : "Up",
    food        : []
})





const movementFunctions = {
  Left  : move_left,
  Right : move_right,
  Up    : move_up,
  Down  : move_down
};

const process_moves = (move, snake) => {

  const move_pred = movementFunctions[move];

  if (move_pred) { return move_pred(snake); }
  else           { throw new Error(`No such direction ${move}`); } // wait this language has error handling?

}





// What snakes we may have examples
// EXAMPLES----------- A snake starts off as a dot.
// . . . .
//       .
//       . . ,
//           .
//
//

const collision = (p1, p2) => {
    return (p1.x < p2.x + p2.width &&
        p1.x + p1.width > p2.x &&
        p1.y < p2.y + p2.height &&
        p1.y + p1.height > p2.y)
}
const wallCollision = (state) => {
    newSnakes = []
    for (let index = 0; index < state.snakes.length; index++) {
        const snake = state.snakes[index];
        if (snake[0].x < 0 || snake[0].y < 0 || snake[0].y > canvas.height || snake[0].x > canvas.width) {
            newSnakes[index] = randomSnake();
        }
        else {
            newSnakes[index] = snake;
        }
    }
    return { ...state, snakes: newSnakes };
}
const foodCollision = (state) => {
    let newSnakes = []
    let newFood = []
    for (let index = 0; index < state.snakes.length; index++) {
        const snake = state.snakes[index];
        for (let foodIndex = 0; foodIndex < state.food.length; foodIndex++) {
            const food = state.food[foodIndex];
            if (collision(snake[0], food)) {
                newSnakes[index] = growBy(snake, 8, grow_up)
                state.food.splice(foodIndex, 1)

            }
            else {
                newSnakes[index] = snake;
                newFood[foodIndex] = food;
            }
        }

    }

    return { ...state, food: newFood, snakes: newSnakes }


}

const snakeCollides = (s1, s2) => {
    for (let index = 0; index < s2.length; index++) {
        const element = s2[index];
        if (collision(s1[0], element)) {
            return true;
        }
    }
    return false;
}

const snakeCollision = (state) => {
    let newSnakes = []
    let newFood = []

    for (let index = 0; index < state.snakes.length; index++) {
        const snake1 = state.snakes[index];
        for (let foodIndex = 0; foodIndex < state.snakes.length; foodIndex++) {
            const snake2 = state.snakes[foodIndex];
            if (snakeCollides(snake1, snake2) && index!=foodIndex) {
                newSnakes[index] = createSnake(34,33);
                newFood = [...snake1, ...newFood];

            }
            else {
                newSnakes[index] = snake1;
            }
        }

    }
    f = [...newFood,...state.food]

    return { ...state, food: [...state.food, ...newFood], snakes: newSnakes }


}
const updateSnakes = (state) => {
    newSnakes = []
    for (let index = 0; index < state.snakes.length; index++) {
        const element = state.snakes[index];
        if (index == 0) {
            newSnakes[index] = process_moves(state.currentMove, element)
        } else {
            moves = ["Left", "Up", "Down", "Right"]
            let nextMove = Math.floor(Math.random() * 4)
            newSnakes[index] = process_moves(moves[nextMove], element)
        }
    }
    return { ...state, snakes: newSnakes }
}
let state = initialState();
const step = (t) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (state.food.length < Math.random() * 20) {
        state.food = [...state.food, createFood(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height))];
    }


    state = wallCollision(foodCollision(snakeCollision(updateSnakes(state))));
    drawFood(state.food)
    drawSnakes(state.snakes)

    return t + 1;
}

const drawBackground = () => ctx.fillRect(0, 0, canvas.width, canvas.height);

const drawsquare = (color, x, y, size) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    ctx.fillStyle = "";
}

function drawSnakes(snakes) {
    snakes.map(s => drawSnake(s))
}
const drawSnake = (s) => {
    s.forEach(p => {
        if (p.head) {
            drawsquare("yellow", p.x, p.y, p.height)
        }
        else {
            drawsquare("red", p.x, p.y, p.width)
        }
    });
    return s;
}






const drawFood = s =>
  s.map(p => drawsquare("blue", p.x, p.y, p.width));

const draw = () =>
  drawSnake(createSnake(canvas.width / 2, canvas.height / 2));





setInterval(step, 10, 0);





const arrowKeysToCurrentMoveResults = {
  ArrowUp    : "Up",
  ArrowDown  : "Down",
  ArrowLeft  : "Left",
  ArrowRight : "Right"
};

const handleKeyPress = ({ key }) => {

  if (arrowKeysToCurrentMoveResults[key]) {
    state.currentMove = arrowKeysToCurrentMoveResults[key];
  } else {
    debug_log(`No registered key handler for '${key}'`)
  }

}





document.addEventListener("keydown", handleKeyPress, false);

document.getElementById("play").addEventListener("onclick",start,false);
