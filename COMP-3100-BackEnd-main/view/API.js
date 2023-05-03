
class API {
  
  static signUp(username, email, password, onSuccess, onFail) {
    return axios
      .post("http://localhost:3000/myFlex/api/v1/signup", {
        username: username,
        email,
        password,
      })
      .then((res) => {
        console.log(res.data.token)
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        // onSuccess(res);
      })
      .catch((e) => {
        // onFail(e.response.data);
      });
  }

  static isLoggedIn() {
    return axios
      .get("http://localhost:3000/myFlex/api/v1/user", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  static logout(onSuccess, onFail) {
    localStorage.clear();
    // onSuccess();
  }

  static getRecommendations(page) {
    return (
      axios
        .get(`http://localhost:3000/myFlex/api/v1/user/recommendations?page=${page}`, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        // .then((res) => console.log(res.data))
        // .catch((e) => console.log(e))
    );
  }

  static login(username, password, onSuccess, onFail) {
    return axios
      .post("http://localhost:3000/myFlex/api/v1/login", {
        username,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        // onSuccess(res);
      })
      .catch((e) => {
        // onFail(e.response.data);
      });
  }

  static loginAsGuest(onSuccess, onFail) {
    return axios
      .post("http://localhost:3000/myFlex/api/v1/login/guest")
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("guest", true);
        onSuccess(res);
      })
      .catch((e) => {
        console.error(e)
        onFail(e);
      });
  }

  static search(searchValue, page = 1) {
    return (
      axios
        .get(
          `http://localhost:3000/myFlex/api/v1/search/movie?searchQuery=${searchValue}&page=${page}`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        )
        // .then((res) => console.log(res.data))
        .catch((e) => console.log(e))
    );
  }

   static movieDetails(movieID) {
    return (
      axios
        .get(`http://localhost:3000/myFlex/api/v1/movie?searchQuery=${movieID}`)
    );
  }
  
  static addMovieToMyList(id) {
    return axios.patch(
      "http://localhost:3000/myFlex/api/v1/user/list",
      {
        id,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  }

  static removeMovieFromMyList(id) {
    return axios.delete("http://localhost:3000/myFlex/api/v1/user/list", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      data: {
        id,
      },
    });
  }

  static watched(id, watched) {
    return axios.patch(
      "http://localhost:3000/myFlex/api/v1/user/list",
      { id, watched },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
  }

  static getMyList() {
    return axios
      .get("http://localhost:3000/myFlex/api/v1/user/list", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        return res;
      })
      .catch((e) => {
        console.error(e);
      });
  }
}

