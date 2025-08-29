import { useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
  }
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);      
    }else{
      toast.error("Count cannot be negative");
    }
  }
  const reset = () => {
    setCount(0)
  }
  return (
    <>
      <div className='App'>
        <div className='header'>
          <h1>React counter App</h1>
        </div>
        <div className='counter'>
          <h2>Count: {count}</h2>
          <div className='buttons'>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            <button onClick={reset}>Reset</button>
          </div>
         </div> 
         <Toaster position="bottom-right" />
      </div>
    </>
  )
}

export default App
