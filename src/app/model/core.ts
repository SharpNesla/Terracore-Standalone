/// <reference path="../../../node_modules/d3-node-editor/src/index.d.ts"/>

import {AllComponentsFlat} from "./nodes/components";
import {OutputComponents} from "./nodes/output-components";
import Engine = D3NE.Engine;

export class TerrainChunk {
  Heights : number[][];
  SplatMap: number[][][];
  DetailMap: number[][][];
  TreeMask : boolean[][][];

  constructor(heightmapDim, splatCount){
    //init Heights
    this.Heights = new Array(heightmapDim);
    const Arr = new Array(heightmapDim);
    Arr.fill(0);
    this.Heights.fill(Arr);

    //init Splats
    this.SplatMap = new Array(heightmapDim);
    const Arrr = new Array(heightmapDim);
    Arrr.fill(new Array(splatCount).fill(0));
    this.SplatMap.fill(Arrr);

    //init Details
    this.DetailMap = new Array(heightmapDim);
    const Arrrr = new Array(heightmapDim);
    Arrrr.fill(new Array(splatCount).fill(0));
    this.DetailMap.fill(Arrrr);

    //init Trees
    this.TreeMask = new Array(heightmapDim);
    const Arrrrr = new Array(heightmapDim);
    Arrrrr.fill(new Array(splatCount).fill(false));
    this.TreeMask.fill(Arrrrr);
  }

}

export class Core extends D3NE.Engine {

  constructor() {
    super("terracore@0.0.0", AllComponentsFlat);
  }

  public async getCell(editor: D3NE.NodeEditor, point: { x: number, y: number }, terrainData) : string {
    this.abort();
    const json = editor.toJSON();
    await this.process(json, null, point, terrainData, true);
    await this.process(json, null, point, terrainData, false);
    return JSON.stringify(new TerrainChunk(256, 8))
  }

  public async getChunk() {

  }

}