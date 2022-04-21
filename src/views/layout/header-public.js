const HeadPublic = {
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

                m("div.navbar-right", [

                    m("a.btn.btn-buy[href='https://www.hospitalmetropolitano.org']", [
                        m("i[data-feather='shopping-bag']"),
                        m("span",
                            "Hospital Metropolitano"
                        )
                    ])
                ])
            ])
        ];
    },

};

export default HeadPublic;