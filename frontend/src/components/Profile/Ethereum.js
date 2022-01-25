import React, { useState, useEffect, useRef } from "react";
import Graph from "../RealTimeGraph/Graph";
import { formatData } from '../../utils/formData'
export default function App() {
    const [pair, setpair] = useState("");
    const [price, setprice] = useState("0.00");
    const [pastData, setpastData] = useState({});
    const [flag, setFlag] = useState(false)
    const ws = useRef(null);
    let first = useRef(false);

    const url = "https://api.pro.coinbase.com";

    useEffect(() => {
        ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");

        let pairs = [];

        const apiCall = async () => {
            await fetch(url + "/products")
                .then((res) => res.json())
                .then((data) => (pairs = data));

            let filtered = pairs.filter((pair) => {
                if (pair.quote_currency === "USD") {
                    return pair;
                }
            });

            filtered = filtered.sort((a, b) => {
                if (a.base_currency < b.base_currency) {
                    return -1;
                }
                if (a.base_currency > b.base_currency) {
                    return 1;
                }
                return 0;
            });

            first.current = true;
        };


        apiCall();
    }, []);

    useEffect(() => {
        if (!first.current) {
            return;
        }

        let msg = {
            type: "subscribe",
            product_ids: [pair],
            channels: ["ticker"]
        };
        let jsonMsg = JSON.stringify(msg);
        ws.current.send(jsonMsg);

        let historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`;
        const fetchHistoricalData = async () => {
            let dataArr = [];
            const data = []
            const dates = []
            await fetch(historicalDataURL)
                .then((res) => res.json())
                .then((data) => (dataArr = data));

            let formattedData = formatData(dataArr);
            formattedData.labels.forEach(element => {
                dates.push(element)
            })
            formattedData.datasets[0].data.forEach((element, i) => {
                const obj = {
                    date: dates[i],
                    value: element
                }
                data.push(obj)
            })

            setpastData(data);
        };

        fetchHistoricalData();

        ws.current.onmessage = (e) => {
            let data = JSON.parse(e.data);
            if (data.type !== "ticker") {
                return;
            }

            if (data.product_id === pair) {
                // capturar el price
                setprice(data.price);
            }
        };

    }, [pair]);
    const handleSelect = (e) => {
        setFlag(true)
        let unsubMsg = {
            type: "unsubscribe",
            product_ids: [pair],
            channels: ["ticker"]
        };
        let unsub = JSON.stringify(unsubMsg);
        ws.current.send(unsub);

        setpair(e.target.value);
    };
    return (
        <div className="dashboard-container">
            <h1>Top 3 Historical Crypto Currencies</h1>
            <article className="dashboard-main-content">
                <div className='historical-current'>
                    <h2>current {price}</h2>
                    <select name="currency" value={pair} onChange={handleSelect}>
                        <option defaultValue>Select</option>
                        <option value='BTC-USD'>BTC</option>
                        <option value='ETH-USD' >ETH</option>
                        <option value='SOL-USD' >SOL</option>
                        {/* {currencies.map((cur, idx) => {
                            return (
                                <option key={idx} value={cur.id}>
                                    {cur.display_name}
                                </option>
                            );
                        })} */}
                    </select>
                </div>
                <Graph price={price} flag={flag} data={pastData} />

            </article>
        </div>
    );
}
