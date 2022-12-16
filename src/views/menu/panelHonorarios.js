var _modulos_ = [
    { id: 1, title: "Facturas Pagadas", icon: "coins", url: "#!/honorarios/facturas-pagadas" },
    { id: 2, title: "Facturas Pendientes", icon: "loop", url: "#!/honorarios/facturas-pendientes" },
    { id: 3, title: "Estado de Cuenta", icon: "doctor", url: "#!/honorarios/estado-de-cuenta" },
    { id: 4, title: "Transferencias Realizadas", icon: "doctor", url: "#!/honorarios/transferencias" },

];

const Modulos = {
    view: () => {
        return _modulos_.map(function(i) {

            if (i.id == 1) {
                return m("div.col-sm-12.col-md-12.col-lg-6",
                    m("a", { href: i.url }, [
                        m("div.single-service.type-1.radius-10.position-relative.service-wrapper.s-dp-10-60.m-mb-50", [
                            m("div.service-circle.position-relative.mb-4.text-active.m-bg-4.rounded-circle.d-flex.align-items-center.justify-content-center",
                                m("span.icofont-" + i.icon + ".text-grad-1.fz-50")
                            ),
                            m("h5.text-dark2.mb-3.position-relative.pt-2",
                                i.title
                            )
                        ])
                    ])
                )
            }

            if (i.id == 2) {
                return m("div.col-sm-12.col-md-12.col-lg-6",
                    m("a", {
                        href: i.url,

                    }, [
                        m("div.single-service.type-1.radius-10.position-relative.service-wrapper.s-dp-10-60.m-mb-50", [
                            m("div.service-circle.position-relative.mb-4.text-active.m-bg-4.rounded-circle.d-flex.align-items-center.justify-content-center",
                                m("span.icofont-" + i.icon + ".text-grad-1.fz-50")

                            ),
                            m("h5.text-dark2.mb-3.position-relative.pt-2",
                                i.title
                            )
                        ])
                    ])
                )
            }


            if (i.id == 3) {
                return m("div.col-sm-12.col-md-12.col-lg-6",
                    m("a", {
                        href: i.url,

                    }, [
                        m("div.single-service.type-1.radius-10.position-relative.service-wrapper.s-dp-10-60.m-mb-50", [
                            m("div.service-circle.position-relative.mb-4.text-active.m-bg-4.rounded-circle.d-flex.align-items-center.justify-content-center",
                                m("span.icofont-letter.text-grad-1.fz-50"),
                            ),
                            m("h5.text-dark2.mb-3.position-relative.pt-2",
                                i.title
                            )
                        ])
                    ])
                )
            }

            if (i.id == 4) {
                return m("div.col-sm-12.col-md-12.col-lg-6",
                    m("a", {
                        href: i.url,

                    }, [
                        m("div.single-service.type-1.radius-10.position-relative.service-wrapper.s-dp-10-60.m-mb-50", [
                            m("div.service-circle.position-relative.mb-4.text-active.m-bg-4.rounded-circle.d-flex.align-items-center.justify-content-center",
                                m("span.icofont-wallet.text-grad-1.fz-50"),
                            ),
                            m("h5.text-dark2.mb-3.position-relative.pt-2",
                                i.title
                            )
                        ])
                    ])
                )
            }







        })
    },
}

const MenuPanelHonorarios = {

    view: () => {
        return [
            m("section.m-bg-1",
                m("div.container",
                    m("div.row",
                        m("div.col-md-6.offset-md-3",
                            m("div.text-center.m-mt-70", [

                                m("h2.mb-5.text-dark",
                                    " Mis Honorarios "
                                ),

                            ])
                        )
                    ),
                    m("div.row.m-pt-20.m-pb-60", [
                        m(Modulos)
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





export default MenuPanelHonorarios;