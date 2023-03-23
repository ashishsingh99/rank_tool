import { useNavigate } from "react-router-dom";

export const curday = function (sp) {
    const today = new Date();
    var dd = today.getDate();
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var mm = today.getMonth() + 1; //As January is 0.
    var yyyy = today.getFullYear();
    if (dd < 10) dd = '0' + dd;
    return (monthNames[today.getMonth()] + ' ' + dd + ' , ' + yyyy);
};

export const perday = function (sp) {
    const today = new Date();
    var dd = today.getDate();
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    return (monthNames[today.getMonth() + 1] + ' ' + dd + ' , ' + yyyy);
};

export const Logout = () => {

    localStorage.removeItem("loginOut");
    localStorage.removeItem("devicetype");
    localStorage.removeItem("utoken");
    localStorage.removeItem("uid");
    localStorage.removeItem("lastdate");
    localStorage.removeItem("status");
    localStorage.removeItem("token");
    localStorage.removeItem("websitename");
    localStorage.removeItem("websiteurl");
    localStorage.removeItem("language");
    localStorage.removeItem("IsProject");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("location");
    localStorage.removeItem("locationcode");
    localStorage.removeItem("customerId");
    window.location.href = '/'
    // window.location.reload(false);



};