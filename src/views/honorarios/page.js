import Auth from '../../models/auth';
import App from '../app';
import Loader from '../loader';



const DataProvider = {
    data: [],
    filteredData: [],
    searchField: "",
    show: "",
    fetch: () => {



        DataProvider.data = [];
        Loader.show = "";
        Loader.buttonShow = "";
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/h2/v1/mis-facturas-pagadas?typeFilter=" + dataView.typeFilter + "&start=0&length=1000" + (dataView.typeFilter == 3 ? "&fechaDesde=" + PageHonorarios.fechaDesde + "&fechaHasta=" + PageHonorarios.fechaHasta : ""),
                body: {
                    searchField: DataProvider.searchField
                },
                headers: {
                    "Authorization": localStorage.accessToken,
                },
            })
            .then(function(result) {
                Loader.show = "d-none";
                Loader.buttonShow = "d-none";
                PageHonorarios.codMedico = result.codMedico;
                DataProvider.data = result.data;
                DataProvider.filterData();

            })
            .catch(function(e) {
                DataProvider.fetch();
            })




    },
    loadData: function() {
        DataProvider.fetch();
    },
    filterData: function() {
        var to = Math.min(DataProvider.from + DataProvider.count, DataProvider.data.length + 1);
        DataProvider.filteredData = [];
        for (var i = DataProvider.from - 1; i < to - 1; i++) {
            DataProvider.filteredData.push(DataProvider.data[i]);
        }
    },
    from: 1,
    count: 10,
    setFrom: function(from) {
        DataProvider.from = parseInt(from);
        DataProvider.filterData();
    },
    setCount: function(count) {
        DataProvider.count = parseInt(count);
        DataProvider.filterData();
    },
    nextPage: function() {
        var from = DataProvider.from + DataProvider.count;
        if (from > DataProvider.data.length)
            return;
        DataProvider.from = from;
        DataProvider.filterData();
    },
    lastPage: function() {
        DataProvider.from = DataProvider.data.length - DataProvider.count + 1;
        DataProvider.filterData();
    },
    prevPage: function() {
        DataProvider.from = Math.max(1, DataProvider.from - DataProvider.count);
        DataProvider.filterData();
    },
    firstPage: function() {
        DataProvider.from = 1;
        DataProvider.filterData();
    },
    rowBack: function() {
        DataProvider.from = Math.max(1, DataProvider.from - 1);
        DataProvider.filterData();
    },
    rowFwd: function() {
        if (DataProvider.from + DataProvider.count - 1 >= DataProvider.data.length)
            return;
        DataProvider.from += 1;
        DataProvider.filterData();
    }
};

const dataView = {
    show: "",
    typeFilter: 4,
    plFechaTransaccion: "",
    plNumeroTransaccion: "",
    oninit: DataProvider.loadData,
    downloadPlanilla: () => {

        console.log('codMedico', PageHonorarios);
        console.log('dataView', dataView);

        window.location = 'https://api.hospitalmetropolitano.org/h2/v0/controlador/descarga_documentos/preparar_planilla_pago.php?proveedor=' + PageHonorarios.codMedico + '&fecha_transaccion=' + dataView.plFechaTransaccion + '&numero_transaccion=' + dataView.plNumeroTransaccion + '&tipo_imprime=PAGOS';
    },
    view: () => {
        return m('table.w-100.mt-5.' + dataView.show, [
            m('tbody', DataProvider.filteredData.map(function(d) {
                return [
                    m("div.bg-white.pt-4.pl-4.pb-4.pr-4.info-box.m-mb-30.radius-5", {
                        "style": { "border-color": "#0aa1eb" }
                    }, [
                        m("h4.mb-0", [
                                m("i.icofont-file-alt.mr-1"),
                                'N° de Factura: ' + d['FACTURA']
                            ]

                        ),
                        m("div.media.",
                            m("div.media-body", [


                                m("h6.mt-2",
                                    "Fecha Pago: " + d['FECHA']
                                ),
                                m("h6.mt-2",
                                    "Detalle Pago: " + d['DETALLE']
                                ),
                                m("h6",
                                    "Monto Pago: " + d['MONTO']
                                ),


                                m("div.text-right", [
                                    m(".btn.medim-btn.solid-btn.mt-4.text-medium.radius-pill.text-active.text-uppercase.bg-transparent.position-relative", {
                                            onclick: () => {
                                                dataView.plFechaTransaccion = d['FECHA'];
                                                dataView.plNumeroTransaccion = d['NO_TRANSACCION'];
                                                dataView.downloadPlanilla();
                                            }
                                        },
                                        " Ver Documento "
                                    )
                                ])

                            ])
                        )
                    ]),

                ]
            }))
        ]);
    }
};


const pageTool = {
    view: () => {

        if (DataProvider.data !== undefined && dataView.show == "") {
            if (DataProvider.data.length === 0) {

                return [
                    m("div.text-center.w-100.mt-5", [
                        m('span', '(0) Resultado(s)'),
                    ]),
                ]

            } else if (DataProvider.data.length > 10) {

                return [
                    m("div.text-center.w-100.mt-5", [
                        m('span', '(' + DataProvider.data.length + ') Resultado(s) '),
                    ]),
                    m('div.d-flex.w-100.text-center.mt-5', [
                        m("div.w-50.w-20", [


                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                    type: "button",
                                    "style": { "cursor": "pointer" },

                                    onclick: function() { DataProvider.rowBack(); }
                                },
                                " << Anterior "
                            ),
                        ]),

                        m("div.w-50.w-20", [

                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                    type: "button",
                                    "style": { "cursor": "pointer" },

                                    onclick: function() { DataProvider.rowFwd(); }
                                },
                                " Siguiente >>"
                            ),



                        ])
                    ]),
                    m('div.d-flex.w-100.text-center.mt-5', [
                        m("div.w-50.w-20", [
                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                    type: "button",
                                    "style": { "cursor": "pointer" },

                                    onclick: function() { DataProvider.firstPage(); }
                                },
                                " | Inicio "
                            ),

                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                    type: "button",
                                    "style": { "cursor": "pointer" },

                                    onclick: function() { DataProvider.prevPage(); }
                                },
                                " < Pág. Ant. "
                            ),

                        ]),

                        m("div.w-50.w-20", [


                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                    type: "button",
                                    "style": { "cursor": "pointer" },

                                    onclick: function() { DataProvider.nextPage(); }
                                },
                                " Pág. Sig. > "
                            ),


                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                    type: "button",
                                    "style": { "cursor": "pointer" },

                                    onclick: function() { DataProvider.lastPage(); }
                                },
                                " Fin | "
                            ),

                        ])
                    ])

                ]

            } else {
                return [
                    m("div.text-center.w-100.mt-5", [
                        m('span', '(' + DataProvider.data.length + ') Resultado(s) '),
                    ]),
                ]


            }
        }


    }
};



const iPaciente = {
    view: (_data) => {
        return [
            m("div.intro-box.bg-white.radius-5", [
                m("div.intro-icon.rounded-circle.grad-bg--5",
                    m("span.icofont-user.text-white")
                ),
                m("h3.m-text-2.mb-3",
                    _data.attrs.NOMBRE_PACIENTE
                ),
                m("p", [
                    m("span",
                        "Ingreso:"
                    ),
                    m("span",
                        _data.attrs.FECHA_ADMISION
                    )
                ]),
                m("p", [
                    m("span",
                        "Edad:"
                    ),
                    m("span",
                        _data.attrs.EDAD + " Años"
                    )
                ]),
                m("p", [
                    m("span",
                        "Emergencia:"
                    ),
                    m("span",
                        ((_data.attrs.NRO_HABITACION == null) ? "Ubicación Pendiente" : _data.attrs.NRO_HABITACION) + ", Especialidad: " + _data.attrs.ESPECIALIDAD
                    )
                ]),
                m("p", [
                    m("span",
                        "Dg."
                    ),
                    m("span",
                        (_data.attrs.DG_PRINCIPAL !== null) ? _data.attrs.DG_PRINCIPAL : "Diagnóstico Pendiente"
                    )
                ]),
                m("div.text-right", [
                    m("a.btn.fadeInDown-slide.mt-4.animated.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-uppercase.text-white", {
                            href: "#!/paciente/" + _data.attrs.HC.slice(0, -2)
                        },
                        " Ver Paciente "
                    )
                ]),

            ]),

        ]
    }
};

const PageHonorarios = {
    codMedico: "",
    showFechas: "d-none",
    showSearch: "",
    fechaDesde: "",
    fechaHasta: "",
    oninit: () => {
        Loader.show = "";
        Loader.buttonShow = "";
        PageHonorarios.codMedico = Auth.codMedico;
        if (!Auth.isLogin()) {
            return m.route.set('/auth');
        }
    },
    oncreate: () => {
        document.title = "Facturas Pagadas | " + App.title;
        submitBusqueda();

    },
    view: () => {
        return [
            m(Loader),
            m("section.m-bg-1",
                m("div.container",
                    m("div.row",
                        m("div.col-md-6.offset-md-3",
                            m("div.text-center.m-mt-70", [
                                m("h2.m-0.text-dark",
                                    "Facturas Pagadas "
                                ),
                                m("span.icon-section-wave.d-inline-block.text-active.section-wave.mt-3.active")
                            ])
                        )
                    ),
                    m("div.row.m-mt-30.m-mb-20",
                        m("div.col-md-12", [
                            m("div.d-flex.align-items-left.position-relative.justify-content-left", [
                                m("div.custom-control.custom-radio.m-mb-20.mr-2.fz-20", {
                                    "style": {
                                        "font-size": "large"
                                    }
                                }, [
                                    m("input.custom-control-input[type='radio'][id='paciente'][name='typeShow'][value='paciente']", {
                                        onclick: (e) => {
                                            if (e.target.checked) {
                                                dataView.typeFilter = 1;
                                                PageHonorarios.showSearch = "";
                                                PageHonorarios.showFechas = "d-none";
                                            }
                                        }

                                    }),
                                    m("label.custom-control-label[for='paciente']",
                                        "Por Nombres y Apellidos"
                                    )
                                ]),
                                m("div.custom-control.custom-radio.m-mb-20.ml-2.mr-2", {
                                    "style": {
                                        "font-size": "large"
                                    }
                                }, [
                                    m("input.custom-control-input[type='radio'][id='factura'][name='typeShow'][value='factura']", {
                                        onclick: (e) => {
                                            if (e.target.checked) {
                                                dataView.typeFilter = 2;
                                                PageHonorarios.showSearch = "";
                                                PageHonorarios.showFechas = "d-none";
                                            }
                                        }
                                    }),
                                    m("label.custom-control-label[for='factura']",
                                        "Por N° de Factura"
                                    )
                                ]),
                                m("div.custom-control.custom-radio.m-mb-20.ml-2.mr-2", {
                                    "style": {
                                        "font-size": "large"
                                    }
                                }, [
                                    m("input.custom-control-input[type='radio'][id='fechasFacturas'][name='typeShow'][value='fechasFacturas']", {
                                        onclick: (e) => {
                                            if (e.target.checked) {
                                                dataView.typeFilter = 3;
                                                PageHonorarios.showSearch = "d-none";
                                                PageHonorarios.showFechas = "";
                                            }
                                        }
                                    }),
                                    m("label.custom-control-label[for='fechasFacturas']",
                                        "Por Fechas"
                                    )
                                ]),


                            ]),
                            m("div.input-group.banenr-seach.bg-white.m-mt-30.mb-0", {
                                class: PageHonorarios.showSearch
                            }, [
                                m("input.form-control[type='text'][placeholder='Buscar']", {
                                    oninput: function(e) {
                                        e.target.value = e.target.value.toUpperCase();
                                        DataProvider.searchField = e.target.value;
                                    },
                                    value: DataProvider.searchField,
                                }),
                                m("div.input-group-append",
                                    m("i.icofont-close.p-2.mt-1", {

                                        style: { "color": "rgba(108, 117, 125, 0.4) !important", "font-size": "xx-large" },
                                        class: (DataProvider.searchField.length !== 0) ? "" : "d-none",
                                        onclick: () => {
                                            DataProvider.searchField = "";
                                            DataProvider.fetch();
                                        },
                                    }),
                                    m("button.btn[type='button'][id='actBuscar']", {
                                            onclick: () => {
                                                DataProvider.fetch();
                                            },
                                        },
                                        "Buscar"
                                    ),

                                )
                            ]),
                            m("div.input-group.banenr-seach.bg-white.m-mt-30.mb-0", {
                                class: PageHonorarios.showFechas
                            }, [
                                m("label.d-inline", 'Desde:'),
                                m("input.form-control[type='date'][placeholder='Desde'][id='fechaDesde']", {
                                    oninput: function(e) {
                                        PageHonorarios.fechaDesde = e.target.value;
                                    },
                                    value: PageHonorarios.fechaDesde,
                                }),
                                m("label.d-inline", 'Hasta:'),
                                m("input.form-control[type='date'][placeholder='Desde'][id='fechaDesde']", {
                                    oninput: function(e) {
                                        PageHonorarios.fechaHasta = e.target.value;
                                    },
                                    value: PageHonorarios.fechaHasta,
                                }),
                                m("div.input-group-append",

                                    m("button.btn[type='button'][id='actBuscar']", {
                                            onclick: () => {
                                                DataProvider.fetch();
                                            },
                                        },
                                        "Buscar"
                                    ),

                                )
                            ]),
                        ]),


                    ),
                    m("div.row.m-pt-20.m-pb-60.m-mt-20", [
                        m("div.col-12.pd-r-0.pd-l-0.pd-b-20",
                            m(dataView),
                            m(pageTool),
                        ),

                    ])
                )
            ),
            m("div.button-menu-center.text-center",
                m("a.btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2[href='#!/honorarios']", [
                    m("i.icofont-home"),
                    " Inicio "
                ])
            )
        ];
    },

};

function submitBusqueda() {
    document.onkeypress = function(e) {
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == "13") {
            console.log('OK');
            document.getElementById("actBuscar").click();
        }
    };
}

function countWords(str) {
    return str.trim().split(/\s+/).length;
}


export default PageHonorarios;