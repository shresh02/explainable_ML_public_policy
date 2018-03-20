import React, { Component } from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import ModelList from './ModelList.js';
import Home from './home.js';
import ModelView from './ModelView.js';
import Header from './header.js';

class App extends Component {
    render()
    {
        return (
            <Router>
                <div>
                    <Header />
                    <Route exact path="/" component={Home}/>
                    <Route path="/ModelList" component={ModelList}/>
                    <Route path="/ModelView/:id" component={ModelView}/>
                </div>
            </Router>
        );
    }
}

export default App;
