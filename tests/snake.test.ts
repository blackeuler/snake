const { create_snake, create_food,random_location } = require('../src/snake.ts');




describe('creating food',()=>{
  it('creating food returns, an object of x,y and color', () => {
    expect( create_food({ x: 1, y: 1 }, "red")).toEqual({ location: { x: 1, y: 1 }, color: "red"} );
  })
});

test('random location doesnt go outside bound', () => {
  const   location = random_location({ x: 3, y: 3 });
  expect( location.x  ).toBeLessThanOrEqual(3);
  expect( location.y  ).toBeLessThanOrEqual(3);
})


test('create snake returns list of length 1',()=>{
  expect(create_snake()).toHaveLength(1);
})
