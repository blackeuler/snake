import { Point } from './types'

const translate_point = (point: Point, translateBy: Point): Point =>
  ({ x: point.x + translateBy.x,
     y: point.y + translateBy.y
  })
const reflect_point = ({ x, y }: Point): Point =>
  ({ x: -x, y: -y})

const center_location = (boxPoint: Point): Point =>
  ({ x: boxPoint.x / 2, y: boxPoint.y / 2});
const random_location = (boxPoint: Point): Point =>
  ({ x: Math.random() * boxPoint.x, y: Math.random() * boxPoint.y});

const eq_location = (point1: Point, point2: Point): Boolean =>
  (point1.x === point2.x && point1.y === point2.y)

const gen_rand_uni_loc = (amount: number, boxPoint: Point): Point[] =>{
  const locations: Point[] = []
  for(var x = 0; x < amount; x++){
    locations.push(random_location(boxPoint))
  }
  return locations;
}


const collision = (p1: Point, p2: Point) => {
  return (
    (  p1.x              < (p2.x + 20  ) &&
    ( (p1.x + 20) >  p2.x              ) &&
    (  p1.y              < (p2.y + 20) ) &&
    ( (p1.y + 20) >  p2.y              )
    ))
}


export {center_location,
        collision,
        translate_point,
        random_location,
        gen_rand_uni_loc,
        eq_location,
        reflect_point };
