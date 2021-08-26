import React from "react";
import { Link } from 'gatsby'

const Card = ({cardTitle, featuredImage, cardLink}) => {

    return (
        <div className="card shadow" style={{border: `none`}}>
            <img src={featuredImage} className="card-img-top" alt="..."></img>
            <div className="card-body">
                <h5 className="card-title">{cardTitle}</h5>
                <Link to={cardLink} className="stretched-link"></Link>
            </div>
        </div>
    )
}

export default Card
