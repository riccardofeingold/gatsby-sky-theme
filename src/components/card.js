import React from "react";
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Card = ({cardTitle, featuredImage, cardLink}) => {
    const image = getImage(featuredImage)
    return (
        <div className="card shadow" style={{border: `none`}}>
            <GatsbyImage image={image} alt={cardTitle} className="card-img-top"/>

            <div className="card-body">
                <h5 className="card-title">{cardTitle}</h5>
                <Link to={cardLink} className="stretched-link"></Link>
            </div>
        </div>
    )
}

export default Card
