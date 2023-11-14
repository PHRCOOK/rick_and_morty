import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import Card from "../card/Card";
import styles from "./Favorites.module.css";
import {
  filterCards,
  orderCards,
  filterByStatus,
  filterBySpecies,
  filterByOrigin,
} from "../../redux/action";

function Favorites(props) {
  const dispatch = useDispatch();
  const [aux, setAux] = useState(false);

  function handleOrder(e) {
    setAux(!aux);
    dispatch(orderCards(e.target.value));
  }

  function handleFilter(e) {
    if (e.target.value === "Todos") {
      dispatch(filterCards(null));
    } else {
      dispatch(filterCards(e.target.value));
    }
  }

  function handleFilterByStatus(e) {
    if (e.target.value === "Todos") {
      dispatch(filterByStatus(null));
    } else {
      dispatch(filterByStatus(e.target.value));
    }
  }

  function handleFilterBySpecies(e) {
    if (e.target.value === "Todos") {
      dispatch(filterBySpecies(null));
    } else {
      dispatch(filterBySpecies(e.target.value));
    }
  }

  function handleFilterByOrigin(e) {
    if (e.target.value === "Todos") {
      dispatch(filterByOrigin(null));
    } else {
      dispatch(filterByOrigin(e.target.value));
    }
  }

  return (
    <div className={styles.containerCb}>
      <div className={styles.containerCa}>
        <select className={styles.selectFav} onChange={handleFilter}>
          <option value="Todos">Todos los Generos</option>
          <option value="Male">Masculino</option>
          <option value="Female">Femenino</option>
          <option value="Genderless">Sin género</option>
          <option value="unknown">Desconocido</option>
        </select>
        <select className={styles.selectFav} onChange={handleOrder}>
          <option value="Todos">Orden</option>
          <option value="A">Ascendente</option>
          <option value="D">Descendente</option>
        </select>
        <select className={styles.selectFav} onChange={handleFilterByStatus}>
          <option value="Todos">Todos los Estados</option>
          <option value="Alive">Vivo</option>
          <option value="Dead">Muerto</option>
          <option value="unknown">Desconocido</option>
        </select>
        <select className={styles.selectFav} onChange={handleFilterBySpecies}>
          <option value="Todos">Todas las Especies</option>
          <option value="Human">Humano</option>
          <option value="Humanoid">Humanoid</option>
          <option value="Alien">Extraterrestre</option>
          <option value="Animal">Animal</option>
          <option value="Robot">Robot</option>
          <option value="Mythological Creature ">Mythological Creature</option>
          <option value="unknown">Desconocido</option>
        </select>
        <select className={styles.selectFav} onChange={handleFilterByOrigin}>
          <option value="Todos">Todos los Origenes</option>
          <option value="Earth (C-137)">Earth (C-137)</option>
          <option value="Snuffles' Dream">Snuffles' Dream</option>
          <option value="Story Train">Story Train</option>
          <option value="Citadel of Ricks">Citadel of Ricks</option>
          <option value="unknown">Desconocido</option>
          <option value="Earth (Replacement Dimension)">
            Earth (Replacement Dimension)
          </option>
          <option value="Earth (C-500A) ">Earth (C-500A) </option>
          <option value="Venzenulon 7">Venzenulon 7</option>
          <option value="Mr. Goldenfold's dream">Mr. Goldenfold's dream</option>
          <option value="Anatomy Park">Anatomy Park</option>
          <option value="Avian Planet">Avian Planet</option>
          <option value="Hell">Hell</option>
          <option value="Gromflom Prime">Gromflom Prime</option>
          <option value="Pluto">Pluto</option>
          <option value="Interdimensional Cable">Interdimensional Cable</option>
          <option value="Earth (D-99)">Earth (D-99)</option>
          <option value="Earth (Wasp Dimension) ">
            Earth (Wasp Dimension){" "}
          </option>
          <option value="Glorzo Asteroid ">Glorzo Asteroid</option>
          <option value="Resort Planet">Resort Planet</option>
          <option value="Earth (Phone Dimension)">
            Earth (Phone Dimension)
          </option>
          <option value=" Earth (Fascist Dimension)">
            Earth (Fascist Dimension)
          </option>
          <option value="Merged Universe">Merged Universe </option>
          <option value="Gazorpazorp">Gazorpazorp</option>
          <option value="Earth (D716) ">Earth (D716) </option>
          <option value="Post-Apocalyptic Earth ">
            Post-Apocalyptic Earth
          </option>
          <option value="Gaia ">Gaia </option>
          <option value="Morglutz">Morglutz</option>
          <option value="Tickets Please Guy Nightmare">
            Tickets Please Guy Nightmare
          </option>
          <option value="Slartivart">Slartivart</option>
          <option value="Unity's Planet ">Unity's Planet </option>
          <option value="Unity's Planet">Unity's Planet </option>
          <option value="Earth (Fascist Teddy Bear Dimension)">
            Earth (Fascist Teddy Bear Dimension)
          </option>
          <option value="Gromflom Prim">Gromflom Prime</option>
          <option value="Nuptia 4 ">Nuptia 4 </option>
          <option value="Morty’s Story ">Morty’s Story </option>
          <option value="Hamster in Butt World">Hamster in Butt World</option>
          <option value="Roy: A Life Well Lived">Roy: A Life Well Lived</option>
          <option value="Birdperson's Consciousness ">
            Birdperson's Consciousness
          </option>
          <option value=" Earth (C-500A) "> Earth (C-500A) </option>
          <option value="Narnia Dimension ">Narnia Dimension </option>
          <option value="Mount Olympus">Mount Olympus</option>
          <option value=" Signus 5 Expanse">Signus 5 Expanse</option>
          <option value=" Birdperson's Consciousness ">
            Birdperson's Consciousness
          </option>
          <option value=" Interdimensional Cable ">
            Interdimensional Cable
          </option>
          <option value="Space Tahoe">Space Tahoe</option>
          <option value="Purge Planet ">Purge Planet </option>
          <option value="Kyle's Teenyverse">Kyle's Teenyverse</option>
          <option value="Detoxifier">Detoxifier</option>
          <option value="Alphabetrium">Alphabetrium</option>
          {/* Agrega más opciones según tus necesidades */}
        </select>
      </div>

      {props.myFavorites
        .sort((a, b) => (aux ? a.id - b.id : b.id - a.id))
        .map((character) => (
          <Card key={character.id} {...character} />
        ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  myFavorites: state.myFavorites,
});

export default connect(mapStateToProps)(Favorites);
