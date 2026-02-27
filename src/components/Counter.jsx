import { useState } from "react"
const Counter = () => {
const [angka, setAngka] = useState(110)
    return(
    
    <div>
            <p>Angka : {angka}</p>
            <button onClick={() => setAngka(angka +11 )}>tambah</button>
    </div>
    )
} 
export default Counter