import Auth from '../../models/auth';
import HeaderPrivate from '../layout/header-private';
import PagePacientes from './page';
import App from '../app';


const Pacientes = {
    oninit: () => {
        if (!Auth.isLogin()) {
            return m.route.set('/auth');
        }
    },
    oncreate: () => {
        document.title = "Pacientes | " + App.title;
    },
    view: () => {
        return [
            m(HeaderPrivate),
            m(PagePacientes),
        ];
    },

};

export default Pacientes;