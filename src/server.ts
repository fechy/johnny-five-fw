import MainBoard from './MainBoard';
import Project from './Project';
import ConfigLoader from "./ConfigLoader";
import exitHandler from './utils/ExitHandler';

const config = ConfigLoader.Load();
const project = new Project(config);
const board = new MainBoard(project);

// Control unexpected exits
exitHandler(board);

// Init the board
board.Init();