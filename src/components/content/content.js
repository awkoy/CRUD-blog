import React, {Component} from 'react';
import {connect} from 'react-redux';
//libs
import FontAwesome from 'react-fontawesome';
import {number, func, object} from 'prop-types';
import {loadComments, deleteChildComment, deleteComment, editComment, replyComment} from './../../actions/crudComment';
//components
import {Link} from 'react-router-dom';
import Article from './article';
import CommentForm from './../comment/commentForm';
import CommentItem from './../comment/commentItem';

class Content extends Component {
    constructor(props) {
        super(props);
        this.loadCount = 5;
    }
    componentDidMount() {
        this.getComment();
    }

    getComment = () => {
        this.props.loadComments(this.loadCount);
        this.loadCount = this.loadCount +5;
    };

    static propTypes = {
        currentPage: object,
        nextPage: object,
        prevPage: object,
        countComment: number,
        loadComments: func.isRequired
    };

    static defaultProps = {
        currentPage: {
            id: 0,
            author: 'Author not found',
            create: '2014-10-25T17:32:21.684Z',
            title: 'Title not found',
            content: 'Content empty'
        }
    };

    render() {

        const {
            article_id,
            article_author,
            article_title,
            article_create,
            article_content
        } = this.props.currentPage;
        const countComment = this.props.comments.length;
        const {deleteComment, editComment, replyComment, deleteChildComment} = this.props;
        const nextPage = this.props.allPage.find(page => page.article_id === article_id + 1);
        const prevPage = this.props.allPage.find(page => page.article_id === article_id - 1);

        return (
            <div className="page">

                {/*---RoutePages begin---*/}
                <div className="page__link">
                    {prevPage !== undefined &&
                    <Link className="page__link__item page__link__prev" to={`/articles/${prevPage.article_id}`}>
                        <FontAwesome className="page__link__icon" name='chevron-left'/>
                        {prevPage.article_title}
                    </Link>
                    }
                    {nextPage !== undefined &&
                    <Link className="page__link__item page__link__next" to={`/articles/${nextPage.article_id}`}>
                        {nextPage.article_title}
                        <FontAwesome className="page__link__icon" name='chevron-right'/>
                    </Link>
                    }
                </div>
                {/*---RoutePages end---*/}

                {/*---ContentPages begin---*/}
                <div className="page__bg"/>
                <div className="page__content">
                    <Article
                        key={article_id}
                        author={article_author}
                        title={article_title}
                        time={article_create}
                        content={article_content}
                        countComment={countComment}
                    />
                    <CommentForm/>
                    {this.props.comments.map((comment) =>
                        <CommentItem
                            key={comment.id}
                            id={comment.id}
                            content={comment.content}
                            created={comment.created_at}
                            name={comment.author.name}
                            photo={comment.author.avatar}
                            delete={deleteComment}
                            deleteChild={deleteChildComment}
                            edit={editComment}
                            reply={replyComment}
                            children={comment.children}
                        />
                    )}
                    <div onClick={() => {this.getComment()}} className="page__comment__more">
                        <button className="page__comment__more__btn">load more comments</button>
                    </div>
                </div>
                {/*---ContentPages end---*/}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const routeID = +ownProps.match.params.id;
    return {
        allPage: state.pages,
        comments: state.comments,
        currentPage: state.pages.find(page => page.article_id === routeID)
    }
};

export default connect(mapStateToProps, {loadComments, deleteChildComment, deleteComment, editComment, replyComment})(Content);