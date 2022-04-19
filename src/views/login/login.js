import Auth from '../../models/auth';
import Head from './head';
import Page from './page';



const Login = {
    title: "Metrovirtual para Médicos",
    oninit: () => {
        if (Auth.isLogin()) {
            return m.route.set('/inicio');
        }
    },
    oncreate: () => {
        document.title = "Entrar | " + Login.title;
    },
    onvalid: () => {
        document.title = "Entrar | " + Login.title;
    },
    view: () => {
        return [
            m(Head),
            m(Page)
        ];
    },
};

export default Login;