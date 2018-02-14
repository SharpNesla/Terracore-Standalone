import {Component} from '@angular/core';

@Component({
  selector: 'app-main-view',
  template: `
    <div id="grid">
      <div class="mat-elevation-z4 test">
        <app-editor-unity></app-editor-unity>
      </div>
      <div>
        <mat-tab-group>
          <mat-tab label="Input Nodes">
            <button mat-raised-button color="accent" *ngFor="let input of this.Inputs">{{input}}</button>
          </mat-tab>
          <mat-tab label="Math Nodes">
            <button mat-raised-button color="accent" *ngFor="let transform of this.Transforms">{{transform}}
            </button>
          </mat-tab>
          <mat-tab label="Transform Nodes">
            <button mat-raised-button color="accent" *ngFor="let transform of this.Transforms"></button>
          </mat-tab>
          <mat-tab label="Output Nodes">
            <button mat-raised-button color="accent" *ngFor="let output of this.Outputs">{{output}}</button>
          </mat-tab>
        </mat-tab-group>
        <mat-divider></mat-divider>
        <app-editor></app-editor>
      </div>
    </div>`,
  styles: [`
      #grid {
          width: 100%;
          display: grid;
          grid-template-columns: 450px calc(100% - 450px);
          height: available;
      }
      mat-card{
          margin: 4px;
      }
      button {
          margin: 8px;
      }`]
})
export class MainViewComponent {
  Outputs = ['Height Map', 'Biome Map'];
  Inputs = ['Simple Height', 'Height Map', 'Billow Noise'];
  Transforms = ['Multiply', 'Add'];
}
