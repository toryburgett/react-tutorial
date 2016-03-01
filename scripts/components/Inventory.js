/*
  Inventory
  <Inventory />
*/

import React from 'react';
import AddFishForm from './AddFishForm';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import h from '../helpers';
import autobind from 'autobind-decorator';




@autobind
class Inventory extends React.Component{

  renderInventory(key){
    var linkState = this.props.linkState;
    return(
      <div className="fish-edit" key={key}>
        <input type="text" valueLink={linkState('fishes.'+key+'.name')}/>
        <input type="text" valueLink={linkState('fishes.'+key+'.price')}/>
        <select valueLink={linkState('fishes.'+key+'.status')}>
          <option value="unavailable">SOLD OUT!</option>
          <option value="available">FRESH!</option>
        </select>
        <textarea valueLink={linkState('fishes.'+key+'.desc')}></textarea>
        <input type="text" valueLink={linkState('fishes.'+key+'.image')}/>
        <button onClick={this.props.removeFish.bind(null, key)}>REMOVE FISH</button>
      </div>
    )
  }

  render(){
    return(
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm {...this.props} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
};

Inventory.propTypes = {
  addFish : React.PropTypes.func.isRequired,
  removeFish : React.PropTypes.func.isRequired,
  loadSamples : React.PropTypes.func.isRequired,
  linkState : React.PropTypes.func.isRequired,
  fishes : React.PropTypes.object.isRequired
}

export default Inventory;
