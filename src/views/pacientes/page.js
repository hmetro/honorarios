const PagePacientes = {

    view: () => {


        return [
            m("section.m-bg-1",
                m("div.container",
                    m("div.row",
                        m("div.col-md-6.offset-md-3",
                            m("div.text-center.m-mt-70", [

                                m("h2.m-0.text-dark",
                                    "Mis Pacientes "
                                ),
                                m("p.m-mt-10",
                                    "Opciones disponibles"
                                )
                            ])
                        )
                    ),
                    m("div.row.m-pt-20.m-pb-60", [
                        m("div.col-md-10.offset-md-1.col-sm-12",
                            [
                                m("article.blog.pb-5.type-1.mb-80",
                                    [

                                        m("div",
                                            [
                                                m("div",
                                                    [
                                                        m("a.text-default.mr-3.fz-poppins.[href='#']",
                                                            [
                                                                m("span",
                                                                    m("i.icofont-ui-clock")
                                                                ),
                                                                " Ingreso: 25-04-2022 "
                                                            ]
                                                        ),
                                                        m("a.text-default.fz-poppins.mr-3[href='#']",
                                                            [
                                                                m("span",
                                                                    m("i.icofont-hospital")
                                                                ),
                                                                " 1 Día "
                                                            ]
                                                        )
                                                    ]
                                                ),
                                                m("a.display-block.[href='https://beta.metrovirtual.hospitalmetropolitano.org/touch/pte/?nhc=671200&ticket=ST-66902-RSvjdifVCLOMpfz2vmCC-cas.example.org']",
                                                    m("h3.semi-bold.mb-4.mt-1.text-dark",
                                                        "JACOME PONCE JOEL ALEJANDRO"
                                                    )
                                                ),
                                                m("div.d-flex.align-items-end.justify-content-between.inline-flex",
                                                    [
                                                        m("div.media.d-inline-flex",
                                                            [
                                                                m("div.media-body",
                                                                    [
                                                                        m("a.fz-poppins[href='#']",
                                                                            " Emergencia "
                                                                        ),
                                                                        m("p.fz-poppins.mb-0",
                                                                            "PB, Medicina Interna"
                                                                        )
                                                                    ]
                                                                )
                                                            ]
                                                        ),
                                                        m("a.d-inline-block.fz-poppins.text-default[href='https://beta.metrovirtual.hospitalmetropolitano.org/touch/pte/?nhc=671200&ticket=ST-66902-RSvjdifVCLOMpfz2vmCC-cas.example.org']",
                                                            " Ver Paciente "
                                                        )
                                                    ]
                                                )
                                            ]
                                        ),

                                    ]
                                ),

                                m("article.blog.pb-5.type-1.mb-80",
                                    [

                                        m("div",
                                            [
                                                m("div",
                                                    [
                                                        m("a.text-default.mr-3.fz-poppins.[href='#']",
                                                            [
                                                                m("span",
                                                                    m("i.icofont-ui-clock")
                                                                ),
                                                                " Ingreso: 25-04-2022 "
                                                            ]
                                                        ),
                                                        m("a.text-default.fz-poppins.mr-3[href='#']",
                                                            [
                                                                m("span",
                                                                    m("i.icofont-hospital")
                                                                ),
                                                                " 1 Día "
                                                            ]
                                                        )
                                                    ]
                                                ),
                                                m("a.display-block.[href='https://beta.metrovirtual.hospitalmetropolitano.org/touch/pte/?nhc=12636&ticket=ST-66902-RSvjdifVCLOMpfz2vmCC-cas.example.org']",
                                                    m("h3.semi-bold.mb-4.mt-1.text-dark",
                                                        "CARLOS ALFONSO SALAZAR TOSCANO"
                                                    )
                                                ),
                                                m("div.d-flex.align-items-end.justify-content-between.inline-flex",
                                                    [
                                                        m("div.media.d-inline-flex",
                                                            [
                                                                m("div.media-body",
                                                                    [
                                                                        m("a.fz-poppins[href='#']",
                                                                            " Hospitalización "
                                                                        ),
                                                                        m("p.fz-poppins.mb-0",
                                                                            "C2, Medicina Interna"
                                                                        )
                                                                    ]
                                                                )
                                                            ]
                                                        ),
                                                        m("a.d-inline-block.fz-poppins.text-default[href='https://beta.metrovirtual.hospitalmetropolitano.org/touch/pte/?nhc=12636&ticket=ST-66902-RSvjdifVCLOMpfz2vmCC-cas.example.org']",
                                                            " Ver Paciente "
                                                        )
                                                    ]
                                                )
                                            ]
                                        ),

                                    ]
                                ),

                            ]
                        )
                    ])
                )
            ),
            m("div.button-menu-center.text-center",
                m("a.btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2[href='/']", [
                    m("i.icofont-home"),
                    " Inicio "
                ])
            )
        ];
    },

};





export default PagePacientes;