import Auth from '../../models/auth';
import App from '../app';


const iPaciente = {
    view: (_data) => {
        return [

            m("article.blog.pb-5.type-1", [
                m("div", [
                    m("div", [
                        m("text-default.mr-3.fz-poppins", [
                            m("span",
                                m("i.icofont-ui-clock")
                            ),
                            " Ingreso: " + _data.attrs.FECHA_ADMISION
                        ]),
                        m("text-default.fz-poppins.mr-3", [
                            m("span",
                                m("i.icofont-user")
                            ),
                            " Edad:  " + _data.attrs.EDAD + " Años"
                        ])

                    ]),
                    m("a.display-block", {
                            href: "#!/paciente/" + _data.attrs.HC
                        },
                        m("h3.semi-bold.mb-4.mt-1.text-dark",
                            _data.attrs.NOMBRE_PACIENTE
                        )
                    ),
                    m("div.d-flex.align-items-end.justify-content-between.inline-flex", [
                        m("div.media.d-inline-flex", [
                            m("div.media-body", [
                                m("span.fz-poppins.text-primary",
                                    " Emergencia "
                                ),
                                m("p.fz-poppins.mb-0",
                                    _data.attrs.NRO_HABITACION + ", Especialidad: " + _data.attrs.ESPECIALIDAD
                                ),
                                m("p.fz-poppins.mb-0",
                                    "Dg: " + _data.attrs.DG_PRINCIPAL
                                )
                            ])
                        ]),
                        m("a.d-inline-block.fz-poppins.text-default", {
                                href: "#!/paciente/" + _data.attrs.HC
                            },
                            " Ver Paciente "
                        )
                    ])
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
                        m("span.icon-section-wave.d-inline-block.text-active.mt-3.")
                    )
                )
            ),
            m("section.m-bg-1",
                m("div.container",
                    m("div.row",
                        m("div.col-md-6.offset-md-3",
                            m("div.text-center.m-mt-70", [
                                m("h2.m-0.text-dark",
                                    "Mis Pacientes "
                                ),
                            ])
                        )
                    ),
                    m("div.row.m-pt-20.m-pb-60.m-mt-70", [
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
            sZeroRecords: "Todavía no tienes resultados disponibles.",
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
                mRender: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                visible: false,
                aTargets: [0],
                orderable: false,
            },
            {
                mRender: function(data, type, full) {
                    return full.FECHA_ADMISION;
                },
                visible: false,
                aTargets: [1],
                orderable: false,

            },
            {
                mRender: function(data, type, full) {
                    return full.NOMBRE_PACIENTE;

                },
                visible: false,
                aTargets: [2],
                orderable: false,

            },
            {
                mRender: function(data, type, full) {
                    return "";
                },
                visible: true,
                aTargets: [3],
                width: "100%",
                orderable: false,

            },

        ],
        fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

        },
        drawCallback: function(settings) {
            $(".preloader").hide();
            $(".container").show();
            settings.aoData.map(function(_i) {
                m.mount(_i.anCells[3], { view: function() { return m(iPaciente, _i._aData) } });
            })

        },
    }).on('xhr.dt', function(e, settings, json, xhr) {
        // Do some staff here...
        $('.preloader').hide();
        $('.container').show();
        //   initDataPicker();
    }).on('page.dt', function(e, settings, json, xhr) {
        // Do some staff here...
        $('.preloader').show();
        $('.container').hide();

    });

    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity
    });


    $('#button-buscar-t').click(function(e) {
        e.preventDefault();
        $('.table-loader').show();
        $('.table-content').hide();
        table.search($('#_dt_search_text').val()).draw();
    });
    $('#filtrar').click(function(e) {
        e.preventDefault();
        $('.table-loader').show();
        $('.table-content').hide();
        table.search('fechas-' + $('#desde').val() + '-' + $('#hasta').val()).draw();
    });

    $('#resetTable').click(function(e) {
        e.preventDefault();
        $('#_dt_search_text').val('');
        $('#desde').val('');
        $('#hasta').val('');
        table.search('').draw();
    });

    return table;

}


export default PagePacientes;