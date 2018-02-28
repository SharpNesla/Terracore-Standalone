import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {MainViewModule} from "./main-editor/main-view.module";
import {PathLocationStrategy} from "@angular/common";
import {MainViewComponent} from "./main-editor/main-view.component";
import {MaterialElementsModule} from "./material-elements.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ResourcesComponent} from "./resources.component";

const routes: Routes = [
  {path: '', component: MainViewComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ResourcesComponent
  ],
  entryComponents: [
    ResourcesComponent
  ],
  imports: [
    BrowserModule, FormsModule, MaterialElementsModule,
    MainViewModule, RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
