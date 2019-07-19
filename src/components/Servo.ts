import * as five from 'johnny-five';

import Component from './Component';

class Servo implements Component
{
  protected readonly option: number | five.ServoGeneralOption;

  protected servo?: five.Servo;

  constructor(option: number | five.ServoGeneralOption) {
    this.option = option;
  }

  public Init(): void {
    this.servo = new five.Servo(this.option);
    this.Start();
  }

  public Start(): void {
    // ...
  }

  public Exit(): void {
    if (this.servo) {
      this.servo.center();
    }
  }
}

export default Servo;