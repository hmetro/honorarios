// Pages here
import App from '../views/app'
import Login from '../views/login/login'
import Inicio from '../views/inicio'


// Routes here
const Routes = {
    '/': App,
    '/inicio': Inicio,
    '/auth': Login, // Login
};

const DefaultRoute = '/';

export { Routes, DefaultRoute }