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
   * [redraw description]
   * @return {[type]} [description]
   */
  redraw(){
    console.log('Redraw event');
  }

}

var g = new StatesGraph();

ipc.on('graph-update-states', (event, data) => {
  g.processStatesData(data);
  g.redraw();
});
