import { app, BrowserWindow} from 'electron'
declare const __dirname: string;
let mainWindow: Electron.BrowserWindow;

app.commandLine.appendSwitch('enable-unsafe-es3-apis');

function onReady() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
      webSecurity: false,
    }
  });

  const fileName = `file://${__dirname}/index.html`;
  mainWindow.webContents.openDevTools();
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL(fileName);
  mainWindow.on('close',app.quit)
}

app.on('ready', onReady);
app.on('window-all-closed', app.quit);