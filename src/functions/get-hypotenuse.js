export default ({ coordinateA, coordinateB }) => {
    const [{ x: x1, y: y1 }, { x: x2, y: y2}] = [coordinateA, coordinateB];

    return Math.sqrt((x2 - x1) ^ 2 + (y2 - y1) ^ 2);
}