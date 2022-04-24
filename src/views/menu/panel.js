
const MenuPanel = {

    view: () => {


        return [
            m("div.content.content-fixed",
                m("div.container.pd-x-0.pd-lg-x-10.pd-xl-x-0",
                    [
                        m("div.d-sm-flex.align-items-center.justify-content-between.mg-b-10.mg-lg-b-10.mg-xl-b-10",
                            [
                                m("div",
                                    [
                                        m("nav[aria-label='breadcrumb']",
                                            m("ol.breadcrumb.breadcrumb-style1.mg-b-10",
                                                [

                                                    m("li.breadcrumb-item.active[aria-current='page']",
                                                        "Inicio"
                                                    )
                                                ]
                                            )
                                        ),
                                        m("h4.mg-b-0.tx-spacing--1",
                                            "Bienvenido:"
                                        )
                                    ]
                                ),

                            ]
                        ),
                        m("div.row.row-xs",
                            [



                                m("div.col-lg-12.col-xl-12.mg-b-200",
                                    m("div.card",
                                        [
                                            m("div.card-header.pd-t-20.pd-b-0.bd-b-0",

                                            ),
                                            m("div.card-body.pd-20",
                                                [
                                                    m("div.chart-two.mg-b-20",
                                                        m(".flot-chart[id='flotChart2']")
                                                    ),
                                                    m("div.row",
                                                        [
                                                            m("div.col-sm",
                                                                [
                                                                    m("h4.tx-normal.tx-rubik.tx-spacing--1.mg-b-5",
                                                                        [
                                                                            "Formularios",

                                                                        ]
                                                                    ),
                                                                    m("p.tx-11.tx-uppercase.tx-spacing-1.tx-semibold.mg-b-10.tx-primary",
                                                                        "AUDITORIA DE FORMULARIOS"
                                                                    ),
                                                                    m("div.tx-12.tx-color-03",
                                                                        "Customers who have upgraded the level of your products or service."
                                                                    )
                                                                ]
                                                            ),
                                                            m("div.col-sm.mg-t-20.mg-sm-t-0",
                                                                [
                                                                    m("h4.tx-normal.tx-rubik.tx-spacing--1.mg-b-5",
                                                                        [
                                                                            "Notificaciones",

                                                                        ]
                                                                    ),
                                                                    m("p.tx-11.tx-uppercase.tx-spacing-1.tx-semibold.mg-b-10.tx-pink",
                                                                        "Configuración"
                                                                    ),
                                                                    m("div.tx-12.tx-color-03",
                                                                        "Customers who have ended their subscription with you."
                                                                    )
                                                                ]
                                                            )
                                                        ]
                                                    )
                                                ]
                                            )
                                        ]
                                    )
                                ),


                            ]
                        )
                    ]
                )
            )
        ];
    },

};





export default MenuPanel;