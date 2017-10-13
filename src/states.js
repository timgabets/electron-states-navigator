import StatesService from 'atm-states'
import settings from 'electron-settings'
import { ipcRenderer as ipc} from 'electron'

class StatesGraph{
  constructor(){
    this.states = new StatesService(settings)

    this.options = {
      edges: {
        smooth: { type: 'cubicBezier', forceDirection: 'horizontal', roundness: 0.4 }
      },
      layout: {
        hierarchical: { direction: 'LR', levelSeparation: 160, nodeSpacing: 160 }
      },
      physics: false,
    }
  }

  /**
   * [processStatesData description]
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  processStatesData(data){
    data.forEach( state => {
      this.states.addState(state);
    })
    console.log('States data processed');
  }

  /**
   * [getNodes prepare graph nodes and apply some styles]
   * @return {[type]} [description]
   */
  getNodes(){
    this.nodes = this.states.getNodes();
    this.nodes.forEach(node => {
      node['size'] = 160;
      node['color'] = 'silver';
      node['shape'] = 'box';
      node['font'] = {'size': '32', 'face': 'monospace', 'align': 'center'};
      node['heightConstraint'] = { minimum: 100 };
      node['widthConstraint'] = { minimum: 100 };
    })
  }

  /**
   * [getEdges prepare graph edges and apply some styles]
   * @return {[type]} [description]
   */
  getEdges(){
    this.edges = this.states.getEdges()
    this.edges.forEach( edge => {
      edge['arrows'] = 'to';
      edge['physics'] = false;
      edge['smooth'] = {'type': 'cubicBezier'};
    });
  }

  /**
   * [redraw description]
   * @return {[type]} [description]
   */
  redraw(){
    this.getNodes();
    this.getEdges();

    this.container = document.getElementById('mynetwork');
    /*
    this.graph = new vis.Network(
      this.container, 
      {'nodes': this.nodes, 'edges': this.edges}, 
      this.options
    );
    */

    console.log('Redraw event');
  }

}

var g = new StatesGraph();

ipc.on('graph-update-states', (event, data) => {
  g.processStatesData(data);
  g.redraw();
});
