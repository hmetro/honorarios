const FooterPrivate = {
    view: () => {
        return [
            m("footer.un-bottom-navigation.filter-blur",
                m("div.em_body_navigation.border-0.-active-links", [
                    m("div.item_link",
                        m("a.btn.btn_navLink[href='#!/inicio'][aria-label='btnNavigation']", [
                            m("div.icon_current",
                                m("i.ri-home-5-line")
                            ),
                            m("div.icon_active",
                                m("i.ri-home-5-fill")
                            )
                        ])
                    ),
                    m("div.item_link",
                        m("a.btn.btn_navLink[href='#!/buscar'][aria-label='btnNavigation']", [
                            m("div.icon_current",
                                m("i.ri-search-2-line")
                            ),
                            m("div.icon_active",
                                m("i.ri-search-2-fill")
                            )
                        ])
                    ),
                    m("div.item_link",
                        m("button.btn.btn_navLink.without_active[type='button'][name='uploadItem'][aria-label='uploadItem'][data-bs-toggle='modal'][data-bs-target='#mdllUploadItem']",
                            m("div.btn.btnCircle_default",
                                m("i.ri-add-line")
                            )
                        )
                    ),
                    m("div.item_link",
                        m("a.btn.btn_navLink[href='#!/favoritos'][aria-label='btnNavigation']", [
                            m("div.icon_current",
                                m("i.ri-heart-3-line")
                            ),
                            m("div.icon_active",
                                m("i.ri-heart-3-fill")
                            )
                        ])
                    ),
                    m("div.item_link",
                        m("a.btn.btn_navLink[href='#!/mi-perfil'][aria-label='btnNavigation']", [
                            m("div.icon_current",
                                m("i.ri-user-4-line")
                            ),
                            m("div.icon_active",
                                m("i.ri-user-4-fill")
                            )
                        ])
                    )
                ])
            )
        ];
    },

};

export default FooterPrivate;