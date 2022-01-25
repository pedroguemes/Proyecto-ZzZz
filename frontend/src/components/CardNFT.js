import React, { useState, useEffect } from "react"
import userActions from "../redux/actions/userActions";
import nftActions from "../redux/actions/nftActions";
import { connect } from "react-redux";
import { BsFillBookmarkHeartFill } from "react-icons/bs"
import cartActions from "../redux/actions/cartActions";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom"

const CardNFT = ({ name, type, price, img, stock, clase, favs, id, favorite, userId, nft, favClass, addNftToCart, nfts, cart, store, publicos, propiedad, updateNft, user }) => {

  const [color, setColor] = useState("")
  const [backColor, setBackColor] = useState("")

  useEffect(() => {
    clase === "Common" ? setColor("rgba( 0, 232, 255, 0.25 )") : clase === "Rare" ? setColor("rgba( 0, 160, 42, 0.55 )") : setColor("rgba( 143, 7, 136, 0.55 )")
    clase === "Common" ? setBackColor("rgb(0, 234, 255)") : clase === "Rare" ? setBackColor("rgb(0, 160, 43)") : setBackColor("rgb(143, 7, 136)")
  }, [clase])

  const HandlerUnPublish = (id) => {
    updateNft(id, { public: false })
  }
  const HandlerPublic = (id) => {
    updateNft(id, { public: true })
  }

  const favsAndDisFavs = async () => {
    let fav
      if(favorite.some(fav => fav === userId)){
        fav = {
          nftId: id,
          bool: false
        }
        toast.warning('NFT delete in your favorites', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }else{
        fav = {
          nftId: id,
          bool: true
        }
        toast.success('NFT add in your favorites', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    const retorn = await favs(fav)

    if (retorn.succes) {
      nft()
    }
  }
  return (
    <div className={`contenedor-card-nft ${favClass}`} style={{ border: `6px solid ${color}` }} >
      <div className="container-nft">
        <div className="ochenta-nft">
          <img src={img} alt={name} />
          <h2>{name}</h2>
          <div className={`contenedor-total-clasificacion ${store ? null : "no-estas-en-store"}`}>
            <div className="clasificacion-nft">
              <p style={{ color: `${color}`, fontWeight: "900" }}>Class: {clase}</p>
              <p>Type: {type}</p>
            </div>
            {store ?
              <>
                <div className="contenedor-price-nft">
                  <div>
                    <p style={{ color: "rgb(141, 141, 141)" }}>Price</p>
                    <p>{price} ETH</p>
                  </div>
                  <div>
                    {
                      favorite && favorite.some(fav => fav === userId)
                        ?
                        <BsFillBookmarkHeartFill onClick={() => favsAndDisFavs()} style={{ color: `${color}`, fontSize: "30px", cursor: "pointer" }} />
                        :
                        <BsFillBookmarkHeartFill onClick={() => favsAndDisFavs()} style={{ fontSize: "30px", cursor: "pointer" }} />
                    }
                  </div>
                  <div className="contenedor-buttons-nft">
                    {propiedad.some(e => e === userId) ? <Link to="/Profile" className="button-compra-nft" style={{ color: `${color}`, borderColor: `${color}`, textDecoration: "none" }}>Go to NFT</Link> : stock === 0 ? 
                    <button className="button-compra-nft" style={{ color: `${color}`, borderColor: `${color}` }}>
                      Not Stock
                      <span style={{ backgroundColor: `${backColor}` }}></span><span style={{ backgroundColor: `${backColor}` }}></span><span style={{ backgroundColor: `${backColor}` }}></span><span style={{ backgroundColor: `${backColor}` }}></span>
                    </button> :
                      <button className="button-compra-nft" style={{ color: `${color}`, borderColor: `${color}` }} onClick={() => {
                        if(user !== ""){
                          if (cart.some(element => element._id === id)) {
                            toast.warning('NFT Already added to your cart', {
                              position: "top-right",
                              autoClose: 1500,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            })
                          } else {
                            addNftToCart(id, nfts)
                            toast.info('NFT add in your cart', {
                              position: "top-right",
                              autoClose: 1500,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            })
                          }
                        }else{
                          toast.warning('Please login To buy NFT', {
                            position: "top-right",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                      }
                      }}>
                        Add to Cart
                        <span style={{ backgroundColor: `${backColor}` }}></span><span style={{ backgroundColor: `${backColor}` }}></span><span style={{ backgroundColor: `${backColor}` }}></span><span style={{ backgroundColor: `${backColor}` }}></span>
                      </button>}
                  </div>
                </div>
              </>
              : null}
            {publicos !== "no" ? publicos ? <button onClick={() => HandlerUnPublish(id)} className="botton-public-nft-action">UnPublish</button> : <button onClick={() => HandlerPublic(id)} className="botton-public-nft-action">Public</button> : null

            }
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    nfts: state.nftReducers.nfts,
    cart: state.cartReducers.cart,
    user : state.userReducers.user
  }
}
const mapDispatchToProps = {
  favs: userActions.favs,
  nft: nftActions.getNfts,
  addNftToCart: cartActions.addNftToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(CardNFT);
