import { useEffect, useState } from 'react'

function BuscaUserAbort() {
  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    async function busca() {
      setCarregando(true)
      setErro(null)
      
      try {
        const response = await fetch('https://typicode.com', { signal })
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} - ${response.statusText}`)
        }

        const data = await response.json()
        setUsuarios(data)
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Requisição cancelada: Componente desmontou.')
          return
        }
        setErro(err.message || 'Erro desconhecido na requisição')
      } finally {
        if (!signal.aborted) {
          setCarregando(false)
        }
      }
    }

    busca()

    return () => {
      controller.abort()
    }
  }, [])

  if (erro) {
    return (
      <main>
        <h1>Usuários</h1>
        <p>Erro: {erro}</p>
      </main>
    )
  }

  return (
    <main>
      <h1>Usuários</h1>
      {carregando ? (
        <p>Carregando...</p>
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

export default BuscaUserAbort
