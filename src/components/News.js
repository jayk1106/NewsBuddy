import React , {useState , useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export default function News(props){
  

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [articles, setArticles] = useState([]);

  const [page, setPage] = useState(1);

  const [totalResults , setTotalresults] = useState(0);

  const [err, setErr] = useState(null);

  const updateNews = async () => {
    props.setProgress(0);
  
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;

    props.setProgress(10);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(80);
    
    if( !parsedData.articles) setErr("Not Able to Fetch News data , Please try again");
    setArticles(parsedData.articles);
    setTotalresults(parsedData.totalResults);
    
    props.setProgress(100);
  }

  useEffect( () => {
    updateNews();
    // eslint-disable-next-line
  }, [])


  const fetchMoreData = async () => {

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page +1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    if( !parsedData.articles) setErr("Not Able to Fetch News data, Please try again");
    setArticles(articles.concat(parsedData.articles));
    setPage(page+1)
       
  };





    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "90px 0 20px 0" }}>
          {err ? err : `NewsBuddy - Top ${capitalizeFirstLetter(props.category)} Headlines` }
          
        </h1>        
          
        { !err && <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div div className="container">
        <div className="row my-4">
          {articles.map((item) => {
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
        </InfiniteScroll> }
        
      </div>
    );
  
}


News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
  apiKey : ''
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey : PropTypes.string
};