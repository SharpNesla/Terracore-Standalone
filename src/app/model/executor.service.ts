import {Injectable} from "@angular/core";
import * as threads from "threads";
import {Engine} from "./util/engine";
import {AllComponentsFlat} from "./nodes/components";
import {NodeEditorService} from "./node-editor.service";

@Injectable()
export class ExecutorService {
  private pool;
  private engine: Engine;

  private heightMapSource;
  private splatMapSource;
  private detailMapSources;
  private objectMapSorces;

  constructor() {
    this.pool = new threads.Pool(3);
    this.engine = new Engine('terracore@0.0.0', AllComponentsFlat);
  }

  execute(GameInstance, index, xPos, yPos, resolution) {
    for (let y = 0; y <= resolution; y++) {
      for (let x = 0; x <= resolution; x++) {
        this.engine.process(this.heightMapSource, null, TerrainStorages[index],
          x + xPos, y + yPos, x, y, resolution);
      }
    }

    /*for (let y = 0; y <= resolution; y++) {
      for (let x = 0; x <= resolution; x++) {
        //storage.SplatMap[current.LocalPosition.X, current.LocalPosition.Y, 0] = 0f;
        TerrainStorages[index]
      }
    }*/
    /*
    for (let y = 0; y <= resolution; y++) {
      for (let x = 0; x <= resolution; x++) {
        //TerrainStorages[index].DetailLayers[0][y * (resolution) + x] = 5.324934164434305e-44 / 2;
      }
    }*/


    GameInstance.SendMessage('Pool', 'OnTerracoreSyncronization', JSON.stringify({Index: index, TreeData: ' '}))
  }

  compile(editor: D3NE.NodeEditor) {
    const backup = editor.toJSON();

    this.optimizeGraph(editor, editor.nodes.find(x => x.title == 'HeightMap'))
    this.heightMapSource = editor.toJSON();

    this.splatMapSource = [];
    for (let i of editor.nodes.filter(x => x.title == 'SplatMap')) {
      this.splatMapSource.push(i)
    }

    //const detailMaps = editor.nodes.filter(x => x.title == 'DetailMap');
    //const objectMaps = editor.nodes.filter(x => x.title == 'ObjectMap');

    editor.fromJSON(backup);

  }

  private optimizeGraph(editor: D3NE.NodeEditor, node: D3NE.Node) {
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
    for (let i of diff(editor.nodes, nodeAccumulator)) {
      editor.removeNode(i);
    }

  }
}