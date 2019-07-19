import { Motor } from "johnny-five";
import Component from './Component'

export default class SmallMotor implements Component {

  private component?: Motor;

  public Init(): void {
    this.component = new Motor([12]);
    this.Start();
  }

  public Start(): void {
    if (this.component) {
      this.component.start(255);
    }
  }

  public Exit(): void {
  }
}