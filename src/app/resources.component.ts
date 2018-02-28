import {Component} from '@angular/core';
import {DataService} from "./model/data.service";

@Component({
  selector: 'app-resources',
  template: `
    <h3 mat-subheader>Grayscale Images</h3>
    <mat-accordion>
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title>
            Personal data
          </mat-panel-title>
          <mat-panel-description>
            Type your name and age
          </mat-panel-description>
        </mat-expansion-panel-header>
        <mat-form-field>
          <input matInput placeholder="First name">
        </mat-form-field>

        <mat-form-field>
          <input matInput placeholder="Age">
        </mat-form-field>
      </mat-expansion-panel >
    </mat-accordion>
    <h1>Splat Materials</h1>
    <mat-accordion>
      <mat-expansion-panel *ngFor="let splat of data.TerrainSplatMaterials; let i = index">
        <mat-expansion-panel-header>
          <mat-panel-title>
            {{i}}
          </mat-panel-title>
          <mat-panel-description>
            {{splat.AlbedoPath}}
          </mat-panel-description>
        </mat-expansion-panel-header>
        <mat-form-field>
          <input matInput placeholder="First name">
        </mat-form-field>
        
        <mat-form-field>
          <input matInput placeholder="Age">
        </mat-form-field>
      </mat-expansion-panel>
    </mat-accordion>
    <h1>Detail Materials</h1>
    <mat-accordion>
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title>
            Personal data
          </mat-panel-title>
          <mat-panel-description>
            Type your name and age
          </mat-panel-description>
        </mat-expansion-panel-header>

        <mat-form-field>
          <input matInput placeholder="First name">
        </mat-form-field>

        <mat-form-field>
          <input matInput placeholder="Age">
        </mat-form-field>
      </mat-expansion-panel>
    </mat-accordion>`
})
export class ResourcesComponent {
  constructor(public data: DataService){}
}
