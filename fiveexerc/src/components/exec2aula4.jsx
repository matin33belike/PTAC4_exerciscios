import { useEffect, useState } from 'react'

function BuscaUserErrado() {
  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  useEffect(() => {
    async function busca() {
      setCarregando(true)
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/usersenterrado')
        const data = await response.json()
        setUsuarios(data)
      }
      catch (erro) {
        setErro(erro.message || 'Erro ao buscar usuários')
      }
      finally {
        setCarregando(false)
      }
    }

    busca()
  }, [])
  if (carregando) return <p>Carregando...</p>
  
  if (erro) return <p>Erro: {erro}</p>
  

  return (
    <main>
      <h1>Usuários</h1>
      <ul>
        {usuarios.map(u => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </main>
  )
}

export default BuscaUserErrado