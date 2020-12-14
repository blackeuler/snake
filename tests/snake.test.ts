const { create_snake, create_food, random_location, random_snake, start } = require('../src/snake.ts');



test('creating food returns, an object of x,y and color', () => {

    const location = {             x: 1, y: 1 };
    const food     = { location: { x: 1, y: 1 }, color: "red" };

    expect(create_food(location,"red")).toEqual(food);
  });

test('random location doesnt go outside bound', () => {
    const   location = random_location({ x: 3, y: 3 });

    expect( location.x  ).toBeLessThanOrEqual(3);
    expect( location.y  ).toBeLessThanOrEqual(3);
  });

test("creates a snake,randomly", () => {
    const box_point = { x:1, y:1 };

    expect(random_snake(box_point)).toHaveLength(1);
  });

test('create snake returns list of length 1',()=>{
    expect(create_snake()).toHaveLength(1);
  });
