import Auth from '../../models/auth';
import HeaderPublic from '../layout/header-public';
import FooterPublic from '../layout/footer-public';
import FormLogin from './page';


const Login = {
    title: "MetroQ - Metrovirtual Quality",
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
            m(HeaderPublic),
            m(FormLogin),
            m(FooterPublic)
        ];
    },
};

export default Login;