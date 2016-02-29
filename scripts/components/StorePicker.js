/*
  StorePicker
  This will let us make <StorePicker/>
*/
import React from 'react';
import { History } from 'react-router';
import h from '../helpers';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';

@autobind
class StorePicker extends React.Component {

  goToStore(event){
    event.preventDefault();
    var storeId = this.refs.storeId.value;
    this.history.pushState(null, '/store/' + storeId);

  }

  render(){
    var name = "Tory";
    return(
      <form className="store-selector" onSubmit={this.goToStore}>
        {/* Comments go in here!*/}
        <h2>Please enter a store {name}</h2>
        <input type="text" ref="storeId" defaultValue={h.getFunName()} required/>
        <input type="Submit" />
      </form>
    )
  }
}

reactMixin.onClass(StorePicker, History);

export default StorePicker;
