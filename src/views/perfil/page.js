const PagePerfil = {

    view: () => {


        return [
            m("div..position-relative.set-bg.breadcrumb-container", { "style": { "background-image": "url(&quot", "background-position": "center center", "background-size": "cover", "background-repeat": "no-repeat" } }, [
                m("div.overlay.op-P9"),
                m("div.container",
                    m("div.row",
                        m("div.col-md-12",
                            m("div.breadcrumb-inner.align-items-start.flex-column.justify-content-center.d-flex.", )
                        )
                    )
                )
            ]),
            m("div.m-bg-1.single-doctor-container.type-2.m-pb-120",
                m("div.container", [
                    m("div.row",
                        m("div.col-md-12.text-center", [
                            m("div.doctors-image.mb-1.d-inline-block.bg-white.rounded-circle.p-2.s-10-80",
                                m("img[src='assets/images/doctors-image5.jpg'][alt='']")
                            ),
                            m("h3.m-mt-10.text-dark.font-weight-bold",
                                "Dr. Rojana Rossy"
                            ),
                            m("h6.fz-18.text-uppercase.font-weight-normal",
                                "Medicina Interna"
                            ),
                            m("div.social-icon.mt-3.circle-link.position-relative", [
                                m("a.text-default.bg-white.rounded-circle.s-dp-1-3-15[href='#']",
                                    m("i.icofont-facebook")
                                ),
                                m("a.text-default.bg-white.rounded-circle.s-dp-1-3-15[href='#']",
                                    m("i.icofont-twitter")
                                ),
                                m("a.text-default.bg-white.rounded-circle.s-dp-1-3-15[href='#']",
                                    m("i.icofont-instagram")
                                )
                            ])
                        ])
                    ),
                    m("div.row.m-mb-60.m-mt-60.", [
                        m("div.col-md-4",
                            m("div.bg-white.mb-0.position-relative.has-float-icon.pt-4.pl-4.pb-4.pr-4.info-box.m-mtb-20.radius-5", [
                                m("span.position-absolute.flaot-icon",
                                    m("i.icofont-stethoscope-alt.text-active")
                                ),
                                m("h5.m-text-2.mb-3.text-uppercase",
                                    "Mis Datos"
                                ),
                                m("div.media.",
                                    m("div.media-body",
                                        m("p.m-0.",
                                            "Mis datos personales y configuración de Perfil."
                                        )
                                    )
                                )
                            ])
                        ),
                        m("div.col-md-4",
                            m("div.bg-white.position-relative.has-float-icon.pt-4.pl-4.pb-4.pr-4.info-box.m-mtb-20.radius-5", [
                                m("span.position-absolute.flaot-icon",
                                    m("i.icofont-stethoscope-alt")
                                ),
                                m("h5.m-text-2.mb-3.text-uppercase",
                                    "Cambio de Contraseña"
                                ),
                                m("div.media.",
                                    m("div.media-body",
                                        m("p.m-0.",
                                            "Actualización de credenciales de acceso."
                                        )
                                    )
                                )
                            ])
                        ),

                    ]),
                    m("div.row",
                        m("div.col-md-12.text-center.m-mb-50",
                            m("a.btn.bordered-blue.fadeInDown-slide.animated.medim-btn.btn-bordered.mt-0.text-medium.radius-pill.bg-transparent.text-active.text-uppercase.[href='#!/salir']",
                                " Salir "
                            )
                        )
                    )
                ])
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





export default PagePerfil;