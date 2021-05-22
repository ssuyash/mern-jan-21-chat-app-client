import React from 'react'
import Join from './components/Join'
import Chat from './components/Chat'
import Socket from './components/Socket'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css'

export default function App() {
  return (
    // <Socket/>
    <Router>
      <Route path="/" component={Join} exact />
      <Route path="/chat" component={Chat} />
    </Router>
  )
}
