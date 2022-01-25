import { connect } from "react-redux";
import CardNFT from "../components/CardNFT";


const Favs = ({nfts, user}) => {


    const favNft = []

    nfts.map(nft => {
        nft.favs.map(fav => {
            return fav === user.userID ? favNft.push(nft) : null
        })
    })

    return (
        <div>
            <div style={{height:"120px"}} ></div>
            <div className="fav-card-nft-heigth">
                {
                    favNft.map(element => {
                        return <CardNFT name={element.name} type={element.type} price={element.price} img={element.img} propiedad={element.users} clase={element.clase} id={element._id} favorite={element.favs} userId={user.userID} favClass={"favClass"} store={true} publicos={"no"}/>
                    })
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        nfts : state.nftReducers.nfts,
        user : state.userReducers.user
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Favs)
