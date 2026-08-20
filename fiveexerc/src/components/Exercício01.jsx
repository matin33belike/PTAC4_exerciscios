import { useEffect, useState } from "react"

export default function Exercicio01() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function buscarPosts() {
            const resposta = await fetch('https://jsonplaceholder.typicode.com/posts')
            const dados = await resposta.json()
            setPosts(dados)
        }
        buscarPosts()
    }, [])

    return (
        <section>
            <h1>Exercício 01</h1>
            <ul>
                {
                    posts
                    .filter((_, index) => {index <= 9})
                    .map(post => <li key={post.id}>{post.id} - {post.title}</li>)
                }
            </ul>
        </section>
    )
}