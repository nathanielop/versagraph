import getHypotenuse from 'src/functions/get-hypotenuse.js';

export default ({ coordinateA, coordinateB }) => {
    const [{ x: x1, y1 }, { x: x2, y2 }] = [coordinateA, coordinateB];

    return Math.cosh((x2 - x1)/getHypotenuse(coordinateA, coordinateB))
}