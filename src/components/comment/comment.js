import React, { Component } from 'react';
import CommentItem from './commentItem';
import {connect} from 'react-redux';
import loadComments from './../../actions/loadComments';
import CommentForm from './commentForm';
import { getCreateDate } from "../../helpers/helpers";

class Comments extends Component {
    constructor(props) {
        super(props);
        const url = 'http://frontend-test.pingbull.com/pages/y.boikodevelop@gmail.com';
        this.loader = new loadComments(url);
        this.count = 5;
    }
    componentWillMount() {
        this.renderComments();
    }
    renderComments() {
        this.loader.getComments(this.count);
        this.count = this.count +5;
    }
    render() {
        return (
            <div className="page__comment">
                <div className="page__comment__title">Leave comment:</div>
                <CommentForm />
                {this.props.comments.map((comment) =>
                    <CommentItem
                        key={comment.id}
                        id={comment.id}
                        content={comment.content}
                        created={getCreateDate(comment.created_at)}
                        name={comment.author.name}
                        photo={comment.author.avatar}
                    />
                )}
                <div onClick={() => {this.renderComments()}} className="page__comment__more">
                    <button className="page__comment__more__btn">load more comments</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
};

export default connect(mapStateToProps)(Comments);