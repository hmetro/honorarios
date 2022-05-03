// Pages here
import App from '../views/app'
import Login from '../views/login/login'
import Salir from '../views/salir'
import Inicio from '../views/inicio/inicio'



// Routes here
const Routes = {
    '/': App, // Home App
    '/auth': Login, // Login
    '/mi-perfil': "",
    '/inicio': Inicio, // Inicio
    '/salir': Salir, // Salir
};

const DefaultRoute = '/';

export { Routes, DefaultRoute }