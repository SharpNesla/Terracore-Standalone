import {HostListener, Injectable, NgZone} from '@angular/core';
import * as LN from "libnoise";
const LibNoise = LN.libnoise;


@Injectable()
export class UnityService {
  private GameInstance: any;




  async loadUnityInstance(){
    this.GameInstance = UnityLoader.instantiate("gameContainer", "Build/unity.json", {onProgress: UnityProgress});
  }

  toggleFullscreen(){
    this.GameInstance.SetFullscreen(1)
  }

  onExecuteAsyncCode(index, xPos, yPos, resolution){
    let noise = new LibNoise.generator.Perlin(.01, 2.0, 0.5, 8, 42, LibNoise.QualityMode.MEDIUM);
    for (let i = 0; i < TerrainStorages[index].Heights.length; i++){

      TerrainStorages[index].Heights[i] = noise.getValue(0,0,i);
    }
    this.GameInstance.SendMessage('Pool', 'OnTerracoreSyncronization', index)
  }

  Compile(data){
    this.GameInstance.SendMessage('Pool', 'Refresh', data);
  }
}
