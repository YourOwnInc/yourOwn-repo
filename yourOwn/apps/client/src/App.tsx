import { useState } from 'react'
import { SkeletonPage } from './portfolio'


import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
        <SkeletonPage/>
     
    </>
  )
}

export default App
