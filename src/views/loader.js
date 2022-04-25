const Loader = {
    view: () => {
        return [
            m("div.preloader",
                m("div.preloader-inner",
                    m("div.loader-content",
                        m("span.icon-section-wave.d-inline-block.text-active.mt-3.")
                    )
                )
            )
        ];
    },
};

export default Loader;