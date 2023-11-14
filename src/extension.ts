import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // console.log('"fuzzy-fuzzy" is now active!');

  let disposable = vscode.commands.registerCommand(
    "fuzzy-fuzzy.search",
    async () => {
      vscode.window.showInformationMessage("呼ばれた");
      // vscode.window.showQuickPick([]);
      const placeHolder = "曖昧に検索したい文字列を半角スペース区切りでどうぞ";
      const typedText = await vscode.window.showInputBox({
        placeHolder: placeHolder,
        value: placeHolder,
        valueSelection: [0, placeHolder.length],
      });

      if (typedText) {
        // vscode.window.showInformationMessage(`Got: ${typedText}`);
        const fuzzyRegexpText = typedText.replaceAll(/ +/g, ".* .*");
        const aaa = await vscode.commands.executeCommand(
          "search.action.openNewEditor",
          {
            query: fuzzyRegexpText,
            triggerSearch: true,
            focusResults: false,
            regexp: true,
          }
        );
        vscode.window.showInformationMessage(typeof aaa);
      } else {
        // vscode.window.showWarningMessage(`Failed to get`);
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
