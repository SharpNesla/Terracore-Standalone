/// <reference path="../../../../node_modules/@types/node/index.d.ts"/>

import {Injectable} from "@angular/core";
import * as fs from "fs";
import {Data} from "../data.service";
import * as PATH from 'path';

export interface PlatformSpecificFunctions{
  showDebugger();
  loadData(path : string) : Promise<Data>;
  saveData(path: string, data: Data);
}

@Injectable()
export class NWJSPlatfromSpecificFunctions implements PlatformSpecificFunctions{
  async saveData(path: string, data: Data) {
    for (let i of data.TerrainSplatMaterials){
      const pathSegments = `SplatAlbedo${i}.png`;
      const pathSegments2 = `SplatNormals${i}.png`;
      /*await fs.copy(i.AlbedoPath, PATH.resolve(path, pathSegments));
      await fs.copy(i.NormalMapPath, PATH.resolve(path, pathSegments2));*/
      i.AlbedoPath = PATH.resolve('./', pathSegments);
      i.NormalMapPath = PATH.resolve('./', pathSegments2)
    }
    fs.writeFile(PATH.resolve(path, 'data.json'), JSON.stringify(data));
  }

  showDebugger() {
    nw.Window.get().showDevTools();
  }

  loadData(path: string): Promise<Data> {
    return new Promise(function (resolve, reject) {
      fs.readFile(path, 'utf8', (err, content) => {
        if (err) reject(err);
        else resolve(JSON.parse(content));
      });
    });
  }

}