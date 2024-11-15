import { createContext , useState } from "react";


export  const CartContext = createContext(null);


export const Cart = ({children})=> {
    
const [cartdata, setCart] = useState([]);

return (
    <CartContext.Provider value={{cartdata,setCart}}>
        {children}
    </CartContext.Provider>
    
)


}

export default  Cart;