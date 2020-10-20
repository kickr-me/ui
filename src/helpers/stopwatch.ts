export class Stopwatch {
  constructor(private _minutes: number = 0, private _seconds: number = 0) {}

  get seconds() {
    return this._seconds;
  }

  get minutes() {
    return this._minutes;
  }

  set seconds(value) {
    this._seconds = value;
  }

  set minutes(value) {
    this._minutes = value;
  }

  _format(value: number) {
    if (value < 10) {
      return `0${value}`;
    } else if (value >= 10) {
      return value;
    }
  }

  toString() {
    return `${this._format(this._minutes)}:${this._format(this._seconds)}`;
  }
}
