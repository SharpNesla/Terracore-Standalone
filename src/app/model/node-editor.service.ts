import {ElementRef, Injectable} from "@angular/core";
import {ConstComponent} from "./nodes/producer-components";
import {Menu} from "nw.gui";
import {AddComponent} from "./nodes/math-components";
import {UnityService} from "./unity.service";
import {AllComponents, AllComponentsFlat} from "./nodes/components";
import {ParallelizatorService} from "./parallelizator.service";
import {numSocket} from "./sockets/sockets";

@Injectable()
export class NodeEditorService {
  private editor: D3NE.NodeEditor;

  constructor(private unityService: UnityService, private parallel : ParallelizatorService){

  }

  refresh(container: ElementRef) {
    const menu = new D3NE.ContextMenu({
      Add: AddComponent,
      Const: ConstComponent
    });

    this.editor = new D3NE.NodeEditor('terracore@0.0.0', container.nativeElement,
      AllComponentsFlat, menu);

  }

  addElement(component){
    const nn = component.newNode();
    const node = component.builder(nn);
    nn.position[0] = Math.random() * 300;
    nn.position[1] = Math.random() * 300;
    this.editor.addNode(node);
  }

  compile(){
    console.log(TerrainStorages);
  }
}