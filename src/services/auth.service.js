import axios from "axios";

const API_URL = "http://api.bkmathapp.tk/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(`http://api.bkmathapp.tk/api/login/`, {
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

  register(username, email, password) {
    // return axios.get(API_URL + "users/user_create", {
    //   // return axios.post(API_URL + "signup", {
    //   username,
    //   email,
    //   password
    // });
    fetch("http://api.bkmathapp.tk/auth/users/user_create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "http://127.0.0.1:6900"
      },
      body: JSON.stringify({
        
      }),
    })
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
