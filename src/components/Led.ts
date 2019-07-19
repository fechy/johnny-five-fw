import * as five from 'johnny-five';
import Component from './Component';

/**
 * Single Led component
 */
class Led implements Component
{
  protected options:number | five.LedOption;
  protected led?: five.Led;

  constructor (options:number | five.LedOption) {
    this.options = options;
  }

  public Init(): void {
    this.led = new five.Led(this.options);
    this.Start();
  }

  public Start(): void {
    // ... Nothing by default
  }

  public Exit(): void {
    if (this.led) {
      this.led.off();
    }
  }
}

export default Led;