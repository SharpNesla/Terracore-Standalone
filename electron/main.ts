import {app, BrowserWindow, dialog, ipcMain, OpenDialogOptions, SaveDialogOptions} from 'electron'
import * as fs from "fs-extra";
import * as path from "path";
import {Data, TerrainSplatMaterial} from "../src/app/model/data.service";
import * as PATH from "path";

declare const __dirname: string;
let mainWindow: Electron.BrowserWindow;

function onReady() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    minWidth: 570,
    minHeight: 525,
    titleBarStyle: "hidden"
  });

  const fileName = `file://${__dirname}/index.html`;
  mainWindow.webContents.openDevTools();
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL(fileName);
  mainWindow.on('close', app.quit)
}

const saveOptions: SaveDialogOptions = <SaveDialogOptions>{
  title: 'Select Save Folder',
  properties: ['openDirectory']
};

const openOptions: OpenDialogOptions = <OpenDialogOptions>{
  title: 'Open Image',
  filters: [
    {name: 'SplatTexture', extensions: ['png', 'jpg', 'psd']}
  ],
  properties: ['openFile']
};

const openProjectOptions: OpenDialogOptions = <OpenDialogOptions>{
  title: 'Open Project Folder',
  properties: ['openDirectory']
};

app.on('ready', onReady);


app.on('window-all-closed', app.quit);

ipcMain.on('saveData', (event, data: Data) => {
  dialog.showSaveDialog(mainWindow, saveOptions, async x => {
    if (x != undefined) {
      await fs.emptyDir(x);
      try {
        /*for (let [index, value] of data.TerrainSplatMaterials.entries()) {
          await fs.copy(value.AlbedoPath, path.resolve(x, `Splat${index}.png`));
          await fs.copy(value.NormalMapPath, path.resolve(x, `NormalMap${index}.png`))
          value.AlbedoPath = `Splat${index}.png`;
          value.NormalMapPath = `NormalMap${index}.png`;
        }*/
        await fs.writeFile(path.resolve(x, `project.json`), JSON.stringify(data));
      } catch (err) {}
      mainWindow.webContents.send("onSaveData", x)
    }
  })
});

ipcMain.on('loadData', (event) => {
  dialog.showOpenDialog(mainWindow, openProjectOptions,async (filename: string[]) => {
    if (filename != undefined) {
      try {
        const content = await fs.readFile(path.resolve(filename[0], 'project.json'), 'utf8');
        mainWindow.webContents.send('onDataLoaded', { data : JSON.parse(content), path: filename[0]});
      }
      catch (err) {
        mainWindow.webContents.send('onDataError');
      }
    }
  })
});

ipcMain.on('specifySplatAlbedo', (event, terrainSplatMaterial : TerrainSplatMaterial) => {
  dialog.showOpenDialog(mainWindow, openOptions, (filename: string[]) => {
    if (filename != undefined) {
      mainWindow.webContents.send('onSpecifySplatAlbedo', filename[0]);
    }
  })
});
ipcMain.on('specifySplatNormalMap', (event, terrainSplatMaterial : TerrainSplatMaterial) => {
  dialog.showOpenDialog(mainWindow, openProjectOptions, (filename: string[]) => {
    if (filename != undefined) {
      mainWindow.webContents.send('onSpecifySplatNormalMap', filename[0]);
    }
  })
});
