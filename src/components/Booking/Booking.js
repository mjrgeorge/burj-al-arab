import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
const Booking = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [bookings, setBookings] = useState([]);
    useEffect(()=>{
        fetch(`http://localhost:1000/bookings?email=${loggedInUser.email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res=>res.json())
        .then(data=>setBookings(data))
    }, [])
    console.log(bookings);
    
    return (
        <div>
            <h1>You have: {bookings.length} booking</h1>
            {
                bookings.map(book=>
                    <div key={book._id} style={{border: '1px solid gray', padding:'10px', margin: '10px'}}>
                        <h3>Name: {book.name}</h3>
                        <h4>Email: {book.email}</h4>
                        <p>Check In Date: {book.checkIn}</p>
                        <p>Check Out Date: {book.checkOut}</p>
                    </div>)
            }
        </div>
    );
};

export default Booking;