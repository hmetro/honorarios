// Pages here
import App from '../views/app'
import User from '../views/user'


// Routes here
const Routes = {
    '/auth': App,
    '/user': User,
    '/paciente': User,
};

const DefaultRoute = '/auth';

export { Routes, DefaultRoute }