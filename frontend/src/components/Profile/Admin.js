import { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import nftActions from '../../redux/actions/nftActions'
import offerActions from '../../redux/actions/offerActions'
import userActions from '../../redux/actions/userActions'
import { RiFlashlightFill } from 'react-icons/ri'
import { BsCardChecklist } from 'react-icons/bs'
import Swal from 'sweetalert2'

const Admin = (props) => {

    const [edit, setEdit] = useState(false)
    const [features, setFeatures] = useState(false)
    const [onCardHover, setOnCardHover] = useState({ bool: false, id: '' })
    const [editNft, setEditNft] = useState('')
    const nname = useRef(null)
    const type = useRef(null)
    const clase = useRef(null)
    const img = useRef(null)
    const stock = useRef(null)
    const price = useRef(null)

    useEffect(() => {
        props.getNfts()
        props.getOffers()
        props.getUsers()
    }, [])
    const handlerSetCreate = () => {

        setEdit(false)
        setTimeout(() => {
            nname.current.value = ""
            type.current.value = ""
            clase.current.value = ""
            img.current.value = ""
            price.current.value = ""
            stock.current.value = ""
        }, 1)
    }
    const handlerDelete = (nftId) => {
        props.deleteNft(nftId)
    }
    const handlerEdit = async (nftId) => {
        const nft = await props.getNft(nftId)
        setEditNft(nft)
    }
    const handlerAscend = (userId) => {
        props.updateUser(userId, { role: 'moderator' })
    }
    const handlerDescend = (userId) => {
        props.updateUser(userId, { role: 'user' })
    }
    const handlerCreate = () => {
        const createdBody = {}
        nname.current.value !== '' && (createdBody['name'] = nname.current.value)
        type.current.value !== '' && (createdBody['type'] = type.current.value)
        clase.current.value !== '' && (createdBody['clase'] = clase.current.value)
        stock.current.value !== '' && (createdBody['stock'] = stock.current.value)
        img.current.value !== '' && (createdBody['img'] = img.current.value)
        price.current.value !== '' && (createdBody['price'] = price.current.value)
        props.addNft({ ...createdBody })

        nname.current.value = ''
        type.current.value = ''
        clase.current.value = ''
        stock.current.value = ''
        img.current.value = ''
        price.current.value = ''

    }
    const handlerUpdate = () => {
        const updatedBody = {}

        editNft.nftId.name && (updatedBody['name'] = editNft.nftId.name)
        editNft.nftId.type && (updatedBody['type'] = editNft.nftId.type)
        editNft.nftId.clase && (updatedBody['clase'] = editNft.nftId.clase)
        editNft.nftId.stock && (updatedBody['stock'] = editNft.nftId.stock)
        editNft.nftId.img && (updatedBody['img'] = editNft.nftId.img)
        editNft.nftId.price && (updatedBody['price'] = editNft.nftId.price)

        props.updateNft(editNft.nftId._id, { ...updatedBody })

        editNft.nftId.name = ""
        editNft.nftId.type = ""
        editNft.nftId.img = ""
        editNft.nftId.clase = ""
        editNft.nftId.stock = ""
        editNft.nftId.price = ""

    }

    const handlerAccept = async (offerId) => {
        const res = await props.offerUpdate(offerId, { valid: 'accepted' })
        if (res.success) {
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'The nft was accepted !',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }

    }
    const handlerReject = async (offerId) => {
        // array de los rechazados para posteriormente darlos de baja si no son modificados
        const res = props.offerUpdate(offerId, { valid: 'rejected' })
    }

    return (
        <section className="management">
            {/* crud nfts */}
            <div className='presentacion-admin-container'>
                <h1>Hi Admin/Mod!</h1>
                <div className='container-imguno-presentacion-admin'>
                    <div className='container-presentacion-button'>
                        <div>
                            <RiFlashlightFill />
                        </div>
                    </div>
                    <p>Create a new NFT in Official Store</p>
                </div>
                <div className='container-imgdos-presentacion-admin'>
                    <div className='container-presentacion-button'>
                        <div>
                            <BsCardChecklist />
                        </div>
                    </div>
                    <p>Accept the new NFT offers every day, to have the most updated NFT Marketplace</p>
                </div>
            </div>
            <article className="nfts-management">
                <div className='main-nfts-content'>
                    <div className='nfts-search-title'>
                        <h2>NFTs Management</h2>
                        <input type="text" placeholder='Search by NFT Name' onChange={(e) => props.filter(props.aux, e.target.value.trim())} />
                    </div>
                    <div className='nfts-container'>
                        {(props.nfts && props.nfts.length > 0) && props.nfts.map(nft =>
                            <div key={nft._id} onMouseEnter={() => setOnCardHover({ bool: true, id: nft._id })} onMouseLeave={() => setOnCardHover({ bool: false, id: nft._id })} style={{ backgroundImage: `url(${nft.img})` }} className="cardy">
                                <div className='body-nft-admin-card'>
                                    <h2>{nft.name}</h2>
                                </div>
                                {(onCardHover.bool && onCardHover.id === nft._id) &&
                                    <div className='management-actions'>
                                        <button onClick={() => handlerDelete(nft._id)}>DELETE</button>
                                        <button onClick={() => { handlerEdit(nft._id); setEdit(true); setFeatures(true) }}>EDIT</button>
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                </div>
                <aside className="right-side-management">
                    <div className='edit-form'>
                        <h2><span>{edit ? 'Edit ' : 'Create '}</span> NFT Form</h2>
                        <div className='nft-form'>
                            {(features && edit) ?
                                (editNft.nftId) &&
                                <>
                                    <h3>Elemental Features</h3>
                                    <input type="text" placeholder='Name' value={editNft.nftId.name} onChange={(e) => setEditNft({ nftId: { name: e.target.value, _id: editNft.nftId._id, features: '' } })} />
                                    <input type="text" placeholder="Type" value={editNft.nftId.type} onChange={(e) => setEditNft({ nftId: { type: e.target.value, _id: editNft.nftId._id, features: '' } })} />
                                    <input type="text" placeholder="Class" value={editNft.nftId.clase} onChange={(e) => setEditNft({ nftId: { clase: e.target.value, _id: editNft.nftId._id, features: '' } })} />
                                    <input type="text" placeholder="Img" value={editNft.nftId.img} onChange={(e) => setEditNft({ nftId: { img: e.target.value, _id: editNft.nftId._id, features: '' } })} />
                                    <input min='0' type="number" placeholder="Price" value={editNft.nftId.price} onChange={(e) => setEditNft({ nftId: { price: e.target.value, _id: editNft.nftId._id, features: '' } })} />
                                    <input min='0' type="number" placeholder="Stock" value={editNft.nftId.stock} onChange={(e) => setEditNft({ nftId: { stock: e.target.value, _id: editNft.nftId._id, features: '' } })} />
                                    {editNft.nftId.features.hp &&
                                        <>
                                            <h3>Game Features</h3>
                                            <h4>Comming Son</h4>
                                        </>
                                    }
                                </> :
                                <>
                                    <input type="text" placeholder='Name' ref={nname} />
                                    <input type="text" placeholder="Type" ref={type} />
                                    <input type="text" placeholder="Class" ref={clase} />
                                    <input type="text" placeholder="Img" ref={img} />
                                    <input min='0' type="number" placeholder="Price" ref={price} />
                                    <input min='0' type="number" placeholder="Stock" ref={stock} />

                                </>
                            }
                        </div>
                        <div className='action-nft-form'>
                            <i onClick={handlerSetCreate} className="fas fa-plus-circle"></i>
                        </div>

                        {!edit && <button onClick={() => handlerCreate()} className='submit-edit-form'>Create</button>}
                        {edit && <button onClick={() => handlerUpdate()} className='submit-edit-form'>Update</button>}
                    </div>
                    <div className='create-form'></div>
                </aside>
            </article>
            <article className="offers-management">
                <div className='main-offers-content'>
                    <div className='nfts-search-title'>
                        <h2>Pending Offers</h2>
                        <input type="text" placeholder='search by nft name' onChange={(e) => props.filter(props.aux, e.target.value.trim())} />
                    </div>
                    <div className='nfts-container'>
                        {(props.offers && props.offers.length > 0) && props.offers.map(nft =>
                            nft.valid === 'pending' &&
                            <div key={nft._id} onMouseEnter={() => setOnCardHover({ bool: true, id: nft._id })} onMouseLeave={() => setOnCardHover({ bool: false, id: nft._id })} style={{ backgroundImage: `url(${nft.img})` }} className="admin-offer-card">
                                <div className='body-nft-admin-card'>
                                    <h2>{nft.name}</h2>
                                    <h2>{nft.price}</h2>
                                    <h2>{nft.type}</h2>
                                    <h2>{nft.clase}</h2>
                                    <h2>{nft.stock}</h2>
                                </div>
                                {(onCardHover.bool && onCardHover.id === nft._id) &&
                                    <div className='management-actions'>
                                        <button onClick={() => handlerReject(nft._id)}>Reject</button>
                                        <button onClick={() => handlerAccept(nft._id)}>Accept</button>
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                </div>
            </article>
            <article className="offers-management">
                <div className='main-nfts-content'>
                    <div className='user-search-title'>
                        <h2>Users Preview</h2>
                    </div>
                    <div className='nfts-container'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Rol</th>
                                    <th>Ascend</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.users && props.users.length > 0 && props.users.map(nft =>
                                    nft.role === 'user' &&
                                    <tr key={nft._id} onMouseEnter={() => setOnCardHover({ bool: true, id: nft._id })} onMouseLeave={() => setOnCardHover({ bool: false, id: nft._id })}>
                                        <td>{nft.name}</td>
                                        <td>{nft.role}</td>
                                        <td><button onClick={() => handlerAscend(nft._id)}>Ascend</button></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {/* {props.users && props.users.length > 0 && props.users.map(nft =>
                            nft.role === 'user' &&
                            <div key={nft._id} onMouseEnter={() => setOnCardHover({ bool: true, id: nft._id })} onMouseLeave={() => setOnCardHover({ bool: false, id: nft._id })} style={{ backgroundImage: `url(${nft.userImg})` }} className="admin-user-card">
                                <div className='body-nft-admin-card'>
                                    <h2>{nft.name}</h2>
                                </div>
                                {(onCardHover.bool && onCardHover.id === nft._id) &&
                                    <div className='management-actions'>
                                        <button onClick={() => handlerAscend(nft._id)}>Ascend</button>
                                    </div>
                                }
                            </div>
                        )} */}
                    </div>
                </div>
                <div className='main-nfts-content'>
                    <div className='user-search-title'>
                        <h2>Moderators Preview</h2>
                    </div>
                    <div className='nfts-container'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Rol</th>
                                    <th>Descend</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(props.users && props.users.length > 0) && props.users.map(nft =>
                                    nft.role === 'moderator' &&
                                    <tr key={nft._id} onMouseEnter={() => setOnCardHover({ bool: true, id: nft._id })} onMouseLeave={() => setOnCardHover({ bool: false, id: nft._id })}>
                                        <td>{nft.name}</td>
                                        <td>{nft.role}</td>
                                        <td><button onClick={() => handlerDescend(nft._id)}>Descend</button></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {/* {(props.users && props.users.length > 0) && props.users.map(nft =>
                            nft.role === 'moderator' &&
                            <div key={nft._id} onMouseEnter={() => setOnCardHover({ bool: true, id: nft._id })} onMouseLeave={() => setOnCardHover({ bool: false, id: nft._id })} style={{ backgroundImage: `url(${nft.userImg})` }} className="admin-user-card">
                                <div className='body-nft-admin-card'>
                                    <h2>{nft.name}</h2>
                                </div>
                                {(onCardHover.bool && onCardHover.id === nft._id) &&
                                    <div className='management-actions'>
                                        <button onClick={() => handlerDescend(nft._id)}>Descend</button>
                                    </div>
                                }
                            </div>
                        )} */}
                    </div>
                </div>
            </article>
        </section>
    )
}

const mapDispatchToProps = {
    getNfts: nftActions.getNfts,
    deleteNft: nftActions.deleteNft,
    getNft: nftActions.getNft,
    updateNft: nftActions.updateNft,
    filter: nftActions.filter,
    addNft: nftActions.addNft,
    getOffers: offerActions.getOffers,
    offerUpdate: offerActions.updateOffer,
    getUsers: userActions.getUsers,
    updateUser: userActions.updateUser
}
const mapStateToProps = (state) => ({
    nfts: state.nftReducers.nfts,
    nft: state.nftReducers.nft,
    aux: state.nftReducers.aux,
    offers: state.offerReducers.offers,
    users: state.userReducers.users
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin)