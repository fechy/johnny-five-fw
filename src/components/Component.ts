/**
 * Component interface
 */
interface Component {
  /**
   * Init Component
   * @constructor
   */
  Init() : void;

  /**
   * Called after Init
   * @constructor
   */
  Start(): void;

  /**
   * Called before board exits
   * @constructor
   */
  Exit() : void;
}

export default Component;