import {ElementRef, Injectable} from "@angular/core";
import {ConstComponent} from "./nodes/producer-components";
import {Menu} from "nw.gui";
import {AddComponent} from "./nodes/math-components";
import {UnityService} from "./unity.service";
import {AllComponents, AllComponentsFlat} from "./nodes/components";
import {ParallelizatorService} from "./parallelizator.service";
import {numSocket} from "./sockets/sockets";
import {DataService} from "./data.service";
import {ElectronService} from "ngx-electron";

@Injectable()
export class NodeEditorService {
  public Editor: D3NE.NodeEditor;
  private container: ElementRef;

  constructor(private parallel: ParallelizatorService, private dataService: DataService, private el: ElectronService) {

  }
  specifyNodeEditorContainer(container: ElementRef){
    this.container = container;
    const menu = new D3NE.ContextMenu({
      Add: AddComponent,
      Const: ConstComponent
    });

    this.Editor = new D3NE.NodeEditor('terracore@0.0.0', this.container.nativeElement,
      AllComponentsFlat, menu);
  }
  createNewConfiguration() {
    this.Editor.clear();
    this.dataService.createNewData();
  }

  saveConfiguration(){
    this.dataService.saveData();
  }

  loadConfiguration(){
    this.dataService.loadData()
  }

  addElement(component) {
    const nn = component.newNode();
    const node = component.builder(nn);
    nn.position[0] = Math.random() * 300;
    nn.position[1] = Math.random() * 300;
    this.Editor.addNode(node);
  }

  compile() {
    const backup = this.Editor.toJSON();
    const heightMap = this.Editor.nodes.find(x => x.title == 'HeightMap');
    const splatMaps = this.Editor.nodes.filter(x => x.title == 'SplatMap');
    const detailMaps = this.Editor.nodes.filter(x => x.title == 'DetailMap');
    const objectMaps = this.Editor.nodes.filter(x => x.title == 'ObjectMap');

    //this.dataService.saveData('/Users/nesla/Documents/')
  }

  private optimizeGraph(node: D3NE.Node){
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
    for (let i of diff(this.Editor.nodes, nodeAccumulator)) {
      this.Editor.removeNode(i);
    }

  }

  close(){
    setInterval(this.el.remote.getCurrentWindow().close, 200)

  }
}