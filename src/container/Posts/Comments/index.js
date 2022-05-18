import React, {Component} from "react";

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openReplyInput: 0,
            reply: "",
        }
    }

    addReply = (e, postId, comIndex) => {
        e.preventDefault();
        const {reply} = this.state;
        if (reply) {
            this.props.addReply(postId, comIndex, reply);
            this.setState({ openReplyInput: 0, reply: ""});
        }
    }

    rateColored = (rate) => {
        let className;
        if (rate < 3) {
            className = "red";
        } else if (rate > 4) {
            className = "green"
        } else if (rate >= 3) {
            className = "yellow"
        }
        return className;
    }

    render() {

        const {post, id, searchByComment, replyCount} = this.props;
        const {reply, openReplyInput} = this.state;

        return (
            <ol className={`${post.disabled ? "disabled" : "" } comments`}> 
                {post.comments
                .filter(comment => comment.comment.includes(searchByComment))
                .map((comment, i) => (
                    <li key={i}>
                        <p className={this.rateColored(comment.rate)} id="comment">{comment.comment}</p>
                        <p className={this.rateColored(comment.rate)}>{comment.rate}</p>
                        <p>&#128512;</p>
                        {comment.reply && <span>{comment.reply}</span>}
                        
                        {(openReplyInput === `${id}-${i}`) && 
                            <form action="#">
                                <input value={reply} onChange={(e) => this.setState({reply: e.target.value})} />
                                <button onClick={(e) => this.addReply(e, id, i)}>ok</button>
                            </form>
                        }
                        {!(openReplyInput === `${id}-${i}` || replyCount[`${post.id}-${i}`]) && 
                            <button
                                onClick={() =>this.setState({openReplyInput: `${id}-${i}`})}
                                className="button"
                            >
                                reply
                            </button>
                        }
                    </li>
                ))}
            </ol>
        )
    }
}

export default Comments