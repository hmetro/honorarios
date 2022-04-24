const HeaderPrivate = {
    labelInicio: '',
    view: () => {
        return [
            m("header.navbar.navbar-header.navbar-header-fixed", [
                m("a.burger-menu[href='#'][id='mainMenuOpen']",
                    m("i[data-feather='menu']")
                ),
                m("div.navbar-brand",
                    m("a.df-logo[href='/']", [
                        "Metro",
                        m("span",
                            "Q"
                        )
                    ])
                ),

                m(".navbar-menu-wrapper[id='navbarMenu']", [
                    m("div.navbar-menu-header", [
                        m("a.df-logo[href='../index.html']", [
                            "Metro",
                            m("span",
                                "Q"
                            )
                        ]),
                        m("a[id='mainMenuClose'][href='']",
                            m("i[data-feather='x']")
                        )
                    ]),
                    m("ul.nav.navbar-menu", [
                        m("li.nav-label.pd-l-20.pd-lg-l-25.d-lg-none",
                            "Menu"
                        ),
                        m("li.nav-item.active",
                            m("a.nav-link", {
                                href: "#!/inicio",
                                onclick: function (e) {
                                    return m.route.set('/inicio');
                                },
                            }, [
                                m("i[data-feather='archive']"),
                                " Inicio "
                            ])
                        ),


                        m("li.nav-item",
                            m("a.nav-link[href='../collections/']", [
                                m("i[data-feather='archive']"),
                                " Collections"
                            ])
                        )
                    ])
                ]),


            ])
        ];
    },

};

export default HeaderPrivate;