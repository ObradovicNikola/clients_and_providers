import axios from "axios";

const url = "/api";

class ApiService {
  static getClients() {
    return new Promise((resolve, reject) => {
      axios
        .get(url + "/clients")
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static deleteClient(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(url + "/clients/" + id)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static createClient(client) {
    return new Promise((resolve, reject) => {
      axios
        .post(url + "/clients", client)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static updateClient(id, client) {
    return new Promise((resolve, reject) => {
      axios
        .patch(url + "/clients/" + id, client)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getProviders() {
    return new Promise((resolve, reject) => {
      axios
        .get(url + "/providers")
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static createProvider(provider) {
    return new Promise((resolve, reject) => {
      axios
        .post(url + "/providers", provider)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static deleteProvider(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(url + "/providers/" + id)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static updateProvider(id, provider) {
    return new Promise((resolve, reject) => {
      axios
        .patch(url + "/providers/" + id, provider)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default ApiService;
