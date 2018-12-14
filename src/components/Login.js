import React from 'react';
import { Button } from 'semantic-ui-react';

// Login button to initiate login through Spotify
const Login = () => <Button as="a" href="https://juju-backend.herokuapp.com/api/v1/login" size="massive" color="instagram">Log in</Button>

export default Login
