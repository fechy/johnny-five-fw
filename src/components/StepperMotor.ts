import { Stepper } from 'johnny-five';
import Component from './Component'

enum Direction {
  Clockwise,
  CounterClockwise,
  Center
}

class StepperMotor implements Component {

  private component?: Stepper;
  private direction: Direction = Direction.Center;

  public Init(): void {
    this.component = new Stepper({
      type: Stepper.TYPE.FOUR_WIRE,
      stepsPerRev: 200,
      pins: [8, 9, 10, 11]
    });

    console.log('Initialized!');

    this.Start();
  }

  private Step(stepsOrOpts:Object, callback:() => void): void {
    if (this.component) {
      this.component.step(stepsOrOpts, callback ? callback : () => {});
    }
  }

  private Test(): void {
    this.GoLeft(() => {
      this.GoRight(() => {
        this.Center(() => {
          this.Test();
        })
      })
    })
  }

  public GoRight(callback?:()=>void) {
    if (this.direction !== Direction.Clockwise) {
      const opts = {
        steps: this.direction === Direction.Center ? 1000 : 2000,
        accel: 1600,
        decel: 1600,
        direction: 1
      };

      this.direction = Direction.Clockwise;

      this.Step(opts, callback);
    }
  }

  public GoLeft(callback?:()=>void) {
    if (this.direction !== Direction.CounterClockwise) {
      const opts = {
        steps: this.direction === Direction.Center ? 1000 : 2000,
        accel: 1600,
        decel: 1600,
        direction: 0
      };

      this.direction = Direction.CounterClockwise;

      this.Step(opts, callback);
    }
  }

  public Center(callback?:()=>void) {
    if (this.direction !== Direction.Center) {
      const opts = {
        steps: 1000,
        accel: 1600,
        decel: 1600,
        direction: this.direction === Direction.Clockwise ? 0 : 1
      };

      this.direction = Direction.Center;

      this.Step(opts, callback);
    }
  }

  public Start(): void {
    if (this.component) {
      this.Test();
    }
  }

  public Exit(): void {
    this.Center();
  }
}

export default StepperMotor;