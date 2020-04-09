import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  function getRepositories() {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }

  useEffect(() => {
    getRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `New reposiory ${Date.now()}`,
      url: "url repository",
      techs: ["Node", "React", "React Native"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete("/repositories/" + id);
    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id == id
    );
    repositories.splice(repositoryIndex, 1);
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
