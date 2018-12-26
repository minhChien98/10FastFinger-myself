import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router ,Switch, Route} from 'react-router-dom'
import routes from './routes'


class App extends Component {
    showContentMenus = routes =>{
        var result = null;
        if(routes.length > 0){
            result = routes.map( ( route , index ) => {
                return (<Route 
                    key={index}
                    path={route.path}
                    exact ={route.exact}
                    component={route.main}
                />)
            } );
        }
        return <Switch>{result}</Switch>
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <div className="row">
                        <img src={'./../img/logo-02.png'} width={'200px'} height={'200px'} alt="logo" />
                    </div>
                    <div className="row">
                        <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xs-offset-1 col-sm-offset-1 col-md-offset-1 col-lg-offset-1">
                            {this.showContentMenus(routes)}
                        </div>
                    </div>
                    <footer className="footer">
                        &copy; Copyright by <a href='https://www.facebook.com/groups/hit.web/' >HIT Club</a> 2018  -  Power by <a href='https://www.facebook.com/minhchien.hoang.18/' >Minh Chiến Hoàng</a>
                    </footer>
                </div>
            </Router>
        );
    }

}



export default App;



