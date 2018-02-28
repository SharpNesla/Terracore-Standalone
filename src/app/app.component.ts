import {Component} from '@angular/core';
import {MatDialog} from "@angular/material";
import {ResourcesComponent} from "./resources.component";
import {NWJSPlatfromSpecificFunctions, PlatformSpecificFunctions} from "./model/util/platform-specific";

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z6"><span>Terracore</span>
      <span id="example-spacer"></span>
      <button mat-icon-button id="example-icon" [matMenuTriggerFor]="menu">
        <mat-icon>more_vert</mat-icon>
      </button>

      <mat-menu #menu="matMenu">
        <button mat-menu-item (click)="this.showResourcesDialog()">
          <mat-icon>group_work</mat-icon>
          <span>Resources</span>
        </button>
        <button mat-menu-item>
          <mat-icon>exit_to_app</mat-icon>
          <span>Exit</span>
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
  constructor(public dialog: MatDialog, private pl: NWJSPlatfromSpecificFunctions) {
    pl.showDebugger();
  }

  public showResourcesDialog(){
    let dialogRef = this.dialog.open(ResourcesComponent, {
      height: '400px',
      width: '600px',
    });
  }
}
