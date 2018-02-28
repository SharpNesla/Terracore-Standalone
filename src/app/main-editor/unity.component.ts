import {AfterViewInit, Component, HostListener} from '@angular/core';
import {UnityService} from "../model/unity.service";

@Component({
  selector: 'app-editor-unity',
  template: `
    <div class="webgl-content mat-elevation-z4">
      <div id="gameContainer">
      </div>
      <button matTooltip="Fullscreen" matTooltipPosition="above"
              mat-fab color="accent" (click)="this.unityService.toggleFullscreen()">
        <mat-icon>settings_overscan
        </mat-icon>
      </button>
    </div>
  `,
  styles: [`
      button {
          position: absolute;
          top: 392px;
          left: 362px;
      }

      .webgl-content {
          margin-bottom: 32px;
      }

      #gameContainer {
          width: 100%;
          height: 450px;
      }

  `]
})
export class UnityComponent {
  constructor(public unityService: UnityService) {
    this.unityService.loadUnityInstance();
  }

  @HostListener('window:terracore-async-code-event', ['$event'])
  onExecuteAsyncCode(event) {
    this.unityService.onExecuteAsyncCode(event.detail.index, event.detail.xPos, event.detail.yPos, event.detail.resolution)
  }
}
