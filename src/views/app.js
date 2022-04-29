import Auth from '../models/auth';
import Loader from './loader';


const App = {
    title: "Metrovirtual Mobile v4.0",
    oninit: () => {
        document.title = "Cargando...";
    },

    isAuth: () => {
        if (Auth.isLogin()) {
            return m.route.set('/inicio');
        } else {
            return m.route.set('/auth');
        }
    },
    view: () => {
        return [
            m(Loader),
            setTimeout(function() { App.isAuth() }, 300)
        ];
    },
};

export default App;