/// <reference path="../../../../node_modules/d3-node-editor/src/index.d.ts"/>

import {numSocket} from "../sockets/sockets";
import {ConstComponent} from "./producer-components";

class AddComponentProto extends D3NE.Component {
  Title = "Add";
  constructor() {
    super("Add", <D3NE.ComponentProps>{
      builder(node: D3NE.Node) {
        const numbers = new D3NE.Input('numbers', numSocket, true);

        const add = new D3NE.Output('Output', numSocket);
        return node.addInput(numbers).addOutput(add);
      },
      worker(node, inputs, outputs) {
        outputs[0] = inputs[0].reduce((acc, cur) => acc + cur);
      }
    });
  }
}

class MultiplyComponentProto extends D3NE.Component {
  Title = "Multiply";
  constructor() {
    super("Multiply", <D3NE.ComponentProps>{
      builder(node: D3NE.Node) {
        const numbers = new D3NE.Input('numbers', numSocket, true);

        const add = new D3NE.Output('Output', numSocket);
        return node.addInput(numbers).addOutput(add);
      },
      worker(node, inputs, outputs) {
        outputs[0] = inputs[0].reduce((acc, cur) => acc * cur);
      }
    });
  }
}

class SubtractComponentProto extends D3NE.Component {
  Title = "Subtract";
  constructor() {
    super("Subtract", <D3NE.ComponentProps>{
      builder(node: D3NE.Node) {
        const numbers = new D3NE.Input('numbers', numSocket, true);

        const add = new D3NE.Output('Output', numSocket);
        return node.addInput(numbers).addOutput(add);
      },
      worker(node, inputs, outputs) {
        outputs[0] = inputs[0].reduce((acc, cur) => acc + cur);

      }
    });
  }
}

class DivideComponentProto extends D3NE.Component {
  Title = "Divide";
  constructor() {
    super("Divide", <D3NE.ComponentProps>{
      builder(node: D3NE.Node) {
        const numbers = new D3NE.Input('numbers', numSocket, true);

        const add = new D3NE.Output('Output', numSocket);
        return node.addInput(numbers).addOutput(add);
      },
      worker(node, inputs, outputs) {
        outputs[0] = inputs[0].reduce((acc, cur) => acc / cur);
      }
    });
  }
}

class PowerComponentProto extends D3NE.Component {
  Title = "Power";
  constructor() {
    super("Power", <D3NE.ComponentProps>{
      builder(node: D3NE.Node) {
        const numbers = new D3NE.Input('numbers', numSocket, true);

        const add = new D3NE.Output('Output', numSocket);
        return node.addInput(numbers).addOutput(add);
      },
      worker(node, inputs, outputs) {
        outputs[0] = inputs[0].reduce((acc, cur) => acc / cur);
      }
    });
  }
}

export const AddComponent: AddComponentProto = new AddComponentProto();
export const SubtractComponent: SubtractComponentProto = new SubtractComponentProto();
export const MultiplyComponent: MultiplyComponentProto = new MultiplyComponentProto();
export const DivideComponent: DivideComponentProto = new DivideComponentProto();
export const PowerComponent: PowerComponentProto = new PowerComponentProto();

export const MathComponents = [AddComponent, SubtractComponent, MultiplyComponent, DivideComponent, PowerComponent]