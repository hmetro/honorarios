import Auth from '../../models/auth';
import HeaderPrivate from '../layout/header-private';
import App from '../app';
import m from 'mithril';
import Loader from '../loader';


const VisorRis = {
    show: "",
    view: () => {
        return [
            m("div", [
                m("iframe", {
                    src: "https:s//imagen.hmetro.med.ec/zfp?Lights=on&mode=proxy#view&pid=" + Paciente.nhc + "&un=WEBAPI&pw=lEcfvZxzlXTsfimMMonmVZZ15IqsgEcdV%2forI8EUrLY%3d",
                    "style": {
                        "frameborder": "0",
                        "width": "100%",
                        "height": document.body.clientHeight - (document.body.clientHeight * 0.02) + "px"
                    }
                })
            ]),
            m("div.imagen-button-menu",
                m("button.btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2[type='button']", {
                    onclick: () => {
                        VisorRis.show = "";
                    },
                }, [
                    m("i.icofont-close"),
                    " Cerrar "
                ])
            )
        ]
    },

};


const Imagen = {
    data: [],
    detalle: [],
    error: "",
    showFor: "",
    fecth: () => {
        m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/t/v1/resultados-laboratorio/" + Paciente.nhc,
                headers: {
                    "Authorization": localStorage.accessToken,
                },
            })
            .then(function(result) {
                if (result.status) {
                    Imagen.data = result.data;
                } else {
                    Imagen.error = result.message;
                }

            })
            .catch(function(e) {
                Imagen.error = e.message;
            })
    },
    oninit: () => {
        Imagen.fecth();
    },
    view: () => {

        return Imagen.error ? [
            m(".tab-pane.fade[id='v-pills-imagen'][role='tabpanel']", [
                m("h4.m-text-2.",
                    m("i.icofont-file-image.mr-2"),
                    "Resultados de Imagen:"
                ),
                m("h6.text-light-dark.ff-roboto.pb-40.mb-0",
                    "Hospital Metropolitano"
                ),
                m(".alert.alert-danger[role='alert']",
                    Imagen.error
                )
            ]),
        ] : Imagen.data.length !== 0 ? [
            m(".tab-pane.fade[id='v-pills-imagen'][role='tabpanel']", [
                m("h4.m-text-2.",
                    m("i.icofont-file-image.mr-2"),
                    "Resultados de Imagen:"
                ),
                m("h6.text-light-dark.ff-roboto.pb-40.mb-0",
                    "Hospital Metropolitano"
                ),
                m("div.row.p-1",
                    m("div.col-md-6",
                        m("div.single-service.type-1.radius-10.position-relative.service-wrapper.s-dp-10-60.m-mb-50.", {
                                onclick: () => {
                                    VisorRis.show = "d-none";
                                },
                                "style": { "cursor": "pointer" }
                            },
                            m("h4.text-dark2.mb-3.position-relative.pt-2",
                                "Ver Exámenes"
                            )
                        )
                    ),
                    m("div.col-md-6",
                        m("div.single-service.type-1.radius-10.position-relative.service-wrapper.s-dp-10-60.m-mb-50.", {
                                onclick: () => {},
                                "style": { "cursor": "pointer" }
                            },
                            m("h4.text-dark2.mb-3.position-relative.pt-2",
                                "Ver Informes"
                            )
                        )
                    )
                )
            ]),
        ] : [
            m(".tab-pane.fade[id='v-pills-imagen'][role='tabpanel']", [
                m("h4.m-text-2.",
                    m("i.icofont-file-image.mr-2"),
                    "Resultados de Imagen:"
                ),
                m("h6.text-light-dark.ff-roboto.pb-40.mb-0",
                    "Hospital Metropolitano"
                ),
                m("div.text-center", [
                    m("div.loader-content",
                        m("span.icon-section-wave.d-inline-block.text-active.mt-3.", )
                    )
                ])
            ]),
        ]


    },

};


const Laboratorio = {
    data: [],
    detalle: [],
    error: "",
    showFor: "",
    fecth: () => {
        m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/t/v1/resultados-laboratorio/" + Paciente.nhc,
                headers: {
                    "Authorization": localStorage.accessToken,
                },
            })
            .then(function(result) {
                if (result.status) {
                    Laboratorio.data = result.data;
                } else {
                    Laboratorio.error = result.message;
                }

            })
            .catch(function(e) {
                Laboratorio.error = e.message;
            })
    },
    oninit: () => {
        Laboratorio.fecth();
    },
    view: () => {

        return Laboratorio.error ? [
            m(".tab-pane.fade[id='v-pills-lab'][role='tabpanel']", [
                m("h4.m-text-2.",
                    m("i.icofont-laboratory.mr-2"),
                    "Resultados de Laboratorio:"
                ),
                m("h6.text-light-dark.ff-roboto.pb-40.mb-0",
                    "Hospital Metropolitano"
                ),
                m(".alert.alert-danger[role='alert']",
                    Laboratorio.error
                )
            ]),
        ] : Laboratorio.data.length !== 0 ? [
            m(".tab-pane.fade[id='v-pills-lab'][role='tabpanel']", [
                m("h4.m-text-2.",
                    m("i.icofont-laboratory.mr-2"),
                    "Resultados de Laboratorio:"
                ),
                m("h6.text-light-dark.ff-roboto.pb-40.mb-0",
                    "Hospital Metropolitano"
                ),
                m("p", [
                    "Resultados desde Enero, 2019.",
                    m("a.ml-2", {
                        href: "/",
                        onclick: (e) => {
                            e.preventDefault();
                            Laboratorio.data = [];
                            Laboratorio.fecth();
                        },
                    }, [
                        m("i.icofont-refresh.mr-2"),
                        "Actualizar"
                    ]),

                ]),
                m("div.row.p-1",
                    m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.",
                        m("table.table.table-sm[width='100%']", { "style": { "width": "100%", "border-color": "transparent", "margin-bottom": "50px" } }, [
                            m("tbody", [
                                Laboratorio.data.map(function(_v, _i, _contentData) {
                                    return [
                                        m("tr[role='row']", { "style": { "background-color": "transparent" } },
                                            m("td", { "style": { "border-color": "transparent", "padding": "0px" } },
                                                m("div.row.bg-white.radius-5.p-2.article-tags", [
                                                    m("div.col-lg-6.p-2", [
                                                        m("div", { "style": { "display": "block" } },
                                                            m("span", { "style": { "color": "red", "display": "none" } },
                                                                " Nuevo Resultado "
                                                            )
                                                        ),
                                                        m("span.d-block",
                                                            "Origen: " + _v.ORIGEN + " Médico: " + _v.MEDICO.replaceAll(":", "")
                                                        ),
                                                        m("span.d-block",
                                                            " Fecha y Hora: " + _v.FECHA
                                                        ),
                                                    ]),
                                                    m("div.col-lg-6.p-2.text-xl-right", [
                                                        m("button.verRes.capsul.fz-poppins.text-default.radius-pill.active", { "style": { "cursor": "pointer" } }, [
                                                            m("i.icofont-ui-file"),
                                                            " Ver Resultado "
                                                        ]),
                                                        m("button.imprimirRes.capsul.fz-poppins.text-default.radius-pill.active", { "style": { "cursor": "pointer" } }, [
                                                            m("i.icofont-download"),
                                                            " Descargar "
                                                        ])
                                                    ])
                                                ])
                                            )
                                        )
                                    ]
                                })
                            ])
                        ])
                    ),
                )
            ]),
        ] : [
            m(".tab-pane.fade[id='v-pills-lab'][role='tabpanel']", [
                m("h4.m-text-2.",
                    m("i.icofont-laboratory.mr-2"),
                    "Resultados de Laboratorio:"
                ),
                m("h6.text-light-dark.ff-roboto.pb-40.mb-0",
                    "Hospital Metropolitano"
                ),
                m("div.text-center", [
                    m("div.loader-content",
                        m("span.icon-section-wave.d-inline-block.text-active.mt-3.", )
                    )
                ])
            ]),
        ]


    },

};

const ZoomFormulario = {
    view: () => {
        if (Formulario.showFor.length !== 0) {
            return [
                m("div.button-menu-left-plus-for",
                    m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2[href='//beta.metrovirtual.hospitalmetropolitano.org/touch/paciente']",
                        m("i.icofont-ui-zoom-in", {
                            onclick: () => {},
                            "style": { "font-size": "x-large" }
                        })
                    )
                ),
                m("div.button-menu-left-subs-for",
                    m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2[href='//beta.metrovirtual.hospitalmetropolitano.org/touch/paciente']",
                        m("i.icofont-ui-zoom-out", {
                            onclick: () => {},
                            "style": { "font-size": "x-large" }
                        })
                    )
                )
            ]
        }
    },
};

const Formulario = {
    adm: null,
    data: [],
    error: "",
    showFor: "",
    hideFor: "d-none",
    view: () => {

        if (Formulario.showFor.length !== 0) {
            return [
                m("div.col-sm-10.offset-sm-4.col-md-6.offset-md-0.col-xl-12",
                    m("div.wrapper",
                        m("iframe.scaled-frame[src='//beta.metrovirtual.hospitalmetropolitano.org/touch/formulario?NHCL=51095501&ADM=9702&FOR=005']", {})
                    ),
                )
            ]
        }

    },
}

const Evoluciones = {
    data: [],
    detalle: [],
    error: "",
    showFor: "",
    fecth: () => {
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/ev-paciente-emergencia",
                data: {
                    numeroHistoriaClinica: Paciente.nhc
                },
                headers: {
                    "Authorization": localStorage.accessToken,
                },
            })
            .then(function(result) {
                if (result.status) {
                    Evoluciones.data = result.data;
                } else {
                    Evoluciones.error = result.message;
                }

            })
            .catch(function(e) {
                Evoluciones.error = e.message;
            })
    },
    oninit: () => {
        Evoluciones.fecth();
    },
    view: () => {

        return Evoluciones.error ? [
            m(".tab-pane.fade[id='v-pills-ev'][role='tabpanel']", [
                m("h4.m-text-2.",
                    m("i.icofont-prescription.mr-2"),

                    "Evoluciones y Prescripciones:"
                ),
                m("h6.text-light-dark.ff-roboto.pb-40.mb-0",
                    "Hospital Metropolitano"
                ),
                m(".alert.alert-danger[role='alert']",
                    Evoluciones.error
                )
            ]),
        ] : Evoluciones.data.length !== 0 ? [
            m(".tab-pane.fade[id='v-pills-ev'][role='tabpanel']", [
                m("h4.m-text-2.",
                    m("i.icofont-prescription.mr-2"),

                    "Evoluciones y Prescripciones:"
                ),
                m("h6.text-light-dark.ff-roboto.pb-40.mb-0",
                    "Hospital Metropolitano"
                ),
                m("p", [
                        "Última información disponible. HIS MV.",
                        m("a.ml-2", {
                            href: "/",
                            onclick: (e) => {
                                e.preventDefault();
                                Evoluciones.data = [];
                                Evoluciones.fecth();
                            },
                        }, [
                            m("i.icofont-refresh.mr-2"),
                            "Actualizar"
                        ]),

                    ]

                ),
                m("div.row.p-1",
                    m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.",
                        m("table.table.table-sm[width='100%']", { "style": { "width": "100%", "border-color": "transparent", "margin-bottom": "50px" } }, [
                            m("tbody", [
                                Evoluciones.data.map(function(_v, _i, _contentData) {
                                    return [
                                        m("tr[role='row']", { "style": { "background-color": "transparent" } },
                                            m("td", { "style": { "border-color": "transparent", "padding": "0px" } },
                                                m("div.row.bg-white.radius-5.p-2.article-tags", [
                                                    m("div.col-lg-6.p-2", [
                                                        m("span", [
                                                            m("i.icofont-file-alt"),
                                                            " FOR 005 "
                                                        ]),
                                                        m("p.p-0",
                                                            "Fecha: " +
                                                            _v.FECHA_ADMISION
                                                        )
                                                    ]),
                                                    m("div.col-lg-6.p-2.text-xl-right",
                                                        m("button." + Formulario.showFor + ".capsul.fz-poppins.text-default.radius-pill.active", {
                                                            onclick: () => {
                                                                Formulario.showFor = "d-none";
                                                                Formulario.hideFor = "";

                                                            },
                                                            "style": { "cursor": "pointer" }
                                                        }, [
                                                            m("i.icofont-file-alt"),
                                                            " Ver Formulario "
                                                        ]),
                                                        m("button." + Formulario.hideFor + ".capsul.fz-poppins.text-default.radius-pill.active", {
                                                            onclick: () => {
                                                                Formulario.showFor = "";
                                                                Formulario.hideFor = "d-none";
                                                            },
                                                            "style": { "cursor": "pointer" }
                                                        }, [
                                                            m("i.icofont-close-circled"),
                                                            " Cerrar "
                                                        ])
                                                    )
                                                ])
                                            )
                                        )
                                    ]
                                })
                            ])
                        ])
                    ),
                    m(Formulario),
                )
            ]),
        ] : [
            m(".tab-pane.fade[id='v-pills-ev'][role='tabpanel']", [
                m("h4.m-text-2.",
                    m("i.icofont-prescription.mr-2"),

                    "Evoluciones y Prescripciones:"
                ),
                m("h6.text-light-dark.ff-roboto.pb-40.mb-0",
                    "Hospital Metropolitano"
                ),
                m("div.text-center", [
                    m("div.loader-content",
                        m("span.icon-section-wave.d-inline-block.text-active.mt-3.", )
                    )
                ])
            ]),
        ]


    },
}

const SignosVitales = {
    data: [],
    detalle: [],
    error: "",
    fecth: () => {
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/sv-paciente-emergencia",
                data: {
                    numeroHistoriaClinica: Paciente.nhc
                },
                headers: {
                    "Authorization": localStorage.accessToken,
                },
            })
            .then(function(result) {
                if (result.data) {
                    SignosVitales.data = result.data;
                } else {
                    SignosVitales.error = "R";
                }

            })
            .catch(function(e) {
                SignosVitales.error = e.message;
            })
    },
    oninit: () => {
        SignosVitales.fecth();
    },
    view: () => {

        return SignosVitales.error ? [
            m(".alert.alert-danger[role='alert']",
                DetallePaciente.error
            )
        ] : SignosVitales.data.length !== 0 ? [
            m(".tab-pane.fade.active.show[id='v-pills-sv'][role='tabpanel']", [
                m("h4.m-text-2.", [
                        m("i.icofont-heart-beat.mr-2"),
                        "Signos Vitales:"
                    ]

                ),
                m("h6.text-light-dark.ff-roboto.pb-40.mb-0",
                    "Hospital Metropolitano"
                ),
                m("p", [
                        "Última información disponible. HIS MV.",
                        m("a.ml-2", {
                            href: "/",
                            onclick: (e) => {
                                e.preventDefault();
                                SignosVitales.data = [];
                                SignosVitales.fecth();
                            },
                        }, [
                            m("i.icofont-refresh.mr-2"),
                            "Actualizar"
                        ]),

                    ]

                ),
                m("div.row",
                    m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.",
                        m("table.table.table-sm[width='100%']", { "style": { "width": "100%", "border-color": "transparent", "margin-bottom": "50px" } }, [
                            m("tbody", [
                                    SignosVitales.data.map(function(_v, _i, _contentData) {

                                        return [
                                            m("tr.mb-2", { "style": { "background-color": "transparent" } },
                                                m("td", { "style": { "border-color": "transparent", } },
                                                    m("div.row.bg-white.radius-5.p-2.article-tags", [
                                                        m("div.col-6.p-2", [
                                                            m("button.capsul.fz-poppins.text-default.radius-pill.active.mr-2", [
                                                                m("span.icofont-xray.text-white"),
                                                            ]),
                                                            m("span", _v.SIGNO),
                                                        ]),
                                                        m("div.col-6.p-2.text-right",
                                                            m("p.p-0.mr-2.text-primary", "Valor: " + _v.VALOR),
                                                            m("p", "Fecha y Hora: " + _v.FECHA)
                                                        )
                                                    ])
                                                )
                                            )
                                        ]
                                    })
                                ],

                            )
                        ])
                    ),

                )
            ]),
        ] : [
            m(".tab-pane.fade.active.show[id='v-pills-sv'][role='tabpanel']", [
                m("h4.m-text-2.", [
                    m("i.icofont-heart-beat.mr-2"),
                    "Signos Vitales:"
                ]),
                m("h6.text-light-dark.ff-roboto.pb-40.mb-0",
                    "Hospital Metropolitano"
                ),
                m("p",
                    "Última información disponible. HIS MV."
                ),
                m("div.text-center", [
                    m("div.loader-content",
                        m("span.icon-section-wave.d-inline-block.text-active.mt-3.", )
                    )
                ])
            ]),
        ]



    },
}

const DetallePaciente = {
    data: [],
    detalle: [],
    error: "",
    fetch: () => {
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/status-paciente-emergencia",
                data: {
                    numeroHistoriaClinica: Paciente.nhc
                },
                headers: {
                    "Authorization": localStorage.accessToken,
                },
            })
            .then(function(result) {
                if (result.status) {
                    DetallePaciente.data = result.data;
                } else {
                    DetallePaciente.error = "No existe información disponible. La ubicación del paciente ya no es Emergencia.";
                }
            })
            .catch(function(e) {
                DetallePaciente.error = e.message;
            })
    },
    view: () => {
        return [
            m("div.col-md-4",
                m("div.department-tab-pill.m-pt-140.m-pb-140.position-relative.", [
                    m("h3.nombresPaciente.text-white.pb-md-5",
                        DetallePaciente.data.NOMBRE_PACIENTE
                    ),
                    m("h6.nhcPaciente.ml12.text-white.text-uppercase.fadeInDown-slide.animated",
                        "NHC: " + DetallePaciente.data.HC
                    ),
                    m("h6.nhcPaciente.ml12.text-white.text-uppercase.fadeInDown-slide.animated",
                        "Edad: " + DetallePaciente.data.EDAD + " Años"
                    ),
                    m("h6.nhcPaciente.ml12.text-white.text-uppercase.fadeInDown-slide.animated",
                        "Especialidad: " + DetallePaciente.data.ESPECIALIDAD
                    ),
                    m(".nav.pt-md-0.flex-column.nav-pills[id='v-pills-tab'][role='tablist'][aria-orientation='vertical']", [
                        m("a.nav-link.active[data-toggle='pill'][href='#v-pills-sv'][role='tab']", [
                            m("i.icofont-heart-beat"),
                            m("span",
                                " Signos Vitales "
                            )
                        ]),
                        m("a.nav-link[data-toggle='pill'][href='#v-pills-ev'][role='tab']", [
                            m("i.icofont-prescription"),
                            m("span",
                                " Evoluciones "
                            )
                        ]),
                        m("a.nav-link[data-toggle='pill'][href='#v-pills-lab'][role='tab']", [
                            m("i.icofont-laboratory"),
                            m("span",
                                " Laboratorio "
                            )
                        ]),
                        m("a.nav-link[data-toggle='pill'][href='#v-pills-imagen'][role='tab']", [
                            m("i.icofont-file-image"),
                            m("span",
                                " Imagen "
                            )
                        ]),
                        m("a.nav-link", {
                            href: "/#!/pacientes"

                        }, [
                            m("i.icofont-circled-left"),
                            m("span",
                                " Mis Pacientes "
                            )
                        ])
                    ])
                ])
            ),
        ]

    },
}


const DetalleClinico = {
    ver: true,
    eliminar: false,
    editar: false,
    labelOperation: "Detalle:",
    oninit: () => {
        DetallePaciente.fetch();
    },
    view: () => {
        return DetallePaciente.error ? [
            m(".alert.alert-danger[role='alert']",
                DetallePaciente.error
            )
        ] : DetallePaciente.data.length !== 0 ? [
            m("section.m-bg-1.intro-area.type-1.position-relative", [
                m("div.intro-overlay.position-absolute.set-bg", {
                    "style": {
                        "background-position": "center center",
                        "background-size": "cover",
                        "background-repeat": "no-repeat",
                        "background-image": 'url(\"/assets/images/intro-bg.jpg\")',
                    }
                }),
                m("div.overlay"),
                m("div.container",
                    m("div.row", [
                        m(DetallePaciente),
                        m("div.col-md-8",
                            m("div.tab-content.m-pt-140.m-pb-140.", [
                                m(SignosVitales),
                                m(Evoluciones),
                                m(Laboratorio),
                                m(Imagen)
                            ])

                        )
                    ])
                )
            ])
        ] : m(Loader)
    }
}


const Paciente = {
    nhc: null,
    oninit: (_data) => {
        Paciente.nhc = _data.attrs.nhc + "01";
        if (!Auth.isLogin()) {
            return m.route.set('/auth');
        }
    },
    oncreate: () => {
        document.title = "Paciente NHC: " + Paciente.nhc + " | " + App.title;
        _Main()
    },
    view: () => {

        if (VisorRis.show.length === 0) {
            return [
                m(HeaderPrivate),
                m(DetalleClinico)
            ];
        } else {
            return [
                m(VisorRis)
            ];
        }

    },

};



function _Main() {

    //Global Variables
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();

    //Document Ready
    //Counter up
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    $('.section-wave').each(function() {

        var self = $(this);

        $(this).waypoint({
            offset: '85%',
            handler: function() {
                self.addClass('active')
            }
        });
    })

    //Dynamic sticky Menu

    var sitckyHeader = $('.navbar-sticky');
    if (sitckyHeader.length > 0) {
        var navOffset = $('.navbar-sticky').offset().top;
        $(window).on('scroll', function() {
            var $cloneNav = $('.navbar-sticky').clone(true);
            $cloneNav.addClass('sticky-active');
            if ($(this).scrollTop() > navOffset) {
                if ($(document).find('.sticky-active').length < 1) {
                    $('.navbar-sticky').not('.sticky-active').css({
                        visibility: 'hidden',
                        opacity: 0
                    });
                    $('header').append($cloneNav);
                    $cloneNav.show('slow');
                } else {

                }
            } else {
                $('.navbar-sticky').not('.sticky-active').css({
                    visibility: 'visible',
                    opacity: 1
                });
                $('.sticky-active').remove();
            }
        });
    }


    //Anime js
    $('.ml12').each(function() {
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });

    anime.timeline({
            loop: false
        })
        .add({
            targets: '.ml12 .letter',
            translateX: [40, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1200,
            delay: function(el, i) {
                return 500 + 30 * i;
            },
            complete: function() {
                anime({
                    targets: '.ml12 .letter',
                    opacity: 1,
                    duration: 1000,
                });
            }
        });


    anime.timeline({ loop: false })
        .add({
            targets: '.ml15 .word',
            scale: [2, 1],
            opacity: [0, 1],
            easing: "easeOutCirc",
            duration: 800,
            delay: function(el, i) {
                return 800 * i;
            },
            complete: function() {
                anime({
                    targets: '.ml15 .word',
                    opacity: 1,
                    duration: 1000,
                });
            }
        });


    /* ----------------------------------
    ----------------------------------*/
    $('.doctors-slider').slick({
        slidesToScroll: 1,
        slidesToShow: 3,
        dots: true,
        infinite: true,
        centerMode: true,
        autoplay: true,
        autoplaySpeed: 2000,
        centerPadding: '0px',
        arrows: false,
        responsive: [{
                breakpoint: 992,
                settings: {
                    centerMode: false,
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    centerMode: false,
                    slidesToShow: 2

                }
            },
            {
                breakpoint: 577,
                settings: {
                    autoplay: true,
                    centerMode: false,
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 300,
                settings: {
                    autoplay: false,
                    centerMode: false,
                    slidesToShow: 1
                }
            }
        ]

    });
    //Testimonial slider
    $('.testimonial-slider2').slick({
        slidesToScroll: 1,
        slidesToShow: 1,
        dots: true,
        infinite: true,
        arrows: false

    });
    //Partner Slider
    $('.partner-slider').slick({
        slidesToScroll: 1,
        slidesToShow: 5,
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 1
                }
            }
        ]

    });
    //
    $('.testimonial-slider').slick({
        slidesToScroll: 1,
        slidesToShow: 2,
        dots: true,
        infinite: true,
        arrows: false,
        responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 1
                }
            }
        ]

    });

    // Department Carousel


    //Set background image for WordPress
    $(".set-bg").each(function() {
        var thesrc = $(this).attr('data-bg');
        $(this).css("background-image", "url(" + thesrc + ")");
        $(this).css("background-position", "center");
        $(this).css("background-size", "cover");
        $(this).css("background-repeat", "no-repeat");
        $(this).removeAttr('data-bg');
    });
    //Date Picker
    $(".datepicker").datepicker({
        dateFormat: 'yy-mm-dd',
    });
    //Select-2
    $('.js-example-basic-single').select2();

    // Convert All Image to SVG
    $('img.svg').each(function() {
        var $img = $(this),
            imgID = $img.attr('id'),
            imgClass = $img.attr('class'),
            imgURL = $img.attr('src');

        $.get(imgURL, function(data) {
            var $svg = $(data).find('svg');
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass);
            }
            $svg = $svg.removeAttr('xmlns:a');
            $img.replaceWith($svg);
        }, 'xml');

    });

    //Burget Menu
    $('.burger_menu').on('click', function(e) {
        e.preventDefault();
        if (isMobile) {
            moileMenu()
        } else {

        }
        $(this).toggleClass('is-open');
        $('.bcbd_collpase_nav').toggleClass('show_clmenu');
        $('.bcbd_navbar').toggleClass('activeMobileMenu');
        $('.bcbd_nav').find('.opendp').removeClass('opendp');
        $('.bcbd_nav').children('.hs_dropdown').find('.mega-menu').slideUp();
        $('.bcbd_nav').children('.hs_dropdown').find('.bcbd_dropdown').slideUp();
        $('body').toggleClass("mobileMenuOpen");
        if ($('body').hasClass("mobileMenuOpen")) {
            $('body').css('overflowY', 'hidden');

        } else {
            $('body').css({
                overflow: 'visible',
                height: '100%'
            });
        }
    });

    //For drop down navigation
    $('.hs_dropdown > a').on('click', function(e) {
        var hash = this.hash;
        if ($(this).attr('href') != '' || hash) {
            e.preventDefault();
            e.stopPropagation();
        } else {

        }

    });

    var wWidth = $(window).width();
    var isMobile = wWidth < 992;
    $(window).on('resize', function() {
        wWidth = $(window).width();
        isMobile = wWidth < 992;
        if (wWidth >= 992) {
            $('.mega-menu').show();
            $('.bcbd_dropdown').show();
        }
    });

    function moileMenu() {
        $('.hs_dropdown').on('click', function(ev) {
            //ev.preventDefault();
            ev = window.event || ev;
            ev.stopPropagation();
            if ($(this).parents('.bcbd_collpase_nav').hasClass('show_clmenu')) {
                $(this).children('ul').stop().slideToggle();
                $(this).siblings('.hs_dropdown').children('ul').stop().slideUp();
                $(this).siblings('.hs_dropdown').children('.mega-menu ').stop().slideUp();
                $(this).toggleClass('opendp');
                $(this).siblings('.hs_dropdown').children('.mega-menu').find('.opendp').children('.bcbd_dropdown').stop().slideUp();
                $(this).siblings('.hs_dropdown').children('.mega-menu').find('.opendp ').removeClass('opendp')
                $(this).siblings('.hs_dropdown').removeClass('opendp');

                if ($(this).children('.mega-menu ')) {
                    $(this).children('.mega-menu ').stop().slideToggle();

                }
            }

        });
    }


    //ripple Effect
    $(".banenr").on('click', function(e) {

        // Remove any old one
        $(".ripple").remove();

        // Setup
        var posX = $(this).offset().left,
            posY = $(this).offset().top,
            buttonWidth = $(this).width(),
            buttonHeight = $(this).height();

        // Add the element
        $(this).prepend("<span class='ripple'></span>");


        // Make it round!
        if (buttonWidth >= buttonHeight) {
            buttonHeight = buttonWidth;
        } else {
            buttonWidth = buttonHeight;
        }

        var x = e.pageX - posX - buttonWidth / 2;
        var y = e.pageY - posY - buttonHeight / 2;

        $(".ripple").css({
            width: buttonWidth,
            height: buttonHeight,
            top: y + 'px',
            left: x + 'px'
        }).addClass("rippleEffect");
    })

    //scroll top
    var documentHeight = $(document).height();
    var scrollableHeight = documentHeight / 1.70;
    $('.scroll-top').hide();
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > scrollableHeight) {
            $('.scroll-top').show();
        } else {
            $('.scroll-top').hide();
        }
    });
    $('.scroll-top').on('click', function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });

    //Venobox
    $('.venobox').venobox();
    //Check Content block children
    $('.content-block').each(function(index, el) {
        if ($(this).children().length > 0) {
            $(this).addClass('has-content')
        }
    });


    /* ----------------------------------
    ----------------------------------*/
    $(document).on('mouseup', function(e) {
        var container = $(".nav_outer,.burger_menu");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('.burger_menu').removeClass('is-open');
            $('.bcbd_navbar').removeClass('activeMobileMenu');
            $('body').removeClass('mobileMenuOpen');
            $('.bcbd_collpase_nav').removeClass('show_clmenu');
        }
    });


    // Makin Wp Frindly Parallax image

    $('.parallax-window').each(function() {
        var image = $(this).attr('data-bg');
        $(this).parallax({
            imageSrc: image
        });
    });


    //Mouse Move
    $(window).on('load', function() {
        var wrapper = document.querySelector('.banenr.type-2');
        if ($('.banenr.type-2').length > 0) {
            var layerOne = document.querySelector('.inner-image');
            wrapper.addEventListener('mousemove', function(e) {
                var pageX = e.clientX,
                    pageY = e.clientY;
                layerOne.style.webkitTransform = 'translateX(' + pageX / 250 + '%) translateY(' + pageY / 250 + '%)';
                layerOne.style.transform = 'translateX(' + pageX / 250 + '%) translateY(' + pageY / 250 + '%)';

            });
        }
    });

    //Windows Load
    $(window).on('load', function() {
        var wrapper = document.querySelector('.banenr.type-4');
        if ($('.banenr.type-4').length > 0) {
            var layerOne = document.querySelector('.logo-box');
            var layerTwo = document.querySelector('.banenr.type-4 h5');
            var layerThree = document.querySelector('.banenr.type-4  .btn');
            var layerFour = document.querySelector('.banenr.type-4  h1');
            var layerFive = document.querySelector('.banenr.type-4  .no-border');
            wrapper.addEventListener('mousemove', function(e) {
                var pageX = e.clientX,
                    pageY = e.clientY;
                layerOne.style.webkitTransform = 'translateX(' + pageX / 240 + '%) translateY(' + pageY / 40 + '%)';
                layerOne.style.transform = 'translateX(' + pageX / 240 + '%) translateY(' + pageY / 40 + '%)';

                layerTwo.style.webkitTransform = 'translateX(' + pageX / 240 + '%) translateY(' + pageY / 40 + '%)';
                layerTwo.style.transform = 'translateX(' + pageX / 240 + '%) translateY(' + pageY / 40 + '%)';

                layerThree.style.webkitTransform = 'translateX(' + pageX / 240 + '%) translateY(' + pageY / 40 + '%)';
                layerThree.style.transform = 'translateX(' + pageX / 240 + '%) translateY(' + pageY / 40 + '%)';

                layerFour.style.webkitTransform = 'translateX(' + pageX / 200 + '%) translateY(' + pageY / 40 + '%)';
                layerFour.style.transform = 'translateX(' + pageX / 240 + '%) translateY(' + pageY / 40 + '%)';

                layerFive.style.webkitTransform = 'translateX(' + pageX / 200 + '%) translateY(' + pageY / 40 + '%)';
                layerFive.style.transform = 'translateX(' + pageX / 240 + '%) translateY(' + pageY / 40 + '%)';

                wrapper.style = 'background-position:' + pageX / 100 + 'px' + ' ' + pageY / 40 + 'px';

            });
        }
    });
    //Check height for Banner



    $(window).on('load', function() {
        if (windowHeight <= 800) {
            $('.banenr.type-4 .banner-inner').each(function(index, el) {
                $(this).addClass('full-height');
            });
            $('.reversed-margin.appoint-area').each(function(index, el) {
                $(this).addClass('low-banner-height');
            });
        } else {
            $('.reversed-margin.appoint-area').removeClass('low-banner-height');
        }
        // isotop initialize
        $('.pricing-grid').isotope({
            itemSelector: '.grid-item',
            filter: '.monthly'

        });

        $('.pricing-filter li').on('click', function() {
            $(this).addClass('active').siblings().removeClass('active');
            var filterValue = $(this).attr('data-filter');
            $('.grid').isotope({
                filter: filterValue
            });
        });


        var grid = $('.grid');
        if (grid.length > 0) {
            grid.each(function(index, el) {
                $('.grid').isotope({
                    itemSelector: '.grid-item'

                });

                $('.filter li').on('click', function() {
                    $(this).addClass('active').siblings().removeClass('active');
                    var filterValue = $(this).attr('data-filter');
                    $('.grid').isotope({
                        filter: filterValue
                    });
                });

            });
        }
    })


    // Content schedule
    $(window).on("load resize scroll", function(e) {
        $('.content-block').each(function() {
            if ($(this).children('div').length > 0) {

            } else {
                $(this).addClass('no-schedule')
            }
        });
    });


}






export default Paciente;