import React, { useEffect, useState } from 'react'
import Graph from '../RealTimeGraph/Graph'
import { connect } from 'react-redux'
import userActions from '../../redux/actions/userActions'
import offerActions from '../../redux/actions/offerActions'


const Dashboard = (props) => {

    const [dataOffers, setOffers] = useState()
    const [dataUsers, setUsersData] = useState()
    const [dataSubscription, setSubscriptions] = useState()

    useEffect(() => {
        props.getOffers()
        props.getUsers()
        fetch('https://proyectozzzz.herokuapp.com/api/usersByDay')
            .then(res => res.json())
            .then(data => setUsersData(data))
        fetch('https://proyectozzzz.herokuapp.com/api/suscriptionByDay')
            .then(res => res.json())
            .then(data => setSubscriptions(data))
        fetch('https://proyectozzzz.herokuapp.com/api/offersByDay')
            .then(res => res.json())
            .then(data => setOffers(data))
    }, []);
    return (
        <section className='main-dashboard'>
            <article className="dashboard-container">
                <div className='dashboard-resume'>
                    <div className='card-revenue'>
                        <i className="fas fa-chart-line"></i>
                        <div className='card-description'>
                            <h2 className='card-title'>NFT active Offers</h2>
                            <h2 className='card-amount'>{props.offers && props.offers.filter(offer => offer.valid === 'accepted').length}</h2>
                        </div>
                    </div>
                    <div className='card-total-users'>
                        <i className="fas fa-users"></i>
                        <div className='card-description'>
                            <h2 className='card-title'>Users</h2>
                            {props.users && <h2 className='card-amount'>{props.users.length}</h2>}
                        </div>
                    </div>
                    <div className='card-total-sales'>
                        <i className="fas fa-sort-amount-up-alt"></i>
                        <div className='card-description'>
                            <h2 className='card-title'>Subscription</h2>
                            {props.users && <h2 className='card-amount'>{props.users.filter(user => user.suscription).length}</h2>}
                        </div>
                    </div>
                </div>
                <div className='graphs-container'>
                    <div className='users-graph'>
                        <h2>Users Historical</h2>
                        {dataUsers && <Graph dashboard={true} data={dataUsers.data} />}
                    </div>
                    <div className='offers-graph'>
                        <h2>Offers Historical</h2>
                        {dataOffers && <Graph dashboard={true} data={dataOffers.data} />}

                    </div>
                    <div className='subs-graph'>
                        <h2>Subscriptions Historical</h2>
                        {dataSubscription && <Graph dashboard={true} data={dataSubscription.data} />}
                    </div>

                </div>
            </article>

        </section >
    )
}
const mapStateToProps = (state) => ({
    offers: state.offerReducers.offers,
    users: state.userReducers.users
})

const mapDispatchToProps = {
    getOffers: offerActions.getOffers,
    getUsers: userActions.getUsers,
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
