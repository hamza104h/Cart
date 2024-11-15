import { createContext , useState } from "react";


export const counterContext = createContext();

export const CounterProdiver = ({children}) => {
    const [data, setData] = useState([]);
    
    return (
        <counterContext.Provider value={{data,setData}}>
            {children}
        </counterContext.Provider>
    )
}

export default CounterProdiver;  
