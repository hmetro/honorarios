import Loader from '../loader';


const Page = {
    oncreate: () => {
        document.onkeypress = function(e) {
            if (!e) e = window.event;
            var keyCode = e.keyCode || e.which;
            if (keyCode == "13") {
                return Page.alertP();
            }
        };
    },
    view: () => {
        return [
            m("div.content.content-fixed.content-auth",
                m("div.container",
                    m("div.media.align-items-stretch.justify-content-center.ht-100p.pos-relative", [
                        m("div.media-body.align-items-center.d-none.d-lg-flex", [
                            m("div.mx-wd-600",
                                m("img.img-fluid[src='assets/dashforge/img/img15.png'][alt='']")
                            ),

                        ]),
                        m("div.sign-wrapper.mg-lg-l-50.mg-xl-l-60",
                            m("div.wd-100p", [
                                m("h3.tx-color-01.mg-b-5",
                                    "Entrar"
                                ),
                                m("p.tx-color-03.tx-16.mg-b-40",
                                    "¡Bienvenido! Por favor, inicia sesión para continuar."
                                ),
                                m("div.form-group", [
                                    m("label",
                                        "Usuario o Correo electrónico:"
                                    ),
                                    m("input.form-control[type='email'][placeholder='mpaez o mpaez@hmetro.med.ec']")
                                ]),
                                m("div.form-group", [
                                    m("div.d-flex.justify-content-between.mg-b-5", [
                                        m("label.mg-b-0-f",
                                            "Contraseña:"
                                        ),
                                        m("a.tx-13[href='']",
                                            "Olvide mi contraseña?"
                                        )
                                    ]),
                                    m("input.form-control[type='password'][placeholder='Contraseña']")
                                ]),
                                m("button.btn.btn-brand-02.btn-block",
                                    "Entrar"
                                ),

                            ])
                        )
                    ])
                )
            )
        ];
    },
    alertP: () => {
        return [
            m.mount(document.body.querySelector('#app'), Loader),
            setTimeout(function() { m.route.set('/') }, 300)
        ];
    },
};



function customAlert() {
    // We don't want to add the class all the time, only the first time the element is created
    Page.alertP();

}



export default Page;