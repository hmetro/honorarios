import Auth from '../../models/auth';
import HeaderPrivate from '../layout/header-public';
import App from '../app';


const Inicio = {
    oninit: () => {
        if (!Auth.isLogin()) {
            return m.route.set('/auth');
        }
    },
    oncreate: () => {
        document.title = "Inicio | " + App.title;
    },
    view: () => {
        return [
            m(HeaderPrivate),
        ];
    },

};

export default Inicio;