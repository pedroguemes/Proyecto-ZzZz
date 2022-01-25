import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { connect } from "react-redux"
import nftActions from '../../../redux/actions/nftActions'
import transactionActions from '../../../redux/actions/transactionActions'
import offerActions from '../../../redux/actions/offerActions'
import { toast } from 'react-toastify'




const PayPal = ({ total, cart, user, updateNft, active, mount, seller, addTransaction, subHandlder, updateOffer, clearCartAll }) => {

    const [orderID, setOrderID] = useState(false)
    const [ErrorMessage, setErrorMessage] = useState("");
    let descript = 'Your buy was'

    useEffect(() => {

        if (cart.length > 1) {

            cart.forEach(item => {
                descript += `,${item.name}`
            })

        } else if (cart.length === 1 && cart) {
            descript = `${cart[0].name}`
        }

        PayPalCheckOut()

    }, [total])

    const initialOptions = {
        "client-id": "AVCPlR0xQykftoUsT_0gfIOtpXIK0RPHMn5h0PycQMUm2rNx0tEKfGxOLgYbPNP0W3iNUwty8jZyWg0k",
        currency: "USD",
        intent: "capture"
    }

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: 'Compraste',
                    amount: {
                        value: mount ? mount : total
                    }
                }
            ]
        })
    }

    const onApprove = (data, actions) => {
        return actions.order.capture()
            .then(function (details) {
                const { payer } = details;
                var transaction = details.purchase_units[0].payments.captures[0];
                setOrderID(transaction.id)
                toast.success('Purchase successful', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                switch (active) {
                    case 'shopping':
                        if (cart.length > 1) {

                            cart.forEach(item => {
                                updateNft(item._id, { stock: item.stock - 1, users: [...item.users, user.userID] })
                            })

                        } else {
                            updateNft(cart[0]._id, { stock: cart[0].stock - 1, users: [...cart[0].users, user.userID] })
                        }
                        break;
                    case 'subscription':
                        subHandlder()
                        break;
                    case 'offer':
                        const transaction = {
                            userBuyer: user.userID,
                            userSeller: seller.userId,
                            nftOffer: seller.offerId,
                            mount: mount
                        }
                        addTransaction(transaction)
                        updateOffer(seller.offerId, { public: false, user: user.userID })

                        break;
                    default:
                        new Error('Invalid option')
                }

                if (cart.length > 1) {
                    cart.forEach(item => {
                        updateNft(item._id, { stock: item.stock - 1, users: [...item.users, user.userID] })
                    })
                } else {
                    updateNft(cart[0]._id, { stock: cart[0].stock - 1, users: [...cart[0].users, user.userID] })
                }
                if (transaction.status === "COMPLETED") {
                    clearCartAll && clearCartAll()
                }
            })
        // se actualiza el offerNFT
    }
    const onCancel = (data) => {
        toast.warning('Purchase canceled', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }
    const onError = (data, actions) => {
        setErrorMessage('An Error ocurred with your payment')
    }
    const PayPalCheckOut = () => {
        return (
            <PayPalScriptProvider options={initialOptions}>

                <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                    onCancel={onCancel}
                />

            </PayPalScriptProvider>
        )
    }

    return (
        <PayPalCheckOut className="paypal-button-store" />
    )
}

const mapStateToProps = (state) => {
    return {
        total: state.cartReducers.total,
        cart: state.cartReducers.cart,
        user: state.userReducers.user
    }
}
const mapDispatchToProps = {
    updateNft: nftActions.updateNft,
    updateOffer: offerActions.updateOffer,
    addTransaction: transactionActions.addTransaction
}
export default connect(mapStateToProps, mapDispatchToProps)(PayPal)
