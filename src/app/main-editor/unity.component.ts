import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-editor-unity',
  template: `
    <div class="webgl-content">
      <div id="gameContainer" style="width: 100%; height: 450px">
      </div>
      <button mat-fab color="accent" (click)="this.GameInstance.SetFullscreen(1)">
        <mat-icon>settings_overscan
        </mat-icon>
      </button>
    </div>`,
  styles: [`
    button{
        position: absolute;
        left: 370px;
        top: 430px;
    }
  `]
})
export class UnityComponent implements AfterViewInit {
  GameInstance;

  ngAfterViewInit(): void {
    this.GameInstance = UnityLoader.instantiate("gameContainer", "Build/unity.json", {onProgress: UnityProgress});
  }

}
