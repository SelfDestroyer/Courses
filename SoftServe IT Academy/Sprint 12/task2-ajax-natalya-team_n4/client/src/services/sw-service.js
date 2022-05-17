import axios from "axios";

async function getData(id, data) {
  try {
    const response = await axios.get(`https://swapi.dev/api/${data}/${id}/`);
    return response;
  } catch (error) {
    throw Error(error);
  }
}

async function getImg(id, data) {
  try {
    const response = await axios.get(`https://starwars-visualguide.com/assets/img/${data}/${id}.jpg`);
    return response;
  } catch (error) {
    throw Error(error);
  }
}

export { getData, getImg };
