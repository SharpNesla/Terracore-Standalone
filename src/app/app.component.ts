import {Component} from '@angular/core';
import {MatDialog} from "@angular/material";
import {ResourcesComponent} from "./resources.component";
import NodeEditor = D3NE.NodeEditor;
import {NodeEditorService} from "./model/node-editor.service";
import {DataService} from "./model/data.service";

@Component({
  selector: 'app-root',
  template: `
    <div
      style="width: 100%;height: 22px;background-color: #1976D2; -webkit-app-region: drag; z-index: 5;position: relative"></div>
    <mat-toolbar color="primary" class="mat-elevation-z6"><span>Terracore</span>
      <span id="example-spacer"></span>
      <button mat-icon-button id="example-icon" [matMenuTriggerFor]="menu">
        <mat-icon>more_vert</mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item (click)="this.nodeEditor.createNewConfiguration()">
          <mat-icon>
            insert_drive_file
          </mat-icon>
          <span>New</span>
        </button>
        <button mat-menu-item (click)="this.nodeEditor.loadConfiguration()">
          <mat-icon>
            open_in_new
          </mat-icon>
          <span>Open</span>
        </button>
        <button mat-menu-item (click)="this.nodeEditor.saveConfiguration()">
          <mat-icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
            </svg>
          </mat-icon>
          <span>Save</span>
        </button>
        <button mat-menu-item (click)="this.showResourcesDialog()">
          <mat-icon>dns</mat-icon>
          <span>Resources</span>
        </button>
        <button mat-menu-item (click)="this.nodeEditor.close()">
          <mat-icon>exit_to_app</mat-icon>
          <span>Exit</span>
        </button>
      </mat-menu>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [`    

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
  constructor(public dialog: MatDialog, public nodeEditor: NodeEditorService, public data: DataService) {

  }

  public showResourcesDialog() {
    let dialogRef = this.dialog.open(ResourcesComponent, {
      height: '600px',
      width: '800px',
    });
  }
}
