import {HostListener, Injectable, NgZone} from '@angular/core';
import {NodeEditorService} from "./node-editor.service";
import {AllComponentsFlat} from "./nodes/components";
import {ExecutorService} from "./executor.service";
import {Engine} from "./util/engine";



@Injectable()
export class UnityService {
  private GameInstance: any;

  constructor(private parallel : ExecutorService) {

  }

  async loadUnityInstance() {
    this.GameInstance = UnityLoader.instantiate("gameContainer", "Build/unity.json", {onProgress: UnityProgress});
  }

  toggleFullscreen() {
    this.GameInstance.SetFullscreen(1)
  }

  onExecuteAsyncCode(index, xPos, yPos, resolution) {
    this.parallel.execute(this.GameInstance, index, xPos, yPos, resolution);
  }

  compile(data) {
    this.GameInstance.SendMessage('Pool', 'Refresh', data);
  }
}
