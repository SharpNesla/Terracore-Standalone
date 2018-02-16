import {ElementRef, Injectable} from "@angular/core";
import {ConstComponent} from "./nodes/producer-components";
import {Menu} from "nw.gui";
import {AddComponent} from "./nodes/math-components";
import {UnityService} from "./unity.service";
import {AllComponents, AllComponentsFlat} from "./nodes/components";
import {ParallelizatorService} from "./parallelizator.service";

@Injectable()
export class NodeEditorService {
  private editor: D3NE.NodeEditor;

  constructor(private unityService: UnityService, private parallel : ParallelizatorService){

  }

  public refresh(container: ElementRef) {
    const menu = new D3NE.ContextMenu({
      Add: AddComponent,
      Const: ConstComponent
    });

    this.editor = new D3NE.NodeEditor('terracore@0.0.0', container.nativeElement,
      AllComponentsFlat, menu);

    const nn = ConstComponent.newNode();
    const node = ConstComponent.builder(nn);

    this.editor.addNode(node);
    this.editor.view.zoomAt([node]);
  }

  compile(){
    const engine = new D3NE.Engine('terracore@0.0.0',[ConstComponent, AddComponent] );
    engine.process(this.editor.toJSON(),null);
    this.unityService.Compile();
  }
}