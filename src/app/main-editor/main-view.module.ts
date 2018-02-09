import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {FormsModule} from "@angular/forms";
import {NgxElectronModule} from "ngx-electron";
import {RouterModule} from "@angular/router";
import {MainViewComponent} from "./main-view.component";
import {
  MatButtonModule,
  MatCardModule, MatDivider, MatDividerModule, MatIconModule, MatListModule, MatTabsModule,
  MatToolbarModule
} from "@angular/material";
import {MaterialElementsModule} from "../material-elements.module";

@NgModule({
  declarations: [
    MainViewComponent
  ],
  imports: [
    BrowserModule, FormsModule, MaterialElementsModule
  ],
  exports:[

  ],
  providers: []
})
export class MainViewModule {
}
