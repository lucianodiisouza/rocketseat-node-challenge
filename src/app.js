const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// simple_list - done
app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

// create - done
app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return res.json(repository);
});

// update - done
app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  const toUpdate = repositories.findIndex((repository) => repository.id === id);

  if (toUpdate < 0) {
    return res.status(404).json({ error: "Repository not found" });
  }

  const actualLikes = repositories[toUpdate].likes;

  const repository = {
    id,
    title,
    url,
    techs,
    likes: actualLikes,
  };

  repositories[toUpdate] = repository;

  return res.json(repository);
});

// delete - done
app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const toRemove = repositories.findIndex((repository) => repository.id === id);

  if (toRemove < 0) {
    return res.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(toRemove, 1);

  return res.json({ message: "Repository deleted" });
});

// like repo
app.post("/repositories/:id/like", (req, res) => {
  // TODO
});

module.exports = app;
