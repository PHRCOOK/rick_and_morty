import { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Cards from "./components/cards/Cards.jsx";
import axios from "axios";
import Form from "./components/Form/Form";
import About from "./components/About/About";
import Detail from "./components/DETAIL/Detail";
import Favorites from "./components/Favorites/Favorites";
import Register from "./components/Form/Register";
import PATHROUTES from "./components/helpers/PathRoutes";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";

// Función para obtener los datos desde una URL
async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error;
  }
}

// Componente principal de la aplicación
function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [access, setAccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Función para buscar un personaje por ID
  // CON EXPRESS O PROMESAS

  /* const onSearch = (id) => {
  const url = `http://localhost:3001/rickandmorty/character/${id}`;
  axios.get(url)
    .then((response) => {
      const data = response.data;
      if (data.name) {
        const isCharacterAdded = characters.some((char) => char.id === data.id);
        if (isCharacterAdded) {
          window.alert("¡El personaje ya ha sido agregado!");
        } else {
          setCharacters((oldChars) => [...oldChars, data]);
        }
      } else {
        window.alert("¡No hay personajes con este ID!");
      }
    })
    .catch((error) => {
      console.error("Error al buscar el personaje:", error);
    });
};*/

  //CON ASYNC AWAIT

  async function onSearch(id) {
    try {
      const { data } = await axios(
        `http://localhost:3001/rickandmorty/character/${id}`
      );
      if (data.name) {
        const findCharacter = characters.find(
          (element) => element.id === parseInt(id)
        );
        if (characters.length === 825) {
          window.alert("¡No se encuentran mas personajes para agregar!");
        } else if (findCharacter) {
          window.alert("¡Este personaje ya fue agregado!");
        } else {
          setCharacters((oldChars) => [...oldChars, data]);
        }
      }
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.status === 404) {
        window.alert("¡No existen personajes con este ID!");
      } else {
        window.alert("¡error no determinado!");
      }
    }
  }

  function fetchRandomCharacter() {
    let random = (Math.random() * (826 - 1 + 1) + 1).toFixed();
    onSearch(random);
  }

  // Función para cerrar un personaje
  const onClose = (id) => {
    setCharacters(
      characters.filter((char) => {
        return char.id !== id;
      })
    );
  };

  // Función para realizar el inicio de sesión

  //CON EXPRESS O PROMESAS

  /* const login = (userData) => {
    const { email, password } = userData;
    const URL = 'http://localhost:3001/rickandmorty/login/';
    axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
      const { access } = data;
      setAccess(access);
      access && navigate('/home');
    });
  };*/

  //CON ASYNC AWAIT

  const login = async (userData) => {
    const { email, password } = userData;
    const URL = "http://localhost:3001/rickandmorty/login/";
    try {
      const { data } = await axios.get(
        URL + `?email=${email}&password=${password}`
      );
      const { access } = data;
      setAccess(access);
      if (access) {
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      alert("Usuario o Contraseña Incorrectas.");
    }
  };

  const register = async (userData) => {
    const { email, password } = userData;
    const URL = "http://localhost:3001/rickandmorty/register/";
    try {
      const { data } = await axios.post(URL, { email, password });
      const { access } = data;
      setAccess(access);
      if (access) navigate("/");
      alert("¡Usuario creado exitosamente!");
    } catch (error) {
      console.error(error);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setAccess(false);
    navigate("/");
  };

  // Función para cambiar la imagen de fondo según la ruta actual
  const changeBackgroundImage = () => {
    switch (pathname) {
      case PATHROUTES.HOME:
        document.body.style.backgroundImage =
          "url('https://moewalls.com/wp-content/uploads/2023/07/rick-and-morty-escape-portal-thumb.jpg')";
        break;
      case PATHROUTES.FAVORITES:
        document.body.style.backgroundImage =
          "url('https://i.pinimg.com/originals/11/3a/e5/113ae5ed2c41df59606466ed8da4e5a1.jpg')";
        break;
      case PATHROUTES.ABOUT:
        document.body.style.backgroundImage =
          "url('https://fondosanimados.com/wp-content/uploads/2023/04/rick-3.jpg')";
        break;
      case PATHROUTES.ROOT:
        document.body.style.backgroundImage =
          "url('https://www.chromethemer.com/wallpapers/chromebook-wallpapers/images/960/rick-and-morty-chromebook-wallpaper.jpg')";
        break;
      default:
        document.body.style.backgroundImage =
          "url('https://motionbgs.com/media/776/multiverse-of-rick-and-morty.jpg')";
        break;
    }
  };

  const cacheImages = async (srcArray) => {
    const promises = await srcArray.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    await Promise.all(promises);
  };

  const preloadImages = () => {
    const images = [
      "https://moewalls.com/wp-content/uploads/2023/07/rick-and-morty-escape-portal-thumb.jpg",
      "https://i.pinimg.com/originals/11/3a/e5/113ae5ed2c41df59606466ed8da4e5a1.jpg",
      "https://fondosanimados.com/wp-content/uploads/2023/04/rick-3.jpg",
      "https://www.chromethemer.com/wallpapers/chromebook-wallpapers/images/960/rick-and-morty-chromebook-wallpaper.jpg",
      "https://motionbgs.com/media/776/multiverse-of-rick-and-morty.jpg",
    ];

    cacheImages(images);
  };

  useEffect(() => {
    preloadImages();
    changeBackgroundImage();
  }, [pathname]);

  //FUNCION DE PAGINACION
  const fetchAllCharacters = async (page) => {
    try {
      const url = `https://rickandmortyapi.com/api/character?page=${page}`;
      const response = await fetchData(url);
      setCharacters(response.results);
      setTotalPages(response.info.pages);
    } catch (error) {
      console.error("Error al obtener los personajes:", error);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      fetchAllCharacters(currentPage + 1);
    } else {
      setCurrentPage(1);
      fetchAllCharacters(1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchAllCharacters(currentPage - 1);
    } else {
      setCurrentPage(totalPages);
      fetchAllCharacters(totalPages);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
    fetchAllCharacters(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
    fetchAllCharacters(totalPages);
  };

  // useEffect(() => {
  //   fetchAllCharacters(currentPage);
  // }, [currentPage]);

  const clearCharacters = () => {
    setCurrentPage(1);
    setTotalPages(1);
    setCharacters([]);
  };

  return (
    <Provider store={store}>
      <div className="App">
        {pathname !== "/" && (
          <Nav
            onSearch={onSearch}
            fetchRandomCharacter={fetchRandomCharacter}
            onLogout={logout}
            fetchAllCharacters={fetchAllCharacters}
            onClearCharacters={clearCharacters}
            goToFirstPage={goToFirstPage}
            goToNextPage={goToNextPage}
            goToLastPage={goToLastPage}
            goToPreviousPage={goToPreviousPage}
            currentPage={currentPage}
          />
        )}
        <Routes>
          <Route path={PATHROUTES.ROOT} element={<Form login={login} />} />
          <Route
            path={PATHROUTES.HOME}
            element={<Cards characters={characters} onClose={onClose} />}
          />
          <Route path={PATHROUTES.ABOUT} element={<About />} />
          <Route path={PATHROUTES.DETAIL} element={<Detail />} />
          <Route path={PATHROUTES.FAVORITES} element={<Favorites />} />
          <Route
            path={PATHROUTES.REGISTER}
            element={<Register register={register} />}
          />
          <Route
            path={PATHROUTES.ERROR}
            element={
              <div>
                <h1>Error 404 no encontrado</h1>
              </div>
            }
          />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
