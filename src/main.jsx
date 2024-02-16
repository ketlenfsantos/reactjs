import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

/*
ReactDOM (integra o react para funcioanr ambiente web.)
explicação itens abaixo:
chamamos o método creatoRoot de dentro do react dom, esse create root 
recebe um parametro de quem e o elemento raiz do html (o root), com isso
ele cria um html/css/js dentro do elemento raiz, dentro da div root
ele renderiza, mostrar em tela (render) algo do react
*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
