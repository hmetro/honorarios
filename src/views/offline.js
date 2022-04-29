const Offline = {
    view: () => {
        return [
            m("div.d-flex.justify-content-center",
                m(".toast.status-connection[role='alert'][aria-live='assertive'][aria-atomic='true']")
            )
        ];
    },
};

export default Offline;