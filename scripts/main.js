var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var h = require("./helpers.js")

/*
  App
*/
var App = React.createClass({
  getInitialState : function(){
    return{
      fishes: {},
      order : {}
    }
  },
  addFish : function(fish) {
    var timestamp = (new Date()).getTime();
    this.state.fishes['fish-' + timestamp] = fish;
    this.setState({ fishes : this.state.fishes});
  },
  loadSamples : function(){
    this.setState({
      fishes : require("./sample-fishes")
    });
  },
  render : function(){
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
      </div>
    )
  }
});

/*
  Add Fish Form
  <AddFishForm />
*/
var AddFishForm = React.createClass({
  createFish : function(event){
    event.preventDefault();
    var fish = {
      name: this.refs.name.value,
      price: this.refs.price.value,
      status: this.refs.status.value,
      desc: this.refs.desc.value,
      image: this.refs.image.value
    }
    this.props.addFish(fish);
    this.refs.fishForm.reset();
  },
  render : function(){
    return(
      <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
        <input type="text" ref="name" placeholder="Fish Name" />
        <input type="text" ref="price" placeholder="Fish Price"/>
        <select ref="status">
          <option value="available">FRESH!</option>
          <option value="unavailable">SOLD OUT!</option>
        </select>
        <textarea type="text" ref="desc" placeholder="Desc"></textarea>
        <input type="text" ref="image" placeholder="URL to Image"/>
        <button type="submit">+ ADD ITEM</button>
      </form>
    )
  }
})


/*
  Header
  <Header />
*/
var Header = React.createClass({
  render : function(){
    return(
      <header className="top">
        <h1>Catch
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        Day</h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
      </header>
    )
  }
});

/*
  Order
  <Order />
*/
var Order = React.createClass({
  render : function(){
    return(
      <div>
        <p>Order</p>
      </div>
    )
  }
});

/*
  Inventory
  <Inventory />
*/
var Inventory = React.createClass({
  render : function(){
    return(
      <div>
        <h2>Inventory</h2>
        <AddFishForm {...this.props} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
});


/*
  StorePicker
  This will let us make <StorePicker/>
*/

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

/*
 Not Found
*/
var NotFound = React.createClass({
  render: function(){
    return <h1>Not Found!</h1>
  }
})

/*
  Routes
*/
var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={StorePicker}/>
    <Route path="/store/:storeId" component={App}/>
    <Route path="*" component={NotFound}/>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));
