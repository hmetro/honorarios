// Pages here
import App from '../views/app'
import Login from '../views/login/login'


// Routes here
const Routes = {
    '/': App, // Home App
    '/auth': Login, // Login
    '/mi-perfil': "",
    '/inicio': "",
};

const DefaultRoute = '/';

export { Routes, DefaultRoute }