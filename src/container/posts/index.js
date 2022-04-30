import React, {Component} from "react";

class Posts extends Component {

    render() {

        const posts = this.props.data;

        return (
            <div>
                <ol style={{ listStyleType: 'decimal' }}>
                    {posts.map(post => (
                        <li key={post.id} className="posts"  >
                            {post.name}
                            <ol className={`${post.disabled ? "disabled" : "" } comments`}> 
                                {post.comments.map((comment, i) => (
                                    <li key={i}><p>{comment.comment}</p><p>{comment.rate}</p></li>
                                ))}
                            </ol>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default Posts;