import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title,description,imageUrl,newsUrl,author,date,source} = this.props
        return (
            <div className='my-3'>
                <div className="card" >
                        <span className="position-absolute top-0 translate-left badge rounded-pill bg-danger" style={{left:'100%',transform: 'translateX(-100%)',zIndex:1}}>
                            {source}
                        </span>
                    <img src={!imageUrl?"https://images.cnbctv18.com/wp-content/uploads/2021/02/BSE.jpg":imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body my-3">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className='card-text'><small className='text-muted'>By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
