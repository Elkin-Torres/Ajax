/*Con el método XMLHttpRequest */
(() => {
  const xhr = new XMLHttpRequest(),
    $xhr = document.getElementById("xhr"),
    $fragment = document.createDocumentFragment();
  //console.log(xhr);

  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;
    //console.log(xhr);

    if (xhr.status >= 200 && xhr.status < 300) {
      //console.log("éxito");
      //console.log(xhr.responseText);
      let json = JSON.parse(xhr.responseText);
      //console.log(json);

      json.forEach((el) => {
        let li = document.createElement("li");
        li.innerHTML = `${el.name} -- ${el.phone} -- ${el.email}`;
        $fragment.appendChild(li);
      });
      $xhr.appendChild($fragment);
    } else {
      //console.log("Ocurrió un problema");
      let message = xhr.statusText || "Algo salió mal :(";
      $xhr.innerHTML = `Error ${xhr.status}: ${message}`;
    }
  });

  xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

  /*Para conectarse con la base local*/
  //xhr.open("GET", "users.json");

  xhr.send();
})();

/*Con la API fetch*/
(() => {
  const $fetch = document.getElementById("fetch"),
    $fragment = document.createDocumentFragment();

  fetch("https://jsonplaceholder.typicode.com/users")
    //fetch("users.json")
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(res);
    })
    .then((json) => {
      json.forEach((el) => {
        const li = document.createElement("li");
        li.innerHTML = `${el.name}--${el.phone}--${el.email}`;
        $fragment.appendChild(li);
      });
      $fetch.appendChild($fragment);
    })
    .catch((res) => {
      let message = res.statusText || "Algo salió mal";
      $fetch.innerHTML = `Error ${res.status} : ${message}`;
    })
    .finally(() => {
      console.log(
        "Este mensaje se imprimirá independientemente del resultado de la promesa Fetch"
      );
    });
})();

/*Con la API fetch usando función asíncrona */
(() => {
  const $asyncAwait = document.getElementById("asyncAwait"),
    $fragment = document.createDocumentFragment();

  async function getData() {
    try {
      //let res = await fetch("https://jsonplaceholder.typicode.com/users");
      let res = await fetch("users.json");
      let json = await res.json();
      //console.log(res, json);

      if (!res.ok) throw { status: res.status, statusText: res.statusText };

      json.forEach((el) => {
        const li = document.createElement("li");
        li.innerHTML = `${el.name}--${el.phone}--${el.email}`;
        $fragment.appendChild(li);
      });
      $asyncAwait.appendChild($fragment);
    } catch (error) {
      let message = error.statusText || "Algo salió mal";
      $asyncAwait.innerHTML = `Error ${error.status} : ${message}`;
    } finally {
      console.log(
        "Este mensaje se imprimirá independientemente del resultado de la promesa Fetch"
      );
    }
  }

  getData();
})();

/*Con la librería Axios */
(() => {
  const $axios = document.getElementById("axios"),
    $fragment = document.createDocumentFragment();

  axios
    .get("https://jsonplaceholder.typicode.com/users")
    //.get("users.json")
    .then((res) => {
      console.log(res);
      res.data.forEach((el) => {
        const li = document.createElement("li");
        li.innerHTML = `${el.name}--${el.phone}--${el.email}`;
        $fragment.appendChild(li);
      });
      $axios.appendChild($fragment);
    })
    .catch((error) => {
      let message = error.response.statusText || "Algo salió mal";
      $axios.innerHTML = `Error ${error.response.status} : ${message}`;
    })
    .finally(() => {
      console.log(
        "Este mensaje se imprimirá independientemente del resultado del uso de axios"
      );
    });
})();

/*Con la librería Axios usando una función asíncrona */
(() => {
  const $axiosAsync = document.getElementById("axiosAsync"),
    $fragment = document.createDocumentFragment();

  async function getData() {
    try {
      //let res = await axios.get("https://jsonplaceholder.typicode.com/users");
      let res = await axios.get("users.json");
      let json = await res.data;
      //console.log(res,json);

      json.forEach((el) => {
        const li = document.createElement("li");
        li.innerHTML = `${el.name}--${el.phone}--${el.email}`;
        $fragment.appendChild(li);
      });
      $axiosAsync.appendChild($fragment);
    } catch (error) {
      let message = error.response.statusText || "Algo salió mal";
      $axiosAsync.innerHTML = `Error ${error.response.status} : ${message}`;
    } finally {
      console.log(
        "Este mensaje se imprimirá independientemente del resultado del uso de axios- con async-await"
      );
    }
  }

  getData();
})();
