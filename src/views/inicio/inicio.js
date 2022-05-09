import Auth from '../../models/auth';
import HeaderPrivate from '../layout/header-private';
<<<<<<< Updated upstream
import MenuPanel from '../menu/panel';
=======
import FooterPrivate from '../layout/footer-private';

>>>>>>> Stashed changes
import App from '../app';
import Loader from '../loader';



const Inicio = {
    oninit: () => {
        if (!Auth.isLogin()) {
            return m.route.set('/auth');
        }
    },
    oncreate: () => {
        document.title = "Inicio | " + App.title;
    },
    view: () => {
        return [
<<<<<<< Updated upstream
            m(HeaderPrivate),
            m(MenuPanel),
=======
            m("[id='wrapper']",
                m("[id='content']", [
                    m(HeaderPrivate),
                    m("div.space-sticky"),
                    m("div.un-title-default", [
                        m("div.text", [
                            m("h2",
                                "Mis Resultados"
                            ),
                            m("p",
                                "últimos resultados de mis pacientes."
                            )
                        ]),

                    ]),
                    m("section.unSwiper-cards.margin-t-20",
                        m("div.content-cards-NFTs.margin-t-20",
                            m("div.swiper.cardGradual", [
                                m("div.swiper-wrapper", [
                                    m("div.swiper-slide",
                                        m("div.item-card-gradual", [
                                            m("div.head-card.d-flex.justify-content-between.align-items-center", [
                                                m("div.creator-name", [
                                                    m("div.image-user", [
                                                        m("picture", [
                                                            m("source[srcset='images/avatar/5.webp'][type='image/webp']"),
                                                            m("img.img-avatar[src='images/avatar/5.png'][alt='']")
                                                        ]),
                                                        m("div.icon",
                                                            m("i.ri-checkbox-circle-fill")
                                                        )
                                                    ]),
                                                    m("h3",
                                                        "MARTIN FRANCISCO CHANG CHAVEZ"
                                                    )
                                                ]),
                                                m("div.btn-like-click",
                                                    m("div.btnLike", [
                                                        m("input[type='checkbox']"),
                                                        m("i.ri-heart-3-line")
                                                    ])
                                                )
                                            ]),
                                            m("a.body-card.py-0[href='page-collectibles-details.html']", [
                                                m("div.cover-nft", [
                                                    m("picture", [
                                                        m("source[srcset='images/rx.icon.jpg'][type='']"),
                                                        m("img.img-cover[src='images/rx.icon.jpg'][alt='']")
                                                    ]),
                                                    m("div.countdown-time",
                                                        m("span",
                                                            "IMAGEN"
                                                        )
                                                    )
                                                ]),
                                                m("div.title-card-nft", [
                                                    m("div.side-one", [
                                                        m("h2",
                                                            "RX DE TORAX"
                                                        ),
                                                        m("p",
                                                            "MEDICINA INTERNA"
                                                        )
                                                    ]),
                                                    m("div.side-other",
                                                        m("span.no-sales",
                                                            "09/05/2022"
                                                        )
                                                    )
                                                ])
                                            ]),
                                            m("div.footer-card", [
                                                m("div.starting-bad", [


                                                ]),
                                                m("button.btn.btn-md-size.bg-primary.text-white.rounded-pill[type='button']",
                                                    " Ver Resultado "
                                                )
                                            ])
                                        ])
                                    ),
                                    m("div.swiper-slide",
                                        m("div.item-card-gradual", [
                                            m("div.head-card.d-flex.justify-content-between.align-items-center", [
                                                m("div.creator-name", [
                                                    m("div.image-user", [
                                                        m("picture", [
                                                            m("source[srcset='images/avatar/5.webp'][type='image/webp']"),
                                                            m("img.img-avatar[src='images/avatar/5.png'][alt='']")
                                                        ]),
                                                        m("div.icon",
                                                            m("i.ri-checkbox-circle-fill")
                                                        )
                                                    ]),
                                                    m("h3",
                                                        "MARTIN FRANCISCO CHANG CHAVEZ"
                                                    )
                                                ]),
                                                m("div.btn-like-click",
                                                    m("div.btnLike", [
                                                        m("input[type='checkbox']"),
                                                        m("i.ri-heart-3-line")
                                                    ])
                                                )
                                            ]),
                                            m("a.body-card.py-0[href='page-collectibles-details.html']", [
                                                m("div.cover-nft", [
                                                    m("picture", [
                                                        m("source[srcset='images/lab.icon.jpg'][type='']"),
                                                        m("img.img-cover[src='images/lab.icon.jpg'][alt='']")
                                                    ]),
                                                    m("div.countdown-time",
                                                        m("span",
                                                            "LABORATORIO"
                                                        )
                                                    )
                                                ]),
                                                m("div.title-card-nft", [
                                                    m("div.side-one", [
                                                        m("h2",
                                                            "Examen"
                                                        ),
                                                        m("p",
                                                            "MEDICINA INTERNA"
                                                        )
                                                    ]),
                                                    m("div.side-other",
                                                        m("span.no-sales",
                                                            "09/05/2022"
                                                        )
                                                    )
                                                ])
                                            ]),
                                            m("div.footer-card", [
                                                m("div.starting-bad", [


                                                ]),
                                                m("button.btn.btn-md-size.bg-primary.text-white.rounded-pill[type='button']",
                                                    " Ver Resultado "
                                                )
                                            ])
                                        ])
                                    ),

                                ]),
                                m("div.swiper-button-next"),
                                m("div.swiper-button-prev"),
                                m("section.margin-t-20.unList-bestSeller", [
                                    m("div.un-title-default", [
                                        m("div.text", [
                                            m("h2",
                                                "Mis Pacientes"
                                            ),
                                            m("p",
                                                "Emergencia/Hospitalización"
                                            )
                                        ]),
                                        m("div.un-block-right",
                                            m("a.icon-back[href='page-best-seller.html'][aria-label='iconBtn']",
                                                m("i.ri-arrow-drop-right-line")
                                            )
                                        )
                                    ]),
                                    m("div.content-list-sellers",
                                        m("ul.nav.flex-column", [
                                            m("li.nav-item",
                                                m("div.nav-link.item-user-seller", [
                                                    m("a.item-user-img[href='page-creator-profile.html']", [
                                                        m("picture", [
                                                            m("source[srcset='images/avatar/22.webp'][type='image/webp']"),
                                                            m("img.avt-img[src='images/avatar/22.jpg'][alt='']")
                                                        ]),
                                                        m("div.txt-user", [
                                                            m("h5", [
                                                                " 541256 ",
                                                                m("span",
                                                                    "NHC"
                                                                )
                                                            ]),
                                                            m("p", [
                                                                "29 Años - Piso C2",
                                                            ]),
                                                            m("p", [
                                                                "MARTIN FRANCISOC CHANG CHAVEZ ",
                                                                m("i.ri-checkbox-circle-fill")
                                                            ])
                                                        ])
                                                    ]),

                                                ])
                                            ),
                                            m("li.nav-item",
                                                m("div.nav-link.item-user-seller", [
                                                    m("a.item-user-img[href='page-creator-profile.html']", [
                                                        m("picture", [
                                                            m("source[srcset='images/avatar/22.webp'][type='image/webp']"),
                                                            m("img.avt-img[src='images/avatar/22.jpg'][alt='']")
                                                        ]),
                                                        m("div.txt-user", [
                                                            m("h5", [
                                                                " 541256 ",
                                                                m("span",
                                                                    "NHC"
                                                                )
                                                            ]),
                                                            m("p", [
                                                                "29 Años - Piso C2",
                                                            ]),
                                                            m("p", [
                                                                "MARTIN FRANCISOC CHANG CHAVEZ ",
                                                                m("i.ri-checkbox-circle-fill")
                                                            ])
                                                        ])
                                                    ]),

                                                ])
                                            ),

                                        ])
                                    )
                                ])

                            ])
                        )
                    ),
                ]),
                m(FooterPrivate),
            ),
>>>>>>> Stashed changes
        ];
    },

};

export default Inicio;