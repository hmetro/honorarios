import Auth from '../../models/auth';
import App from '../app';
import Loader from '../loader';
import HeaderPrivate from '../layout/header-private';





const CuentaHonorarios = {
    codMedico: "",
    fechaDesde: "",
    fechaHasta: "",
    oninit: () => {
        Loader.show = "";
        Loader.buttonShow = "";
        CuentaHonorarios.codMedico = Auth.codMedico;
        CuentaHonorarios.fetch();
        if (!Auth.isLogin()) {
            return m.route.set('/auth');
        }
    },
    fetch: () => {


        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/h2/v1/mis-facturas-pendientes?typeFilter=1",
                headers: {
                    "Authorization": localStorage.accessToken,
                },
            })
            .then(function(result) {
                Loader.show = "d-none";
                Loader.buttonShow = "d-none";
                CuentaHonorarios.codMedico = result.codMedico;
            })
            .catch(function(e) {
                CuentaHonorarios.fetch();
            })
    },
    downloadEstadoCuenta: () => {

        window.location = 'https://api.hospitalmetropolitano.org/h2/v0/controlador/descarga_documentos/preparar_estado_cuenta.php?proveedor=' + CuentaHonorarios.codMedico + '&fecha_desde=' + CuentaHonorarios.fechaDesde + '&fecha_hasta=' + CuentaHonorarios.fechaHasta;
    },
    oncreate: () => {

        document.title = "Estado de Cuenta | " + App.title;
        submitBusqueda();
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
                                    "Estado de Cuenta "
                                ),
                                m("span.icon-section-wave.d-inline-block.text-active.section-wave.mt-3.active")
                            ])
                        )
                    ),
                    m("div.row.m-mt-30.m-mb-20",
                        m("div.col-md-12", [
                            m("div.d-flex.align-items-left.position-relative.justify-content-left", [

                                m("label",
                                    "Seleccione las fechas para su estado de cuenta:"
                                ),


                            ]),


                        ]),
                        m("div.input-group.banenr-seach.bg-white.m-mt-30.mb-0", [

                            m("input.form-control[type='date'][placeholder='Desde'][id='fechaDesde']", {
                                oninput: function(e) {
                                    CuentaHonorarios.fechaDesde = e.target.value;
                                },
                                value: CuentaHonorarios.fechaDesde,
                            }),
                            m("input.form-control[type='date'][placeholder='Desde'][id='fechaDesde']", {
                                oninput: function(e) {
                                    CuentaHonorarios.fechaHasta = e.target.value;
                                },
                                value: CuentaHonorarios.fechaHasta,
                            }),
                            m("div.input-group-append",

                                m("button.btn[type='button'][id='actDescargarEC']", {
                                        onclick: () => {
                                            console.log(CuentaHonorarios)
                                            CuentaHonorarios.downloadEstadoCuenta();
                                        },
                                    },
                                    "Descargar"
                                ),

                            )
                        ]),

                    ),
                    m("div.row.m-pt-20.m-pb-60.m-mt-20", [
                        m("div.col-12.pd-r-0.pd-l-0.pd-b-20",

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


export default CuentaHonorarios;