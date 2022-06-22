import Auth from '../../models/auth';
import App from '../app';
import Loader from '../loader';

const DataProvider = {
    data: [],
    filteredData: [],
    searchField: "",
    fetch: () => {
        DataProvider.data = [];
        Loader.show = "";
        Loader.buttonShow = "";
        m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/t/v1/mis-pacientes?start=0&length=10" + ((DataProvider.searchField.length !== 0) ? "&searchField=" + DataProvider.searchField : ""),

            headers: {
                "Authorization": localStorage.accessToken,
            },
        })
            .then(function (result) {
                Loader.show = "d-none";
                Loader.buttonShow = "d-none";

                DataProvider.data = result.data;
                DataProvider.filterData();
            })
            .catch(function (e) { })


    },
    loadData: function () {
        DataProvider.fetch();

    },
    filterData: function () {
        var to = Math.min(DataProvider.from + DataProvider.count, DataProvider.data.length + 1);
        DataProvider.filteredData = [];
        for (var i = DataProvider.from - 1; i < to - 1; i++) {
            DataProvider.filteredData.push(DataProvider.data[i]);
        }
    },
    from: 1,
    count: 10,
    setFrom: function (from) {
        DataProvider.from = parseInt(from);
        DataProvider.filterData();
    },
    setCount: function (count) {
        DataProvider.count = parseInt(count);
        DataProvider.filterData();
    },
    nextPage: function () {
        var from = DataProvider.from + DataProvider.count;
        if (from > DataProvider.data.length)
            return;
        DataProvider.from = from;
        DataProvider.filterData();
    },
    lastPage: function () {
        DataProvider.from = DataProvider.data.length - DataProvider.count + 1;
        DataProvider.filterData();
    },
    prevPage: function () {
        DataProvider.from = Math.max(1, DataProvider.from - DataProvider.count);
        DataProvider.filterData();
    },
    firstPage: function () {
        DataProvider.from = 1;
        DataProvider.filterData();
    },
    rowBack: function () {
        DataProvider.from = Math.max(1, DataProvider.from - 1);
        DataProvider.filterData();
    },
    rowFwd: function () {
        if (DataProvider.from + DataProvider.count - 1 >= DataProvider.data.length)
            return;
        DataProvider.from += 1;
        DataProvider.filterData();
    }
};

const dataView = {
    oninit: DataProvider.loadData,
    view: () => {
        Loader.show = "d-none";
        Loader.buttonShow = "d-none";

        return m('table.w-100.mt-5', [

            m('tbody', DataProvider.filteredData.map(function (d) {


                return m("div.p-5.mb-3.doctrs-info-card.grad-bg--5.position-relative.type-1.radius-10", [
                    m("h4.text-white.mb-0", [
                        m("i.icofont-ui-user"),
                        " " + d['NOMBRE_PACIENTE']
                    ]

                    ),
                    m("p.text-white.designation.text-uppercase", [
                        "Especialidad: ",
                        d['ESPECIALIDAD'],
                        " Edad: ",
                        d['EDAD'],
                        " Año(s)."
                    ]),
                    m("h6.text-white",
                        (d['DG_PRINCIPAL'] !== null) ? "Dg: " + d['DG_PRINCIPAL'] : "Dg: NO DISPONIBLE"
                    ),
                    m("h6.text-white.pt-2", [
                        m("i.icofont-calendar"),
                        " Fecha Admisión: " + d['FECHA_ADMISION']
                    ]),
                    m("h6.text-white.pt-2", [
                        m("i.icofont-patient-bed"),
                        (d['NRO_HABITACION'] !== null) ? " Ubicación: " + d['NRO_HABITACION'] : " Ubicación: NO DISPONIBLE"
                    ]),

                    m("div.text-right", [
                        m("a.btn.medim-btn.solid-btn.mt-4.text-medium.radius-pill.text-active.text-uppercase.white-btn.bg-transparent.position-relative", {
                            href: "#!/paciente/" + d['HC']
                        },
                            " Ver Paciente "
                        )
                    ])

                ])
            }))
        ]);
    }
};

const pageTool = {
    view: () => {
        return m('div.f6.w-100.mw8.center', [
            m("div.fl.w-50.w-20-ns.tc.pv5", [
                m('button.f6.link.dim.br2.ph3.pv2.mb2.dib.white.bg-black', { onclick: function () { DataProvider.firstPage(); } }, '|<<'),
                m('button.f6.link.dim.br2.ph3.pv2.mb2.dib.white.bg-black', { onclick: function () { DataProvider.prevPage(); } }, '<<'),
                m('button.f6.link.dim.br2.ph3.pv2.mb2.dib.white.bg-black', { onclick: function () { DataProvider.rowBack(); } }, '<')
            ]),
            m("div.fl.w-50.w-60-ns.tc.pv5", [
                m('span.f5.f4-m.f3-l.fw2.black-50.mt0.lh-copy', 'showing '),
                m('input.tc.w-10.f5.f4-m.f3-l.fw2.black-50.mt0.lh-copy', { value: DataProvider.count, onchange: function (e) { DataProvider.setCount(e.target.value); } }),
                m('span.f5.f4-m.f3-l.fw2.black-50.mt0.lh-copy', ' of ' + DataProvider.data.length + ' rows. Starting at row '),
                m('input.tc.w-10.f5.f4-m.f3-l.fw2.black-50.mt0.lh-copy', { value: DataProvider.from, onchange: function (e) { DataProvider.setFrom(e.target.value); } })
            ]),
            m("div.fl.w-50.w-20-ns.tc.pv5", [
                m('button.f6.link.dim.br2.ph3.pv2.mb2.dib.white.bg-black', { onclick: function () { DataProvider.rowFwd(); } }, '>'),
                m('button.f6.link.dim.br2.ph3.pv2.mb2.dib.white.bg-black', { onclick: function () { DataProvider.nextPage(); } }, '>>'),
                m('button.f6.link.dim.br2.ph3.pv2.mb2.dib.white.bg-black', { onclick: function () { DataProvider.lastPage(); } }, '>>|')
            ])
        ]);
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

const PagePacientes = {

    oninit: () => {
        Loader.show = "";
        Loader.buttonShow = "";

        if (!Auth.isLogin()) {
            return m.route.set('/auth');
        }
    },
    oncreate: () => {
        document.title = "Mis Pacientes | " + App.title;

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
                                    "Mis Pacientes "
                                ),
                                m("span.icon-section-wave.d-inline-block.text-active.section-wave.mt-3.active")
                            ])
                        )
                    ),
                    m("div.row.m-mb-20",
                        m("div.col-md-12",
                            m("form[id='busquedaPaciente']", [

                                m("div.input-group.banenr-seach.bg-white.m-mt-30.mb-0", [
                                    m("input.form-control[type='text'][placeholder='Buscar por Apellidos y Nombres']", {
                                        oninput: function (e) {
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
                                        m("button.btn[type='button']", {
                                            onclick: () => {
                                                DataProvider.fetch();
                                            },
                                        },
                                            "Buscar"
                                        ),

                                    )
                                ]),

                            ]))
                    ),
                    m("div.row.m-pt-20.m-pb-60.m-mt-20", [
                        m("div.col-12.pd-r-0.pd-l-0.pd-b-20.",
                            m(dataView),
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