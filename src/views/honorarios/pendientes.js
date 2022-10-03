import Auth from '../../models/auth';
import App from '../app';
import Loader from '../loader';
import HeaderPrivate from '../layout/header-private';


const DataProviderPublicas = {
    data: [],
    filteredData: [],
    searchField: "",
    show: "",
    fetch: () => {



        DataProviderPublicas.data = [];
        Loader.show = "";
        Loader.buttonShow = "";
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/h2/v1/mis-facturas-pendientes?typeFilter=" + dataViewPublicas.typeFilter,
                headers: {
                    "Authorization": localStorage.accessToken,
                },
            })
            .then(function(result) {
                Loader.show = "d-none";
                Loader.buttonShow = "d-none";
                PendienteHonorarios.codMedico = result.codMedico;
                DataProviderPublicas.data = result.data;
                DataProviderPublicas.filterData();
            })
            .catch(function(e) {
                DataProviderPublicas.fetch();
            })




    },
    loadData: function() {
        DataProviderPublicas.fetch();
    },
    filterData: function() {
        var to = Math.min(DataProviderPublicas.from + DataProviderPublicas.count, DataProviderPublicas.data.length + 1);
        DataProviderPublicas.filteredData = [];
        for (var i = DataProviderPublicas.from - 1; i < to - 1; i++) {
            DataProviderPublicas.filteredData.push(DataProviderPublicas.data[i]);
        }
    },
    from: 1,
    count: 10,
    setFrom: function(from) {
        DataProviderPublicas.from = parseInt(from);
        DataProviderPublicas.filterData();
    },
    setCount: function(count) {
        DataProviderPublicas.count = parseInt(count);
        DataProviderPublicas.filterData();
    },
    nextPage: function() {
        var from = DataProviderPublicas.from + DataProviderPublicas.count;
        if (from > DataProviderPublicas.data.length)
            return;
        DataProviderPublicas.from = from;
        DataProviderPublicas.filterData();
    },
    lastPage: function() {
        DataProviderPublicas.from = DataProviderPublicas.data.length - DataProviderPublicas.count + 1;
        DataProviderPublicas.filterData();
    },
    prevPage: function() {
        DataProviderPublicas.from = Math.max(1, DataProviderPublicas.from - DataProviderPublicas.count);
        DataProviderPublicas.filterData();
    },
    firstPage: function() {
        DataProviderPublicas.from = 1;
        DataProviderPublicas.filterData();
    },
    rowBack: function() {
        DataProviderPublicas.from = Math.max(1, DataProviderPublicas.from - 1);
        DataProviderPublicas.filterData();
    },
    rowFwd: function() {
        if (DataProviderPublicas.from + DataProviderPublicas.count - 1 >= DataProviderPublicas.data.length)
            return;
        DataProviderPublicas.from += 1;
        DataProviderPublicas.filterData();
    }
};

const dataViewPublicas = {
    show: "d-none",
    typeFilter: 3,
    plFechaTransaccion: "",
    plNumeroTransaccion: "",
    oninit: DataProviderPublicas.loadData,
    view: () => {
        return m('table.w-100.mt-5.' + dataViewPublicas.show, [
            m('tbody', DataProviderPublicas.filteredData.map(function(d) {
                return [
                    m("div.bg-white.pt-4.pl-4.pb-4.pr-4.info-box.m-mb-30.radius-5", {
                        "style": { "border-color": "#0aa1eb" }
                    }, [
                        m("h4.mb-0", [
                                m("i.icofont-bank.mr-1"),
                                'N° de Prefactura: ' + d['PREFACTURA']
                            ]

                        ),
                        m("div.media.",
                            m("div.media-body", [


                                m("h6.mt-2",
                                    "Fecha: " + d['FECHA']
                                ),
                                m("h6.mt-2",
                                    "N° Factura: " + d['FACTURA']
                                ),
                                m("h6",
                                    "NHC: " + d['HISTORIA_CLINICA']
                                ),
                                m("h6",
                                    "Paciente: " + d['PACIENTE']
                                ),
                                m("h6",
                                    "Monto: " + d['MONTO']
                                ),
                                m("h6",
                                    "Saldo: " + d['SALDO']
                                ),

                                m("h6",
                                    "Cliente: " + d['CLIENTE']
                                ),


                            ])
                        )
                    ]),

                ]
            }))
        ]);
    }
};


const pageToolPublicas = {
    view: () => {

        if (DataProviderPublicas.data !== undefined && dataViewPublicas.show == "") {
            if (DataProviderPublicas.data.length === 0) {

                return [
                    m("div.text-center.w-100.mt-5", [
                        m('span', '(0) Resultado(s)'),
                    ]),
                ]

            } else if (DataProviderPublicas.data.length > 10) {

                return [
                    m("div.text-center.w-100.mt-5", [
                        m('span', '(' + DataProviderPublicas.data.length + ') Resultado(s) '),
                    ]),
                    m('div.d-flex.w-100.text-center.mt-5', [
                        m("div.w-50.w-20", [


                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                    type: "button",
                                    "style": { "cursor": "pointer" },

                                    onclick: function() { DataProviderPublicas.rowBack(); }
                                },
                                " << Anterior "
                            ),
                        ]),

                        m("div.w-50.w-20", [

                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                    type: "button",
                                    "style": { "cursor": "pointer" },

                                    onclick: function() { DataProviderPublicas.rowFwd(); }
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

                                    onclick: function() { DataProviderPublicas.firstPage(); }
                                },
                                " | Inicio "
                            ),

                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                    type: "button",
                                    "style": { "cursor": "pointer" },

                                    onclick: function() { DataProviderPublicas.prevPage(); }
                                },
                                " < Pág. Ant. "
                            ),

                        ]),

                        m("div.w-50.w-20", [


                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                    type: "button",
                                    "style": { "cursor": "pointer" },

                                    onclick: function() { DataProviderPublicas.nextPage(); }
                                },
                                " Pág. Sig. > "
                            ),


                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                    type: "button",
                                    "style": { "cursor": "pointer" },

                                    onclick: function() { DataProviderPublicas.lastPage(); }
                                },
                                " Fin | "
                            ),

                        ])
                    ])

                ]

            } else {
                return [
                    m("div.text-center.w-100.mt-5", [
                        m('span', '(' + DataProviderPublicas.data.length + ') Resultado(s) '),
                    ]),
                ]


            }
        }


    }
};


const DataProviderHM = {
    data: [],
    filteredData: [],
    searchField: "",
    show: "",
    fetch: () => {



        DataProviderHM.data = [];
        Loader.show = "";
        Loader.buttonShow = "";
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/h2/v1/mis-facturas-pendientes?typeFilter=" + dataViewHM.typeFilter,
                headers: {
                    "Authorization": localStorage.accessToken,
                },
            })
            .then(function(result) {
                Loader.show = "d-none";
                Loader.buttonShow = "d-none";
                PendienteHonorarios.codMedico = result.codMedico;
                DataProviderHM.data = result.data;
                DataProviderHM.filterData();
            })
            .catch(function(e) {
                DataProviderHM.fetch();
            })




    },
    loadData: function() {
        DataProviderHM.fetch();
    },
    filterData: function() {
        var to = Math.min(DataProviderHM.from + DataProviderHM.count, DataProviderHM.data.length + 1);
        DataProviderHM.filteredData = [];
        for (var i = DataProviderHM.from - 1; i < to - 1; i++) {
            DataProviderHM.filteredData.push(DataProviderHM.data[i]);
        }
    },
    from: 1,
    count: 10,
    setFrom: function(from) {
        DataProviderHM.from = parseInt(from);
        DataProviderHM.filterData();
    },
    setCount: function(count) {
        DataProviderHM.count = parseInt(count);
        DataProviderHM.filterData();
    },
    nextPage: function() {
        var from = DataProviderHM.from + DataProviderHM.count;
        if (from > DataProviderHM.data.length)
            return;
        DataProviderHM.from = from;
        DataProviderHM.filterData();
    },
    lastPage: function() {
        DataProviderHM.from = DataProviderHM.data.length - DataProviderHM.count + 1;
        DataProviderHM.filterData();
    },
    prevPage: function() {
        DataProviderHM.from = Math.max(1, DataProviderHM.from - DataProviderHM.count);
        DataProviderHM.filterData();
    },
    firstPage: function() {
        DataProviderHM.from = 1;
        DataProviderHM.filterData();
    },
    rowBack: function() {
        DataProviderHM.from = Math.max(1, DataProviderHM.from - 1);
        DataProviderHM.filterData();
    },
    rowFwd: function() {
        if (DataProviderHM.from + DataProviderHM.count - 1 >= DataProviderHM.data.length)
            return;
        DataProviderHM.from += 1;
        DataProviderHM.filterData();
    }
};

const dataViewHM = {
    show: "d-none",
    typeFilter: 2,
    plFechaTransaccion: "",
    plNumeroTransaccion: "",
    oninit: DataProviderHM.loadData,

    view: () => {
        return m('table.w-100.mt-5.' + dataViewHM.show, [
            m('tbody', DataProviderHM.filteredData.map(function(d) {
                return [
                    m("div.bg-white.pt-4.pl-4.pb-4.pr-4.info-box.m-mb-30.radius-5", {
                        "style": { "border-color": "#0aa1eb" }
                    }, [
                        m("h4.mb-0", [
                                m("i.icofont-bank.mr-1"),
                                'N° de Prefactura: ' + d['PREFACTURA']
                            ]

                        ),
                        m("div.media.",
                            m("div.media-body", [


                                m("h6.mt-2",
                                    "Fecha: " + d['FECHA']
                                ),
                                m("h6.mt-2",
                                    "N° Factura: " + d['FACTURA']
                                ),
                                m("h6",
                                    "NHC: " + d['HISTORIA_CLINICA']
                                ),
                                m("h6",
                                    "Paciente: " + d['PACIENTE']
                                ),
                                m("h6",
                                    "Monto: " + d['MONTO']
                                ),
                                m("h6",
                                    "Saldo: " + d['SALDO']
                                ),

                                m("h6",
                                    "Cliente: " + d['CLIENTE']
                                ),


                            ])
                        )
                    ]),

                ]
            }))
        ]);
    }
};


const pageToolHM = {
    view: () => {

        if (DataProviderHM.data !== undefined && dataViewHM.show == "") {
            if (DataProviderHM.data.length === 0) {

                return [
                    m("div.text-center.w-100.mt-5", [
                        m('span', '(0) Resultado(s)'),
                    ]),
                ]

            } else if (DataProviderHM.data.length > 10) {

                return [
                    m("div.text-center.w-100.mt-5", [
                        m('span', '(' + DataProviderHM.data.length + ') Resultado(s) '),
                    ]),
                    m('div.d-flex.w-100.text-center.mt-5', [
                        m("div.w-50.w-20", [


                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                    type: "button",
                                    "style": { "cursor": "pointer" },

                                    onclick: function() { DataProviderHM.rowBack(); }
                                },
                                " << Anterior "
                            ),
                        ]),

                        m("div.w-50.w-20", [

                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                    type: "button",
                                    "style": { "cursor": "pointer" },

                                    onclick: function() { DataProviderHM.rowFwd(); }
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

                                    onclick: function() { DataProviderHM.firstPage(); }
                                },
                                " | Inicio "
                            ),

                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                    type: "button",
                                    "style": { "cursor": "pointer" },

                                    onclick: function() { DataProviderHM.prevPage(); }
                                },
                                " < Pág. Ant. "
                            ),

                        ]),

                        m("div.w-50.w-20", [


                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                    type: "button",
                                    "style": { "cursor": "pointer" },

                                    onclick: function() { DataProviderHM.nextPage(); }
                                },
                                " Pág. Sig. > "
                            ),


                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                    type: "button",
                                    "style": { "cursor": "pointer" },

                                    onclick: function() { DataProviderHM.lastPage(); }
                                },
                                " Fin | "
                            ),

                        ])
                    ])

                ]

            } else {
                return [
                    m("div.text-center.w-100.mt-5", [
                        m('span', '(' + DataProviderHM.data.length + ') Resultado(s) '),
                    ]),
                ]


            }
        }


    }
};


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
                url: "https://api.hospitalmetropolitano.org/h2/v1/mis-facturas-pendientes?typeFilter=" + dataViewSeguros.typeFilter,
                headers: {
                    "Authorization": localStorage.accessToken,
                },
            })
            .then(function(result) {
                Loader.show = "d-none";
                Loader.buttonShow = "d-none";
                PendienteHonorarios.codMedico = result.codMedico;
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

const dataViewSeguros = {
    show: "",
    typeFilter: 1,
    plFechaTransaccion: "",
    plNumeroTransaccion: "",
    oninit: DataProvider.loadData,
    downloadPlanilla: () => {
        window.location = 'https://api.hospitalmetropolitano.org/h2/v0/controlador/descarga_documentos/preparar_planilla_pago.php?proveedor=' + PendienteHonorarios.codMedico + '&fecha_transaccion=' + dataViewSeguros.plFechaTransaccion + '&numero_transaccion=' + dataViewSeguros.plNumeroTransaccion + '&tipo_imprime=PAGOS';
    },
    view: () => {
        return m('table.w-100.mt-5.' + dataViewSeguros.show, [
            m('tbody', DataProvider.filteredData.map(function(d) {
                return [
                    m("div.bg-white.pt-4.pl-4.pb-4.pr-4.info-box.m-mb-30.radius-5", {
                        "style": { "border-color": "#0aa1eb" }
                    }, [
                        m("h4.mb-0", [
                                m("i.icofont-bank.mr-1"),
                                'N° de Prefactura: ' + d['PREFACTURA']
                            ]

                        ),
                        m("div.media.",
                            m("div.media-body", [


                                m("h6.mt-2",
                                    "Fecha: " + d['FECHA']
                                ),
                                m("h6.mt-2",
                                    "N° Factura: " + d['FACTURA']
                                ),
                                m("h6",
                                    "NHC: " + d['HISTORIA_CLINICA']
                                ),
                                m("h6",
                                    "Paciente: " + d['PACIENTE']
                                ),
                                m("h6",
                                    "Monto: " + d['MONTO']
                                ),
                                m("h6",
                                    "Saldo: " + d['SALDO']
                                ),

                                m("h6",
                                    "Cliente: " + d['CLIENTE']
                                ),


                            ])
                        )
                    ]),

                ]
            }))
        ]);
    }
};


const pageToolSeguros = {
    view: () => {

        if (DataProvider.data !== undefined && dataViewSeguros.show == "") {
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

const PendienteHonorarios = {
    codMedico: "",
    oninit: () => {
        Loader.show = "";
        Loader.buttonShow = "";
        PendienteHonorarios.codMedico = Auth.codMedico;
        if (!Auth.isLogin()) {
            return m.route.set('/auth');
        }
    },
    oncreate: () => {
        document.title = "Facturas Pendientes | " + App.title;
        submitBusqueda();
        setTimeout(function() { document.getElementById("paciente").click(); }, 500);
    },
    view: () => {
        return [
            m(Loader),
            m(HeaderPrivate),

            m("section.m-bg-1",
                m("div.container",
                    m("div.row",
                        m("div.col-md-6.offset-md-3",
                            m("div.text-center.m-mt-70", [
                                m("h2.m-0.text-dark",
                                    "Facturas Pendientes "
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
                                    m("input.custom-control-input[type='radio'][id='paciente'][name='typeFilter'][value='1']", {
                                        onclick: (e) => {
                                            if (e.target.checked) {
                                                dataViewSeguros.typeFilter = 1;
                                                dataViewSeguros.show = "";
                                                dataViewHM.show = "d-none";
                                                dataViewPublicas.show = "d-none";

                                            }
                                        }

                                    }),
                                    m("label.custom-control-label[for='paciente']",
                                        "Seguros"
                                    )
                                ]),
                                m("div.custom-control.custom-radio.m-mb-20.ml-2.mr-2", {
                                    "style": {
                                        "font-size": "large"
                                    }
                                }, [
                                    m("input.custom-control-input[type='radio'][id='hm'][name='typeFilter'][value='2']", {
                                        onclick: (e) => {
                                            if (e.target.checked) {
                                                dataViewHM.typeFilter = 2;
                                                dataViewSeguros.show = "d-none";
                                                dataViewHM.show = "";
                                                dataViewPublicas.show = "d-none";

                                            }
                                        }
                                    }),
                                    m("label.custom-control-label[for='hm']",
                                        "Hospital Metropolitano"
                                    )
                                ]),
                                m("div.custom-control.custom-radio.m-mb-20.ml-2.mr-2", {
                                    "style": {
                                        "font-size": "large"
                                    }
                                }, [
                                    m("input.custom-control-input[type='radio'][id='publicas'][name='typeFilter'][value='3']", {
                                        onclick: (e) => {
                                            if (e.target.checked) {
                                                dataViewPublicas.typeFilter = 3;
                                                dataViewSeguros.show = "d-none";
                                                dataViewHM.show = "d-none";
                                                dataViewPublicas.show = "";
                                            }
                                        }
                                    }),
                                    m("label.custom-control-label[for='publicas']",
                                        "Instituciones Públicas"
                                    )
                                ]),


                            ]),

                        ]),

                    ),
                    m("div.row.m-pt-20.m-pb-60.m-mt-20", [
                        m("div.col-12.pd-r-0.pd-l-0.pd-b-20",
                            m(dataViewSeguros),
                            m(pageToolSeguros),
                            m(dataViewHM),
                            m(pageToolHM),
                            m(dataViewPublicas),
                            m(pageToolPublicas),
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


export default PendienteHonorarios;