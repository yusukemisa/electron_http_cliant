const {app, BrowserWindow} = require("electron");
/*
app :アプリケーション全体のライフサイクルハンドリングや操作を司るシングルトンインスタンス。
BrowserWindow:  このクラスのインスタンスが1つのRendererプロセスに相当する。
                なのでこのクラスの1インスタンス＝1画面となる
*/
let win;

function createWindow() {
  win = new BrowserWindow({width: 800, height:600 });
  win.loadURL(`file://${__dirname}/index.html`);
  // ウィンドウごとのライフサイクル定義を設定
  win.on("closed",() => {win = null});
  console.log("createWindow!");
}
/*
appインスタンスにElectronが発火するイベントに応じた処理
を定義していく。
ready:  Electron起動、初期化完了。
window-all-closed:  すべてのウィンドウが閉じた。
activate: アプリケーションが非活性から活性化した。（OS X限定）
          dockからアイコンをクリックした時に発生するイベント。
#appリファレンス
http://electron.atom.io/docs/api/app
*/
app.on("ready", ()=> {
  console.log("app ready!");
  createWindow();
});

app.on("window-all-closed", ()=> {
  //Macはウィンドウを閉じてもdockに残る方が自然なのでアプリ終了にはしない。
  //Windowsはアプリ終了。
  console.log("app window-all-closed! platform=" + process.platform);
  if (process.platform !== "darwin") {
    app.quit();
  }
});
// dockから選択された時に画面復活させる
app.on("activate", () => {
  console.log("app activate!");
  if (win === null ) {
    createWindow();
  }
});