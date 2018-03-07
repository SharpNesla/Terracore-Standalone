import {Component, ViewEncapsulation} from '@angular/core';
import {DataService, TerrainSplatMaterial} from "./model/data.service";
import NodeEditor = D3NE.NodeEditor;

@Component({
  selector: 'app-resources',
  template: `
    <h1>Resources</h1>
    <h2 *ngIf="this.data.SplatMaterials.length !=0">Splat Materials</h2>
    <mat-accordion *ngIf="this.data.SplatMaterials.length !=0">
      <mat-expansion-panel id="splatmaps" *ngFor="let splat of data.SplatMaterials; let i = index">
        <mat-expansion-panel-header>
          <mat-panel-title>
            {{i}}
          </mat-panel-title>
          <mat-panel-description>
            {{splat.AlbedoPath}}
          </mat-panel-description>
        </mat-expansion-panel-header>
        <div class="body">
          <span>
              <h3>Albedo Texture</h3>
          <div><img [src]="splat.AlbedoPath" class="mat-elevation-z4">
                <button class="open-button" (click)="this.data.specifySplatAlbedo(splat)"
                        mat-raised-button>Open Other</button>
            </div>
            </span>
          <span>
             <h3>NormalMap Texture</h3>
            <div><img [src]="splat.NormalMapPath" class="mat-elevation-z4">
              <button class="open-button" (click)="this.data.specifySplatNormalMap(splat)"
                      mat-raised-button>Open Other</button>
            </div>
          </span>
          <span>
            <h3>Metallic</h3>
            <mat-slider [(ngModel)]="splat.Metallic" [min]="0" [max]="1" [step]="0.01"></mat-slider>
            <h3>SmoothNess</h3>
            <mat-slider [(ngModel)]="splat.Smoothness" [min]="0" [max]="1" [step]="0.01"></mat-slider>
          </span>
          <span>
            <h3>Offset</h3>
            <mat-form-field color="accent">
              <span matPrefix>x: &nbsp;</span>
              <input matInput [(ngModel)]="splat.Offset.x">
            </mat-form-field>
            <mat-form-field color="accent">
              <span matPrefix>y: &nbsp;</span>
              <input matInput [(ngModel)]="splat.Offset.y">
            </mat-form-field>
            <h3>Scale</h3>
            <mat-form-field color="accent">
              <span matPrefix>x: &nbsp;</span>
              <input matInput [(ngModel)]="splat.Size.x">
            </mat-form-field>
            <mat-form-field color="accent">
              <span matPrefix>y: &nbsp;</span>
              <input matInput [(ngModel)]="splat.Size.y">
            </mat-form-field>
          </span>
        </div>
      </mat-expansion-panel>
    </mat-accordion>
    <h2 *ngIf="this.data.GrassMaterials.length !=0">Detail Materials</h2>
    <mat-accordion *ngIf="this.data.GrassMaterials.length !=0">
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title>
            Personal data
          </mat-panel-title>
          <mat-panel-description>
            Type your name and age
          </mat-panel-description>
        </mat-expansion-panel-header>
        <input type="color" style="border: 0; height: 16px" class="mat-elevation-z2"/>
        <mat-form-field>
          <input matInput placeholder="First name">
        </mat-form-field>
        <mat-form-field>
          <input matInput placeholder="Age">
        </mat-form-field>
      </mat-expansion-panel>
    </mat-accordion>
    <button mat-fab color="primary">+</button>
    <button mat-mini-fab color="accent" (click)="this.data.addGrayScale()">@</button>
    <button mat-mini-fab color="accent" (click)="this.data.addSplatMaterial()">+</button>
    <button mat-mini-fab color="accent" (click)="this.data.addGrassMaterial()">#</button>`,
  //language=SCSS
  styles: [`
    div {
      position: relative;
      height: fit-content;
    }

    .open-button {
      position: absolute;
      bottom: 0;
      left: 0;
    }

    .body {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 16px;
      width: 100%;

    }

    img {
      width: 100%;
    }
  `]
})
export class ResourcesComponent {
  constructor(public data: DataService) {
  }
}
