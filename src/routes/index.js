// Pages here
import App from '../views/app'
import Salir from '../views/salir'
import Login from '../views/login/login'
import Inicio from '../views/inicio/inicio'
import Pacientes from '../views/pacientes/pacientes';
import MiPerfil from '../views/perfil/perfil';




// Routes here
const Routes = {
    '/': App,
    '/inicio': Inicio, //Inicio
    '/auth': Login, // Login
    '/pacientes': Pacientes, // Pacientes
    '/mi-perfil': MiPerfil, // MiPerfil
    '/salir': Salir, // Salir
};

const DefaultRoute = '/';

export { Routes, DefaultRoute }