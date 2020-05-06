import React, { useState, useEffect } from "react";
import { Link, useHistory, NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem

} from 'reactstrap';

import './App.css';
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const history = useHistory();

  useEffect(() => {
    onLoad();
  }, []);

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    console.log('clicked logout');
    history.push("/login");
  }

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating && (
      <div className="App container">

        <Navbar expand="sm" bg="primary" className="bg-primary">
          <NavbarBrand className="align-middle" href="/">Home</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse className=" " isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar >


            </Nav>

          </Collapse>
          <Nav  >
            {isAuthenticated ? (
              <>
                <NavItem>
                  <NavLink className="nav-link" onClick={handleLogout}>Logout</NavLink>
                </NavItem>

              </>
            ) : (
                <>
                  <NavItem>

                    <NavLink className="nav-link" to="/signup">Signup</NavLink>

                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                  </NavItem>
                </>
              )}
          </Nav>


        </Navbar>
        <ErrorBoundary>
          <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }} >
            <Routes />
          </AppContext.Provider>
        </ErrorBoundary>
      </div>
    )
  );
}

export default App;
