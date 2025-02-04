import {EventEmitter, Injectable} from "@angular/core";
import {Vector2} from "./util/vector";
import {ElectronService, NgxElectronModule} from "ngx-electron";
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

export class TerrainSettings {
  constructor(public IsInifinite = true,
              public ViewDistance = 2,
              public Resolution = 256) {
  }
}

export class Data {
  TerrainSettings: TerrainSettings = new TerrainSettings();
  TerrainSplatMaterials: TerrainSplatMaterial[] = [];
  TerrainGrass: TerrainGrass[] = [];
  EditorJson: string = '';
}

@Injectable()
export class DataService {
  public CurrentProjectPath = '';
  private static Data: Data;
  get SplatMaterials(): TerrainSplatMaterial[] {
    return DataService.Data.TerrainSplatMaterials;
  }

  get TerrainSettings() {
    return DataService.Data.TerrainSettings;
  }

  get GrassMaterials(): TerrainGrass[] {
    return DataService.Data.TerrainGrass;
  }

  get UnityProjectJson() {
    return JSON.stringify(DataService.Data);
  }

  get EditorJson(): string {
    return DataService.Data.EditorJson;
  }

  set EditorJson(value) {
    DataService.Data.EditorJson = value;
  }

  DataLoaded: EventEmitter<Data> = new EventEmitter<Data>();

  constructor(private electronService: ElectronService) {
    this.createNewData();
    this.electronService.ipcRenderer.on('onDataLoaded', (event, arg) => {
      DataService.Data = arg.data;
      this.CurrentProjectPath = arg.path;
      this.DataLoaded.emit(DataService.Data = arg.data);
    });
    this.electronService.ipcRenderer.on('onDataError', (event) => {

    });
    this.electronService.ipcRenderer.on('onSaveData', (event, path: string) => {
      for (let [index, value] of DataService.Data.TerrainSplatMaterials.entries()) {
        value.AlbedoPath = `Splat${index}.png`;
        value.NormalMapPath = `NormalMap${index}.png`;
      }
    });
  }

  createNewData() {
    const DataMock: Data = <Data>{
      TerrainSettings: new TerrainSettings(),
      TerrainGrass: [],
      TerrainSplatMaterials: [
        new TerrainSplatMaterial('assets/Albedo0.jpg', 'assets/Normal0.png', 0, 0.01),
        new TerrainSplatMaterial('assets/Albedo1.jpg', '', ),
        new TerrainSplatMaterial('assets/Albedo2.psd'),
        new TerrainSplatMaterial('assets/Albedo3.psd'),
        new TerrainSplatMaterial('assets/Albedo4.psd'),
        new TerrainSplatMaterial('assets/Albedo5.png', 'assets/Normal5.png')
      ]
    };
    DataService.Data = DataMock;
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
}