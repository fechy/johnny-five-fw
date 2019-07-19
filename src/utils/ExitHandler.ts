import MainBoard from "../MainBoard";

export default function exitHandler(board: MainBoard) {

  function closeBoard(board): void {
    board.OnExit()();
  }

  //do something when app is closing
  process.on('exit', () => {
    closeBoard(board);
  });

  //catches ctrl+c event
  process.on('SIGINT', () => {
    closeBoard(board);
  });

  // catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', () => {
    closeBoard(board);
  });

 //catches uncaught exceptions
  process.on('uncaughtException', () => {
    closeBoard(board);
  });
}