import {Injectable} from "@angular/core";
import * as threads from "threads";
import {Engine} from "./util/engine";
import {AllComponentsFlat} from "./nodes/components";

@Injectable()
export class ExecutorService {
  private pool;
  private engine: Engine;

  private heightMapSource: string;
  private splatMapSources: string[];
  private detailMapSources: string[];
  private objectMapSorces: string[];

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
    for (let i = 0; i < this.splatMapSources.length; i++) {
      for (let y = 0; y <= resolution; y++) {
        for (let x = 0; x <= resolution; x++) {
          this.engine.process(this.splatMapSources[i], null, TerrainStorages[index],
            x + xPos, y + yPos, x, y, resolution);
        }
      }
    }

    for (let i = 0; i < this.detailMapSources.length; i++) {
      for (let y = 0; y <= resolution; y++) {
        for (let x = 0; x <= resolution; x++) {
          this.engine.process(this.detailMapSources[i], null, TerrainStorages[index],
            x + xPos, y + yPos, x, y, resolution);
        }
      }
    }

    for (let i = 0; i < this.objectMapSorces.length; i++) {
      for (let y = 0; y <= resolution; y++) {
        for (let x = 0; x <= resolution; x++) {
          this.engine.process(this.objectMapSorces[i], null, TerrainStorages[index],
            x + xPos, y + yPos, x, y, resolution);
        }
      }
    }

/*    TerrainStorages[index].TreeInstances.Instances = [
      {
        "Position": {
          "x": 0.01171875,
          "y": 0.505955696105957,
          "z": 0.046875
        },
        "Scale": 0.800000011920929,
        "Rotation": 109.0,
        "PrototypeIndex": 1
      }
    ];

    console.log(JSON.stringify({Index: index,
      Instances: TerrainStorages[index].TreeInstances.Instances}));*/



    GameInstance.SendMessage('Pool', 'OnTerracoreSyncronization', JSON.stringify({Index: index,
      Instances: TerrainStorages[index].TreeInstances.Instances}))
  }

  async compile(editor: D3NE.NodeEditor) {
    const backup = editor.toJSON();

    const heightmap = editor.nodes.find(x => x.title == 'HeightMap');
    if (heightmap != null) {
      this.optimizeGraph(editor, heightmap);
      this.heightMapSource = editor.toJSON();
    } else {
      this.heightMapSource = '';
    }

    editor.clear();
    await editor.fromJSON(backup);

    this.splatMapSources = [];
    for (let node of editor.nodes.filter(x => x.title == 'SplatMap')) {
      this.optimizeGraph(editor, node);
      this.splatMapSources.push(editor.toJSON());
      editor.clear();
      await editor.fromJSON(backup);
    }


    editor.clear();
    await editor.fromJSON(backup);

    this.detailMapSources = [];
    for (let node of editor.nodes.filter(x => x.title == 'DetailMap')) {
      this.optimizeGraph(editor, node);
      this.detailMapSources.push(editor.toJSON());
      editor.clear();
      await editor.fromJSON(backup);
    }

    editor.clear();
    await editor.fromJSON(backup);

    this.objectMapSorces = [];
    for (let node of editor.nodes.filter(x => x.title == 'Obj')) {
      this.optimizeGraph(editor, node);
      this.objectMapSorces.push(editor.toJSON());
      editor.clear();
      await editor.fromJSON(backup);
    }

    console.log(this);
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