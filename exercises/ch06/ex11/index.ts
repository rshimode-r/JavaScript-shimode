export const polarCoordinatObj = {
  r: 0,
  theta: 0,
  get x() {
    return this.r * Math.cos(this.theta);
  },
  set x(value: number) {
    if (Number.isNaN(value)) throw new TypeError("Invalid value for x: NaN");
    const y = this.y;
    this.r = Math.sqrt(value * value + y * y);
    this.theta = Math.atan2(y, value);
  },
  get y() {
    return this.r * Math.sin(this.theta);
  },
  set y(value: number) {
    if (Number.isNaN(value)) throw new TypeError("Invalid value for y: NaN");
    const x = this.x;
    this.r = Math.sqrt(x * x + value * value);
    this.theta = Math.atan2(value, x);
  },
};
