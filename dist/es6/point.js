const translate_point = (point, translateBy) => ({ x: point.x + translateBy.x,
    y: point.y + translateBy.y
});
const reflect_point = ({ x, y }) => ({ x: -x, y: -y });
const center_location = (boxPoint) => ({ x: boxPoint.x / 2, y: boxPoint.y / 2 });
const random_location = (boxPoint) => ({ x: Math.random() * boxPoint.x, y: Math.random() * boxPoint.y });
const eq_location = (point1, point2) => (point1.x === point2.x && point1.y === point2.y);
const gen_rand_uni_loc = (amount, boxPoint) => {
    const locations = [];
    for (var x = 0; x < amount; x++) {
        locations.push(random_location(boxPoint));
    }
    return locations;
};
const collision = (p1, p2) => {
    return ((p1.x < (p2.x + 20) &&
        ((p1.x + 20) > p2.x) &&
        (p1.y < (p2.y + 20)) &&
        ((p1.y + 20) > p2.y)));
};
export { center_location, collision, translate_point, random_location, gen_rand_uni_loc, eq_location, reflect_point };
