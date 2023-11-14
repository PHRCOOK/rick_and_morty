import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App.jsx";

// Crear el nodo raíz del DOM y renderizar la aplicación en él
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Proveedor del store de Redux para que los componentes tengan acceso al estado */}
    <Provider store={store}>
      {/* Envolvemos la aplicación en el componente BrowserRouter para habilitar el enrutamiento */}
      <BrowserRouter>
        {/* Componente principal de la aplicación */}
        <App className="App" />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
