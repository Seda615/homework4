import React, {Component} from "react";
import data from "../../data"
import Posts from "../Posts";
import List from "../List";

const pageSizeOptions = [2, 3, 4, 5];

class Main extends Component {
    constructor() {
        super()
        this.state = {
            items: data,
            currentPage: 1,
            pages: [1, 2, 3, 4, 5],
            postsPerPage: 2,
            replyCount: {}
        }
    }

    pagePosts() {

        const postsPerPage = this.state.postsPerPage;
        const currentItems = [...this.state.items]
        const indexOfLastPost = this.state.currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;

        return currentItems.slice(indexOfFirstPost, indexOfLastPost)
    }

    disableMaxAverage = (maxAverageIndex) => {

        const items = [...this.state.items];
        if  (maxAverageIndex !== undefined) {
            items[maxAverageIndex].disabled = true;
        }
        this.setState({items});
    }

    removeColumn = (id) => {
        const items = [...this.state.items];

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

        const {currentPage, postsPerPage} = this.state;
        const items = [...this.state.items];

        const perPage = +e.target.value;
        const indexOfPrevFirstPost = (currentPage - 1) * postsPerPage + 1;
        const pageCount = Math.ceil(items.length / perPage);
        const pages = [];
        for (let i = 1; i <= pageCount; i++) {
            pages.push(i);
        }
        this.setState({postsPerPage: perPage, pages, currentPage: Math.ceil((indexOfPrevFirstPost) / perPage)});
    }

    changePage = (page) => {
        this.setState({currentPage: page});
    }

    addComment = (id, comment, rate) => {

        const items = [...this.state.items];
        const index = items.findIndex(post => post.id === id);
        
        items[index].comments.push({comment, rate});
        this.setState({items: items});
    }

    addReply = (postId, comIndex, reply) => { 
        const items = [...this.state.items];
        const postIndex = items.findIndex(currentPost => currentPost.id === postId);

        items[postIndex].comments[comIndex].reply = reply;

        this.setState({items, replyCount: {...this.state.replyCount, [`${postId}-${comIndex}`]: 1}})
    }

    render() {

        const {items, pages, postsPerPage, currentPage, replyCount} = this.state;
        const currentPosts = this.pagePosts();

        return (
            <div className="container">
                <Posts
                    currentPosts={currentPosts}
                    postsPerPage={postsPerPage}
                    totalPosts={items.length}
                    pages={pages}
                    replyCount={replyCount}
                    pageSizeOptions={pageSizeOptions}
                    changePageSize={this.changePageSize}
                    currentPage={currentPage}
                    changePage={this.changePage}
                    addComment={this.addComment}
                    addReply={this.addReply}
                />
                <div className="lists">
                    <List
                        data={items}
                        getMaxAverage={this.getMaxAverage}
                        removeColumn={this.removeColumn}
                        disableMaxAverage={this.disableMaxAverage}
                    />
                    <List
                        data={items}
                        getMaxAverage={this.getMaxAverage}
                        removeColumn={this.removeColumn}
                        disableMaxAverage={this.disableMaxAverage}
                    />
                </div>
            </div>
        )
    }
}

export default Main;