import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MainViewComponent} from "./main-view.component";
import {
  MatButtonModule,
  MatCardModule, MatDivider, MatDividerModule, MatIconModule, MatListModule, MatTabsModule,
  MatToolbarModule
} from "@angular/material";
import {MaterialElementsModule} from "../material-elements.module";
import {EditorComponent} from "./editor.component";

@NgModule({
  declarations: [
    MainViewComponent, EditorComponent
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
