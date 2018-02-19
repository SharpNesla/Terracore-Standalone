import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z6"><span>Terracore</span>
      <span id="example-spacer"></span>
      <button mat-icon-button id="example-icon" [matMenuTriggerFor]="menu">
        <mat-icon>more_vert</mat-icon>
      </button>

      <mat-menu #menu="matMenu">
        <button mat-menu-item>
          <mat-icon>dialpad</mat-icon>
          <span>Redial</span>
        </button>
        <button mat-menu-item disabled>
          <mat-icon>voicemail</mat-icon>
          <span>Check voicemail</span>
        </button>
        <button mat-menu-item>
          <mat-icon>notifications_off</mat-icon>
          <span>Disable alerts</span>
        </button>
      </mat-menu>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [`
      #example-icon {
          padding: 0 14px;
      }

      #example-spacer {
          flex: 1 1 auto;
      }

      mat-toolbar {
          position: relative;
          z-index: 4;
      }
  `]
})
export class AppComponent {
  constructor() {
    nw.Window.get().showDevTools();
  }
}
