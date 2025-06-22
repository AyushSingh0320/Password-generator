import { useState , useCallback , useEffect , useRef} from 'react'

import './App.css'

function App() {
  const [ length , setLength] = useState(8)
  const [numberinclude , setnumberinclude]=useState(false)
  const [charinclude , setcharinclude]=useState(false)
  const [password , setpassword] = useState('')
  const passwordRef = useRef(null);

 const generatePassword = useCallback(()=> {
 let pass = ""
let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
if(numberinclude) str = str + "0123456789"
if(charinclude) str = str + "!@#$%^&*()_+[]{}|;:,.<>?/~`"
for(let i = 1 ; i<= length ; i++){
  const index = Math.floor(Math.random() * str.length)
  pass =  pass + str[index]
}
setpassword(pass);
} , [length, numberinclude, charinclude ])

useEffect(() =>{
generatePassword();
} ,[length, numberinclude, charinclude, generatePassword])

const copyToClipboard = useCallback(() => {
  window.navigator.clipboard.writeText(password)
  passwordRef.current?.select(password);
}, [password] );
 
  return (
    <>
      {/* Enhanced Background wrapper */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-900 bg-cover bg-no-repeat relative overflow-hidden">
        {/* Animated SVG pattern overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.10" />
              </linearGradient>
            </defs>
            <path d="M0,600 C400,700 1040,500 1440,700 L1440,800 L0,800 Z" fill="url(#waveGradient)">
              <animate attributeName="d" dur="8s" repeatCount="indefinite"
                values="M0,600 C400,700 1040,500 1440,700 L1440,800 L0,800 Z;
                        M0,650 C500,600 900,800 1440,650 L1440,800 L0,800 Z;
                        M0,600 C400,700 1040,500 1440,700 L1440,800 L0,800 Z" />
            </path>
          </svg>
        </div>
        {/* Subtle lock icon watermark */}
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center z-0">
          <svg width="400" height="400" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white mx-auto">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 17a2 2 0 002-2v-2a2 2 0 00-2-2 2 2 0 00-2 2v2a2 2 0 002 2zm6-6V9a6 6 0 10-12 0v2a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2z" />
          </svg>
        </div>
        {/* Main container */}
        <div className="relative z-10 w-full max-w-lg mx-auto bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-blue-200">
          <h1 className="font-extrabold text-3xl text-blue-900 text-center mb-6 tracking-wide drop-shadow-lg">
            PASSWORD GENERATOR
          </h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-6 bg-gray-100">
            <input
              type="text"
              value={password}
              className="rounded-none bg-gray-700 text-white w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg tracking-wider"
              placeholder="Generated Password"
              readOnly
              ref={passwordRef}
            />
            <button className="bg-blue-600 text-white px-5 py-2 text-lg font-semibold hover:bg-blue-700 transition rounded-none" onClick={copyToClipboard}>
              COPY
            </button>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={8}
                max={20}
                value={length}
                className="cursor-pointer accent-blue-600 w-full"
                onChange={(e) => setLength(e.target.value)}
              />
              <label className="font-medium text-blue-900">Length: <span className="font-bold">{length}</span></label>
            </div>
            <div className="flex items-center gap-6 justify-center">
              <label className="flex items-center gap-2 font-medium text-blue-900">
                <input
                  type="checkbox"
                  checked={numberinclude}
                  id="numberinclude"
                  onChange={() => setnumberinclude(!numberinclude)}
                  className="accent-blue-600 w-5 h-5"
                />
                Numbers
              </label>
              <label className="flex items-center gap-2 font-medium text-blue-900">
                <input
                  type="checkbox"
                  checked={charinclude}
                  id="charinclude"
                  onChange={() => setcharinclude(!charinclude)}
                  className="accent-blue-600 w-5 h-5"
                />
                Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
