import { useEffect } from "react"
import { connect } from "react-redux"
import nftActions from "../../redux/actions/nftActions"
import offerActions from "../../redux/actions/offerActions"
import ScrollContainer from 'react-indiana-drag-scroll'
import CardNFT from "../CardNFT"
import OfferCard from "../MarketPlace/OfferCard"

const Wallet = ({ user, getNft, userNfts, userOffers, getOffersByUser, updateNft }) => {


    useEffect(() => {
        getNft(user.userID)
        getOffersByUser(user.userID)
    }, [])



    return (
        <div className="container-wallet-profile-total">
            <h2>Your unics NFTs collections</h2>
            <ScrollContainer className="container">
                <div style={{ display: "flex" }} >
                    {userNfts &&
                        userNfts.map(e => {
                            return (
                                <CardNFT name={e.name} type={e.type} price={e.price} img={e.img} clase={e.clase} id={e._id} favorite={e.favs} store={false} publicos={"no"} />
                            )
                        })
                    }
                </div>
            </ScrollContainer>
            <h2>Your offerts public NFTs </h2>
            <ScrollContainer className="container">
                {userOffers &&
                    userOffers.map(e => {
                        return (
                            e.public ?
                                <CardNFT name={e.name} type={e.type} price={e.price} img={e.img} clase={e.clase} id={e._id} favorite={e.favs} store={false} publicos={true} updateNft={updateNft} />
                                : null
                        )
                    })}
            </ScrollContainer>
            <h2>Your offerts NFTs unpublish</h2>
            <ScrollContainer className="container">
                {userOffers &&
                    userOffers.map(e => {
                        return (
                            e.public ? null :
                                <CardNFT name={e.name} type={e.type} price={e.price} img={e.img} clase={e.clase} id={e._id} store={false} publicos={false} updateNft={updateNft} />
                        )
                    })

                }
            </ScrollContainer>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducers.user,
        userNfts: state.nftReducers.userNfts,
        userOffers: state.offerReducers.userOffers
    }
}

const mapDispatchToProps = {
    getNft: nftActions.getNftsByUser,
    getOffersByUser: offerActions.getOffersByUser,
    updateNft: offerActions.updateOffer
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet)