import {numSocket} from "../sockets/sockets";
import {NodeEditorService} from "../node-editor.service";

class HeightMapComponentProto extends D3NE.Component {
  constructor() {
    super("HeightMap", <D3NE.ComponentProps>{
      builder(node: D3NE.Node) {
        const input = new D3NE.Input('Number', numSocket);
        return node.addInput(input);
      },
      worker(node, inputs, outputs, storage, xPos, yPos, xLocalPos, yLocalPos, resolution) {
        if (inputs[0][0] != undefined) {
          storage.Heights[yLocalPos * (resolution + 1) + xLocalPos] = inputs[0][0]
        }
        else {
          storage.Heights[yLocalPos * (resolution + 1) + xLocalPos] = 0;
        }
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
        return node.addInput(input).addControl(control)
      },
      worker(node, inputs, outputs, storage, xPos, yPos, xLocalPos, yLocalPos, resolution) {
        storage.SplatMaps[(node.data['index'] + xLocalPos * 6) + yLocalPos * resolution * 6] = 1;
      }
    })

  }
}

class ObjectMapComponentProto extends D3NE.Component {
  constructor() {
    super("ObjectMap", <D3NE.ComponentProps>{
      builder(node: D3NE.Node) {
        const input = new D3NE.Input('Number', numSocket);
        return node.addInput(input);
      },
      worker(node, inputs, outputs, storage, xPos, yPos, xLocalPos, yLocalPos, resolution) {

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
        const control = new D3NE.Control('<input type="number">',
          (el: HTMLInputElement, c: any) => {
            el.value = (c.getData('index') || 0).toString();

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
        return node.addInput(input).addControl(control)
      },
      worker(node, inputs, outputs, storage, xPos, yPos, xLocalPos, yLocalPos, resolution) {
        storage.DetailLayers[0][yLocalPos * (resolution) + xLocalPos] = 5.324934164434305e-44 * inputs[0][0];
      }
    })
  }
}

export const DetailMapComponent = new DetailMapComponentProto();
export const ObjectMapComponent = new ObjectMapComponentProto();
export const SplatMapComponent = new SplatMapComponentProto();
export const HeightMapComponent = new HeightMapComponentProto();
export const OutputComponents = [HeightMapComponent, SplatMapComponent, DetailMapComponent, ObjectMapComponent];