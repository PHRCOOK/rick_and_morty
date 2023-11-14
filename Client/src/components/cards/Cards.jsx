import styles from "./Cards.module.css";
import Card from "../card/Card"; // Importamos el componente Card desde el archivo Card.js

export default function Cards(props) {
  const { characters, onClose } = props; // Extraemos la propiedad "characters" del objeto "props" usando destructuring

  return (
    <div className={styles.containerCs}>
      {characters.map(
        ({ id, name, status, species, gender, origin, image }) => {
          return (
            <Card
              key={id} // Asignamos la propiedad "key" con el valor de "char.div" para identificar de manera única cada tarjeta en la lista
              id={id}
              name={name} // Pasamos la propiedad "name" con el valor de "char.name" al componente Card
              status={status} // Pasamos la propiedad "status" con el valor de "char.status" al componente Card
              species={species} // Pasamos la propiedad "species" con el valor de "char.species" al componente Card
              gender={gender} // Pasamos la propiedad "gender" con el valor de "char.gender" al componente Card
              origin={origin.name} // Pasamos la propiedad "origin" con el valor de "char.origin.name" al componente Card
              image={image} // Pasamos la propiedad "image" con el valor de "char.image" al componente Card
              onClose={onClose} // Pasamos la función de cierre como una propiedad llamada "onClose" al componente Card
            />
          );
        }
      )}
    </div>
  );
}
