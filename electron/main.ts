import { app, BrowserWindow} from 'electron'
declare const __dirname: string;
let mainWindow: Electron.BrowserWindow;
function onReady() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    minWidth: 570,
    minHeight: 525,
  });

  const fileName = `file://${__dirname}/index.html`;
  mainWindow.webContents.openDevTools();
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL(fileName);
  mainWindow.on('close',app.quit)
}

app.on('ready', onReady);
app.on('window-all-closed', app.quit);