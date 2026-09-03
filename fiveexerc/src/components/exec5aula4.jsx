import { useEffect, useState } from 'react'

function BuscaUserApi() {
  const [itens, setItens] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const [cenario, setCenario] = useState('sucesso') 

  useEffect(() => {
    const controller = new AbortController()
    
    async function carregarDados() {
      setCarregando(true)
      setErro(null)
      setItens([])

      try {
        await new Promise(resolve => setTimeout(resolve, 1500))

        const urlSucesso = 'https://jsonplaceholder.typicode.com/users'
        const urlErro = 'https://url-que-nao-existe-erro-propositado.com'
        
        const urlFinal = cenario === 'erro' ? urlErro : urlSucesso

        const response = await fetch(urlFinal, { signal: controller.signal })
        
        if (!response.ok) {
          throw new Error(`Erro no servidor: ${response.status}`)
        }

        let data = await response.json()

        if (cenario === 'vazio') {
          data = []
        }

        setItens(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setErro(err.message || 'Ocorreu um erro inesperado.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setCarregando(false)
        }
      }
    }

    carregarDados()

    return () => {
      controller.abort()
    }
  }, [cenario])

  return (
    <main>
      <h1>Status da API</h1>

      <div>
        <button onClick={() => setCenario('carregando')}>Testar Carregando Permanente</button>
        <button onClick={() => setCenario('sucesso')}>Testar Sucesso (API Real)</button>
        <button onClick={() => setCenario('vazio')}>Testar Vazio ([])</button>
        <button onClick={() => setCenario('erro')}>Testar Erro (URL Inválida)</button>
      </div>

      <div>
        {carregando && cenario !== 'sucesso' && cenario !== 'vazio' && cenario !== 'erro' ? (
          <p><strong>Carregando...</strong></p>
        ) : carregando ? (
          <p><strong>Carregando...</strong> Aguarde </p>
        ) : erro ? (
          <p><strong>Erro: {erro}</strong></p>
        ) : itens.length === 0 ? (
          <p><strong>Nenhum item encontrado.</strong></p>
        ) : (
          <div>
            <p><strong>Sucesso: {itens.length} itens carregados.</strong></p>
            <ul>
              {itens.map(item => (
                <li key={item.id}>{item.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  )
}

export default BuscaUserApi
