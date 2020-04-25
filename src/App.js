import React, {useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=> {
    api.get('repositories').then(response =>{
      setRepositories(response.data);
      console.log(response)
    });
  }, []);

  // repository = response.data;

  // setRepositories([...repositories, repository]);

  async function handleAddRepository() { 
    const response = await api.post('repositories', {
      title: `Novo repositório ${Date.now()}`,
      owner: "Faran Resolve"
    });
    const repository = response.data

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    let index = repositories.findIndex(function(o){
      return o.id===id
    })

    repositories.splice(index, 1);

    api.delete('repositories/'+id);     

    setRepositories([...repositories]);
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        
        )}
      </ul>

      
    </div>
  );
}

export default App;
