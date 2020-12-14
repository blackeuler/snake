
type FoodColor = "red"   | "blue" | "green";
type Point     = { x: number, y: number };
type Food      = { location: Point, color: string };

type Snake     = Food[];

type Direction = "right" | "left" | "up"| "down";

export { FoodColor, Point, Food, Snake, Direction };
