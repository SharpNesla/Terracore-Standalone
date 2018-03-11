export class Engine {

  readonly id: string;
  components: D3NE.Component[];
  args: any[];
  data: any;

  constructor(id: string, components: D3NE.Component[]) {
    this.id = id;
    this.components = components;
    this.args = [];
    this.data = null;
  }

  clone(): Engine {
    return new Engine(this.id, this.components);
  }

  private extractInputData(node) {
    /*return node.inputs.map((input) => {
      var conns = input.connections;
      let connData = conns.map((c) => {

        let outputs = this.processNode(this.data.nodes[c.node]);

        if (outputs)
          return outputs[c.output];
      });
      return connData;
    });*/


    const arr = new Array(node.inputs.length);

    for (let i = 0; i < node.inputs.length; i++){
      const conndata = new Array(node.inputs[i].connections.length);

      for (let j = 0; j < node.inputs[i].connections.length; j++){
        let outputs = this.processNode(this.data.nodes[node.inputs[i].connections[j].node]);
        if (outputs)
          conndata[j] = outputs[node.inputs[i].connections[j].output];
      }
      arr[i] = conndata;
    }

    return arr;
  }

  private processNode(node) {

    if (!node.outputData) {
      let inputData = this.extractInputData(node);

      node.outputData = node.outputs.map(() => null);

      var key = node.title;
      var component = this.components.find(c => c.name === key);

      component.worker(node, inputData, node.outputData, ...this.args);
      /*
            if (node.outputData.length !== node.outputs.length)
              throw new Error('Output data does not correspond to number of outputs');
      */

    }

    return node.outputData;
  }

  private forwardProcess(node) {
    /*return node.outputs.map((output) => {
      return output.connections.map((c) => {
        this.processNode(this.data.nodes[c.node]);
        this.forwardProcess(this.data.nodes[c.node]);
      })
    })*/
    for (let output = 0; output < node.outputs.length; output++) {
      for (let connections = 0; connections < node.outputs[output]; connections++) {
        this.processNode(this.data.nodes[node.outputs[output][connections]]);
        this.forwardProcess(this.data.nodes[node.outputs[output][connections]]);
      }
    }
  }

  private copy(data) {
    data = Object.assign({}, data);
    data.nodes = Object.assign({}, data.nodes);

    Object.keys(data.nodes).forEach(key => {
      data.nodes[key] = Object.assign({}, data.nodes[key])
    });
    return data;
  }

  process(data: any, startId?: number, ...args) {
    if (this.data != '') {
      this.data = this.copy(data);
      this.args = args;

      if (startId) {
        let startNode = this.data.nodes[startId];

        if (!startNode)
          throw new Error('Node with such id not found');

        this.processNode(startNode);
        this.forwardProcess(startNode);
      }

      /*for (let i in this.data.nodes) // process nodes that have not been reached
        if (typeof this.data.nodes[i].outputData === 'undefined') {
          let node = this.data.nodes[i];
          this.processNode(node);
          this.forwardProcess(node);
        }*/

      for (let i in this.data.nodes) { // process nodes that have not been reached
        if (this.data.nodes[i].outputData == undefined) {
          let node = this.data.nodes[i];
          this.processNode(node);
          this.forwardProcess(node);
        }
      }
    }
  }
}