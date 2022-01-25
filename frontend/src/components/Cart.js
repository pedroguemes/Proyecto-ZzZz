import imagen from '../assets/verdeBackground.jpg'
import React from "react"

const Cart = () => {


    return (
        <div className="contenedor-carrito" >
           <h3>Your Shopping cart 🛒:</h3>
                <div className="producto-en-carrito">
                        <div className='contenedor-imagen-nft-carrito'><img src={imagen} alt="imagen del nft"/></div>
                        <div>
                                <p>NFTs Title/name</p>
                                <p>by: author</p>
                        </div>
                        {/* <div><p>by: author</p></div> */}
                        <div><p>price$</p></div>
                        <div><button>❌</button></div>

                </div>
                <div className="producto-en-carrito">
                        <div className='contenedor-imagen-nft-carrito'><img src={"https://images-zzz.netlify.app/asstes/speed.jpg"} alt="imagen del nft"/></div>
                        <div>
                                <p>NFTs Title/name</p>
                                <p>by: author</p>
                        </div>                        {/* <div><p>by: author</p></div> */}
                        <div><p>price$</p></div>
                        <div><button>❌</button></div>
                </div>                
                <div className="total-carrito">
                        <div><p>Total:</p></div>
                        <div><p>(total-price$)</p></div>
                </div>
                <div className="total-carrito">
                        <button className='button-cancelar-compra'>cancel-purchase</button>
                        <button className='button-completar-compra'>Complete-purchase</button>
                </div>
        </div>
    )
}

export default Cart