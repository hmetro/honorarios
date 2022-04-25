import Auth from '../../models/auth';
import HeaderPage from '../layout/header-page';
import PagePerfil from './page';
import App from '../app';


const MiPerfil = {
    oninit: () => {
        if (!Auth.isLogin()) {
            return m.route.set('/auth');
        }
    },
    oncreate: () => {
        document.title = "Mi Perfil | " + App.title;
    },
    view: () => {
        return [
            m(HeaderPage),
            m(PagePerfil),
        ];
    },

};

export default MiPerfil;