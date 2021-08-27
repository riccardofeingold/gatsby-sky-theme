import React from "react";
import { Link } from 'gatsby'

const BlogCard = ({cardTitle, featuredImage, cardLink, cardExcerpt, authorImage, authorName, published, readingTime}) => {

    return (
        <div className="card shadow" style={{border: `none`}}>
            <img src={featuredImage} className="card-img-top" alt="..."></img>
            <div className="card-body">
                <h5 className="card-title">{cardTitle}</h5>
                <p className="card-text">{cardExcerpt}</p>
                
                <div className="d-flex align-items-center">
                    <div className="d-flex-shrink-0">
                        <img className="rounded-circle" style={{maxWidth: `36px`, maxHeight: `36px`}} src={authorImage} alt={`Author: ${authorName}`}></img>
                    </div>
                    <div className="flex-grow-1 ms-3">
                        <h6 style={{marginBottom: `0px`, fontSize: `14px`}}>{authorName}</h6>
                        <p style={{marginBottom: `0px`, fontSize: `13px`}}>{`${published} • ${readingTime} min`}</p>
                    </div>
                </div>
                <Link to={cardLink} className="stretched-link"></Link>
            </div>
        </div>
    )
}

export default BlogCard
