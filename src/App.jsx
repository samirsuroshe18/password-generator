import { useState, useCallback, useEffect, useRef } from "react"


function App() {

  let [length, setLength] = useState(8)
  let [numberAllowed, setNumberAllowed] = useState(false)
  let [charAllowed, setCharAllowed] = useState(false)
  let [password, setPassword] = useState("")
  let passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let pass = ""

    if(numberAllowed) str += "012345678901234567890"
    if(charAllowed) str += "`~!@#$%^&*@#$%^&*@#$%^&*@#$%^&*"

    for(let i = 1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length)
      pass += str[char]
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    console.log(passwordRef.current?.value)
    window.navigator.clipboard.writeText(password);
  }, [password])

  return (
    <>
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
          <h1 className="text-white text-center my-3">Password Generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            ref={passwordRef}
            readOnly
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
        </div>
    </>
  )
}

export default App
