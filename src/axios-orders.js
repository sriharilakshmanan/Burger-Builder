import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-ab66d.firebaseio.com/"
});

export default instance;
