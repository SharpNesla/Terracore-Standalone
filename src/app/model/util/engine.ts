var State = {AVALIABLE: 0, PROCESSED: 1, ABORT: 2};

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
    return node.inputs.map((input) => {
      var conns = input.connections;
      let connData = conns.map((c) => {

        let outputs = this.processNode(this.data.nodes[c.node]);

        if (outputs)
          return outputs[c.output];
      });
      return connData;
    });
  }

  private processNode(node) {

    if (!node.outputData) {
      let inputData = this.extractInputData(node);

      node.outputData = node.outputs.map(() => null);

      var key = node.title;
      var component = this.components.find(c => c.name === key);

      try {
        component.worker(node, inputData, node.outputData, ...this.args);
      } catch (e) {
        console.warn(e);
      }
      if (node.outputData.length !== node.outputs.length)
        throw new Error('Output data does not correspond to number of outputs');

    }

    return node.outputData;
  }

  private forwardProcess(node) {
    return node.outputs.map((output) => {
      return output.connections.map((c) => {
        this.processNode(this.data.nodes[c.node]);
        this.forwardProcess(this.data.nodes[c.node]);
      })
    })
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

    this.data = this.copy(data);
    this.args = args;

    if (startId) {
      let startNode = this.data.nodes[startId];

      if (!startNode)
        throw new Error('Node with such id not found');

      this.processNode(startNode);
      this.forwardProcess(startNode);
    }

    for (let i in this.data.nodes) // process nodes that have not been reached
      if (typeof this.data.nodes[i].outputData === 'undefined') {
        let node = this.data.nodes[i];
        this.processNode(node);
        this.forwardProcess(node);
      }
  }
}