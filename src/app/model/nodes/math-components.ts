/// <reference path="../../../../node_modules/d3-node-editor/src/index.d.ts"/>

import {numSocket} from "../sockets/sockets";
import {FloatComponent} from "./const-nodes";

class AddComponentProto extends D3NE.Component {
  constructor() {
    super("Add", <D3NE.ComponentProps>{
      builder(node: D3NE.Node) {
        const numbers = new D3NE.Input('numbers', numSocket, true);

        const add = new D3NE.Output('Output', numSocket);
        return node.addInput(numbers).addOutput(add);
      },
      worker(node, inputs, outputs, point) {
        outputs[0] = inputs[0].reduce((acc, cur) => acc + cur);
        console.log(outputs[0])
        console.log(point)
      }
    });
  }
}

class MultiplyComponentProto extends D3NE.Component {
  constructor() {
    super("Add", <D3NE.ComponentProps>{
      builder(node: D3NE.Node) {
        const numbers = new D3NE.Input('numbers', numSocket, true);

        const add = new D3NE.Output('Output', numSocket);
        return node.addInput(numbers).addOutput(add);
      },
      worker(node, inputs, outputs, point) {
        outputs[0] = inputs[0].reduce((acc, cur) => acc + cur);

      }
    });
  }
}

export const AddComponent : AddComponentProto = new AddComponentProto();