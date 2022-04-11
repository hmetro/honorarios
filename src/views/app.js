const App = {
    view: () =>
        m(".preloader", [
            m(".preloader-inner", [
                m(".loader-content", [
                    m("span", { class: "icon-section-wave d-inline-block text-active  mt-3" }),
                ]),
            ]),
        ])
};

export default App;