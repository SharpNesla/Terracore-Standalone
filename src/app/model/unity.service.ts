import { Injectable } from '@angular/core';

@Injectable()
export class UnityService {
  private GameInstance: any;

  async loadUnityInstance(){
    //this.GameInstance = UnityLoader.instantiate("gameContainer", "Build/unity.json", {onProgress: UnityProgress});
  }
  toggleFullscreen(){
    this.GameInstance.SetFullscreen(1)
  }

  Compile(){
    this.GameInstance.SendMessage('Pool', 'Refresh', JSON.stringify({x:24325}));
  }
}
