import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Loader } from 'rsuite'
import { HashLoader } from 'react-spinners'

export default function Page() {
    const [data, setData] = useState([])
    const [gettingData, setGettingData] = useState(false)
    const [gotData, setGotData] = useState(false)
    const [displayData, setDisplayData] = useState(false)

    useEffect(() => {
        axios.get('https://reqres.in/api/users?page=1').then(res => {
            setData(res.data.data)
        })
    }, [])
    let date = new Date

    if (gettingData == true) {
        setTimeout(() => {
            setGettingData(false)
            setDisplayData(true)
        }, 5000)
    }
    return (
        <main>
            <div className="navbar">
                <div className="sub__nav">
                    <p className="logo">Fanacio</p>
                    {gotData == false && <p className="get__users" onClick={() => {
                        setGettingData(true)
                        setGotData(true)
                    }}>Get Users</p>}
                </div>
            </div>

            <div className="data__main" style={gettingData ? { height: '82vh' } : { height: '100%', width: '90%', justifyContent: 'space-around', margin: 'auto' }}>
                {
                    gettingData == true && <HashLoader
                        color="black"
                        loading
                        size={65}
                        speedMultiplier={1}
                    />
                }

                {
                    displayData == true && data.map((item, index) => (
                        <div className="user__item">
                            <img src={item.avatar} alt="" />
                            <p className="name">{item.first_name + ' ' + item.last_name}</p>
                            <p className="email">{item.email}</p>
                        </div>
                    ))
                }

            </div>
        </main >
    )
}
