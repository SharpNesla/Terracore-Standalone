import {ElementRef, Injectable} from "@angular/core";
import {FloatComponent} from "./nodes/const-nodes";
import {Menu} from "nw.gui";
import {AddComponent} from "./nodes/math-components";

@Injectable()
export class NodeEditorService {
  private editor: D3NE.NodeEditor;

  constructor() {

  }

  public refresh(container: ElementRef) {
    const menu = new D3NE.ContextMenu({
      Values: {
        Value: FloatComponent,
        Add: AddComponent,
        Action: function() {
          alert("ok");
        }
      }
    });

    this.editor = new D3NE.NodeEditor('terracore@0.0.0', container.nativeElement,
      [FloatComponent, AddComponent], menu);
    var nn = FloatComponent.newNode();
    var node = FloatComponent.builder(nn);
    this.editor.addNode(node);
    this.editor.view.zoomAt([node]);
  }

  compile(){
    const engine = new D3NE.Engine('terracore@0.0.0',[FloatComponent, AddComponent] );
    engine.process(this.editor.toJSON(),null, {x: 0, y: 0});
  }
}