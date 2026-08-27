import { useEffect, useState } from 'react'

function BuscaUser() {
  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)
  useEffect(() => {
    async function busca() {
      setCarregando(true)
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
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
      <ul>
        {usuarios.map(u => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </main>
  )
}

export default BuscaUser