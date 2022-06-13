import m from "mithril";

const ButtonReload = {

    view: () => {
        return [

            m("div.button-menu-right-reload." + Loader.buttonShow, { "style": { "display": "flex" } },
                m("a.btn.fadeInDown-slide.position-relative.animated.pl-3.pr-3.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2", {
                    onclick: (e) => {
                        e.preventDefault();
                        window.location.reload();
                    },
                },
                    m("i.icofont-refresh", { "style": { "font-size": "x-large" } })
                )
            )
        ];

    },
};

const Loader = {
    show: "d-none",
    buttonShow: "d-none",
    view: () => {
        return [

            m("div.preloader." + Loader.show,
                m("div.preloader-inner",
                    m("div.loader-content",
                        m("span.icon-section-wave.d-inline-block.text-active.mt-3.",),
                    )
                ),

            ),
            m(ButtonReload)
        ];
    },
};

export default Loader;