import React from "react"
import * as ReactDOMClient from "react-dom/client"
import App from "./App"
import './index.css'

const rootElement = document.getElementById('app')


//const root = ReactDOMClient.createRoot(rootElement);


//root.render(elements, rootElement)
const app = ReactDOMClient.createRoot(document.getElementById('app'))
app.render(<App/>)
