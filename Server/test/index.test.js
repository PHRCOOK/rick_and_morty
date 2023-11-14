const app = require("../Src/App");
const session = require("supertest");
const agent = session(app);

describe("Test de RUTAS", () => {
  //describe 1
  describe("GET /rickandmorty/character/:id", () => {
    //TEST 4.1
    it("Responde con status: 200", async () => {
      await agent.get("/rickandmorty/character/1").expect(200);
    });
  });
  it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
    //TEST 4.2
    const response = (await agent.get("/rickandmorty/character/1")).body;
    expect(response).toHaveProperty("id");
    expect(response).toHaveProperty("name");
    expect(response).toHaveProperty("species");
    expect(response).toHaveProperty("gender");
    expect(response).toHaveProperty("status");
    expect(response).toHaveProperty("origin");
    expect(response).toHaveProperty("image");
  });
  it("Si hay un error responde con status: 500", async () => {
    //TEST 4.3
    await agent.get("/rickandmorty/character/999999").expect(500);
  });
  //describe 2
  describe("GET /rickandmorty/login", () => {
    //TEST 5.1
    it("La informacion del login es correcta", async () => {
      const response = (
        await agent.get(
          `/rickandmorty/login?email=ejemplo@gmail.com&password=aaa123`
        )
      ).body;
      expect(response.access).toEqual(true);
    });
    //TEST 5.2
    it("La informacion del login es incorrecta", async () => {
      const response = (
        await agent.get(
          `/rickandmorty/login?email=sdasdjlajs&password=nkjsdkfnsjnlas`
        )
      ).body;
      expect(response.access).toEqual(false);
    });

    //DESCRIBE 3
    //test 6.1
    describe("POST /rickandmorty/fav", () => {
      const char1 = { id: "1", name: "Pablo" };
      const char2 = { id: "2", name: "Maria" };
      it("Devuelve la informacion en un arreglo", async () => {
        const response = (await agent.post("/rickandmorty/fav").send(char1))
          .body;
        expect(response).toContainEqual(char1);
      });
      it("Debe enviar un nuevo elemento por body, este debe ser devuelto en un arreglo que incluye un elemento enviado previamente.", async () => {
        const response = (await agent.post("/rickandmorty/fav").send(char2))
          .body;
        expect(response).toContainEqual(char1);
        expect(response).toContainEqual(char2);
      });
    });
    //DESCRIBE 4

    describe("DELETE /rickandmorty/fav/:id", () => {
      const char1 = { id: "1", name: "Pablo" };
      const char2 = { id: "2", name: "Maria" };

      it("Devuelve un arreglo con los elementos previos", async () => {
        const response = (await agent.delete("/rickandmorty/fav/3").send(char1))
          .body;
        expect(response).toContainEqual(char1);
        expect(response).toContainEqual(char2);
      });
      it("Elimina correctamente un personaje pasado por ID", async () => {
        const response = (await agent.delete("/rickandmorty/fav/1")).body;
        expect(response).not.toContainEqual(char1);
        expect(response).toContainEqual(char2);
      });
    });
  });
});
