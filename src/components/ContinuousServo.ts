import Servo from './Servo';

class ContinuousServo extends Servo
{
  constructor(pin:number) {
    super({
      pin,
      type: 'continuous'
    });
  }

  public Control(): void {
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    process.stdin.setRawMode(true);

    process.stdin.on("keypress", (ch, key) => {

      if (!key) {
        return;
      }

      if (key.name === "up") {
        this.servo.cw(1);
      } else if (key.name === "down") {
        this.servo.ccw(1);
      } else if (key.name === "space") {
        console.log("Stopping");
        this.servo.stop();
      }
    });
  }

  public Start(): void {
    if (this.servo) {
      this.servo.center();
    }
  }

  public Exit(): void {
    if (this.servo) {
      this.servo.center();
    }
  }
}

export default ContinuousServo;