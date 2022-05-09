import React, {Component} from "react";
import Pagination from "./Pagination";
import Post from "./Post";

class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchByComment: ""
        }
    }

    render() {

        const {currentPosts, postsPerPage, totalPosts, changePage, pages, addComment} = this.props;
        const {addReply, pageSizeOptions, changePageSize, currentPage, replyCount, setReplyCount} = this.props;
        const {searchByComment} = this.state;

        return (
            <div>
                <p>
                    <span>search</span>
                    <input 
                        name="search"
                        value={searchByComment}
                        onChange={(e) => this.setState({searchByComment: e.target.value})}
                    />
                </p>
                <ol style={{ listStyleType: 'none' }}>
                    {currentPosts.map(post => (
                        <Post 
                            post={post}
                            addReply={addReply}
                            replyCount={replyCount}
                            setReplyCount={setReplyCount}
                            searchByComment={searchByComment}
                            addComment={addComment}
                            key={post.id}
                        />
                    ))}
                </ol>
                <Pagination
                    totalPosts={totalPosts}
                    postsPerPage={postsPerPage}
                    changePage={changePage}
                    currentPage={currentPage}
                    pages={pages}
                    pageSizeOptions={pageSizeOptions}
                    changePageSize={changePageSize}
                />
            </div>
        )
    }
}

export default Posts;