import ReactDom from "react-dom";
import React from 'react'
import reportWebVitals from "./reportWebVitals";
import App from './App'
import 'typeface-roboto'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import {AppProvider} from './Context.js'
ReactDom.render(
    <React.StrictMode>
        <AppProvider>
            <BrowserRouter>
                    <App />
            </BrowserRouter>
        </AppProvider>
    </React.StrictMode>
, document.getElementById("root"))


reportWebVitals();

