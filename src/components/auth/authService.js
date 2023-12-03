import axios from "axios";

function checkAdminPermission() {
    return new Promise((resolve) => {
        axios.get("http://localhost:5000/admin", {
            withCredentials: true,
            validateStatus: function (status) {
                return status === 200 || status === 401;
            }
        }).then((res) => {
            if (res.status == 401) {
                resolve(false);
            } else{
                resolve(true);
            }
        })
    })

}

export {checkAdminPermission};