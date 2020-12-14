const { create_snake, create_food, random_location, random_snake, start, translate_point } = require('../src/snake.ts');



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

test('translate a point ', () => 
  {
    const start_point  = { x: 3                , y: 3                 };
    const translate_by = { x: 1                , y: 1                 };
    const end_point    = { x: start_point.x + 1, y: start_point.y + 1 }; 
    
    expect( translate_point(start_point, translate_by) ).toEqual( end_point );
  });