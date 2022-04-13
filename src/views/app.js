import Auth from '../models/auth';


const App = {
    title: "Metrovirtual para Médicos",
    oninit: () => {
        document.title = "Cargando...";
    },
    oncreate: () => {
        document.title = "Bienvenido | " + App.title;
    },
    isAuth: () => {
        if (Auth.isLogin()) {
            return m.route.set('/inicio');
        } else {
            return m.route.set('/auth');
        }
    },
    setLoader: () => {
        return [
            m(".preloader", [
                m(".preloader-inner", [
                    m(".loader-content", [
                        m("span", { class: "icon-section-wave d-inline-block text-active  mt-3" }),
                    ]),
                ]),
            ])
        ];
    },
    view: () => {
        return [
            App.setLoader(),

            setTimeout(function() { App.isAuth() }, 300)
        ];
    },
};

export default App;