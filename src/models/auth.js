import App from '../views/app';
import _Error_ from '../views/error';



const Auth = {
    username: "",
    password: "",
    messageError: "",
    statusHide: " d-none",
    statusError: "warning",
    imputDisabled: false,
    oncreate: () => {
        Auth.statusHide = "d-none";
        Auth.statusError = "warning";
        Auth.messageError = "";
        Auth.imputDisabled = false;
    },
    setUsername: (value) => {
        Auth.username = value
    },
    setPassword: (value) => {
        Auth.password = value
    },
    canSubmit: () => {

        return Auth.username !== "" && Auth.password !== "";
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
            url: "https://jsonplaceholder.typicode.com/users/1",
        })
            .then(function (data) {
                Auth.username = 'mchang';
                window.localStorage.accessToken = 'mchang';
                Auth.setSuccess('Bienvenido');
                setTimeout(function () { App.isAuth() }, 900);
            }).catch(function (error) {
                Auth.imputDisabled = false;
                Auth.setError(_Error_.httpError);
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