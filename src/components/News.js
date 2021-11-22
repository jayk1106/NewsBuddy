import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
    apiKey : ''
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey : PropTypes.string
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: null,
    };
  }

  async componentDidMount() {
    this.props.setProgress(0);
  
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;

    this.props.setProgress(10);
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(80);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }



  fetchMoreData = async () => {

    let page = this.state.page;

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${page +1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page : page +1
    });   
  };






  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "30px 0" }}>
          NewsBuddy - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>        
          
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner/>}
          >
          <div div className="container">
          <div className="row my-4">
            {this.state.articles.map((item) => {
              return (
                <div className="col-md-4" key={item.url}>
                  <NewsItem
                    title={item.title}
                    description={item.description}
                    imageUrl={item.urlToImage}
                    newsUrl={item.url}
                    author={item.author}
                    time={item.publishedAt}
                    source={item.source.name}
                  />
                </div>
                
              );
              
            })}
            </div>
            </div>
          </InfiniteScroll>
        
      </div>
    );
  }
}
