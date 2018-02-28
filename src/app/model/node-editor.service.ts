import {ElementRef, Injectable} from "@angular/core";
import {ConstComponent} from "./nodes/producer-components";
import {Menu} from "nw.gui";
import {AddComponent} from "./nodes/math-components";
import {UnityService} from "./unity.service";
import {AllComponents, AllComponentsFlat} from "./nodes/components";
import {ParallelizatorService} from "./parallelizator.service";
import {numSocket} from "./sockets/sockets";
import {DataService} from "./data.service";

@Injectable()
export class NodeEditorService {
  public editor: D3NE.NodeEditor;

  constructor(private parallel: ParallelizatorService, private dataService: DataService) {

  }

  refresh(container: ElementRef) {
    const menu = new D3NE.ContextMenu({
      Add: AddComponent,
      Const: ConstComponent
    });

    this.editor = new D3NE.NodeEditor('terracore@0.0.0', container.nativeElement,
      AllComponentsFlat, menu);
  }

  addElement(component) {
    const nn = component.newNode();
    const node = component.builder(nn);
    nn.position[0] = Math.random() * 300;
    nn.position[1] = Math.random() * 300;
    this.editor.addNode(node);
  }

  compile() {


    const backup = this.editor.toJSON();
    const heightMap = this.editor.nodes.find(x => x.title == 'HeightMap');
    const splatMaps = this.editor.nodes.filter(x => x.title == 'SplatMap');
    const detailMaps = this.editor.nodes.filter(x => x.title == 'DetailMap');
    const objectMaps = this.editor.nodes.filter(x => x.title == 'ObjectMap');

    //this.dataService.saveData('/Users/nesla/Documents/')
  }



  optimizeGraph(node: D3NE.Node){
    let nodeAccumulator: D3NE.Node[] = [node];

    let findConnectedNodes = (accumulator: D3NE.Node[], node: D3NE.Node) => {
      const nodes = node.getConnections('input').map(x => x.output.node);
      accumulator.push(...nodes);
      for (let i of nodes) {
        findConnectedNodes(accumulator, i)
      }
    };

    let diff = (b, a) => b.filter(i => a.indexOf(i) < 0);
    findConnectedNodes(nodeAccumulator, node);
    for (let i of diff(this.editor.nodes, nodeAccumulator)) {
      this.editor.removeNode(i);
    }

  }
}