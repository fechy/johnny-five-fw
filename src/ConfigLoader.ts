import * as fs from 'fs';
import * as humps from 'humps';

type ComponentConfigProp = {
  id: string
  type: string
  options?: object
}

export class Config {
  public board: string;
  private _components: Array<ComponentConfigProp>;

  get components() {
    return this._components;
  }

  set components(components: Array<ComponentConfigProp>) {
    this._components = components.map(component => ({
      ...component,
      type: humps.pascalize(component.type)
    }));
  }
}

class ConfigLoader
{
  public static Load() : Config {
    const configFile = fs.readFileSync('./project.json', { encoding: 'utf-8' });
    return Object.assign(new Config, JSON.parse(configFile));
  }
}

export default ConfigLoader;