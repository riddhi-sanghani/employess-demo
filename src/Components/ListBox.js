import React, {  } from "react";
import moment from 'moment'
const ListBox = ({ item, index }) => {

    return (

        <tr>  <td>{item.invite_id}</td>
            <td style={{ }}>{item.invite}</td>

            <td>{moment(item.invite_time, 'X').format('YYYY-MM-DD')}</td>
            <td className={item.status == "read" ? "read" : 'unread'} >{item.status}</td>
        </tr>


    )
}
export default ListBox