const Loader = {
    view: () => {
        return [
            m("div.content.content-fixed.content-auth",
                m("div.container.text-center.mg-t-250",
                    m(".spinner-grow.text-dark[role='status']",
                        m("span.sr-only",
                            "Cargando..."
                        )
                    )
                )
            )
        ];
    },
};

export default Loader;