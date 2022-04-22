import App from '../views/app';


const Auth = {
    username: "",
    password: "",
    messageError: "",
    statusHide: " d-none",
    statusError: "warning",
    imputDisabled: false,

    setUsername: (value) => {
        Auth.username = value
    },
    setPassword: (value) => {
        Auth.password = value
    },
    canSubmit: () => {
        return Auth.username !== "" && Auth.password !== ""
    },
    setError: (message) => {
        Auth.statusHide = "";
        Auth.statusError = "danger";
        Auth.messageError = message;
    },
    setSuccess: (message) => {
        Auth.statusHide = "";
        Auth.statusError = "success";
        Auth.messageError = message;
    },
    setProcess: () => {
        Auth.statusHide = "";
        Auth.statusError = "warning";
        Auth.messageError = 'Procesando...';
    },
    login: () => {
        Auth.imputDisabled = true;
        Auth.setProcess();
        return m.request({
                method: "GET",
                url: "//app.hmetro.med.ec:8045/metrovirtual/api/auth",
            })
            .then(function(data) {
                Auth.username = data.status;
                window.localStorage.accessToken = data.status;
                Auth.setSuccess('Bienvenido');
                setTimeout(function() { App.isAuth() }, 900);
            }).catch(function(error) {
                Auth.setError('Error en API. No pudimos completar esta petición con pexito.');
                Auth.imputDisabled = false;
            });
    },
    isLogin: () => {

        if (window.localStorage.getItem('accessToken') !== undefined && window.localStorage.getItem('accessToken')) {
            return true;
        } else {
            return false
        }

    },
};

export default Auth;