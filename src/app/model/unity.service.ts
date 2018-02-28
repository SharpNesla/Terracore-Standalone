import {HostListener, Injectable, NgZone} from '@angular/core';
import * as LN from "libnoise";
import {NodeEditorService} from "./node-editor.service";
import {AllComponentsFlat} from "./nodes/components";
import {ParallelizatorService} from "./parallelizator.service";
import {Engine} from "./util/engine";

const LibNoise = LN.libnoise;


@Injectable()
export class UnityService {
  private GameInstance: any;


  constructor(private nodeEditor: NodeEditorService, private parallel : ParallelizatorService) {

  }

  async loadUnityInstance() {
    this.GameInstance = UnityLoader.instantiate("gameContainer", "Build/unity.json", {onProgress: UnityProgress});
  }

  toggleFullscreen() {
    this.GameInstance.SetFullscreen(1)
  }

  async onExecuteAsyncCode(index, xPos, yPos, resolution) {

    const engine = new Engine("terracore@0.0.0", AllComponentsFlat);

    for (let y = 0; y <= resolution; y++) {
      for (let x = 0; x <= resolution; x++) {
        engine.process(this.nodeEditor.editor.toJSON(), null, TerrainStorages[index],
          x + xPos * resolution, y + yPos * resolution, x, y, resolution);
      }
    }

    this.GameInstance.SendMessage('Pool', 'OnTerracoreSyncronization', index)

    /*for (let y = 0; y <= resolution; y++) {
      for (let x = 0; x <= resolution; x++) {
        //storage.SplatMap[current.LocalPosition.X, current.LocalPosition.Y, 0] = 0f;
        TerrainStorages[index].SplatMaps[(0 + x * 6) + y * resolution * 6] = 1;
      }
    }

    for (let y = 0; y <= resolution; y++) {
      for (let x = 0; x <= resolution; x++) {
        //TerrainStorages[index].DetailLayers[0][y * (resolution) + x] = 5.324934164434305e-44 / 2;
      }
    }*/


  }

  Compile(data) {
    this.GameInstance.SendMessage('Pool', 'Refresh', data);
  }
}
