import { BsArrowDownCircle, BsFileEaselFill } from "react-icons/bs"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import CardNFT from "../components/Cart/CardNFT"
import cartActions from "../redux/actions/cartActions"
import PayPal from "../components/Cart/PayPalForm/PayPal"

const Cart = ({ cart, clearCartAll, deleteOneNFT, setTotalPrice }) => {

    const [code, setCode] = useState(false)
    const [discount, setDiscount] = useState("")

    const descounts = ["#246FIRSTPURCHASENFTCART", "#AGUANTELOSNFT2022", "ESTASFULLPICADOPAA"]

    let subTotal = 0

    const [total, setTotal] = useState(subTotal)

    useEffect(() => {
        discountes()
    }, [cart, subTotal])

    cart.forEach(item => {
        return subTotal = subTotal + item.price
    })


    const discountes = () => {
        if (descounts.some(item => item === discount)) {
            setTotal(subTotal - (subTotal * 0.1))
        } else {
            setTotal(subTotal)
        }
    }

    useEffect(() => {
        setTotalPrice(total)
    }, [total])

    return (
        <>
            <div style={{ height: "70px" }} ></div>
            <div className="contenedor-total-shopping">
                <div className="contenedor-left-shopping">
                    <div className="shippoing-left-divone"><h2>Get 10% off your first NFT purchase by entering the following discount code.</h2></div>
                    <div className="shippoing-left-divtwo"><p>YOUR CART ({cart.length})</p> <p onClick={() => clearCartAll()}>CLEAR CART</p></div>
                    <div className="shippoing-left-divtree">
                        {cart.map((element, i) => {
                            return <CardNFT key={i} data={element} remove={deleteOneNFT} />
                        })}
                    </div>
                </div>
                <div className="contenedor-rigth-shopping">
                    <div><h2>SUMMARY</h2></div>
                    <div></div>
                    <div><p>DO YOU HAVE A PROMO CODE?</p><BsArrowDownCircle onClick={() => { setCode(!code) }} />
                        {code ? <><input type="text" placeholder="#246FIRSTPURCHASENFTCART" onChange={(e) => setDiscount(e.target.value)}></input><button onClick={() => discountes()} style={{ heigth: "40px", width: "40px" }}>enter</button></> : null}
                    </div>
                    <div></div>
                    <div><p>SUBTOTAL</p><p>${subTotal}</p></div>
                    <div></div>
                    <div><p>Once payment is made, no refunds are accepted, the process may take 1 to 10 minutes to be completed successfully.</p></div>
                    <div></div>
                    <div><p>TOTAL</p><p>${total}</p></div>
                    <div></div>
                    <div>
                        <PayPal clearCartAll={clearCartAll} active='shopping' />
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cartReducers.cart,
    }
}
const mapDispatchToProps = {
    clearCartAll: cartActions.removeAllFromCart,
    deleteOneNFT: cartActions.removeOneFromCart,
    setTotalPrice: cartActions.setTotalPrice
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
