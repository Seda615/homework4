import React, {Component} from "react";
import Comments from "./Comments";

class Post extends Component {

    constructor() {
        super();
        this.state = {
            openCommentInput: 0,
            comment: "",
            rate: "",
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

    render () {

        const {post, replyCount, setReplyCount, addReply, searchByComment} = this.props;
        const {openCommentInput, comment, rate} = this.state;

        return (
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
                        <button onClick={(e) => this.addComment(e, post.id)} className="button">Ok</button>
                    </form>
                }
                {!(openCommentInput === post.id ) && 
                    <button onClick={() => this.setState({openCommentInput: post.id})} className="button">
                        Add comment
                    </button>
                }
            </li>
        )
    }
}

export default Post