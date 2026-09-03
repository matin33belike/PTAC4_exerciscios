import BuscaUser from "./components/exec1aula4.jsx";
import BuscaUserErrado from "./components/exec2aula4.jsx";
import BuscaUserAbort from "./components/exec3aula4.jsx";
import BuscaUserVazio from "./components/exec4aula4.jsx";
import BuscaUserApi from "./components/exec5aula4.jsx";
function App () {
    return (
      <div>
        <h1>Exercício1</h1>
        <BuscaUser />
        <h1>Exercício2</h1>
        <BuscaUserErrado />
        <h1>Exercício3</h1>
        <BuscaUserAbort />
        <h1>Exercício4</h1>
        <BuscaUserVazio />
        <h1>Exercício5</h1>
        <BuscaUserApi />
      </div>
    )
  }

export default App
