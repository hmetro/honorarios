import Auth from '../../models/auth';
import FooterPublic from '../layout/footer-public';
import HeaderPublic from '../layout/header-public';

const FormLogin = {
    view: () => {
        return [
            m("[id='wrapper']",
                m("[id='content']", [
                    m(HeaderPublic),
                    m("div.space-sticky"),
                    m("section.account-section.padding-20", [
                        m("div.connect-with-apps.margin-b-50", [
                            m("img[src='images/logo.metrovirtual.png'][alt='Metrovirtual']")
                        ]),
                        m("div.display-title", [
                            m("h1",
                                "¡Bienvenido!"
                            ),
                            m("p",
                                "Por favor inicia sesión para continuar. "
                            ),

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
                                            "©2022 - Todos los derechos reservados."
                                        )
                                    ])
                                ),

                            ])
                        )
                    ]),
                    m(FooterPublic)
                ])
            ),
        ];
    },

};





export default FormLogin;