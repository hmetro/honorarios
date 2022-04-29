import Auth from '../../models/auth';

const FooterPublic = {
    _disabled: "disabled",
    classDisabled: () => {
        if (!Auth.canSubmit() || Auth.imputDisabled) {
            return 'disabled';
        } else {
            return '';
        }
    },
    view: () => {
        return [
            m("footer.footer-account",
                m("div.env-pb", [
                    m("div.display-actions.text-center",
                        m("btn.btn-sm-arrow.bg-primary " + classDisabled(), {
                            disabled: !Auth.canSubmit() || Auth.imputDisabled,
                            onclick: Auth.login
                        }, [
                            m("p",
                                "Entrar"
                            ),
                            m("div.ico",
                                m("i.ri-arrow-drop-right-line")
                            )
                        ])
                    ),
                    m("div.dividar"),
                    m("div.support",
                        m("p", "¿Necesita ayuda? "),
                        m("p", [
                            m("a[href='page-help.html']",
                                "Contacta con nuestro equipo de soporte"
                            )
                        ])
                    )

                ])
            )
        ];
    },

};

export default FooterPublic;