import { createContext } from "react";


export default createContext({
getRandom:(max=11, min=0)	=>{
	Math.floor(Math.random()*(max-min)+min)
}

})
