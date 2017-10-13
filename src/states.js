import StatesService from 'atm-states'
import settings from 'electron-settings'

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
   * [redraw description]
   * @return {[type]} [description]
   */
  redraw(){
    console.log('Redraw event');
  }

}

var g = new StatesGraph();
g.redraw();
