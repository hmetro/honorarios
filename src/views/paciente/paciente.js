import Auth from '../../models/auth';
import HeaderPrivate from '../layout/header-private';
import App from '../app';
import m from 'mithril';
import Loader from '../loader';

const Formulario = {
    data: [],
    detalle: [],
    error: "",
    showFor: "",
    view: () => {
        return [
            m(".tab-pane.fade", [
                m("h4.m-text-2.",
                    m("i.icofont-heart-beat.mr-2"),
                    "Formulario: HOJA 005:"
                ),
                m("h6.text-light-dark.ff-roboto.pb-40.mb-0",
                    "Hospital Metropolitano"
                ),

                m("div.row.p-1",
                    m("iframe[src='//beta.metrovirtual.hospitalmetropolitano.org/touch/formulario?NHCL=478501&amp;ADM=9702&amp;FOR=005']", { "style": { "border": "none" } })
                )
            ])
        ]

    },
}

const Evoluciones = {
    data: [],
    detalle: [],
    error: "",
    showFor: "",
    view: () => {
        return [
            m(".tab-pane.fade[id='v-pills-ev'][role='tabpanel']", [
                m("h4.m-text-2.",
                    m("i.icofont-heart-beat.mr-2"),
                    "Evoluciones y Prescripciones:"
                ),
                m("h6.text-light-dark.ff-roboto.pb-40.mb-0",
                    "Hospital Metropolitano"
                ),

                m("div.row.p-1",
                    m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.",
                        m("table.table.table-sm[width='100%']", { "style": { "width": "100%", "border-color": "transparent", "margin-bottom": "50px" } }, [
                            m("tbody",
                                m("tr.odd[role='row']", { "style": { "background-color": "transparent" } },
                                    m("td", { "style": { "border-color": "transparent", "padding": "0px" } },
                                        m("div.row.bg-white.radius-5.p-2.article-tags", [
                                            m("div.col-lg-6.p-2", [
                                                m("span",
                                                    " Formulario: HOJA 005 "
                                                )
                                            ]),
                                            m("div.col-lg-6.p-2.text-xl-right",
                                                m("button.capsul.fz-poppins.text-default.radius-pill.active", {
                                                    onclick: () => {
                                                        Evoluciones.showFor = "d-none";
                                                    },
                                                    "style": { "cursor": "pointer" }
                                                }, [
                                                    m("i.icofont-file-alt"),
                                                    " Ver Formulario "
                                                ])
                                            )
                                        ])
                                    )
                                )
                            )
                        ])
                    )
                )
            ])
        ]

    },
}

const SignosVitales = {
    data: [],
    detalle: [],
    error: "",
    oninit: () => {
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
            .then(function (result) {

            })
            .catch(function (e) {
                DetallePaciente.error = e.message;
            })
    },
    view: () => {
        return [
            m(".tab-pane.fade.active.show[id='v-pills-sv'][role='tabpanel']", [
                m("h4.m-text-2.", [
                    m("i.icofont-heart-beat.mr-2"),
                    "Signos Vitales:"
                ]

                ),
                m("h6.text-light-dark.ff-roboto.pb-40.mb-0",
                    "Hospital Metropolitano"
                ),
                m("p",
                    "Última información disponible. HIS MV."
                ),
                m("div.row",
                    m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.",
                        m("div.col-sm-10.offset-sm-1.col-md-6.offset-md-0.col-xl-6",
                            m("div.single-service.bg-white.type-3.radius-10.position-relative.service-wrapper.s-dp-1-3.h-dp-10-60.m-mb-50",
                                m("div.media",
                                    [
                                        m("div.service-circle.position-relative.mb-4.text-active.bg-white.rounded-circle.d-flex.align-items-center.justify-content-center.s-dp-1-3",
                                            m("span.icon-heart-beat.text-grad-1")
                                        ),
                                        m("div.media-body",
                                            [
                                                m("h4.text-dark2.mb-3.position-relative.pt-2",
                                                    "Presión Arterial"
                                                ),
                                                m("p.mb-4.text-default.d-inline-block.pt-2.fz-poppins.fz-40.text-Underline",
                                                    " 99/67 "
                                                )
                                            ]
                                        )
                                    ]
                                )
                            )
                        )
                    )
                )
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
            .then(function (result) {
                if (result.status) {
                    DetallePaciente.data = result.data;
                } else {
                    DetallePaciente.error = "No existe información disponible. La ubicación del paciente ya no es Emergencia.";
                }
            })
            .catch(function (e) {
                DetallePaciente.error = e.message;
            })
    },
    view: () => {
        return [
            m("div." + Evoluciones.showFor + ".col-md-4",
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
                        m("a.nav-link.active[data-toggle='pill'][href='#v-pills-sv'][role='tab'][aria-controls='v-pills-sv'][aria-selected='false']", [
                            m("i.icofont-heart-beat"),
                            m("span",
                                " Signos Vitales "
                            )
                        ]),
                        m("a.nav-link[data-toggle='pill'][href='#v-pills-ev'][role='tab'][aria-controls='v-pills-ev'][aria-selected='false']", [
                            m("i.icofont-prescription"),
                            m("span",
                                " Evoluciones "
                            )
                        ]),
                        m("a.nav-link[data-toggle='pill'][href='#v-pills-lab'][role='tab'][aria-controls='v-pills-lab'][aria-selected='false']", [
                            m("i.icofont-laboratory"),
                            m("span",
                                " Laboratorio "
                            )
                        ]),
                        m("a.nav-link[data-toggle='pill'][href='#v-pills-imagen'][role='tab'][aria-controls='v-pills-imagen'][aria-selected='false']", [
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
                m("div." + Evoluciones.showFor + ".intro-overlay.position-absolute.set-bg", {
                    "style": {
                        "background-position": "center center",
                        "background-size": "cover",
                        "background-repeat": "no-repeat",
                        "background-image": 'url(\"/assets/images/intro-bg.jpg\")',
                    }
                }),
                m("div." + Evoluciones.showFor + ".overlay"),
                m("div.container",
                    m("div.row", [
                        m(DetallePaciente),
                        m("div.col-md-8",
                            m("div.tab-content.m-pt-140.m-pb-140.", [
                                m(SignosVitales),
                                m(Evoluciones)
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
        console.log("_data", _data)
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
        return [
            m(HeaderPrivate),
            m(DetalleClinico)
        ];
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

    $('.section-wave').each(function () {

        var self = $(this);

        $(this).waypoint({
            offset: '85%',
            handler: function () {
                self.addClass('active')
            }
        });
    })

    //Dynamic sticky Menu

    var sitckyHeader = $('.navbar-sticky');
    if (sitckyHeader.length > 0) {
        var navOffset = $('.navbar-sticky').offset().top;
        $(window).on('scroll', function () {
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
    $('.ml12').each(function () {
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
            delay: function (el, i) {
                return 500 + 30 * i;
            },
            complete: function () {
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
            delay: function (el, i) {
                return 800 * i;
            },
            complete: function () {
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
    $(".set-bg").each(function () {
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
    $('img.svg').each(function () {
        var $img = $(this),
            imgID = $img.attr('id'),
            imgClass = $img.attr('class'),
            imgURL = $img.attr('src');

        $.get(imgURL, function (data) {
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
    $('.burger_menu').on('click', function (e) {
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
    $('.hs_dropdown > a').on('click', function (e) {
        var hash = this.hash;
        if ($(this).attr('href') != '' || hash) {
            e.preventDefault();
            e.stopPropagation();
        } else {

        }

    });

    var wWidth = $(window).width();
    var isMobile = wWidth < 992;
    $(window).on('resize', function () {
        wWidth = $(window).width();
        isMobile = wWidth < 992;
        if (wWidth >= 992) {
            $('.mega-menu').show();
            $('.bcbd_dropdown').show();
        }
    });

    function moileMenu() {
        $('.hs_dropdown').on('click', function (ev) {
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
    $(".banenr").on('click', function (e) {

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
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > scrollableHeight) {
            $('.scroll-top').show();
        } else {
            $('.scroll-top').hide();
        }
    });
    $('.scroll-top').on('click', function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });

    //Venobox
    $('.venobox').venobox();
    //Check Content block children
    $('.content-block').each(function (index, el) {
        if ($(this).children().length > 0) {
            $(this).addClass('has-content')
        }
    });


    /* ----------------------------------
    ----------------------------------*/
    $(document).on('mouseup', function (e) {
        var container = $(".nav_outer,.burger_menu");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('.burger_menu').removeClass('is-open');
            $('.bcbd_navbar').removeClass('activeMobileMenu');
            $('body').removeClass('mobileMenuOpen');
            $('.bcbd_collpase_nav').removeClass('show_clmenu');
        }
    });


    // Makin Wp Frindly Parallax image

    $('.parallax-window').each(function () {
        var image = $(this).attr('data-bg');
        $(this).parallax({
            imageSrc: image
        });
    });


    //Mouse Move
    $(window).on('load', function () {
        var wrapper = document.querySelector('.banenr.type-2');
        if ($('.banenr.type-2').length > 0) {
            var layerOne = document.querySelector('.inner-image');
            wrapper.addEventListener('mousemove', function (e) {
                var pageX = e.clientX,
                    pageY = e.clientY;
                layerOne.style.webkitTransform = 'translateX(' + pageX / 250 + '%) translateY(' + pageY / 250 + '%)';
                layerOne.style.transform = 'translateX(' + pageX / 250 + '%) translateY(' + pageY / 250 + '%)';

            });
        }
    });

    //Windows Load
    $(window).on('load', function () {
        var wrapper = document.querySelector('.banenr.type-4');
        if ($('.banenr.type-4').length > 0) {
            var layerOne = document.querySelector('.logo-box');
            var layerTwo = document.querySelector('.banenr.type-4 h5');
            var layerThree = document.querySelector('.banenr.type-4  .btn');
            var layerFour = document.querySelector('.banenr.type-4  h1');
            var layerFive = document.querySelector('.banenr.type-4  .no-border');
            wrapper.addEventListener('mousemove', function (e) {
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



    $(window).on('load', function () {
        if (windowHeight <= 800) {
            $('.banenr.type-4 .banner-inner').each(function (index, el) {
                $(this).addClass('full-height');
            });
            $('.reversed-margin.appoint-area').each(function (index, el) {
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

        $('.pricing-filter li').on('click', function () {
            $(this).addClass('active').siblings().removeClass('active');
            var filterValue = $(this).attr('data-filter');
            $('.grid').isotope({
                filter: filterValue
            });
        });


        var grid = $('.grid');
        if (grid.length > 0) {
            grid.each(function (index, el) {
                $('.grid').isotope({
                    itemSelector: '.grid-item'

                });

                $('.filter li').on('click', function () {
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
    $(window).on("load resize scroll", function (e) {
        $('.content-block').each(function () {
            if ($(this).children('div').length > 0) {

            } else {
                $(this).addClass('no-schedule')
            }
        });
    });


}






export default Paciente;