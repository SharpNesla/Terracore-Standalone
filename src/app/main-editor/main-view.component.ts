import {Component} from '@angular/core';

@Component({
  selector: 'app-main-view',
  template: `
    <div></div>
    <div>
      <mat-tab-group color="accent" background="primary">
        <mat-tab label="Input Nodes">
          <button mat-raised-button color="accent" *ngFor="let input of this.Inputs">{{input}}</button>
        </mat-tab>
        <mat-tab label="Transform Nodes">
          <button mat-raised-button color="accent" *ngFor="let transform of this.Transforms">{{transform}}</button>
        </mat-tab>
        <mat-tab label="Output Nodes">
          <button mat-raised-button color="accent" *ngFor="let output of this.Outputs">{{output}}</button>
        </mat-tab>
      </mat-tab-group>
      <mat-divider></mat-divider>
      <app-editor></app-editor>
    </div>`,
  styles: [`button {
      margin: 8px;
  }`]
})
export class MainViewComponent {
  Outputs = ['Height Map', 'Biome Map'];
  Inputs = ['Simple Height', 'Height Map', 'Billow Noise'];
  Transforms = ['Multiply', 'Add'];
}
