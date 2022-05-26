
import Auth from '../../models/auth';
import HeaderPrivate from '../layout/header-private';
import App from '../app';
import m from 'mithril';
import Loader from '../loader';


const DetallePedido = {
    data: [],
    detalle: [],
    error: "",
    fetch: () => {
        m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/t/v1/mis-pacientes",
            headers: {
                "Authorization": localStorage.accessToken,
            },
        })
            .then(function (result) {
                DetallePedido.detalle = [1, 2, 3];
            })
            .catch(function (e) {
                DetallePedido.error = e.message;
            })
    },
    view: () => {


    },
}


const Pedido = {
    ver: true,
    eliminar: false,
    editar: false,
    labelOperation: "Detalle:",
    oninit: () => {
        DetallePedido.fetch();
    },
    view: () => {
        return DetallePedido.error ? [
            m(".alert.alert-danger[role='alert']",
                DetallePedido.error
            )
        ] : DetallePedido.detalle.length !== 0 ? [
            m(HeaderPrivate),
            m("section.m-bg-1.intro-area.type-1.position-relative", [
                m("div.intro-overlay.position-absolute.set-bg", {
                    "style": {
                        "background-position": "center center",
                        "background-size": "cover",
                        "background-repeat": "no-repeat",
                        "background-image": 'url(\"/assets/images/intro-bg.jpg\")'
                    }
                }),
                m("div.overlay"),
                m("div.container",
                    m("div.row", [
                        m("div.col-md-4",
                            m("div.department-tab-pill.m-pt-140.m-pb-140.position-relative.", [
                                m("h3.nombresPaciente.text-white.pb-md-5",
                                    "JOSE JOAQUIN RIOFRIO MONTESINOS"
                                ),
                                m("h6.nhcPaciente.ml12.text-white.text-uppercase.fadeInDown-slide.animated",
                                    "NHC: 94182201"
                                ),
                                m(".nav.pt-md-0.flex-column.nav-pills[id='v-pills-tab'][role='tablist'][aria-orientation='vertical']", [
                                    m("a.renderLab.nav-link[data-toggle='pill'][href='#v-pills-lab'][role='tab'][aria-controls='v-pills-profile'][aria-selected='false']", [
                                        m("i.icofont-laboratory"),
                                        m("span",
                                            " Laboratorio "
                                        )
                                    ]),
                                    m("a.renderUIImagen.nav-link[data-toggle='pill'][href='#v-pills-imagen'][role='tab'][aria-controls='v-pills-settings'][aria-selected='true']", [
                                        m("i.icofont-file-image"),
                                        m("span",
                                            " Imagen "
                                        )
                                    ])
                                ])
                            ])
                        ),
                        m("div.col-md-8",
                            m("div.tab-content.m-pt-140.m-pb-140.", [
                                m(".tab-pane.fade[id='v-pills-lab'][role='tabpanel']", [
                                    m("h4.m-text-2.",
                                        "Resultados de Laboratorio"
                                    ),
                                    m("h6.text-light-dark.ff-roboto.pb-40.mb-0",
                                        "Hospital Metropolitano"
                                    ),
                                    m("p",
                                        " Resultados disponibles desde Enero, 2019. "
                                    ),
                                    m("div.row",
                                        m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.",
                                            m(".dataTables_wrapper.no-footer[id='table-laboratorio_wrapper']",
                                                m("table.table.table-sm.dataTable.no-footer[id='table-laboratorio'][width='100%'][role='grid']", { "style": { "width": "100%", "border-color": "transparent", "margin-bottom": "50px" } }, [
                                                    m("thead",
                                                        m("tr[role='row']",
                                                            m("th.sorting_disabled[rowspan='1'][colspan='1'][aria-label='']", { "style": { "width": "0px" } })
                                                        )
                                                    ),
                                                    m("tbody", [
                                                        m("tr.odd[role='row']", { "style": { "background-color": "transparent" } },
                                                            m("td", { "style": { "border-color": "transparent", "padding": "0px" } },
                                                                m("div.row.bg-white.radius-5.p-2.article-tags", [
                                                                    m("div.col-lg-6.p-2", [
                                                                        m("div", { "style": { "display": "block" } },
                                                                            m("span", { "style": { "color": "red" } },
                                                                                " Nuevo Resultado "
                                                                            )
                                                                        ),
                                                                        m("span",
                                                                            " Fecha: 25-05-2022 "
                                                                        ),
                                                                        m("span",
                                                                            " Origen: EMERGENCIA "
                                                                        )
                                                                    ]),
                                                                    m("div.col-lg-6.p-2.text-xl-right", [
                                                                        m("button.verRes.capsul.fz-poppins.text-default.radius-pill.active[id='https://api.hospitalmetropolitano.org/t/v1/rslocal/lab/0018607732/25-05-2022']", { "style": { "cursor": "pointer" } }, [
                                                                            m("i.icofont-ui-file"),
                                                                            " Ver Resultado "
                                                                        ]),
                                                                        m("button.imprimirRes.capsul.fz-poppins.text-default.radius-pill.active[id='https://api.hospitalmetropolitano.org/t/v1/rslocal/lab/0018607732/25-05-2022']", { "style": { "cursor": "pointer" } }, [
                                                                            m("i.icofont-print"),
                                                                            " Imprimir "
                                                                        ])
                                                                    ])
                                                                ])
                                                            )
                                                        ),
                                                        m("tr.even[role='row']", { "style": { "background-color": "transparent" } },
                                                            m("td", { "style": { "border-color": "transparent", "padding": "0px" } },
                                                                m("div.row.bg-white.radius-5.p-2.article-tags", [
                                                                    m("div.col-lg-6.p-2", [
                                                                        m("div", { "style": { "display": "block" } },
                                                                            m("span", { "style": { "color": "red" } },
                                                                                " Nuevo Resultado "
                                                                            )
                                                                        ),
                                                                        m("span",
                                                                            " Fecha: 25-05-2022 "
                                                                        ),
                                                                        m("span",
                                                                            " Origen: EMERGENCIA "
                                                                        )
                                                                    ]),
                                                                    m("div.col-lg-6.p-2.text-xl-right", [
                                                                        m("button.verRes.capsul.fz-poppins.text-default.radius-pill.active[id='https://api.hospitalmetropolitano.org/t/v1/rslocal/lab/0018607822/25-05-2022']", { "style": { "cursor": "pointer" } }, [
                                                                            m("i.icofont-ui-file"),
                                                                            " Ver Resultado "
                                                                        ]),
                                                                        m("button.imprimirRes.capsul.fz-poppins.text-default.radius-pill.active[id='https://api.hospitalmetropolitano.org/t/v1/rslocal/lab/0018607822/25-05-2022']", { "style": { "cursor": "pointer" } }, [
                                                                            m("i.icofont-print"),
                                                                            " Imprimir "
                                                                        ])
                                                                    ])
                                                                ])
                                                            )
                                                        ),
                                                        m("tr.odd[role='row']", { "style": { "background-color": "transparent" } },
                                                            m("td", { "style": { "border-color": "transparent", "padding": "0px" } },
                                                                m("div.row.bg-white.radius-5.p-2.article-tags", [
                                                                    m("div.col-lg-6.p-2", [
                                                                        m("div", { "style": { "display": "block" } },
                                                                            m("span", { "style": { "color": "red" } },
                                                                                " Nuevo Resultado "
                                                                            )
                                                                        ),
                                                                        m("span",
                                                                            " Fecha: 25-05-2022 "
                                                                        ),
                                                                        m("span",
                                                                            " Origen: EMERGENCIA "
                                                                        )
                                                                    ]),
                                                                    m("div.col-lg-6.p-2.text-xl-right", [
                                                                        m("button.verRes.capsul.fz-poppins.text-default.radius-pill.active[id='https://api.hospitalmetropolitano.org/t/v1/rslocal/lab/0018607738/25-05-2022']", { "style": { "cursor": "pointer" } }, [
                                                                            m("i.icofont-ui-file"),
                                                                            " Ver Resultado "
                                                                        ]),
                                                                        m("button.imprimirRes.capsul.fz-poppins.text-default.radius-pill.active[id='https://api.hospitalmetropolitano.org/t/v1/rslocal/lab/0018607738/25-05-2022']", { "style": { "cursor": "pointer" } }, [
                                                                            m("i.icofont-print"),
                                                                            " Imprimir "
                                                                        ])
                                                                    ])
                                                                ])
                                                            )
                                                        ),
                                                        m("tr.even[role='row']", { "style": { "background-color": "transparent" } },
                                                            m("td", { "style": { "border-color": "transparent", "padding": "0px" } },
                                                                m("div.row.bg-white.radius-5.p-2.article-tags", [
                                                                    m("div.col-lg-6.p-2", [
                                                                        m("div", { "style": { "display": "none" } },
                                                                            m("span", { "style": { "color": "red" } },
                                                                                " Nuevo Resultado "
                                                                            )
                                                                        ),
                                                                        m("span",
                                                                            " Fecha: 24-05-2022 "
                                                                        ),
                                                                        m("span",
                                                                            " Origen: EMERGENCIA "
                                                                        )
                                                                    ]),
                                                                    m("div.col-lg-6.p-2.text-xl-right", [
                                                                        m("button.verRes.capsul.fz-poppins.text-default.radius-pill.active[id='https://api.hospitalmetropolitano.org/t/v1/rslocal/lab/0018607112/24-05-2022']", { "style": { "cursor": "pointer" } }, [
                                                                            m("i.icofont-ui-file"),
                                                                            " Ver Resultado "
                                                                        ]),
                                                                        m("button.imprimirRes.capsul.fz-poppins.text-default.radius-pill.active[id='https://api.hospitalmetropolitano.org/t/v1/rslocal/lab/0018607112/24-05-2022']", { "style": { "cursor": "pointer" } }, [
                                                                            m("i.icofont-print"),
                                                                            " Imprimir "
                                                                        ])
                                                                    ])
                                                                ])
                                                            )
                                                        )
                                                    ])
                                                ])
                                            )
                                        )
                                    )
                                ]),
                                m(".tab-pane.fade.active.show[id='v-pills-imagen'][role='tabpanel']", [
                                    m("h4.m-text-2.",
                                        "Resultados de Imagen"
                                    ),
                                    m("h6.text-light-dark.ff-roboto.pb-40.mb-0",
                                        "Hospital Metropolitano"
                                    ),
                                    m("div.row.opcImagen", { "style": { "display": "flex" } }, [
                                        m("div.col-md-6",
                                            m("div.renderImagen.single-service.type-1.radius-10.position-relative.service-wrapper.s-dp-10-60.m-mb-50.", { "style": { "cursor": "pointer" } },
                                                m("h4.text-dark2.mb-3.position-relative.pt-2",
                                                    "Ver Exámenes"
                                                )
                                            )
                                        ),
                                        m("div.col-md-6",
                                            m("div.verInformesImagen.single-service.type-1.radius-10.position-relative.service-wrapper.s-dp-10-60.m-mb-50.", { "style": { "cursor": "pointer" } },
                                                m("h4.text-dark2.mb-3.position-relative.pt-2",
                                                    "Imprimir Informes"
                                                )
                                            )
                                        )
                                    ]),
                                    m("div.row.informesImagen", { "style": { "display": "none" } },
                                        m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.",
                                            m(".dataTables_wrapper.no-footer[id='table-imagen_wrapper']",
                                                m("table.table.table-sm.dataTable.no-footer[id='table-imagen'][width='100%'][role='grid']", { "style": { "width": "100%", "border-color": "transparent", "margin-bottom": "50px" } }, [
                                                    m("thead",
                                                        m("tr[role='row']",
                                                            m("th.sorting_disabled[rowspan='1'][colspan='1'][aria-label='']", { "style": { "width": "0px" } })
                                                        )
                                                    ),
                                                    m("tbody",
                                                        m("tr.odd[role='row']", { "style": { "background-color": "transparent" } },
                                                            m("td", { "style": { "border-color": "transparent", "padding": "0px" } },
                                                                m("div.row.bg-white.radius-5.p-2.article-tags", [
                                                                    m("div.col-lg-6.p-2", [
                                                                        m("div", { "style": { "display": "block" } },
                                                                            m("span", { "style": { "color": "red" } },
                                                                                " Nuevo Resultado "
                                                                            )
                                                                        ),
                                                                        m("span",
                                                                            " Fecha: 25-05-2022 "
                                                                        ),
                                                                        m("span",
                                                                            " Origen: HM-RX "
                                                                        ),
                                                                        m("br"),
                                                                        m("span",
                                                                            " Estudio: RX TORAX PORTATIL "
                                                                        )
                                                                    ]),
                                                                    m("div.col-lg-6.p-2.text-xl-right",
                                                                        m("button.imprimirImgRes.capsul.fz-poppins.text-default.radius-pill.active[id='//api.hospitalmetropolitano.org/v1/resultado/informe/Yi9mZTg2eWFvbU8vemtJOHlkdDBZQT09.pdf']", { "style": { "cursor": "pointer" } }, [
                                                                            m("i.icofont-print"),
                                                                            " Imprimir "
                                                                        ])
                                                                    )
                                                                ])
                                                            )
                                                        )
                                                    )
                                                ])
                                            )
                                        )
                                    )
                                ])
                            ])
                        )
                    ])
                )
            ])


        ] : m(Loader)
    }
}




const Paciente = {
    idPedido: null,
    oninit: (_data) => {
        if (!Auth.isLogin()) {
            return m.route.set('/auth');
        }
    },
    oncreate: () => {
        document.title = "Detalle Pedido N°:  | " + App.title;
    },
    view: () => {
        return [
            m(Pedido)
        ];
    },

};





export default Paciente;

