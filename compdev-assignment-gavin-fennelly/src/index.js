    import React from 'react';
    import ReactDOM from 'react-dom';
    import PhoneCatalogueApp from './App';
    import '../node_modules/bootstrap/dist/css/bootstrap.css';
	import { Router, Route, IndexRoute, browserHistory } from 'react-router';
	import PhoneDetail from './phoneDetail';
	
	var App = React.createClass({
      render : function() {
        return (
          <div>
            <h1><b>Current Real Madrid Football Squad</b></h1>
			<p> </p>
            {this.props.children}
          </div>
        )
      }
    });
	
    ReactDOM.render( (
	
	<Router history={browserHistory} >
	
	<Route path="/" component={App}>
	<IndexRoute component={PhoneCatalogueApp} />
	<Route path="phones/:id" component={PhoneDetail} />
	</Route>
	
	<Route path="/phones/" component={App}>
	<IndexRoute component={PhoneCatalogueApp} />
	<Route path="/phones/" />
	</Route>
	
	</Router>
	),
      document.getElementById('root')
    );