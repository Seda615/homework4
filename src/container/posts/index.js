import React, {Component} from "react";

class Posts extends Component {

    constructor(props) {
        super()
        this.state = {posts: props.data}
    }

    render() {

        const {posts} = this.state;

        return (
            <div>
                <ol style={{ listStyleType: 'decimal' }}>
                    {posts.map(post => (
                        <li key={post.id} className="posts"  >
                            {post.name}
                            <ol className={"comments"} style={{ color: post.disabled ? 'red' : 'black'}}> 
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