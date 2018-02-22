import {numSocket} from "../sockets/sockets";

class HeightMapComponentProto extends D3NE.Component {
  constructor() {
    super("HeightMap", <D3NE.ComponentProps>{
      builder(node: D3NE.Node) {
        const input = new D3NE.Input('Number', numSocket);
        return node.addInput(input);
      },
      worker(node, inputs, outputs, storage, xPos, yPos, xLocalPos, yLocalPos, resolution) {
        storage.Heights[yLocalPos * (resolution + 1) + xLocalPos] = inputs[0][0]
      }
    })
  }
}

class SplatMapComponentProto extends D3NE.Component {
  constructor() {
    super("SplatMap", <D3NE.ComponentProps>{
      builder(node: D3NE.Node) {
        const input = new D3NE.Input('Number', numSocket);
        return node.addInput(input);
      },
      worker(node, inputs, outputs, point, terrainData, isHeightMapProcess) {
        if (!isHeightMapProcess) {
          console.log("SplatMap: " + inputs)
        }
      }
    })
  }
}

class ObjectMapComponentProto extends D3NE.Component {
  Title = "ObjectMap";
  constructor() {
    super("ObjectMap", <D3NE.ComponentProps>{
      builder(node: D3NE.Node) {
        const input = new D3NE.Input('Number', numSocket);
        return node.addInput(input);
      },
      worker(node, inputs, outputs, point, terrainData, isHeightMapProcess) {
        if (!isHeightMapProcess) {

        }
      }
    })
  }
}

class DetailMapComponentProto extends D3NE.Component {
  Title = "DetailMap";
  constructor() {
    super("DetailMap", <D3NE.ComponentProps>{
      builder(node: D3NE.Node) {
        const input = new D3NE.Input('Number', numSocket);
        return node.addInput(input);
      },
      worker(node, inputs, outputs, point, terrainData, isHeightMapProcess) {
        if (!isHeightMapProcess) {

        }
      }
    })
  }
}

export const DetailMapComponent = new DetailMapComponentProto();
export const ObjectMapComponent = new ObjectMapComponentProto();
export const SplatMapComponent = new SplatMapComponentProto();
export const HeightMapComponent = new HeightMapComponentProto();
export const OutputComponents = [HeightMapComponent, SplatMapComponent, DetailMapComponent, ObjectMapComponent];