const FooterPublic = {
    view: () => {
        return [

            m("footer.m-pt-140", [
                m("div.container",
                    m("div.row", [
                        m("div.col-lg-6.col-sm-6.",
                            m("div.footer-widget", [
                                m("div.logo",
                                    m("a.d-inline-block.mb-5[href='/']",
                                        m("img[alt='HM'][src='assets/images/logo-hm.svg']")
                                    )
                                ),
                                m("p",
                                    "Metrcvirtual para Médicos, conéctate con tu Hospital Metropolitano desde cualquier parte del Mundo y aprovecha al máximo todos nuestros servicios disponibles."
                                ),

                            ])
                        ),

                        m("div.col-lg-6.col-sm-6",
                            m("div.footer-widget", [
                                m("div.media.text-light-dark", [
                                    m("div.media-body", [
                                        m("img[src='assets/jci.png'][alt='JCI'][width='20%']"),
                                        m("img[src='assets/14_america_1.png'][alt=''][width='45%']"),
                                        m("img[src='assets/planetree.png'][alt=''][width='25%']"),


                                    ])
                                ])
                            ])
                        )
                    ])
                ),
                m("div.footer-bottom.text-center.m-mt-120.m-bg-1.pt-4.pb-4",
                    m("div.container",
                        m("div.row",
                            m("div.col-md-12",
                                m("p.mb-1.mt-1", [
                                    m.trust("&copy;"),
                                    new Date().getFullYear() + ". Todos los derechos reservados."
                                ])
                            )
                        )
                    )
                )
            ])
        ];
    },

};

export default FooterPublic;