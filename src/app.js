const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes } = request.body;
  const repositori = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(repositori)
  return response.status(200).json(repositori)

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoriIndice = repositories.findIndex(repositori => repositori.id === id)
  if (repositoriIndice < 0) {
    return response.status(400).json({ error: "repositorie not found" })
  }

  const { url, title, techs } = request.body;
  const repositorie = {
    id,
    url,
    title,
    techs,
    likes: repositories[repositoriIndice].likes,

  }
  repositories[repositoriIndice] = repositorie;
  return response.status(200).json(repositorie)

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoriIndice = repositories.findIndex(repositori => repositori.id === id)
  if (repositoriIndice < 0) {
    return response.status(400).json({ error: "repositorie not foind" })
  }

  repositories.splice(repositoriIndice, 1);
  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoriIndice = repositories.findIndex(repositori => repositori.id === id)
  if (repositoriIndice < 0) {
    return response.status(400).json({ error: "repository not foind" })
  }

  repositories[repositoriIndice].likes += 1;
  return response.json(repositories[repositoriIndice])

});

module.exports = app;
