import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {
    
   static defaultProps = {
     country : 'in',
     pageSize : 6,
     category : 'general'
   }

   static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
   }
    

    constructor(){
        super();
        this.state = {
          articles : [],
          loading : true,
          page : 1,
          totalResults : null
        }
    }
    
    async componentDidMount(){

      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0a6878d009b400f8ca9c73bba0545b4&page=1&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({articles : parsedData.articles , totalResults : parsedData.totalResults , loading : false});
    }



    handelPrevClick = async () => {
      this.setState({loading:true});
      let page = this.state.page;
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0a6878d009b400f8ca9c73bba0545b4&page=${page-1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({articles : parsedData.articles , page : page -1 , loading : false});
    }

    handelNextClick = async () => {

      if((this.state.totalResults - this.props.pageSize*(this.state.page)) > 0){
        this.setState({loading:true});
        let page = this.state.page;
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0a6878d009b400f8ca9c73bba0545b4&page=${page+1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles : parsedData.articles , page : page +1 , loading : false});
      }
      
    }

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{margin : '30px 0'}} >NewsBuddy - Top Headlines</h1>
                {this.state.loading &&  <Spinner/>}
                <div className="row my-4">
                    
                    { !this.state.loading && this.state.articles.map((item) => {
                      return <div className="col-md-4" key={item.url}>
                    <NewsItem title={item.title} description={item.description}  imageUrl={item.urlToImage} newsUrl={item.url} author={item.author} time={item.publishedAt} source={item.source.name} />        
                      </div>
                    })}
                    

                    
                </div>
                <div className="d-flex justify-content-between">
                  <button type="button" className="btn btn-dark" onClick={this.handelPrevClick} disabled={this.state.page <= 1} >&larr; Previous</button>
                  <button type="button" className="btn btn-dark" onClick={this.handelNextClick} disabled={(this.state.totalResults - this.props.pageSize*(this.state.page)) <= 0} >Next &rarr;</button>
                </div>
               
            </div>
        )
    }
}
