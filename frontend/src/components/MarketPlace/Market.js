import React, { useState, useRef, useEffect } from 'react'
import OfferCard from './OfferCard'
import { MdOutlineDesignServices, MdAutoFixNormal, MdClass } from "react-icons/md"
import { GiPorcupinefish, GiSteampunkGoggles } from "react-icons/gi"
import { BiGame, BiArrowToLeft, BiArrowFromLeft } from "react-icons/bi"
import { FaEthereum } from "react-icons/fa"
import { connect } from 'react-redux'
import offerActions from '../../redux/actions/offerActions'
import transactionActions from '../../redux/actions/transactionActions'

const Market = (props) => {
    const [filterView, setFilterView] = useState(false)
    const [select, setSelect] = useState({ art: false, cyber: false, gamer: false })
    const [view, setView] = useState({})
    useEffect(() => {
        props.getOffers()
        props.getRecents()
        props.getTopCreators()
    }, [])


    useEffect(() => {
        let aleatorio = Math.random() * (props.auxOffertsDos.length)
        aleatorio = Math.floor(aleatorio)
        setView(props.auxOffertsDos[aleatorio])
    }, [props.auxOffertsDos])
    const nname = useRef()
    const cyberpunk = useRef()
    const art = useRef()
    const classes = useRef()


    const handlerFilter = () => {
        const checkboxes = []
        checkboxes.push(art.current)
        checkboxes.push(cyberpunk.current)
        const filteredOffers = props.auxOffers.filter(offer => offer.public)
        const seleccionados = checkboxes.filter(checkbox => checkbox.checked)
        const selectedValues = seleccionados.map(seleccionado => seleccionado.value)
        const selected = Array.from(classes.current).find(option => option.selected)
        let print
        if (selectedValues.length > 0 && (selected && selected.text !== 'All') && nname.current.value === '') {
            print = filteredOffers.filter(offer => selectedValues.includes(offer.type) && selected.value === offer.clase)
        } else if (selectedValues.length > 0 && !(selected && selected.text !== 'All') && nname.current.value === '') {
            print = filteredOffers.filter(offer => selectedValues.includes(offer.type))
        } else if (selectedValues.length == 0 && (selected && selected.text !== 'All') && nname.current.value === '') {
            print = filteredOffers.filter(offer => selected.value === offer.clase)
        } else if (selectedValues.length > 0 && (selected && selected.text !== 'All') && nname.current.value !== '') {
            print = filteredOffers.filter(offer => selectedValues.includes(offer.type) && selected.value === offer.clase && offer.name.toLowerCase().trim().startsWith(nname.current.value.toLowerCase().trim()))
        } else if (selectedValues.length > 0 && !(selected && selected.text !== 'All') && nname.current.value !== '') {
            print = filteredOffers.filter(offer => selectedValues.includes(offer.type) && offer.name.toLowerCase().trim().startsWith(nname.current.value.toLowerCase().trim()))
        } else if (selectedValues.length == 0 && (selected && selected.text !== 'All') && nname.current.value !== '') {
            print = filteredOffers.filter(offer => selected.value === offer.clase && offer.name.toLowerCase().trim().startsWith(nname.current.value.toLowerCase().trim()))
        } else if (selectedValues.length == 0 && !(selected && selected.text !== 'All') && nname.current.value !== '') {
            print = filteredOffers.filter(offer => offer.name.toLowerCase().trim().startsWith(nname.current.value.toLowerCase().trim()))
        }
        print ? props.filter(print) : props.getOffers()
    }

    return (
        <div className='contenedor-todo-market'>
            <div className="ocupador" style={{ height: "70px" }} ></div>
            <section className='marketplace-container'>
                <div className={`filter-containter-total-market ${filterView ? "filter-view-activer-market-total-container" : null}`}>
                    <div className={`container-filter-market ${filterView ? "filter-view-activer-market" : null}`}>
                        <span>F</span>
                        <span>I</span>
                        <span>L</span>
                        <span>T</span>
                        <span>E</span>
                        <span>R</span>
                        <div className={`${filterView ? "filter-view-activer" : "filtros-ocultos-market"}`}>
                            <input type="text" placeholder='search by name' ref={nname} onChange={handlerFilter} className='input-filter-market' />
                            <div className='checkbox-art'>
                                <label htmlFor="art" className={`${select.art ? "select-art-checked" : null}`}><MdOutlineDesignServices /></label>
                                <p>Art</p>
                                <input name="art" ref={art} onChange={handlerFilter} onClick={() => { setSelect({ ...select, art: !select.art }) }} value='art' id="art" type="checkbox" />
                            </div>
                            <div className='checkbox-cyberpunk'>
                                <label htmlFor="cyberpunk" className={`${select.cyber ? "select-cyber-checked" : null}`}><GiSteampunkGoggles /></label>
                                <p>CyberPunk</p>
                                <input name='cyberpunk' onChange={handlerFilter} ref={cyberpunk} onClick={() => { setSelect({ ...select, cyber: !select.cyber }) }} value='cyberpunk' id="cyberpunk" type="checkbox" />
                            </div>
                            <select onChange={handlerFilter} ref={classes} className='select-market-place'>
                                <option defaultValue>All</option>
                                <option value='common'>Common</option>
                                <option value='rare'>Rare</option>
                                <option value='mythical'>Mythical</option>
                            </select>
                        </div>
                    </div>
                    {filterView ? <BiArrowToLeft onClick={() => setFilterView(!filterView)} className='arrow-cierre-filter-market' /> : <BiArrowFromLeft onClick={() => setFilterView(!filterView)} className='arrow-cierre-filter-market' />}
                </div>
                <div className='section-mid-martket-container-total'>
                    {props.auxOffertsDos && props.auxOffertsDos.length > 0 && view && view.user &&
                        <div className='container-nft-ofert-hero'>
                            <div className='img-nft-container-ofert-hero'>
                                <img src={view.img} alt={view.name} />
                            </div>
                            <div className='contenedor-nft-text-hero-ofert'>
                                <h2>{view.name}</h2>
                                <div className='contenedor-nft-user-hero-ofert'>
                                    <div>
                                        <img src={view.user.userImg} alt={view.user.name} />
                                    </div>
                                    <div>
                                        <p>{view.user.name} {view.user.lastName}</p>
                                        <p>@{view.user.name}</p>
                                    </div>
                                </div>
                                <div className='price-container-nft-market-hero'>
                                    <p>Price for NFT</p>
                                    <p><FaEthereum /> {view.price} ETH</p>
                                </div>
                                <div className='contenedor-clases-nft-market-ofert'>
                                    <div className='clases-nft-market-ofert'>
                                        <div><MdClass /></div>
                                        <div>
                                            <p>class</p>
                                            <p>{view.clase}</p>
                                        </div>
                                    </div>
                                    <div className='clases-nft-market-ofert'>
                                        <div><MdAutoFixNormal /></div>
                                        <div>
                                            <p>type</p>
                                            <p>{view.type}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='button-nft-market-ofert'>
                                    <p>Buy</p>
                                </div>
                            </div>
                        </div>}
                    <div className='container-nft-trading-action'>
                        <h2>Trading Auctions</h2>
                        {props.arrayOffers && props.arrayOffers.length > 0 && props.arrayOffers.map(nftOffer => <OfferCard key={nftOffer._id} user={props.user} nftOffer={nftOffer} />)}
                        {props.arrayOffers && props.arrayOffers.length === 0 && <h2>No data found</h2>}
                    </div>
                </div>
                <div className={`recent-creator-container-offerts ${filterView ? "filteractive-container-none" : null}`}>
                    <div className='recent-activity-offerts'>
                        <h2 className='title-recent-activity'>Recent Activity</h2>
                        {
                            props.recents.length > 0 && props.recents.map((element, i) => {
                                return (
                                    i < 4 &&
                                    <div className='contenedor-recent-activity-nft' key={i}>
                                        <div>
                                            <img src={element.transaction[0].img} alt={element.transaction[0].name} />
                                        </div>
                                        <div>
                                            <h3>{element.transaction[0].name}</h3>
                                            <p>{element.mount}ETH * {element.date}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='creator-nft-offerts'>
                        <h2>Top Creators</h2>
                        {
                            props.topCreators.map((e, i) => {
                                return (
                                    i < 3 &&
                                    <div key={i} className='creators-content-market'>
                                        <p>{1 + i++}</p>
                                        <div><img src={e.transaction[0].userImg} /></div>
                                        <div>
                                            <h3>{e.transaction[0].name}</h3>
                                            <p>+ {e.mount} ETH</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}

const mapDispatchToProps = {
    getOffers: offerActions.getOffers,
    filter: offerActions.filter,
    getRecents: transactionActions.getRecents,
    getTopCreators: transactionActions.getMostCreators
}

const mapStateToProps = (state) => ({
    arrayOffers: state.offerReducers.offers,
    auxOffers: state.offerReducers.auxOffers,
    auxOffertsDos: state.offerReducers.auxOffertsDos,
    user: state.userReducers.user,
    recents: state.transactionReducers.recents,
    topCreators: state.transactionReducers.topCreators
})

export default connect(mapStateToProps, mapDispatchToProps)(Market)
