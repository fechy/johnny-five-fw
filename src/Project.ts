import * as HashMap from 'hashmap';
import Component from './components/Component';
import classes from './components'
import { Config } from './ConfigLoader';
import TestLed from "./components/TestLed";

class Project
{
  private readonly components: HashMap<string, Component> = new HashMap<string, Component>();

  constructor(config: Config) {
    config.components.forEach(({ id, type, options }) => {
      if (typeof(classes[type]) === 'undefined') {
        console.error(`Invalid class ${type}`);
        return;
      }

      if (!id) {
        console.error(`Invalid id for class ${type}`);
        return;
      }

      this.components.set(id, new classes[type](options));
    });
  }

  public GetComponents(): Array<Component> {
    return this.components;
  }

  public Go(): void {
    // He're where code goes...
    const led: TestLed = this.components.get('led-0');
    led.Blink(500);
  }
}

export default Project;