import styles from "./Form.module.css";
import { useState } from "react";
import validation from "./validation";
import { Link, useLocation } from "react-router-dom";
import PATHROUTES from "../helpers/PathRoutes";

const Form = ({ login }) => {
  // Estado para almacenar los datos del usuario
  const [userData, setData] = useState({
    email: "",
    password: "",
  });

  // Estado para almacenar los errores de validación
  const [errors, setErrors] = useState({});

  // Función que se ejecuta al cambiar el valor de los campos de entrada
  const handleChange = (event) => {
    // Realizar la validación de los datos y actualizar los errores
    setErrors(
      validation({
        ...userData,
        [event.target.name]: event.target.value,
      })
    );

    // Actualizar los datos del usuario
    setData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (event) => {
    event.preventDefault();

    // Llamar al método de inicio de sesión proporcionado como prop
    login(userData);
  };

  // CON ASYNC AWAIT
  /*const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(userData);
    } catch (error) {
      console.error(error);
    }
  };*/

  return (
    <div>
      <div className={styles.divButtonF}>
        <button className={styles.ButtonF}>RICK AND MORTY PROJECT</button>
      </div>
      <div className={styles.divButtonR}>
        <Link to={PATHROUTES.REGISTER}>
          <button className={styles.ButtonR}>REGISTRATE</button>
        </Link>
      </div>
      <img
        src="https://i.gifer.com/origin/19/196b0b9b030e0f42b0a62d372185742f.gif"
        alt=""
        className={styles.gif}
      />

      <img
        src="https://media1.giphy.com/media/6Y6Q14uNgJzV1ev2rh/giphy.gif?cid=6c09b952ginfmj0h87cltixg18p6wcrxnmleme4b4c3ww07l&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
        alt=""
        className={styles.gif2}
      />
      <form className={styles.form}>
        <h2 className={styles.title}>INICIAR SESION</h2>
        <label htmlFor="email" className={styles.username}>
          EMAIL:
        </label>
        <input
          onChange={handleChange}
          value={userData.email}
          type="email"
          name="email"
          className={`${styles.input}`}
        />
        {errors.e1 ? (
          <p className={styles.parE}>{errors.e1}</p>
        ) : errors.e2 ? (
          <p className={styles.parE}>{errors.e2}</p>
        ) : (
          <p className={styles.parE}>{errors.e3}</p>
        )}
        <label htmlFor="password" className={styles.username}>
          CONTRASEÑA:
        </label>
        <input
          onChange={handleChange}
          value={userData.password}
          type="password"
          name="password"
          className={`${styles.input}`}
        />
        {errors.p1 ? (
          <p className={styles.parE}>{errors.p1}</p>
        ) : (
          <p className={styles.parE}>{errors.p2}</p>
        )}
        <button onClick={handleSubmit} type="submit" className={styles.btn}>
          ENVIAR
        </button>
      </form>
    </div>
  );
};

export default Form;
