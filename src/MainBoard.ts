import { Board, BoardOption } from 'johnny-five';

import Project from './Project';

enum BoardStatus {
  New,
  Ready,
  Exit
}

class MainBoard {
  public readonly board: Board;
  public readonly project: Project;

  private status: BoardStatus = BoardStatus.New;

  constructor(project: Project, options?: BoardOption) {
    this.board = new Board(options);
    this.project = project;
  }

  public Init(): void {
    this.board.on('ready', this.OnReady());
    this.board.on('exit', this.OnExit())
  }

  public OnReady(): () => void {
    const components = this.project.GetComponents();
    return () => {
      console.log('Board ready!');

      if (components) {
        components.forEach(component => component.Init());
      }

      this.status = BoardStatus.Ready;
      this.project.Go();
    }
  }

  public OnExit(): () => void {
    const components = this.project.GetComponents();
    return () => {
      if (this.status !== BoardStatus.Exit) {
        console.log('Board exit!');

        if (components) {
          components.forEach(component => component.Exit());
        }

        this.status = BoardStatus.Exit;
      }
    }
  }
}

export default MainBoard;