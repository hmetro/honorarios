const PagePerfil = {

    view: () => {


        return [

            m("div.m-bg-1.single-doctor-container.type-2.m-pb-120",
                m("div.container", [
                    m("div.row",

                    ),
                    m("div.row.m-mb-60.m-mt-60.", [
                        m("div.col-12",
                            m("div.bg-white.mb-0.position-relative.has-float-icon.pt-4.pl-4.pb-4.pr-4.info-box.m-mtb-20.radius-5", [
                                m("span.position-absolute.flaot-icon",
                                    m("i.icofont-stethoscope-alt.text-active")
                                ),
                                m("h5.m-text-2.mb-3.text-uppercase",
                                    "Mi Perfil"
                                ),

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