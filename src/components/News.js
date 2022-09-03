import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 5,
        category: "general",
    };
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    };
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
        };
        document.title = `${this.props.category.charAt(0).toUpperCase() +
            this.props.category.substr(1)
            } - Newsbyte`;
    }
    async componentDidMount() {
        console.log(this.props.apiKey);
        this.updateNews();
    }
    async updateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true,
        });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(60);
        this.setState({
            articles: parsedData.articles,
            page: this.state.page,
            totalResults: parsedData.totalResults,
            loading: false,
        });
        this.props.setProgress(100);
    }
    handlePreviousClick = async () => {
        this.setState({
            page: this.state.page - 1,
        });
        this.updateNews();
    };
    handleNextClick = async () => {
        this.setState({
            page: this.state.page + 1,
        });
        this.updateNews();
    };
    fetchMoreData = async() => {
        this.setState({
            page: this.state.page + 1,
        });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            page: this.state.page,
            totalResults: parsedData.totalResults,
        });
    };

    render() {
        return (
            <>
                <h1 className="text-center">
                    News byte- Top{" "}
                    {this.props.category.charAt(0).toUpperCase() +
                        this.props.category.substr(1)}{" "}
                    Headlines
                </h1>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem
                                        title={`${element.title ? element.title : ""}`}
                                        description={`${element.description ? element.description : ""
                                            }`}
                                        imageUrl={element.urlToImage}
                                        date={element.publishedAt}
                                        author={element.author}
                                        newsUrl={element.url}
                                        source={element.source.name}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            </>
        );
    }
}

export default News;
