import * as vscode from 'vscode';

export class MixTestRunner {
  public static MIX_TEST_TERMINAL_NAME = 'mixTestTerminal';

  constructor() {

  }

  public static runAllTests() {
    vscode.window.showInformationMessage('Running all tests');
    const runner = new MixTestRunner();

    runner.run();
  }

  run() {
    this.executeInTerminal('mix test');
  }

  executeInTerminal(command:string): void {
    let terminal: vscode.Terminal  = vscode.window.createTerminal(MixTestRunner.MIX_TEST_TERMINAL_NAME);

    console.log(`Executing command: ${command}`);

    terminal.show();
    terminal.sendText(command);
  }
}
