import { Led } from 'johnny-five';
import Component from './Component';

class MatrixLed implements Component
{
  private readonly options: Led.MatrixOption;
  private matrix?: Led.Matrix;

  constructor(options?:Led.MatrixOption) {
    this.options = options;
  }

  public Init(): void {
    this.matrix = new Led.Matrix(this.options);
    this.Start();
  }

  public Start(): void {
    if (this.matrix) {
      this.matrix.on();
      this.ShowMessage("READY!", 500, false);
    }
  }

  public DrawFigure(figure:string[]) {
    // @ts-ignore
    this.matrix.draw(0, figure);
  }

  public Off() {
    this.matrix.clear();
  }

  public ShowMessage(message:string, milliseconds:number, repeat:boolean = true): void {
    let counter = 0;
    let interval = setInterval(() => {
      // @ts-ignore
      this.matrix.draw(0, message[counter]);
      ++counter;

      if (counter > message.length) {
        counter = 0;
        if (!repeat) {
          clearInterval(interval);
          setTimeout(() => this.Off(), milliseconds);
        }
      }
    }, milliseconds);
  }

  public Exit(): void {
    this.matrix.clear();
  }
}

export default MatrixLed;
