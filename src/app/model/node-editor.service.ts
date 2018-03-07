import {ComponentFactoryResolver, ElementRef, Injectable} from "@angular/core";
import {ConstComponent} from "./nodes/producer-components";
import {AddComponent} from "./nodes/math-components";
import {UnityService} from "./unity.service";
import {AllComponents, AllComponentsFlat} from "./nodes/components";
import {ExecutorService} from "./executor.service";
import {numSocket} from "./sockets/sockets";
import {DataService} from "./data.service";
import {ElectronService} from "ngx-electron";
import {Engine} from "./util/engine";

@Injectable()
export class NodeEditorService {
  public Selected: D3NE.Node;

  public get SelectedNodeKeys() {
    return this.Selected != null ? Object.keys(this.Selected.data) : [];
  };

  public Editor: D3NE.NodeEditor;
  private container: ElementRef;
  Engine = new Engine("terracore@0.0.0", AllComponentsFlat);
  private static Service: NodeEditorService;

  constructor(private UnityService: UnityService, private parallel: ExecutorService,
              public dataService: DataService, private el: ElectronService) {
    NodeEditorService.Service = this;
    this.dataService.DataLoaded.subscribe(x => {
      this.Editor.fromJSON(this.dataService.EditorJson);
    })
  }

  specifyNodeEditorContainer(container: ElementRef) {
    this.container = container;
    const menu = new D3NE.ContextMenu({
      Add: AddComponent,
      Const: ConstComponent
    });

    this.Editor = new D3NE.NodeEditor('terracore@0.0.0', this.container.nativeElement,
      AllComponentsFlat, menu);

    this.Editor.eventListener.on('nodecreate', (node?: D3NE.Node, persistent?: boolean) => {
      this.Selected = node;
      console.log(this.SelectedNodeKeys);
      return true;
    });

  }

  createNewConfiguration() {
    this.Editor.clear();
    this.dataService.createNewData();
  }


  saveConfiguration() {
    this.dataService.EditorJson = this.Editor.toJSON();
    this.dataService.saveData();
  }

  loadConfiguration() {
    this.dataService.loadData();

  }

  addElement(component) {
    const nn = component.newNode();
    const node = component.builder(nn);
    nn.position[0] = Math.random() * 300;
    nn.position[1] = Math.random() * 300;
    this.Editor.addNode(node);
  }

  compile() {
    this.UnityService.compile(this.dataService.UnityProjectJson);
    this.parallel.compile(this.Editor);
  }

  close() {
    setInterval(this.el.remote.getCurrentWindow().close, 200)
  }

  static getInstance() {
    return this.Service;
  }
}