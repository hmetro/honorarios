import Auth from '../../models/auth';
import HeaderPrivate from '../layout/header-private';
import FooterPublic from '../layout/footer-public';


const Inicio = {
    title: "Metrovirtual para Médicos",
    oninit: () => {
        if (!Auth.isLogin()) {
            return m.route.set('/auth');
        }
    },
    oncreate: () => {
        document.title = "Inicio | " + Inicio.title;
    },
    view: () => {
        return [
            m(HeaderPrivate),
            m('div'),
            m(FooterPublic)
        ];
    },

};

export default Inicio;