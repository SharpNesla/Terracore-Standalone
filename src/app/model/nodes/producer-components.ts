/// <reference path="../../../../node_modules/d3-node-editor/src/index.d.ts"/>
import {numSocket} from "../sockets/sockets";
import * as LN from "libnoise";

const LibNoise = LN.libnoise;

class ConstComponentProto extends D3NE.Component {
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


class NoiseComponentProto extends D3NE.Component {
  quality = LibNoise.QualityMode.MEDIUM;
  noise = new LibNoise.generator.Perlin(.01, 2.0, 0.5, 8, 42, this.quality);

  constructor() {
    super("Noise", <D3NE.ComponentProps>{
      builder(node: D3NE.Node) {
        const out = new D3NE.Output('Number', numSocket);
        return node.addOutput(out)
      },
      worker(node, inputs, outputs, storage, xPos, yPos, xLocalPos, yLocalPos, resolution) {
        outputs[0] = this.noise.getValue(xPos, 0, yPos) / 6;
      }
    })
  }
}

/*class GrayScaleComponentProto extends D3NE.Component {
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
}*/

class RandomComponentProto extends D3NE.Component {
  public static RandomFromPosition(min: number, max: number, seed: number, x: number, y: number): number {
    let s: number = seed * 1972854929;
    s ^= (x * 2971902361) ^ (y * 3572953751);
    s = 0x6C078965 * s;// & 0xFFFFFFFF;

    s ^= s >> 11;
    s ^= (s << 7) & 0x9D2C5680;
    s ^= (s << 15) & 0xEFC60000;
    s ^= s >> 18;

    return ((s & 0x7FFFFFFF) * 4.656612875245796924105750827168e-10 * 1000000000 * 2) % (max - min) + min;
  }
  constructor() {
    super("Random", <D3NE.ComponentProps>{
      builder(node: D3NE.Node) {
        const out = new D3NE.Output('Number', numSocket);

        const control = new D3NE.Control('<input placeholder="seed" type="number">',
          (el: HTMLInputElement, c: any) => {
            el.value = (c.getData('seed') || 1).toString();

            function upd() {
              c.putData("seed", parseFloat(el.value));
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

        return node.addControl(control).addOutput(out)
      },
      worker(node, inputs, outputs, storage, xPos, yPos, xLocalPos, yLocalPos, resolution) {
        outputs[0] = RandomComponentProto.RandomFromPosition(0, 1, node.data['seed'], xPos, yPos);
      }
    })
  }
}

export const ConstComponent: ConstComponentProto = new ConstComponentProto();
export const NoiseComponent: NoiseComponentProto = new NoiseComponentProto();
/*export const GrayScaleComponent: GrayScaleComponentProto = new GrayScaleComponentProto();*/
export const RandomComponent: RandomComponentProto = new RandomComponentProto();
export const ProducerComponents = [ConstComponent, NoiseComponent, /*GrayScaleComponent,*/ RandomComponent];