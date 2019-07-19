import Led from './Led';

export type TestLedProps = {
  type?: string;
  controller?: string;
  address?: number;
  isAnode?: boolean;
}

class TestLed extends Led
{
  constructor(pin:number, options?: TestLedProps) {
    super({
      pin,
      ...options
    });
  }

  public Blink(interval: number): void {
    if (this.led) {
      this.led.blink(interval); // 500ms interval
    }
  }
}

export default TestLed;