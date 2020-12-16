
type FoodColor = "red"   | "blue" | "green";
type Point     = { x: number, y: number };
type Food      = { location: Point, color: string };

type Snake     = Food[];


type Game = { screen: Screen, current_direction: Direction, snakes: Snake[], food: Food[] };


type Context = { fillRect:any,fillStyle: string, arc:any ,fill:any, clearRect: any, stroke: any};

type Screen = {ctx: Context, width: number, height: number}

type Document = {body:any,createElement:any}
type Direction = "right" | "left" | "up"| "down";

export { FoodColor, Point, Food, Snake, Direction, Context, Document, Screen, Game };
