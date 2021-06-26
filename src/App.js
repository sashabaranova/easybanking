import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import AccountInfo from './components/AccountInfo';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.scss';

function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <div className="main">
          <Switch>
            <Route exact path="/accounts/:id" component={AccountInfo} />
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App;
