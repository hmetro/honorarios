// Pages here
import App from '../views/app'
import Salir from '../views/salir'
import Login from '../views/login/login'
import Inicio from '../views/inicio/inicio'



// Routes here
const Routes = {
    '/': App,
    '/inicio': Inicio, //Inicio
    '/auth': Login, // Login
    '/salir': Salir, // Login
};

const DefaultRoute = '/';

export { Routes, DefaultRoute }