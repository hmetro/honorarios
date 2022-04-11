const App = {
    title: "Metrovirtual para Médicos",
    oninit: () => {
        document.title = "Cargando...";
    },
    oncreate: () => {
        document.title = "Bienvenido | " + App.title;
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
            m(".preloader", [
                m(".preloader-inner", [
                    m(".loader-content", [
                        m("span", { class: "icon-section-wave d-inline-block text-active  mt-3" }),
                    ]),
                ]),
            ]),
            setTimeout(function() { m.route.set('/user') }, 6000)
        ];
    },
};

export default App;