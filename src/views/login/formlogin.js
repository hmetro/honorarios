import Auth from '../../models/auth';

const FormLogin = {

    view: () => {

        return [
            m("section.m-pt-10.m-pb-90.m-bg-1",
                m("div.container",
                    m("div.row",
                        m("div.col-md-6.offset-md-3",
                            m("div.text-center.m-mt-70", [

                                m("h2.m-0.text-dark",
                                    "Entrar "
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