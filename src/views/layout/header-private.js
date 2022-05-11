const HeaderPrivate = {
    view: () => {
        return [
            m("header",
                m("div.toolbar",
                    m("div.container",
                        m("div.row", [
                            m("div.col-6",
                                m("a.logo.d-none.d-md-block[href='/']",
                                    m("img[alt='HM'][src='assets/images/logo-hm.svg']")
                                ),
                                m("a.mt-1.text-left.d-block.d-md-none[href='/']",
                                    m("img[alt='HM'][src='assets/images/logo-hm.svg']")
                                )
                            ),
                            m("div.col-6.text-right.d-none.d-md-block", [
                                m("a.bg-white.s-dp-1-3.d-inline-flex.text-active.btn-playStore[href='#!/mi-perfil']",
                                    m("div.media.align-items-center", [
                                        m("div.media-body", [
                                            m("p.m-0", [
                                                m("span.icofont-doctor.fz-50.mr-2"),
                                            ],
                                                "Mi Perfil"
                                            ),
                                        ])
                                    ])
                                )
                            ]),
                            m("div.col-6.text-right.d-md-none", [
                                m("a.bg-white.s-dp-1-3.d-inline-flex.text-active.btn-playStore[href='#!/mi-perfil']",
                                    m("div.media.align-items-center", [
                                        m("div.media-body", [
                                            m("p.m-0", [
                                                m("span.icofont-doctor.fz-50.mr-2"),
                                            ],
                                                "Mi Perfil"
                                            ),
                                        ])
                                    ])
                                )
                            ])
                        ])
                    )
                )
            )
        ];
    },

};

export default HeaderPrivate;
