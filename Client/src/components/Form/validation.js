export default (data) => {
  let errors = {};

  // Validación del email
  if (!data.email.includes("@")) {
    errors.e1 = "EMAIL NO VÁLIDO";
  }
  if (!data.email) {
    errors.e2 = "INGRESE UN EMAIL";
  }
  if (data.email.length > 35) {
    errors.e3 = "DEBE TENER MENOS DE 35 CARACTERES";
  }

  // Validación de la contraseña
  if (!/\d/.test(data.password)) {
    errors.p1 = "DEBE CONTENER AL MENOS UN NUMERO";
  }
  if (data.password.length < 6 || data.password.length > 10) {
    errors.p2 =
      "LONGITUD INCORRECTA , DEBE TENER MAS DE 6 Y MENOS DE 10 CARACTERES";
  }

  return errors;
};
