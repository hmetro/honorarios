import Auth from '../../models/auth';

const FormLogin = {

    view: () => {

        return [
            m("section.m-pt-10.m-pb-90.m-bg-1",
                m("div.container",
                    m("div.row",
                        m("div.col-md-6.offset-md-3",
                            m("div.text-center.m-mt-70", [

<<<<<<< Updated upstream
                                m("h2.m-0.text-dark",
                                    "Entrar "
=======
                        ]),
                        m("div.dividar_or",
                            m("span",
                                "v4.0.0"
                            )
                        ),
                        m("div.content__form.margin-t-24",
                            m("form", [
                                m("div.form-group.icon-left", [
                                    m("label",
                                        "Usuario o correo electrónico:"
                                    ),
                                    m("div.input_group", [
                                        m("input.form-control[type='email'][placeholder='mperez o mperez@hmetro.med.ec'][required]", {
                                            oninput: function(e) { Auth.setUsername(e.target.value) },
                                            value: Auth.username,
                                        }),
                                        m("div.icon",
                                            m("i.ri-user-line")
                                        )
                                    ])
                                ]),
                                m("div.form-group.icon-left", [
                                    m("label",
                                        "Contraseña:"
                                    ),
                                    m("div.input_group", [
                                        m("input.form-control[type='password'][placeholder='Contraseña'][required]", {
                                            oninput: function(e) { Auth.setPassword(e.target.value) },
                                            value: Auth.password,
                                        }),
                                        m("div.icon",
                                            m("i.ri-lock-password-line")
                                        )
                                    ]),
                                    m("a.text-primary.size-13.margin-t-14.d-block.text-decoration-none.weight-500[href='recuperar-contraseña']",
                                        "¿Olvido su contraseña?"
                                    )
                                ]),
                                m("section.copyright-mark",
                                    m("div.content", [
                                        m("img.logo-gray[src='images/logo-hm.svg'][alt='HM']"),
                                    ]),
                                    m("div.content", [
                                        m("img.logo-gray[src='images/jci.png'][alt='HM']"),
                                        m("img.logo-gray[src='images/14_america_1.png'][alt='HM']"),
                                        m("img.logo-gray[src='images/planetree.png'][alt='HM']"),
                                        m("p",
                                            "©" + new Date().getFullYear() + " - Todos los derechos reservados."
                                        )
                                    ])
>>>>>>> Stashed changes
                                ),
                                m("p.m-mt-10",
                                    "¡Bienvenido! Por favor inicia sesión para continuar."
                                )
                            ])
                        )
                    ),
                    m("div.row",
                        m("div.col-md-12",
                            m("div." + Auth.statusHide + ".alert.alert-solid.response.alert-" + Auth.statusError + "[role='alert']",
                                Auth.messageError
                            ),
                            m("div.input-group.banenr-seach.bg-white.m-mt-40.mb-0", [
                                m("input.form-control[type='text'][placeholder='Usuario']", {
                                    oninput: function(e) { Auth.setUsername(e.target.value) },
                                    value: Auth.username,
                                    disabled: Auth.imputDisabled,
                                }),
                            ]),
                            m("div.input-group.banenr-seach.bg-white.m-mt-20.mb-0", [
                                m("input.form-control[type='password'][placeholder='Contraseña']", {
                                    oninput: function(e) { Auth.setPassword(e.target.value) },
                                    value: Auth.password,
                                    disabled: Auth.imputDisabled,
                                }),
                                m("div.input-group-append",
                                    m("button.btn[type='button']", {
                                            disabled: !Auth.canSubmit() || Auth.imputDisabled,
                                            onclick: Auth.login
                                        },
                                        "Entrar"
                                    )
                                )
                            ])
                        ),

                    )
                )
            ),

        ];
    },

};



export default FormLogin;