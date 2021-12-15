// -- React and related libs
import React from "react";
// import { Switch, Route, Redirect } from "react-router-dom";
// import { HashRouter } from "react-router-dom";

// -- Redux
import { connect } from "react-redux";

// -- Custom Components
import LayoutComponent from "./components/Layout/Layout";
import ErrorPage from "./pages/error/ErrorPage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";

// -- Redux Actions
import { logoutUser } from "./actions/auth";

// -- Third Party Libs
import { ToastContainer } from "react-toastify";

// -- Services
import isAuthenticated from "./services/authService";

// -- Component Styles
import "./styles/app.scss";

//My Imports
import { AuthProvider } from "./actions/authContext";
import { BrowserRouter as Router, Switch, Route  } from "react-router-dom";
import { Redirect } from "react-router-dom";

// const PrivateRoute = ({ dispatch, component, ...rest }) => {
//   if (!isAuthenticated(JSON.parse(localStorage.getItem("authenticated")))) {
//     dispatch(logoutUser());
//     return (<Redirect to="/login" />)
//   } else {
//     return (
//       <Route { ...rest } render={props => (React.createElement(component, props))} />
//     );
//   }
// };

const App = (props) => {

  return (
    <div>
      <h1>HELLO I'M A PAGE</h1>
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={Register}/>
              <Route path="/dashboard" component={Dashboard}/>
            </Switch>
          </AuthProvider>
        </Router>
        <h1>HELLO I'M ANOTHER PAGE</h1>


        {/* <ToastContainer/> */}
        {/* <HashRouter>
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/template/dashboard" />} />
            <Route path="/template" exact render={() => <Redirect to="/template/dashboard"/>}/>
            {/* This one was PrivateRoute */}
            {/* <Route path="/template" dispatch={props.dispatch} component={LayoutComponent} />
            <Route path="/login" exact component={Login} />
            <Route path="/error" exact component={ErrorPage} />
            <Route path="/register" exact component={Register} />
            <Route component={ErrorPage}/>
            <Route path='*' exact={true} render={() => <Redirect to="/error" />} />
          </Switch>
        </HashRouter>  */}
      </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
