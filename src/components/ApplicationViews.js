import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from './home/Home';
import Practice from './practice/Practice'
import SpellBookList from './spellbook/SpellBookList'
import MySpellsList from './myspells/MySpellsList'
import Logout from './auth/Logout'


class ApplicationViews extends Component {
    isAuthenticated = () => sessionStorage.getItem("activeUser") !== null;
    activeUser = () => parseInt(sessionStorage.getItem("activeUser"));

    render() {
        console.log(this.activeUser());
        return (
            <React.Fragment>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />

                <Route
                    exact
                    path="/"
                    render={props => {
                        if (this.isAuthenticated()) {
                            return <Home />;
                        } else {
                            return <Redirect to="/login" />;
                        }
                    }}
                />

                <Route exact path="/practice/:spellId(\d+)" render={props => {
                    if (this.isAuthenticated()) {
                        return <Practice activeUser={this.activeUser} {...props} />
                    }
                }
                } />


                <Route exact path="/spellbook" render={props => {
                    if (this.isAuthenticated()) {
                        return <SpellBookList activeUser={this.activeUser} {...props} />
                    }
                }
                } />

                <Route exact path="/mySpells" render={props => {
                    if (this.isAuthenticated()) {
                        return <MySpellsList activeUser={this.activeUser} {...props} />
                    }
                }
                } />

                <Route exact path="/logout" render={props => {
                    if (this.isAuthenticated()) {
                        return <Logout activeUser={this.activeUser} {...props} />
                    }
                }
                } />


                {/* <Route
                    exact
                    path="/news"
                    render={props => {
                        if (this.isAuthenticated()) {
                            return <NewsList activeUser={this.activeUser} {...props} />;

                            // Remove null and return the component which will show news articles
                        }
                    }}
                /> */}
            </React.Fragment>
        )
    }
}

// // old code 
// /* class ApplicationViews extends Component {

//     render() {
//       return (
//         <React.Fragment>
//           <Route exact path="/" render={(props) => {
//             return <Home />
//           }} />
//           {/* <Route path="/animals" render={(props) => {
//             return <AnimalCard />
//           }} /> */}
//         {/* </React.Fragment>
//       )
//     }
//   } */} */}

export default ApplicationViews