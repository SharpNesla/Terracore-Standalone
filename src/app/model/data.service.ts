import {Injectable} from "@angular/core";
import {Vector2} from "./util/vector";
import {ElectronService, NgxElectronModule} from "ngx-electron";
import * as fs from "fs-extra";
import * as PATH from "path";

export class TerrainGrass {
  public PrototypeTexturePath: number;
  public MinimalWidth: number;
  public MinimalHeight: number;
  public MaximalWidth: number;
  public MaximalHeight: number;
  public DetailRenderMode: number;
}

export class TerrainSplatMaterial {
  constructor(public AlbedoPath: string = 'favicon.ico',
              public NormalMapPath: string = 'favicon.ico',
              public Metallic: number = 0,
              public Smoothness: number = 0,
              public Offset: Vector2 = new Vector2(0, 0),
              public Size: Vector2 = new Vector2(0, 0)) {

  }

}

export class Data {
  TerrainSplatMaterials: TerrainSplatMaterial[] = [];
  TerrainGrass: TerrainGrass[] = [];
  EditorJson: string = '';
}

@Injectable()
export class DataService {

  private static Data: Data;
  private static Service;

  get SplatMaterials(): TerrainSplatMaterial[] {
    return DataService.Data.TerrainSplatMaterials;
  }

  get GrassMaterials(): TerrainGrass[] {
    return DataService.Data.TerrainGrass;
  }

  get EditorJson(): string {
    return DataService.Data.EditorJson
  }

  set EditorJson(value) {
    DataService.Data.EditorJson = value;
  }

  constructor(private electronService: ElectronService) {
    DataService.Service = this;
    this.createNewData();
    this.electronService.ipcRenderer.on('onDataLoaded', (event, arg: Data) => {
      DataService.Data = arg;
    });
    this.electronService.ipcRenderer.on('onDataError', (event) => {

    });
    this.electronService.ipcRenderer.on('onSaveData', (event, path: string) => {
      for (let [index, value] of DataService.Data.TerrainSplatMaterials.entries()) {
        value.AlbedoPath = PATH.resolve(path, `Splat${index}.png`);
        value.NormalMapPath = PATH.resolve(path, `NormalMap${index}.png`);
      }
    });
  }

  createNewData() {
    DataService.Data = new Data();
  }

  saveData() {
    this.electronService.ipcRenderer.send('saveData', DataService.Data)
  }

  loadData() {
    this.electronService.ipcRenderer.send('loadData')
  }

  addSplatMaterial() {
    const terrainSplatMaterial: TerrainSplatMaterial = new TerrainSplatMaterial();


    DataService.Data.TerrainSplatMaterials.push(terrainSplatMaterial)
  }

  addGrassMaterial() {

  }

  addGrayScale() {

  }

  specifySplatAlbedo(splatTexture) {
    this.electronService.ipcRenderer.send('specifySplatAlbedo', splatTexture);
    this.electronService.ipcRenderer.on('onSpecifySplatAlbedo', (event, arg) => {
      splatTexture.AlbedoPath = arg;
      this.electronService.ipcRenderer.removeAllListeners('onSpecifySplatAlbedo');
    });
  }

  specifySplatNormalMap(splatTexture) {
    this.electronService.ipcRenderer.send('specifySplatAlbedo', splatTexture);
    this.electronService.ipcRenderer.on('onSpecifySplatAlbedo', (event, arg) => {
      splatTexture.NormalMapPath = arg;
      this.electronService.ipcRenderer.removeAllListeners('onSpecifySplatAlbedo');
    });
  }

  specifyGrassAlbedo() {

  }

  static getInstance() {
    return DataService.Service;
  }
}