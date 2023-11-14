import { useState } from "react";
import styles from "./nav.module.css";
import { Link, useLocation } from "react-router-dom";
import PATHROUTES from "../helpers/PathRoutes";

// Componente de navegación
const Nav = ({
  onSearch,
  fetchRandomCharacter,
  onLogout,
  fetchAllCharacters,
  onClearCharacters,
  goToNextPage,
  goToPreviousPage,
  currentPage,
  goToFirstPage,
  goToLastPage,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();

  // Maneja la búsqueda de personajes

  // 1.  handleSearch : Esta función maneja la búsqueda de personajes. Se ejecuta cuando se envía el formulario de búsqueda. Obtiene el valor del campo de búsqueda y lo pasa a la prop  onSearch  para realizar la búsqueda. Luego, se reinicia el valor del campo de búsqueda.

  const handleSearch = (event) => {
    event.preventDefault();
    const id = event.target.elements.search.value;
    onSearch(id);
    setSearchValue("");
  };

  // Maneja el cambio en el campo de búsqueda

  //2.  handleInputChange : Esta función maneja el cambio en el campo de búsqueda. Actualiza el estado del valor de búsqueda ( searchValue ) con el valor ingresado en el campo.

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Verifica si la ruta actual es la de detalle de un personaje

  //3.  isDetailRoute ,  isAboutRoute ,  isHomeRoute  y  isFavoritesRoute : Estas variables booleanas verifican si la ruta actual coincide con las rutas específicas. Se utilizan para determinar qué botones de navegación y formulario de búsqueda renderizar.

  const isDetailRoute = location.pathname.includes("detail/");

  // Verifica si la ruta actual es la de "About"
  const isAboutRoute = location.pathname === PATHROUTES.ABOUT;

  // Verifica si la ruta actual es la de "Home"
  const isHomeRoute = location.pathname === PATHROUTES.HOME;

  // Verifica si la ruta actual es la de "Favorites"
  const isFavoritesRoute = location.pathname === PATHROUTES.FAVORITES;

  // ESTADOS GLOBALES PARA EL PARRAFO INICIALIZADO EN FALSE

  const [showPageNumber, setShowPageNumber] = useState(false);

  return (
    /*Luego, se renderiza el componente  Nav . Dentro del renderizado, se muestra un botón con el texto "RICK AND MORTY PROJECT" y se aplican estilos a través de  styles.divButtonN  y  styles.ButtonN . 
 
   A continuación, se renderizan los botones de navegación según la ruta actual. Por ejemplo, si la ruta actual es la de "Inicio", se muestra un botón para ir a "Nosotros". Si la ruta actual es la de "Nosotros", se muestra un botón para ir a "Inicio". Si la ruta actual es la de "Inicio" y no es la de "Nosotros" ni la de "Favoritos", se muestran botones para ir a "Favoritos", agregar un personaje aleatorio y salir de la sesión. 
 
   Luego, se renderiza el formulario de búsqueda si no está en la ruta de detalle ni en la de "Nosotros" ni en la de "Favoritos". El formulario contiene un campo de entrada de texto y un botón de búsqueda. 
 
   Finalmente, se exporta el componente  Nav  como el valor predeterminado. */

    <div>
      <div className={styles.nav}>
        <div className={styles.divButtonN}>
          <button className={styles.ButtonN}>RICK AND MORTY PROJECT</button>
        </div>
        <div className={styles.containerN} onSubmit={handleSearch}>
          {/* Renderiza los botones de navegación según la ruta actual */}
          {!isDetailRoute && !isFavoritesRoute && (
            <>
              {isAboutRoute && (
                <Link to={PATHROUTES.HOME}>
                  <div>
                    <button className={styles.btn}>INICIO</button>
                  </div>
                </Link>
              )}
              {!isAboutRoute && !isFavoritesRoute && isHomeRoute && (
                <>
                  <div>
                    <Link to={PATHROUTES.FAVORITES}>
                      <button className={styles.btn}>FAVORITOS</button>
                    </Link>
                  </div>
                  <div>
                    <button
                      className={styles.btn}
                      onClick={fetchRandomCharacter}
                    >
                      ALEATORIO
                    </button>
                    <button
                      className={styles.btn}
                      onClick={() => {
                        fetchAllCharacters();
                        setShowPageNumber(true);
                      }}
                    >
                      PAGINAS
                    </button>
                    <button
                      onClick={() => {
                        onClearCharacters();
                        setShowPageNumber(false);
                      }}
                      className={styles.btn}
                    >
                      BORRAR
                    </button>
                    {showPageNumber && (
                      <p className={styles.p}>PAGINA: {currentPage}</p>
                    )}
                  </div>
                  {isHomeRoute && (
                    <Link to={PATHROUTES.ABOUT}>
                      <div>
                        <button className={styles.btn}>SOBRE MI</button>
                      </div>
                    </Link>
                  )}
                </>
              )}
            </>
          )}
          {isFavoritesRoute && !isHomeRoute && !isAboutRoute && (
            <Link to={PATHROUTES.HOME}>
              <div>
                <button className={styles.btn}>INICIO</button>
              </div>
            </Link>
          )}
          {/* Renderiza el formulario de búsqueda si no está en la ruta de detalle ni en la de "About" ni en la de "Favorites" */}
          {!isDetailRoute &&
            !isAboutRoute &&
            !isFavoritesRoute &&
            isHomeRoute && (
              <form className={styles.containerN}>
                <input
                  className={styles.input}
                  type="text"
                  name="search"
                  placeholder="Agrega el ID ...👍"
                  value={searchValue}
                  onChange={handleInputChange}
                />
                <button className={styles.buttonN} type="submit">
                  Buscar
                </button>
              </form>
            )}
        </div>
      </div>
      {!isDetailRoute && !isAboutRoute && !isFavoritesRoute && isHomeRoute && (
        <div className={styles.cS}>
          <button onClick={onLogout} className={styles.btn}>
            SALIR
          </button>
        </div>
      )}
      {!isDetailRoute && !isAboutRoute && !isFavoritesRoute && isHomeRoute && (
        <div className={styles.cN}>
          <button onClick={goToNextPage} className={styles.btn}>
            SIGUIENTE
          </button>
        </div>
      )}
      {!isDetailRoute && !isAboutRoute && !isFavoritesRoute && isHomeRoute && (
        <div className={styles.cP}>
          <button onClick={goToPreviousPage} className={styles.btn}>
            PREVIO
          </button>
        </div>
      )}
      {!isDetailRoute && !isAboutRoute && !isFavoritesRoute && isHomeRoute && (
        <div className={styles.cN1}>
          <button onClick={goToLastPage} className={styles.btn}>
            ULTIMA
          </button>
        </div>
      )}
      {!isDetailRoute && !isAboutRoute && !isFavoritesRoute && isHomeRoute && (
        <div className={styles.cP1}>
          <button onClick={goToFirstPage} className={styles.btn}>
            PRIMERA
          </button>
        </div>
      )}
    </div>
  );
};

export default Nav;
