import React, {Component} from "react";
import { deepClone } from "../../utility/posts";
import data from "../../data"
import Posts from "../posts";
import List from "../list";
import User from "../User";

const pageSizeOptions = [2, 3, 4, 5];

class Main extends Component {
    constructor() {
        super()
        this.state = {
            items: data,
            currentPosts: [],
            currentPage: 1,
            pages: [],
            postsPerPage: 2,
            replyCount: {}
        }
    }

    componentDidMount() {
        const {postsPerPage, items} = this.state;
        const indexOfLastPost = this.state.currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;

        const totalPosts= this.state.items.length;
        const pageNumber = [];
        const pageCount = (Math.ceil(totalPosts / postsPerPage));
        for (let i = 1; i <= pageCount; i++) {
            pageNumber.push(i);
        }
        this.setState({currentPosts: items.slice(indexOfFirstPost, indexOfLastPost), pages: pageNumber});
    }

    addHighestAverage = () => {
        const {items} = this.state;

        const averages = items.map(item => {
            let sum = item.comments.reduce((acc, com) => acc += com.rate, 0);

            return sum/item.comments.length;
        })

        let maxAverage = averages[0];
        let maxAverageIndex;

        for (let i = 0; i < averages.length; i++) {
            if (maxAverage <= averages[i] && !items[i].disabled) {
                maxAverage = averages[i]
                maxAverageIndex = i;
            }
        }
        if  (maxAverageIndex !== undefined) {
            items[maxAverageIndex].disabled = true;
        }

        this.setState({items});

        return {maxAverageIndex, maxAverage}
    }

    removeColumn = (id) => {
        const {items} = this.state;

        items.map(item => {
            if (item.id === id) {
                item.disabled = false;
            }
            return item;
        })

        this.setState({items})
    }

    changePageSize = (e) => {
        e.preventDefault();
        const perPage = +e.target.value;
        const indexOfPrevFirstPost = (this.state.currentPage - 1) * this.state.postsPerPage + 1;
        const currentPage = Math.ceil((indexOfPrevFirstPost) / perPage);
        const indexOfLastPost = currentPage * perPage;
        const indexOfFirstPost = indexOfLastPost - perPage;
        const currentItems = this.state.items.slice(indexOfFirstPost, indexOfLastPost);
        const pageCount = Math.ceil(this.state.items.length / perPage);
        const pages = [];
        for (let i = 1; i <= pageCount; i++) {
            pages.push(i);
        }
        this.setState({postsPerPage: perPage, currentPosts: currentItems, pages, currentPage})
    }

    changePage = (page) => {

        const {postsPerPage, items} = this.state;

        const indexOfLastPost = page * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;

        this.setState({currentPosts: items.slice(indexOfFirstPost, indexOfLastPost), currentPage: page});
    }

    addComment = (id, comment, rate) => {

        const {items, currentPosts} = this.state;

        const posts = deepClone(items);
        const currentItems = deepClone(currentPosts);

        const index = posts.findIndex(post => post.id === id);

        posts[index].comments.push({comment, rate});
        currentItems[index].comments.push({comment, rate})

        this.setState({currentPosts: currentItems, items: posts});
    }

    addReply = (postId, comIndex, reply) => {

        const items = deepClone(this.state.items);
        const currentPosts = deepClone(this.state.currentPosts);
        const postIndex = currentPosts.findIndex(currentPost => currentPost.id === postId);

        currentPosts[postIndex].comments[comIndex].reply = reply;
        items[postIndex].comments[comIndex].reply = reply;

        this.setState({items, currentPosts})
    }

    render() {

        const {items, currentPosts, pages, postsPerPage, currentPage, replyCount} = this.state;

        return (
            <div>
                <div className="container">
                    <Posts
                        currentPosts={currentPosts}
                        postsPerPage={postsPerPage}
                        totalPosts={items.length}
                        pages={pages}
                        replyCount={replyCount}
                        setReplyCount={(count) => this.setState({replyCount: count})}
                        pageSizeOptions={pageSizeOptions}
                        changePageSize={this.changePageSize}
                        currentPage={currentPage}
                        changePage={this.changePage}
                        addComment={this.addComment}
                        addReply={this.addReply}
                    />
                    <div className="lists">
                        <List data={items} addHighestAverage={this.addHighestAverage} removeColumn={this.removeColumn} />
                        <List data={items} addHighestAverage={this.addHighestAverage} removeColumn={this.removeColumn} />
                    </div>
                </div>
                <User />
            </div>
        )
    }
}

export default Main;