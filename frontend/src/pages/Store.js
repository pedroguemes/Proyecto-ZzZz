import CardNFT from "../components/CardNFT"
import { useState, useEffect } from "react";
import nftActions from "../redux/actions/nftActions"
import { connect } from "react-redux";
import ScrollContainer from 'react-indiana-drag-scroll'

const Store = (props) => {

    const [categoria, setCategoria] = useState("All");
    const [rareza, setRareza] = useState("All");

    useEffect(() => {
        props.nft()
    }, [])

    let arrayFalso = props.nfts

    useEffect(() => {
        arrayFalso = props.nfts
        setNftDefault(arrayFalso)
        setNft(arrayFalso)
        setAuxiliar(nft)
    }, [props.nfts])
    const [nftDefault, setNftDefault] = useState(arrayFalso);
    const [nft, setNft] = useState(arrayFalso);
    const [auxiliar, setAuxiliar] = useState(nft)
    const fetchear = () => {
        if (categoria !== "All") {
            let resultado = nftDefault.filter((e) => rareza === "All" ? e.type === categoria : e.type === categoria && e.clase === rareza)
            setNft(resultado)
            setAuxiliar(resultado)
        } else if (categoria === "All" && rareza !== "All") {
            let resultado = nftDefault.filter((e) => e.clase === rareza)
            setNft(resultado)
            setAuxiliar(resultado)
        } else {
            setNft(arrayFalso)
            setAuxiliar(arrayFalso)
        }
    }
    const fetchearRareza = () => {
        if (rareza !== "All") {
            let resultado = nft.filter((e) => categoria === "All" ? e.clase === rareza : e.type === categoria && e.clase === rareza)
            setAuxiliar(resultado)
        } else if (categoria !== "All" && rareza === "All") {
            let resultado = nftDefault.filter((e) => e.type === categoria)
            setAuxiliar(resultado)
        } else {
            setNft(arrayFalso)
            setAuxiliar(arrayFalso)
        }
    }

    return (
        <div>
            <div style={{ height: "120px" }} ></div>
            <div className="contenedor-store-public">
                <div>
                    <h1>Collect & Sell Your NFTs</h1>
                    <p>Live the new life check it out now.</p>
                </div>
                <div>
                    <div></div>
                </div>
            </div>

           


            <div className="contenedor-top-sellers-store">
                <div className="sellers">
                    <div className="title-top-sellers">
                        <p>Top Sellers</p>
                    </div>
                    <ScrollContainer className="container">
                        <div style={{ display: "flex" }} >
                            {
                                props.topNfts.map((element, index) => {
                                    return (
                                        index < 6 && 
                                        <CardNFT name={element.name} stock={element.stock} type={element.type} price={element.price} img={element.img} clase={element.clase} id={element._id} favorite={element.favs} propiedad={element.users} userId={props.userId.userID} store={true} publicos={"no"}/>
                                    )
                                })
                            }
                        </div>
                    </ScrollContainer>
                </div>
            </div>
            <div className="contenedor-top-sellers-store">
                <div className="sellers">
                    <div className="title-top-sellers flex-all-sellers">
                        <p>All</p>
                        <div className="filter-all-select">
                            <select onClick={fetchearRareza} onChange={(e) => { setRareza(e.target.value) }}>
                                <option value="All">All</option>
                                <option value="Common">Common</option>
                                <option value="Rare">Rare</option>
                                <option value="Mythical">Mythical</option>
                            </select>
                            <select onClick={fetchear} onChange={(e) => { setCategoria(e.target.value) }}>
                                <option value="All">All</option>
                                <option value="Gamer">Gamer</option>
                                <option value="Cyberpunk">Cyberpunk</option>
                                <option value="Arte">Arte</option>
                            </select>
                        </div>
                    </div>
                    <ScrollContainer className="container">
                        <div style={{ display: "flex" }} >
                            {
                                auxiliar.length > 0 ? auxiliar.map((element, index) => {
                                    return (
                                        <CardNFT name={element.name} type={element.type} stock={element.stock} price={element.price} img={element.img} clase={element.clase} id={element._id} propiedad={element.users} favorite={element.favs} userId={props.userId.userID} store={true} publicos={"no"}/>
                                    )
                                }) : <h1>NFT not found</h1>
                            }
                        </div>
                    </ScrollContainer>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return (
        {
            topNfts: state.nftReducers.topNfts,
            nfts: state.nftReducers.nfts,
            userId: state.userReducers.user
        }
    )
}
const mapDispatchToProps = {
    nft: nftActions.getNfts
}

export default connect(mapStateToProps, mapDispatchToProps)(Store)
