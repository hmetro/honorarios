<<<<<<< Updated upstream
const HeaderPrivate = {
    view: () => {
        return [
            m("header",

                m("div.toolbar",
                    m("div.container",
                        m("div.row", [
                            m("div.col-6",
                                m("a.logo.d-none.d-md-block[href='/']",
                                    m("img[alt='HM'][src='assets/images/logo-hm.svg']")
                                ),
                                m("a.mt-1.text-left.d-block.d-md-none[href='/']",
                                    m("img[alt='HM'][src='assets/images/logo-hm.svg']")
                                )
                            ),
                            m("div.col-6.text-right.d-none.d-md-block", [
                                m("a.bg-white.s-dp-1-3.d-inline-flex.text-active.btn-playStore[href='#!/mi-perfil']",
                                    m("div.media.align-items-center", [
                                        m("div.media-body", [
                                            m("p.m-0", [
                                                    m("span.icofont-doctor.fz-50.mr-2"),
                                                ],
                                                "Mi Perfil"
                                            ),
                                        ])
                                    ])
                                )
                            ]),
                            m("div.col-6.text-right.d-md-none", [
                                m("a.bg-white.s-dp-1-3.d-inline-flex.text-active.btn-playStore[href='#!/mi-perfil']",
                                    m("div.media.align-items-center", [
                                        m("div.media-body", [
                                            m("p.m-0", [
                                                    m("span.icofont-doctor.fz-50.mr-2"),
                                                ],
                                                "Mi Perfil"
                                            ),
                                        ])
                                    ])
                                )
                            ])
                        ])
                    )
                )
            )
=======
const HeadPrivate = {
    view: () => {
        return [
            m("header.default.heade-sticky", [
                m("a[href='index.html']",
                    m("div.un-item-logo", [
                        m("img.logo-img.light-mode[src='images/logo.metrovirtual.png'][alt=''][width='100%']"),
                        m("img.logo-img.dark-mode[src='images/logo.metrovirtual.png'][alt=''][width='100%']")
                    ])
                ),
                m("div.un-block-right", [
                    m("div.un-notification", [
                        m("a.visited[href='page-activity.html'][aria-label='activity']",
                            m("i.ri-notification-line")
                        ),
                        m("span.bull-activity")
                    ]),
                    m("div.un-user-profile",
                        m("a.visited[href='page-my-profile.html'][aria-label='profile']",
                            m("picture", [
                                m("source[srcset='images/avatar/11.webp'][type='image/webp']"),
                                m("img.img-avatar[src='images/avatar/11.jpg'][alt='']")
                            ])
                        )
                    ),
                    m("div.menu-sidebar",
                        m("button.btn[type='button'][name='sidebarMenu'][aria-label='sidebarMenu'][data-bs-toggle='modal'][data-bs-target='#mdllSidebar-connected']",
                            m("svg[xmlns='http://www.w3.org/2000/svg'][width='19'][height='9.3'][viewBox='0 0 19 9.3']",
                                m("g[id='Group_8081'][data-name='Group 8081'][transform='translate(-329 -37)']", [
                                    m("rect[id='Rectangle_3986'][data-name='Rectangle 3986'][width='19'][height='2.3'][rx='1.15'][transform='translate(329 37)'][fill='#222032']"),
                                    m("rect[id='Rectangle_3987'][data-name='Rectangle 3987'][width='19'][height='2.3'][rx='1.15'][transform='translate(329 44)'][fill='#222032']")
                                ])
                            )
                        )
                    )
                ])
            ])
>>>>>>> Stashed changes
        ];
    },

};

<<<<<<< Updated upstream
export default HeaderPrivate;
=======
export default HeadPrivate;
>>>>>>> Stashed changes
