/// <reference path="../../../node_modules/d3-node-editor/src/index.d.ts"/>

import {AllComponentsFlat} from "./nodes/components";

export class TerrainData {

}

export class Core extends D3NE.Engine {
  constructor() {
    super("terracore@0.0.0", AllComponentsFlat);
  }

  getCell(json) {
    console.log(json);
    this.process(json, null, 0, 0);
  }
}