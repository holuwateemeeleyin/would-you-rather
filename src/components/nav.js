import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Menu,
  Segment,
  Image,
  Grid,
  Button,
  Container
} from 'semantic-ui-react';
import { setAuthedUser } from '../actions/authedUser';

class Nav extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.setAuthedUser(null);
  };

  render() {
    const { authedUser, users } = this.props;

    return (
      <Container>
        <Segment as={Menu} minWidth={651} pointing secondary>
          <Menu.Item name="home" as={NavLink} to="/" exact />
          <Menu.Item name="new poll" as={NavLink} to="/add" />
          <Menu.Item name="leader board" as={NavLink} to="/leaderboard" />
          <Menu.Menu position="right">
            <Menu.Item>
              <span>
                 Hello, {users[authedUser].name}
              </span>
            </Menu.Item>
            <Menu.Item>
              <span>
                <Image
                  src={users[authedUser].avatarURL}
                  avatar
                  spaced="right"
                  verticalAlign="bottom"
                />
              </span>
            </Menu.Item>
            <Menu.Item>
              <Button
                content="Logout"
                labelPosition="right"
                basic
                compact
                icon="log out"
                size="mini"
                onClick={this.handleLogout}
              />
            </Menu.Item>
          </Menu.Menu>
        </Segment>
        {/* <Segment as={Fragment} minWidth={375} maxWidth={650}>
          ...
        </Segment>
        <Segment as={Fragment} maxWidth={374}>
          ...
        </Segment> */}
      </Container>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    authedUser,
    users
  };
}

export default connect(
  mapStateToProps,
  { setAuthedUser }
)(Nav);