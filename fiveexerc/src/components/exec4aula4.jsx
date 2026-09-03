import { useEffect, useState } from 'react'

function BuscaUserVazio() {
  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function busca() {
      setCarregando(true)
      try {
        await fetch('https://jsonplaceholder.typicode.com/users')
        const data = [] 
        setUsuarios(data)
      } finally {
        setCarregando(false)
      }
    }

    busca()
  }, [])

  return (
    <main>
      <h1>Usuários</h1>
      
      {carregando ? (
        <p>Carregando...</p>
      ) : usuarios.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <ul>
          {usuarios.map(u => (
            <li key={u.id}>{u.name}</li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default BuscaUserVazio
