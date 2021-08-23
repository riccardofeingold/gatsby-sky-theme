import React from "react";
import { StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

const Card = ({cardTitle, cardImageSrc, cardText, cardLink}) => {

    return (
        <div className="col">
            <div className="card shadow h-100" style={{border: `none`}}>
                <StaticImage src="../images/banner-blue-bg.png" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{cardTitle}</h5>
                    <p className="card-text">{cardText}</p>
                    <Link to={cardLink} className="stretched-link"></Link>
                </div>
            </div>
        </div>
    )
}

export default Card