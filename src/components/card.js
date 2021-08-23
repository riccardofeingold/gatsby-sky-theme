import React from "react";
import { Link } from 'gatsby'

const Card = ({cardTitle, cardImageSrc, cardLink}) => {

    return (
        <div className="col">
            <div className="card shadow h-100" style={{border: `none`}}>
                <img src={cardImageSrc} className="card-img-top" alt="..."></img>
                <div className="card-body">
                    <h5 className="card-title">{cardTitle}</h5>
                    <Link to={cardLink} className="stretched-link"></Link>
                </div>
            </div>
        </div>
    )
}

export default Card
