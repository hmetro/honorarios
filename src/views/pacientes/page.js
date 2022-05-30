import Auth from '../../models/auth';
import App from '../app';


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
                        href: "https://beta.metrovirtual.hospitalmetropolitano.org/touch/pte/?nhc=" + _data.attrs.HC.slice(0, -2) + "&ticket=ST-66902-RSvjdifVCLOMpfz2vmCC-cas.example.org"
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
        if (!Auth.isLogin()) {
            return m.route.set('/auth');
        }
    },
    oncreate: () => {
        document.title = "Mis Pacientes | " + App.title;
        loadPacientes();
    },
    view: () => {
        return [
            m("div.preloader",
                m("div.preloader-inner",
                    m("div.loader-content",
                        m("span.icon-section-wave.d-inline-block.text-active.mt-3.", [
                            m("p.text-center.ff-roboto.m-mt-20.text-primary", "Procesando...")
                        ]),
                    ),

                ),



            ),

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
                                    m("input.form-control[type='text'][id='pte'][placeholder='Buscar por Apellidos y Nombres']", {
                                        oninput: function (e) { e.target.value = e.target.value.toUpperCase(); },

                                    }),
                                    m("div.input-group-append",
                                        m("button.btn[id='buscarPte'][type='button']",
                                            "Buscar"
                                        )
                                    )
                                ]),

                            ]))
                    ),
                    m("div.row.m-pt-20.m-pb-60.m-mt-20", [
                        m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.",
                            m("table.table.table-sm[id='table-pacientes'][width='100%']"),
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


function loadPacientes() {

    $(".preloader").show();
    $(".container").hide();

    // MOMMENT
    moment.lang("es", {
        months: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
            "_"
        ),
        monthsShort: "Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.".split(
            "_"
        ),
        weekdays: "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split(
            "_"
        ),
        weekdaysShort: "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
        weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),
    });

    $.fn.dataTable.ext.errMode = "none";
    var table = $("#table-pacientes").DataTable({
        "ajax": {
            headers: {
                "Authorization": localStorage.accessToken,
            },
            url: "https://api.hospitalmetropolitano.org/t/v1/mis-pacientes",
            dataSrc: "data",
            serverSide: true,
        },
        processing: true,
        serverSide: true,
        responsive: false,
        dom: 'tp',
        language: {
            searchPlaceholder: "Buscar...",
            sSearch: "",
            lengthMenu: "Mostrar _MENU_ registros por página",
            sProcessing: "Procesando...",
            sZeroRecords: "No existe resultados disponibles.",
            sEmptyTable: "Ningún dato disponible en esta tabla",
            sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
            sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
            sInfoPostFix: "",
            sUrl: "",
            sInfoThousands: ",",
            sLoadingRecords: "Cargando...",
            oPaginate: {
                sFirst: "Primero",
                sLast: "Último",
                sNext: "Siguiente",
                sPrevious: "Anterior",
            },
            oAria: {
                sSortAscending: ": Activar para ordenar la columna de manera ascendente",
                sSortDescending: ": Activar para ordenar la columna de manera descendente",
            },
        },
        cache: false,
        order: false,
        columns: false,
        aoColumnDefs: [{
            mRender: function (data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
            },
            visible: false,
            aTargets: [0],
            orderable: false,
        },
        {
            mRender: function (data, type, full) {
                return full.FECHA_ADMISION;
            },
            visible: false,
            aTargets: [1],
            orderable: false,

        },
        {
            mRender: function (data, type, full) {
                return full.NOMBRE_PACIENTE;

            },
            visible: false,
            aTargets: [2],
            orderable: false,

        },
        {
            mRender: function (data, type, full) {
                return "";
            },
            visible: true,
            aTargets: [3],
            width: "100%",
            orderable: false,

        },

        ],
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

        },
        drawCallback: function (settings) {
            $(".preloader").hide();
            $(".container").show();

            $("table").css("border-color", "transparent").css('margin-bottom', '50px');
            $("table").find("thead").css('display', 'none');

            $('.paginate_button').addClass('capsul fz-poppins active text-white radius-pill');

            settings.aoData.map(function (_i) {
                m.mount(_i.anCells[3], { view: function () { return m(iPaciente, _i._aData) } });
            })

        },
    }).on('xhr.dt', function (e, settings, json, xhr) {
        // Do some staff here...
        $('.preloader').hide();
        $('.container').show();
        //   initDataPicker();
    }).on('page.dt', function (e, settings, json, xhr) {
        // Do some staff here...
        $('.preloader').show();
        $('.container').hide();

    });


    $('#buscarPte').click(function (e) {
        e.preventDefault();
        $('.preloader').show();
        $('.container').hide();
        table.search($('#pte').val()).draw();
    });



    return table;

}


export default PagePacientes;