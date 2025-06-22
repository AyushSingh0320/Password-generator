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

  <div className='w-full max-w-md mx-auto bg-white p-6 my-8 rounded-lg shadow-lg text-blue-800'>
    <h1 className=' font-bold underline  text-black text-center my-3 '>
    PASSWORD GENERATOR
  </h1>
  <div className='flex shadow rounded-lg overflow-hidden mb-4'>
<input
type = "text" 
value={password}
className='rounded-lg bg-gray-700 text-white w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
placeholder='Generated Password'
readOnly
ref={passwordRef}
/>
<button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mx-2' onClick={copyToClipboard}>
  COPY
</button>
  </div>
<div className='flex items-center gap-x-2'>
<input type="range"
min={8}
max={20}
value={length}
className='cursor-pointer'
onChange={(e) => setLength(e.target.value)}
/>
<label>Length: {length}</label>
<input type='checkbox'
defaultChecked={numberinclude}
id='numberinclude'
onChange={() => setnumberinclude(!numberinclude)}
/>
<label>Numbers</label>
<input type='checkbox'
defaultChecked={charinclude}
id='charinclude'
onChange={() => setcharinclude(!charinclude)}/>
<label>Characters</label>

</div>
 
  </div>
    </>
  )
}

export default App
