const Page = {
    view: () => {
        return [
            m("section.m-pt-10.m-pb-90.m-bg-1",
                m("div.container",
                    m("div.m-pt-30.row", [
                        m("div.col-md-12", [
                            m("div.row",
                                m("div.col-md-6.offset-md-3",
                                    m("div.text-center.pb-75.m-mt-70", [

                                        m("h2.m-0.text-dark",
                                            "Ingresar"
                                        ),
                                        m("p.m-0.text-light-dark.lt-space",
                                            "Bienvenido, inicia sesión para continuar."
                                        )
                                    ])
                                )
                            ),
                            m("div.input-group.banenr-seach.bg-white.mb-0", [
                                m("input.form-control[type='text'][placeholder='Usuario o Correo Electrónico'][aria-label='Usuario'][aria-describedby='button-addon2']"),

                            ]),
                            m("div.input-group.banenr-seach.bg-white.mb-0.m-mt-40", [
                                m("input.form-control[type='text'][placeholder='Contraseña'][aria-label='Usuario'][aria-describedby='button-addon2']"),
                                m("div.input-group-append",
                                    m("button.btn[type='button'][id='button-addon2']",
                                        "Entrar"
                                    )
                                )
                            ]),

                        ]),
                    ])
                )
            ),
            m("section.set-bg.pt-100.pb-100.position-relative.appointment-wrapper.type-1", { "style": { "background-image": "url(&quot", "background-position": "center center", "background-size": "cover", "background-repeat": "no-repeat" } }, [
                m("div.overlay.op-P9"),
                m("div.container",
                    m("div.row", [
                        m("div.col-xl-4.col-md-4.offset-md-0.col-sm-12.text-white", [
                            m("h4.pb-1",
                                "Hospital Metropolitano"
                            ),

                        ]),
                        m("div.col-xl-1.col-md-4.offset-md-0.col-sm-12.offset-xl-1.text-white", [

                            m("div.media.align-items-center", [
                                m("div.media-body", [


                                ])
                            ])
                        ]),
                        m("div.col-xl-4.col-md-4.offset-md-0.col-sm-12.offset-xl-1.text-white", [
                            m("h4.pb-4",
                                "Metrovirtual para Médicos"
                            ),

                        ])
                    ])
                )
            ])
        ];
    },

};

export default Page;