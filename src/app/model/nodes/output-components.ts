import {numSocket} from "../sockets/sockets";

class HeightMapComponentProto extends D3NE.Component {
  Title = "HeightMap";
  constructor() {
    super("HeightMap", {
      builder(node: D3NE.Node) {
        const input = new D3NE.Input('Number', numSocket);
        return node.addInput(input);
      },
      worker(node, inputs, outputs) {
        console.log(inputs)
      }
    })
  }
}

class SplatMapComponentProto extends D3NE.Component {
  Title = "SplatMap";
  constructor() {
    super("SplatMap", {
      builder(node: D3NE.Node) {
        const input = new D3NE.Input('Number', numSocket);
        return node.addInput(input);
      },
      worker(node, inputs, outputs) {
        outputs[0] = inputs[0][0];
      }
    })
  }
}

class ObjectMapComponentProto extends D3NE.Component {
  Title = "ObjectMap";
  constructor() {
    super("ObjectMap", {
      builder(node: D3NE.Node) {
        const input = new D3NE.Input('Number', numSocket);
        return node.addInput(input);
      },
      worker(node, inputs, outputs) {
        outputs[0] = inputs[0][0];
      }
    })
  }
}

class DetailMapComponentProto extends D3NE.Component {
  Title = "DetailMap";
  constructor() {
    super("DetailMap", {
      builder(node: D3NE.Node) {
        const input = new D3NE.Input('Number', numSocket);
        return node.addInput(input);
      },
      worker(node, inputs, outputs) {
        outputs[0] = inputs[0][0];
      }
    })
  }
}

export const DetailMapComponent = new DetailMapComponentProto();
export const ObjectMapComponent = new ObjectMapComponentProto();
export const SplatMapComponent = new SplatMapComponentProto();
export const HeightMapComponent = new HeightMapComponentProto();
export const OutputComponents = [HeightMapComponent, SplatMapComponent, DetailMapComponent, ObjectMapComponent];