import React, { useEffect, useState } from "react";
import database from '../json/invitations.json';
import olddatabase from '../json/invitations_update.json';
import { decryptedData } from '../Components/Crypto';
import moment from 'moment'
import { useNavigate } from "react-router-dom";
import ListBox from "../Components/ListBox";
function Home() {
    const [list, setList] = useState([])
    const [newData, setNewData] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        var txt = localStorage.getItem('info');
        var info = decryptedData(txt)
        const userData = database.invites.filter((user) => parseInt(user.user_id) === info.user_id);
        const userData1 = olddatabase.invites.filter((user) => parseInt(user.user_id) === info.user_id);
        setNewData(userData1)
        setList(userData)
    }, [])
    const MINUTE_MS = 5000;

    useEffect(() => {
        if (newData.length != 0) {
            const interval = setInterval(() => {
                setList((prev) => ([...prev, newData[0]]))
                setNewData(newData.filter((user) => user.invite_id !== newData[0].invite_id))

            }, MINUTE_MS);
            return () => clearInterval(interval);
        }
    }, [newData])
    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem("info");
        navigate("/login")
    }
    return (
        <div className="app" >
            <div className="button-container">
                <input type="submit" value={'Logout'} onClick={(e) => handleLogout(e)} />
            </div>
            <div >

                <div>
                    <table>
                        <tr><td>Invite Id</td><td>Invite</td><td>Date</td><td>Status</td></tr>
                        {list.map((item, index) => (
                            <ListBox item={item} index={index}></ListBox>

                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Home;

