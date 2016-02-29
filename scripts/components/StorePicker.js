/*
  StorePicker
  This will let us make <StorePicker/>
*/
import React from 'react';
import { History } from 'react-router';
import h from '../helpers';

var StorePicker = React.createClass({
  mixins : [History],
  goToStore : function(event){
    event.preventDefault();
    var storeId = this.refs.storeId.value;
    console.log(storeId);

    this.history.pushState(null, '/store/' + storeId);

  },
  render : function(){
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
});

export default StorePicker;
