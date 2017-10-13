import StatesService from 'atm-states'
import settings from 'electron-settings'

class StatesGraph{
  constructor(){
    this.states = new StatesService(settings)
    console.log('States Graph constructed')
  }

}

var graph = new StatesGraph();
