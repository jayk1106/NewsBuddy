import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {

    let {title , description , imageUrl , newsUrl , author , time , source} = this.props;

    let formatDate = () => {
      let d = new Date(time);
      return d.toGMTString();
    }
    return (
      <div className="card my-2" >
        <img src={imageUrl ? imageUrl  : 'https://www.coindesk.com/resizer/ss85LMAEg5v0AGJ5fOyEkQkdgwg=/1200x628/cloudfront-us-east-1.images.arcpublishing.com/coindesk/YIV3ZMEU5JARBF5BJNFQM55P2U.jpg'} className="card-img-top" alt={title ? title : ''} />
        <div className="card-body">
          <h5 className="card-title">{title ? title : ''}</h5>
          <span className="badge bg-danger">{source ? source : 'Unknown' }</span>
          <p className="card-text">
            {description ? description : ''}
          </p>
          <p className="card-text"><small className="text-muted">By <b>{ !author==='' || author ? author : 'Unknown'}</b> on { time ? formatDate() : 'Not Found'}</small></p>
          <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-dark">
            READ MORE
          </a>
        </div>
      </div>
    );
  }
}
