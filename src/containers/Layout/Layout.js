import React, { Component, Fragment } from "react"
import { Switch, Route, Redirect } from "react-router"
import Login from "../Login/Login"
import Main from "../Main/Main"
import NoteApp from "../NoteApp/NoteApp"
import NavBar from "./../../components/UI/NavBar/NavBar"
import NavItem from "./../../components/UI/NavBar/NavItem/NavItem"
import classes from "./Layout.css"
import { connect } from "react-redux"
import * as actions from "./../../store/actions/index"
import { withRouter } from "react-router"

class Layout extends Component {
    render() {
        return (
            <div className={classes.Layout}>
                <div className={classes.NavBar}>
                    {this.props.isLoggedIn && <NavItem
                        to="/logout"
                        onClick={() => this.props.logoutUser()}
                    >
                        Logout
                    </NavItem>}
                    {this.props.isLoggedIn && <NavItem to="/app">Notes</NavItem>}
                    {this.props.isLoggedIn || <NavItem to="/login">Login</NavItem>}
                    <NavItem to="/">Main page</NavItem>
                </div>
                <div className={classes.Content}>
                    <Switch>
                        <Route path="/login" exact component={Login} />
                        {this.props.isLoggedIn ? (
                            <Route path="/app" exact component={NoteApp} />
                        ) : (
                            <Redirect to="/login" />
                        )}
                        <Route path="/" exact component={Main} />
                    </Switch>
                </div>
                <div className={classes.Footer}>
                            <p style={{margin: '0'}}>Some kind of status bar</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
})

export default withRouter(
    connect(
        mapStateToProps,
        {
            logoutUser: actions.logoutUser
        }
    )(Layout)
)