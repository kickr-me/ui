export class Stopwatch {
  constructor(minutes = 0, seconds = 0) {
    this._seconds = seconds;
    this._minutes = minutes;
  }

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

  _format(value) {
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
