import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParallelizatorService} from "./parallelizator.service";
import {NodeEditorService} from "./node-editor.service";
import {UnityService} from "./unity.service";
import {DataService} from "./data.service";
import {NgxElectronModule} from 'ngx-electron';

@NgModule({
  imports: [
    CommonModule, NgxElectronModule
  ],
  declarations: [],
  providers: [ParallelizatorService, NodeEditorService, UnityService, DataService]
})
export class ModelModule {
}
