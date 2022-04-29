const Loader = {
    view: () => {
        return [
            m("section.loader-page[id='loaderPage']",
                m("div.spinner_flash")
            ),
        ];
    },
};

export default Loader;