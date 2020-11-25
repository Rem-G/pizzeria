import React from 'react';
import {useLocation} from 'react-router-dom';


function Order(){
    console.log(useLocation());
    return (
        <h1>ORder page</h1>
    )
}

export default Order;