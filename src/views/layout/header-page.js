const HeaderPage = {
    view: () => {
        return [
            m("header",
                m("div..position-relative.set-bg.breadcrumb-container", { "style": { "background-image": "url(&quot", "background-position": "center center", "background-size": "cover", "background-repeat": "no-repeat" } }, [
                    m("div.overlay.op-P9"),
                    m("div.container",
                        m("div.row",
                            m("div.col-md-12", )
                        )
                    )
                ]),
                m("div.toolbar",
                    m("div.container",
                        m("div.row", [
                            m("div.col-6.text-left",
                                m("a.mt-2.logo.d-none.d-md-block[href='/']",
                                    m("img[src='assets/logo.metrovirtual.png'][alt='Metrovirtual'][width='200rem']")
                                ),
                                m("a.mt-2.d-block.d-md-none[href='/']",
                                    m("img[src='assets/logo.metrovirtual.png'][alt='Metrovirtual'][width='200rem']")
                                )
                            ),
                            m("div.col-6.text-right", [
                                m("a", { href: "#!/mi-perfil" },
                                    m("div.features-circle.m-bg-3.text-active.d-inline-flex.align-items-center.justify-content-center.rounded-circle", { "style": { "height": "50px", "width": "50px" } },
                                        m("i.icofont-doctor", { "style": { "fontSize": "20px" } })
                                    )
                                ),

                            ]),

                        ])
                    )
                )
            )
        ];
    },

};

export default HeaderPage;