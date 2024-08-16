import axios from "axios";

// const API_URL = `${apiURL}/auth/";

const apiURL = process.env.REACT_APP_API_URL;

class AuthService {
  login(email, password) {
    return axios
      .post(`${apiURL}/api/login/`, {
        email,
        password
      })
      .then(response => {
      //  console.log(response)
        if (response.data.access) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(email, first_name, last_name, password, re_password) {
    // return axios.get(API_URL + "users/user_create", {
    //   // return axios.post(API_URL + "signup", {
    //   username,
    //   email,
    //   password
    // });

    var requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "http://127.0.0.1:6899"
        },
        body: JSON.stringify({
          email: email,
          first_name: first_name,
          last_name: last_name,
          password: password,
          role: "user",
          re_password: re_password,
          is_superuser: false
          
        }),
    }

    // console.log(requestOptions)
    fetch(`${apiURL}/auth/users/`, requestOptions).then(response => {
      // console.log(response)

      return response
    })
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
