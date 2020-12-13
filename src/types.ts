
type FoodColor = "red" | "blue" | "green";
type Point     = { x: number, y: number };
type Food      = { location: Point, color: string };

type Snake     = Food[];

export { FoodColor, Point, Food, Snake };
