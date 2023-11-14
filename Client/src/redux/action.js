import axios from "axios";

// Action Types
export const ADD_FAV = "ADD_FAV";
export const REMOVE_FAV = "REMOVE_FAV";
export const FILTER = "FILTER";
export const ORDER = "ORDER";
export const FILTER_STATUS = "FILTER_STATUS";
export const FILTER_SPECIES = "FILTER_SPECIES";
export const FILTER_ORIGIN = "FILTER_ORIGIN";

// Action Creators

//La función  addFav(character)  es un creador de acción que devuelve un objeto con un tipo de acción  ADD_FAV  y un payload que contiene un personaje.

//CON EXPRESS

/*export const addFav = (character) => {
   const endpoint = 'http://localhost:3001/rickandmorty/fav';
   return (dispatch) => {
      axios.post(endpoint, character).then(({ data }) => {
         return dispatch({
            type: 'ADD_FAV',
            payload: data,
         });
      });
   };
};*/

// CON ASYNC AWAIT

export const addFav = (character) => {
  const endpoint = "http://localhost:3001/rickandmorty/fav";
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, character);
      return dispatch({
        type: ADD_FAV,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

//La función  removeFav(id)  es un creador de acción que devuelve un objeto con un tipo de acción  REMOVE_FAV  y un payload que contiene el ID de un personaje.

// CON EXPRESS

/*export const removeFav = (id) => {
   const endpoint = 'http://localhost:3001/rickandmorty/fav/' + id;
   return (dispatch) => {
      axios.delete(endpoint).then(({ data }) => {
         return dispatch({
            type: 'REMOVE_FAV',
            payload: data,
      });
      });
   };
};*/

// CON ASYNC AWAIT

export const removeFav = (id) => {
  const endpoint = "http://localhost:3001/rickandmorty/fav/" + id;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint);
      return dispatch({
        type: REMOVE_FAV,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

//La función  filterCards(gender)  es un creador de acción que devuelve un objeto con un tipo de acción  FILTER  y un payload que contiene el género de los personajes a filtrar.

export function filterCards(gender) {
  return {
    type: FILTER,
    payload: gender,
  };
}

//La función  orderCards(order)  es un creador de acción que devuelve un objeto con un tipo de acción  ORDER  y un payload que contiene el orden de los personajes a ordenar.

export function orderCards(order) {
  return {
    type: ORDER,
    payload: order,
  };
}

export function filterByStatus(status) {
  return {
    type: FILTER_STATUS,
    payload: status,
  };
}

export function filterBySpecies(species) {
  return {
    type: FILTER_SPECIES,
    payload: species,
  };
}

export function filterByOrigin(origin) {
  return {
    type: FILTER_ORIGIN,
    payload: origin,
  };
}
