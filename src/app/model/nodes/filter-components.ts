import {numSocket} from "../sockets/sockets";
import {DetailMapComponent, HeightMapComponent, ObjectMapComponent, SplatMapComponent} from "./output-components";

class SlopeComponentProto extends D3NE.Component {
  constructor() {
    super("Const", {
      builder(node: D3NE.Node) {
        const out = new D3NE.Output('Number', numSocket);
        const control = new D3NE.Control('<input type="number">',
          (el: HTMLInputElement, c: any) => {
            el.value = (c.getData('num') || 1).toString();

            function upd() {
              c.putData("num", parseFloat(el.value));
            }

            el.addEventListener("input", () => {
              upd();
            });

            el.addEventListener("mousedown", function (e) {
              e.stopPropagation()
            });// prevent node movement when selecting text in the input field
            upd();
          }
        );
        return node.addOutput(out).addControl(control)
      },
      worker(node, inputs, outputs) {
        outputs[0] = node.data['num'];
      }
    })
  }
}

export const FilterComponents = [new SlopeComponentProto()];