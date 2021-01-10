
type FoodColor = "red"   | "blue" | "green";
type Point     = { x: number, y: number };
type Food      = { location: Point, color: Color };

type Snake     = Food[];

type Direction = "right" | "left" | "up"| "down";

type Color     = "red"   | "blue" | "green" | "black";
type Square    = { location: Point, color: Color, size: number };

type Screen    = CanvasRenderingContext2D;

export { FoodColor, Point, Food, Snake, Direction, Color, Square, Screen };
