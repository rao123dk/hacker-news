import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import {Helmet} from "react-helmet";

import Page1 from './page1'
import Page2 from './page2'


class Main extends Component {
  render() {
    return (
      <div>
        <Helmet>
            <title>Main page</title>
            <meta name="description" content="This is my first E-commrce site" />
        </Helmet>
        <Link to="/index">index</Link>
        <Link to="/inner-page">inner-page</Link>
        <Switch>
          <Route path='/index' component={Page1} />
          <Route path='/inner-page' component={Page2} />
        </Switch>
      </div>
    );
  }
}
export default Main;