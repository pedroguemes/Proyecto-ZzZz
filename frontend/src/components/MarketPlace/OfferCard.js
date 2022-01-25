import React, { useState, useEffect } from 'react'
import PayPal from '../Cart/PayPalForm/PayPal'
import { connect } from 'react-redux'
const OfferCard = (props) => {

    const { clase, date, img, name, price, user, _id, type } = props.nftOffer

    const [color, setColor] = useState("")
    const [buyNft, setBuyNft] = useState("")
    const [modal, setModal] = useState(false)

    useEffect(() => {
        clase === "Common" ? setColor("rgba( 0, 232, 255, 0.25 )") : clase === "Rare" ? setColor("rgba( 0, 160, 42, 0.55 )") : setColor("rgba( 143, 7, 136, 0.55 )")
    }, [clase])

    return (
        <>
            {user && props.nftOffer.public && props.nftOffer.valid === 'accepted' ?
                <div className='card-container-offert-accept' style={{ border: `6px solid ${color}` }}>
                    <div className='card-container-offert-img'><img src={img} alt={name} /></div>
                    <div className='card-container-offert-text'>
                        <div>
                            <img src={user.userImg} alt={user.name} />
                            <p>@{user.name}</p>
                        </div>
                        <p>{name} - {type}</p>
                        <p>{price} ETH</p>
                        <div>
                            {(props.userLogged.userID !== user._id) && <p p onClick={() => { setModal(true); setBuyNft({ clase, img, name, price, user, _id, type }) }}>Buy</p>}
                        </div>
                    </div>
                </div> : null
            }
            {
                modal ?
                    <div onClick={(e) => {
                        if (e.target.className === 'position-cienporciento') {
                            setModal(false)
                        }
                    }
                    } className='position-cienporciento'>
                        <div className="modal-market-place-pagos">
                            <p style={{ cursor: 'pointer', position: 'absolute', alignSelf: 'flex-start' }} onClick={() => setModal(false)}> X </p>
                            <div className='market-modal-left-column'>
                                <div className='market-modal-nft-card'>
                                    <div style={{ backgroundImage: `url(${img})` }} className='modal-nft-header'></div>
                                    <div className='modal-nft-body'>
                                        <h2>Author - {user.name}</h2>
                                        <div className='modal-nft-main-body'>
                                            <div className='modal-nft-body-left'>
                                                <h2>{name}</h2>
                                                <h2>{type}</h2>
                                                <h2>{clase}</h2>
                                                <h2>{price}ETH</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='market-modal-right-column'>
                                <div className='market-modal-payments'>
                                    <PayPal mount={price} active='offer' seller={{ userId: user._id, offerId: _id, name }} />
                                </div>

                            </div>
                        </div>
                    </div>
                    : null

            }
        </>
    )
}

const mapStateToProps = (state) => ({
    userLogged: state.userReducers.user

})
export default connect(mapStateToProps, null)(OfferCard)
