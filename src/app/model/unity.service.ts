import { Injectable } from '@angular/core';

@Injectable()
export class UnityService {
  private GameInstance: any;

  async loadUnityInstance(){
    this.GameInstance = UnityLoader.instantiate("gameContainer", "Build/unity.json", {onProgress: UnityProgress});
  }
  toggleFullscreen(){
    this.GameInstance.SetFullscreen(1)
  }

  Compile(data){
    this.GameInstance.SendMessage('Pool', 'Refresh', data);
  }
}
