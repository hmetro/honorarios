import Auth from '../../models/auth';
import HeaderPrivate from '../layout/header-private';
import MenuPanel from '../menu/panel';
import App from '../app';
import Loader from '../loader';



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
            m(MenuPanel),
        ];
    },

};

export default Inicio;