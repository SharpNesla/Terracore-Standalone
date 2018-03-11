import {Component, Pipe, PipeTransform} from '@angular/core';
import {UnityService} from "../model/unity.service";
import {NodeEditorService} from "../model/node-editor.service";
import {AllComponents} from "../model/nodes/components";
import {DataService} from "../model/data.service";

@Component({
  selector: 'app-main-view',
  template: `
    <mat-drawer-container class="example-container">
      <mat-drawer class="mat-elevation-z4" mode="side" disableClose="true" opened="true">
        <app-editor-unity>
        </app-editor-unity>
        <mat-accordion>
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>
                Terrain Settings
              </mat-panel-title>
              <mat-panel-description>
                Chunks' details
              </mat-panel-description>
            </mat-expansion-panel-header>
            <div id="terrain-settings">
              <mat-checkbox [(ngModel)]="this.data.TerrainSettings.IsInifinite">Is Inifinite</mat-checkbox>
              <mat-form-field color="accent">
                <input matInput placeholder="View Distance"/>
              </mat-form-field>
              <mat-form-field color="accent">
                <input matInput placeholder="Resolution"/>
              </mat-form-field>
            </div>
          </mat-expansion-panel>
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>
                Export Settings
              </mat-panel-title>
              <mat-panel-description>
                Details of selected node
              </mat-panel-description>
            </mat-expansion-panel-header>
            
          </mat-expansion-panel>
        </mat-accordion>
      </mat-drawer>
      <mat-drawer-content>
        <mat-tab-group class="mat-elevation-z4">
          <mat-tab *ngFor="let components of this.AllComponents" [label]="components.title">
            <button mat-raised-button
                    *ngFor="let input of components.components" class="tab-button" [ngClass]="input.name.toLowerCase()"
                    (click)="this.nodeEditor.addElement(input)">
              {{input.name}}
            </button>
          </mat-tab>
        </mat-tab-group>
        <button matTooltip="Compile" id="compile" (click)="this.nodeEditor.compile()" mat-fab color="accent">
          <mat-icon>code</mat-icon>
        </button>
        <app-editor></app-editor>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  //language=SCSS
  styles: [`

    mat-drawer {
      width: 450px;
      padding: 16px;
    }

    app-editor {
      width: 100%;
      height: 100%;
    }

    mat-drawer-container {
      height: calc(100% - 64px - 22px);
    }

    @media (max-width: 599px) {
      mat-drawer-container {
        height: calc(100% - 56px - 22px);
      }
    }

    mat-drawer-content {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: stretch;
    }

    mat-tab-group {
      flex-shrink: 0;
      position: relative;
    }

    mat-card {
      margin: 4px;
    }

    button {
      margin: 8px;
    }

    #compile {
      position: absolute;
      right: 16px;
      bottom: 16px;
    }

    #terrain-settings {
      display: flex;
      flex-direction: column;
    }
  `],
})
export class MainViewComponent {
  AllComponents = AllComponents;
  constructor(public nodeEditor: NodeEditorService, public data: DataService) {

  }
  getTypeOf(type){
    return typeof type;
  }
}


