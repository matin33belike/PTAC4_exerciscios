import { useEffect, useState } from "react"

export default function Exercicio01() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function buscarPosts() {
            const resposta = await fetch('https://jsonplaceholder.typicode.com/posts')
            const dados = await resposta.json()
            setPosts(dados)
        }
    }, [])

    return (
        <section>
            <h1>Exercício 01</h1>
        </section>
    )
}