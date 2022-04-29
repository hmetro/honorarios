const HeadPublic = {
    view: () => {
        return [
            m("header.default.heade-sticky", [
                m("div.un-title-page.go-back", [
                    m("a.icon[href='/']",
                        m("img[src='images/favicon.ico'][alt='HM'][width='50%']")
                    ),
                    m("h1")
                ]),
                m("div.un-block-right",
                    m("a.btn.nav-link.text-primary.size-14.weight-500.pe-0[href='/']",
                        "Hospital Metropolitano"
                    )
                )
            ]),
        ];
    },

};

export default HeadPublic;