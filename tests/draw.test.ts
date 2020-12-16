const { draw_snake } = require('../src/draw.ts');
const {ctx}          = require('jest-canvas-mock');


test('draws square', ()=>{
	expect(() => ctx.arc(1, 2, 3, 4)).toThrow(TypeError);
});
