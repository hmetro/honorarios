const Salir = {
    oncreate: () => {
        window.localStorage.removeItem('accessToken');
        return m.route.set('/inicio');
    },

    view: () => {

    },
};

export default Salir;