import React, {Component} from "react";
import Comments from "./Comments";
import Pagination from "./Pagination";

class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openCommentInput: 0,
            comment: "",
            rate: "",
            searchByComment: ""
        }
    }

    addComment = (e, id) => {
        const {comment, rate} = this.state;
        e.preventDefault()

        if (!isNaN(rate) && comment.length !== 0) {
            this.props.addComment(id, comment, rate);
            this.setState({openCommentInput: 0, comment: "", rate: ""});
        }
    }

    render() {

        const {currentPosts, postsPerPage, totalPosts, changePage, pages} = this.props;
        const {addReply, pageSizeOptions, changePageSize, currentPage, replyCount, setReplyCount} = this.props;
        const {openCommentInput, comment, rate, searchByComment} = this.state;

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
                        <li key={post.id} className="posts">
                            <span>{post.id} </span>
                            {post.name}
                            <Comments
                                post={post}
                                id={post.id}
                                addReply={addReply}
                                searchByComment={searchByComment}
                                replyCount={replyCount}
                                setReplyCount={setReplyCount}
                            />
                            {(openCommentInput === post.id) && 
                                <form action="#">
                                    <label>comment</label>
                                    <input
                                        type={"text"}
                                        value={comment}
                                        onChange={(e) => this.setState({comment: e.target.value})}
                                    />
                                    <label>rate</label>
                                    <input
                                        type={"text"}
                                        value={rate}
                                        onChange={(e) => this.setState({rate: e.target.value})}
                                    />
                                    <button onClick={(e) => this.addComment(e, post.id)}>Ok</button>
                                </form>
                            }
                            {!(openCommentInput === post.id ) && 
                                <button
                                    onClick={() => this.setState({openCommentInput: post.id})}
                                    className="button"
                                >
                                    Add comment
                                </button>
                            }
                        </li>
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