import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
// @ts-ignore
import {ImplicitCallback, SecureRoute, Security, withAuth} from '@okta/okta-react';

import {Provider} from 'react-redux';
import store from './store';

import Detail from './Detail';

const App = withAuth(({auth}) => {
    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        auth.isAuthenticated().then((isAuthenticated: React.SetStateAction<null>) => {
            if (isAuthenticated !== authenticated) {
                setAuthenticated(isAuthenticated);
            }
        });
    });

    return (
        <div className="m-3">
            <h1>woot</h1>
            <Link to={{
                pathname: '/details',
                state:{name:'woot'}
            }}>Details</Link>

            {authenticated ? (
                <div>
                    <div className="mb-3">
                        <button className="btn btn-primary" onClick={() => auth.logout()}>
                            Logout
                        </button>
                    </div>
                </div>
            ) : authenticated === null ? (
                <h4>Loading...</h4>
            ) : (
                <button className="btn btn-primary" onClick={() => auth.login()}>
                    Login to search TV Shows
                </button>
            )}
        </div>
    );
});
export default () => (
    <Provider store={store}>
        <Router>
            <Security
                issuer={`${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`}
                client_id={process.env.REACT_APP_OKTA_CLIENT_ID}
                redirect_uri={`${window.location.origin}/implicit/callback`}>
                <Route path="/" exact component={App}/>
                <Route path="/implicit/callback" component={ImplicitCallback}/>
                <Route path={'/details'} component={Detail}/>
            </Security>
        </Router>
    </Provider>
);
