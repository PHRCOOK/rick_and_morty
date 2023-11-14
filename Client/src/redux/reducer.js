// reducer.js
import {
  ADD_FAV,
  REMOVE_FAV,
  FILTER,
  ORDER,
  FILTER_STATUS,
  FILTER_SPECIES,
  FILTER_ORIGIN,
} from "./action";

// Estado inicial
const initialState = {
  myFavorites: [],
  allCharacters: [],
};

// Reducer

//1. La función  reducer  toma dos argumentos:  state  y  action .  state  representa el estado actual de la aplicación y  action  es un objeto que contiene información sobre la acción que se está realizando.

//2. Dentro del reducer, se utiliza una declaración  switch  para manejar diferentes tipos de acciones. Cada caso dentro del  switch  corresponde a una acción específica que puede ocurrir en la aplicación.

function reducer(state = initialState, action) {
  switch (action.type) {
    //3. El primer caso es  ADD_FAV , que se ejecuta cuando se quiere agregar un elemento a la lista de favoritos. En este caso, se crea un nuevo estado copiando el estado actual con el operador de propagación ( ...state ), y se agrega el nuevo elemento a las listas  myFavorites  y  allCharacters .
    case ADD_FAV:
      return {
        ...state,
        myFavorites: action.payload,
        allCharacters: action.payload,
      };

    //4. El segundo caso es  REMOVE_FAV , que se ejecuta cuando se quiere eliminar un elemento de la lista de favoritos. En este caso, se crea un nuevo estado copiando el estado actual, y se filtra la lista  myFavorites  para eliminar el elemento con el ID especificado en la acción.
    case REMOVE_FAV:
      return { ...state, myFavorites: action.payload };

    //5. El segundo caso es  REMOVE_FAV , que se ejecuta cuando se quiere eliminar un elemento de la lista de favoritos. En este caso, se crea un nuevo estado copiando el estado actual, y se filtra la lista  myFavorites  para eliminar el elemento con el ID especificado en la acción.

    case FILTER:
      if (action.payload === null) {
        return {
          ...state,
          myFavorites: state.allCharacters,
        };
      } else {
        return {
          ...state,
          myFavorites: state.allCharacters.filter(
            (character) => character.gender === action.payload
          ),
        };
      }

    //6. El tercer caso es  FILTER , que se ejecuta cuando se quiere filtrar la lista de favoritos por género. En este caso, se crea un nuevo estado copiando el estado actual, y se filtra la lista  allCharacters  para mostrar solo los personajes que coinciden con el género especificado en la acción.

    case ORDER:
      let sortedCharacters = [...state.allCharacters];
      sortedCharacters.sort((a, b) =>
        action.payload === "A" ? a.id - b.id : b.id - a.id
      );
      return {
        ...state,
        myFavorites: sortedCharacters,
      };

    //7. El cuarto caso es  ORDER , que se ejecuta cuando se quiere ordenar la lista de favoritos. En este caso, se crea una copia de la lista  allCharacters  y se ordena según el criterio de orden especificado en la acción. Luego, se crea un nuevo estado copiando el estado actual y se actualiza la lista  myFavorites  con la lista ordenada.

    // Agregar casos de filtrado por status, species y origin
    case FILTER_STATUS:
      if (action.payload === null) {
        return {
          ...state,
          myFavorites: state.allCharacters,
        };
      } else {
        return {
          ...state,
          myFavorites: state.allCharacters.filter(
            (character) => character.status === action.payload
          ),
        };
      }

    case FILTER_SPECIES:
      if (action.payload === null) {
        return {
          ...state,
          myFavorites: state.allCharacters,
        };
      } else {
        return {
          ...state,
          myFavorites: state.allCharacters.filter(
            (character) => character.species === action.payload
          ),
        };
      }

    case FILTER_ORIGIN:
      if (action.payload === null) {
        return {
          ...state,
          myFavorites: state.allCharacters,
        };
      } else {
        return {
          ...state,
          myFavorites: state.allCharacters.filter(
            (character) => character.origin === action.payload
          ),
        };
      }

    default:
      return state;
    //8. Si ninguna de las acciones anteriores coincide, se ejecuta el caso  default  y se devuelve el estado actual sin realizar ningún cambio.
  }
}

export default reducer;

//9. Al final, se exporta el reducer como el valor predeterminado del módulo para que pueda ser utilizado en otros archivos de la aplicación.
