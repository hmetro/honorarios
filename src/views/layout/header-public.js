const HeadPublic = {
    view: () => {
        return [
            m("header",
                m("div.toolbar",
                    m("div.container",
                        m("div.row", [
                            m("div.col-md-6.m-t-5",
                                m("a.logo[href='/']",
                                    m("img[alt='Metrovirtual'][src='assets/images/logo-hm.svg']")
                                )
                            ),
                            m("div.col-md-6.col-sm-6.text-right.d-none.d-md-block", [
                                m("a.btn.fadeInDown-slide.animated.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.text-medium.radius-pill.text-active.text-uppercase.text-white[href='/']",
                                    " Metrovirtual "
                                )
                            ])
                        ])
                    )
                )
            )
        ];
    },

};

export default HeadPublic;