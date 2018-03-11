import {Injectable} from '@angular/core';
import {ExecutorService} from "./executor.service";



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
