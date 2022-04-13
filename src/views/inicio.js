import Auth from '../models/auth';
import Header from './header';


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
            m(Header)

        ];
    },

};

export default Inicio;