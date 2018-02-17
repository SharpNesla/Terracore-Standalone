/// <reference path="../../../../node_modules/d3-node-editor/src/index.d.ts"/>
import {numSocket} from "../sockets/sockets";
import * as LN from "libnoise";
const LibNoise = LN.libnoise;

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
  quality = LibNoise.QualityMode.MEDIUM;
  noise = new LibNoise.generator.Perlin(.01, 2.0, 0.5, 8, 42, this.quality);

  constructor() {
    super("Noise", {
      builder(node: D3NE.Node) {
        const out = new D3NE.Output('Number', numSocket);
        return node.addOutput(out)
      },
      worker(node, inputs, outputs) {
        outputs[0] = this.noise.getValue(0,0,10);
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
class RandomComponentProto extends D3NE.Component {
  Title = "Random";
  constructor() {
    super("Random", {
      builder(node: D3NE.Node) {
        const out = new D3NE.Output('Number', numSocket);
        return node.addOutput(out)
      },
      worker(node, inputs, outputs) {
        outputs[0] = Math.random();
      }
    })
  }
}

export const ConstComponent : ConstComponentProto = new ConstComponentProto();
export const NoiseComponent : NoiseComponentProto = new NoiseComponentProto();
export const GrayScaleComponent : GrayScaleComponentProto = new GrayScaleComponentProto();
export const RandomComponent : RandomComponentProto = new RandomComponentProto();
export const ProducerComponents = [ConstComponent, NoiseComponent, GrayScaleComponent, RandomComponent];