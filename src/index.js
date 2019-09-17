import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import Wizard from './components/Wizard'
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <Router>
    <Wizard />
  </Router>
  , document.getElementById('root'))
