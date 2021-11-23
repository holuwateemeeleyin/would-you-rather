import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import Login from './login';
import Nav from './nav';
import Home from './home';
import UserCard from './userCard';
import NewPoll from './newPoll';
import Leaderboard from './leaderboard';
import NoMatch from './noMatch';

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { authedUser } = this.props
    return (
      <Router>
        <div className="App">
          {
            authedUser === null ? (
              <Route
                render={() => (
                  <ContentGrid>
                    <Login />
                  </ContentGrid>
                )}
              />
            ) : (
              <Fragment>
                <Nav />
                <ContentGrid>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/questions/bad_id" component={NoMatch} />
                    <Route path="/questions/:question_id" component={UserCard} />
                    <Route path="/add" component={NewPoll} />
                    <Route path="/leaderboard" component={Leaderboard} />
                    <Route component={NoMatch} />
                  </Switch>
                </ContentGrid>
              </Fragment>
            )
          }
        </div>
      </Router>
    );
  }
}

const ContentGrid = ({ children }) => (
  <Grid padded="vertically" columns={1} centered>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 550 }}>{children}</Grid.Column>
    </Grid.Row>
  </Grid>
);

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(
  mapStateToProps,
  { handleInitialData },
)(App)