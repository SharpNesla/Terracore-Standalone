import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParallelizatorService} from "./parallelizator.service";
import {NodeEditorService} from "./node-editor.service";
import {UnityService} from "./unity.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ParallelizatorService, NodeEditorService, UnityService]
})
export class ModelModule {
}
