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
        const control = new D3NE.Control('<input type="number">',
          (el: HTMLInputElement, c: any) => {
            el.value = (c.getData('index') || 1).toString();

            function upd() {
              c.putData("index", parseFloat(el.value));
            }

            el.addEventListener("input", ()=>{
              upd();
            });

            el.addEventListener("mousedown", function(e){e.stopPropagation()});// prevent node movement when selecting text in the input field
            upd();
          }
        );
        return node.addInput(input).addControl();
      },
      worker(node, inputs, outputs, point, terrainData) {

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
      worker(node, inputs, outputs, point, terrainData) {

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
      worker(node, inputs, outputs, point, terrainData) {

      }
    })
  }
}

export const DetailMapComponent = new DetailMapComponentProto();
export const ObjectMapComponent = new ObjectMapComponentProto();
export const SplatMapComponent = new SplatMapComponentProto();
export const HeightMapComponent = new HeightMapComponentProto();
export const OutputComponents = [HeightMapComponent, SplatMapComponent, DetailMapComponent, ObjectMapComponent];