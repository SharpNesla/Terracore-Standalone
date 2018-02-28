import {Injectable} from "@angular/core";
import {Vector2} from "./util/vector";
import {NWJSPlatfromSpecificFunctions, PlatformSpecificFunctions} from "./util/platform-specific";


export class TerrainGrass {
  public PrototypeTexturePath: number;
  public MinimalWidth: number;
  public MinimalHeight: number;
  public MaximalWidth: number;
  public MaximalHeight: number;
  public DetailRenderMode: number;
}
export class TerrainSplatMaterial {
  public AlbedoPath : string;
  public NormalMapPath : string;
  public Metallic : number;
  public Smoothness : number;
  public Offset : Vector2;
  public Size : Vector2;
}

export class Data {
  TerrainSplatMaterials : TerrainSplatMaterial[] = [];
  TerrainGrass : TerrainGrass[] = [];
  EditorJson: string = '';
}

@Injectable()
export class DataService {

  private static Data: Data = new Data();

  get SplatMaterials() : TerrainSplatMaterial[]{
    return DataService.Data.TerrainSplatMaterials;
  }
  get GrassMaterials() : TerrainGrass[]{
    return DataService.Data.TerrainGrass;
  }
  get EditorJson() : string{
    return DataService.Data.EditorJson
  }
  set EditorJson(value){
    DataService.Data.EditorJson = value;
  }

  constructor(private pl: NWJSPlatfromSpecificFunctions){
    this.createNewData()
  }

  createNewData(){
    DataService.Data = new Data();
  }

  saveData(path){
    this.pl.saveData(path, DataService.Data);
  }

  loadData(path) {
    this.pl.loadData(path).then(x => DataService.Data = x);
  }
}