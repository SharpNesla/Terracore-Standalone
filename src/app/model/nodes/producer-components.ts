/// <reference path="../../../../node_modules/d3-node-editor/src/index.d.ts"/>
import {numSocket} from "../sockets/sockets";

class ConstComponentProto extends D3NE.Component {
  Title = "Const";
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

            el.addEventListener("input", ()=>{
              upd();
            });

            el.addEventListener("mousedown", function(e){e.stopPropagation()});// prevent node movement when selecting text in the input field
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


class NoiseComponentProto extends D3NE.Component {
  Title = "Noise";
  constructor() {
    super("Noise", {
      builder(node: D3NE.Node) {
        const out = new D3NE.Output('Number', numSocket);
        const control = new D3NE.Control('<input type="number">',
          (el: HTMLInputElement, c: any) => {
            el.value = (c.getData('num') || 1).toString();

            function upd() {
              c.putData("num", parseFloat(el.value));
            }

            el.addEventListener("input", ()=>{
              upd();
            });

            el.addEventListener("mousedown", function(e){e.stopPropagation()});// prevent node movement when selecting text in the input field
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

class GrayScaleComponentProto extends D3NE.Component {
  Title = "GrayScale";
  constructor() {
    super("GrayScale", {
      builder(node: D3NE.Node) {
        const out = new D3NE.Output('Number', numSocket);
        const control = new D3NE.Control('<input type="number">',
          (el: HTMLInputElement, c: any) => {
            el.value = (c.getData('num') || 1).toString();

            function upd() {
              c.putData("num", parseFloat(el.value));
            }

            el.addEventListener("input", ()=>{
              upd();
            });

            el.addEventListener("mousedown", function(e){e.stopPropagation()});// prevent node movement when selecting text in the input field
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

export const ConstComponent : ConstComponentProto = new ConstComponentProto();
export const NoiseComponent : NoiseComponentProto = new NoiseComponentProto();
export const GrayScaleComponent : GrayScaleComponentProto = new GrayScaleComponentProto();
export const ProducerComponents = [ConstComponent, NoiseComponent, GrayScaleComponent];