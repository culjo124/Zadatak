import React from 'react';
import './footer.scss';

export default function Footer() {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return (
        <div className="container-1">
            <div className="box-1">
                <p>Date: {date < 10 ? `0${date}` : { date }}{'.'}{month < 10 ? `0${month}` : { month }}{'.'}{year}</p>
                <p>Contact: 095 118 0022</p>
            </div>
            <div className="box-2">
                <p>Created by Leonardo</p>
            </div>
        </div>
    );
}