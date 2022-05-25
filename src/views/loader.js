const Loader = {
    view: () => {
        return [
            m("div.preloader",
                m("div.preloader-inner",
                    m("div.loader-content",
                        m("span.icon-section-wave.d-inline-block.text-active.mt-3.", [
                            m("p.text-center.ff-roboto.m-mt-20.text-primary", "Procesando...")
                        ]),
                    )
                )
            )
        ];
    },
};

export default Loader;