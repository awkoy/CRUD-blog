import React, {Component} from 'react';

//libs
import FontAwesome from 'react-fontawesome';
import classnames from 'classnames';
import {getCreateDate} from './../../helpers/helpers';

//components
import SubComment from './subComment';

class CommentItem extends Component {

    static defaultProps = {
        name: '',
        created: 0,
        photo: '',
        children: []
    };

    state = {
        editText: this.props.content,
        replyText: '',
        errors: {
            editText: '',
            replyText: ''
        },
        editShow: false,
        replyShow: false
    };

    handleDeleteClick = () => {
        this.props.delete(this.props.id);
    };

    handleEditClick = () => {
        this.setState({
            editShow: !this.state.editShow,
            replyShow: false
        });
    };

    handleReplyClick = () => {
        this.setState({
            editShow: false,
            replyShow: !this.state.replyShow
        });
    };

    handleChange = (e) => {
        let errors = {...this.state.errors};
        delete errors[e.target.name];
        this.setState({
            [e.target.name]: e.target.value,
            errors: errors
        });
    };

    handleEditSubmit = (e) => {
        e.preventDefault();

        //validation
        let errors = {};
        if (this.state.editText === '') errors.editText = "Can't be empty";
        this.setState({errors});
        const isValid = Object.keys(errors).length === 0;

        //submit
        if (isValid) {
            const {editText} = this.state;
            this.props.edit(this.props.id, editText);
            this.setState({editShow: !this.state.editShow});
        }
    };

    handleReplySubmit = (e) => {
        e.preventDefault();

        //validation
        let errors = {};
        if (this.state.replyText === '') errors.replyText = "Can't be empty";
        this.setState({errors});
        const isValid = Object.keys(errors).length === 0;

        //submit
        if (isValid) {
            const {replyText} = this.state;
            this.props.reply(this.props.id, replyText);
            this.setState({replyShow: !this.state.replyShow, replyText: ''});
        }

    };

    render() {

        const {
            id,
            photo,
            name,
            created,
            content,
            children
        } = this.props;

        const {
            replyShow,
            editShow,
            replyText,
            editText,
            errors
        } = this.state;

        return (
            <div className="page__comment__item">

                {/*---comment_photo---*/}
                <div className="page__comment__photo page__photo">
                    <img src={photo} alt=""/>
                </div>
                {/*---comment_photo---*/}

                <div className="page__comment__content">

                    {/*---comment_body---*/}
                    <div className="page__comment__info">
                        <div className="page__comment__info__name">
                            {name}
                        </div>
                        <div className="page__comment__info__date">
                            <FontAwesome className="page__comment__info__icon" name='clock-o'/>
                            {getCreateDate(created)}
                        </div>
                    </div>
                    <div className="page__comment__text">
                        {content}
                    </div>
                    {/*---comment_body---*/}

                    {/*---comment_redactor---*/}
                    <div className="page__comment__redactor">
                        {(name === 'Kurt Thompson') &&
                        <div onClick={this.handleEditClick}
                             className={classnames(
                                 "page__comment__edit page__comment__redactor__btn",
                                 {active: !!editShow})}>
                            <FontAwesome className="page__comment__info__icon" name='pencil-square-o'/>
                            Edit
                        </div>
                        }
                        {(name === 'Kurt Thompson') &&
                        <div onClick={this.handleDeleteClick}
                             className="page__comment__delete page__comment__redactor__btn">
                            <FontAwesome className="page__comment__info__icon" name='times'/>
                            Delete
                        </div>
                        }
                        <div onClick={this.handleReplyClick}
                             className={classnames(
                                 "page__comment__reply page__comment__redactor__btn",
                                 {active: !!replyShow})}>
                            <FontAwesome className="page__comment__info__icon" name='reply'/>
                            Reply
                        </div>
                    </div>
                    {/*---comment_redactor---*/}

                    {/*---editForm---*/}
                    {editShow &&
                    <form className={classnames("page__comment__subform", {error: !!errors.editText})}
                          onSubmit={this.handleEditSubmit}>
                        <textarea className="page__comment__form__textarea page__textarea"
                                  placeholder="Your Message"
                                  name="editText"
                                  onChange={this.handleChange}
                                  defaultValue={editText}/>
                        <span className="page__comment__error">{errors.editText}</span>
                        <button className="page__comment__form__btn page__btn">
                            Edit
                        </button>
                    </form>}
                    {/*---editForm---*/}

                    {/*---replyForm---*/}
                    {replyShow &&
                    <form className={classnames("page__comment__subform", {error: !!errors.replyText})}
                          onSubmit={this.handleReplySubmit}>
                        <div className="page__comment__subinfo">
                            <div className="page__comment__subinfo__item">
                                <FontAwesome className="page__comment__info__icon" name='share'/>
                                Kurt Thompson
                            </div>
                            <div onClick={this.handleReplyClick} className="page__comment__subinfo__item">
                                <FontAwesome className="page__comment__info__icon" name='times'/>
                                Cancel
                            </div>
                        </div>
                        <textarea className="page__comment__form__textarea page__textarea"
                                  placeholder="Your Message"
                                  name="replyText"
                                  onChange={this.handleChange}
                                  defaultValue={replyText}/>
                        <span className="page__comment__error">{errors.replyText}</span>
                        <button className="page__comment__form__btn page__btn">Send</button>
                    </form>}
                    {/*---replyForm---*/}

                    {/*---sub_comment_list---*/}
                    <div className="page__comment__sub">
                        {children.map((child) =>
                            <SubComment
                                key={child.id}
                                id={child.id}
                                parentID={id}
                                name={child.author.name}
                                parentName={name}
                                content={child.content}
                                created={getCreateDate(child.created_at)}
                                photo={child.author.avatar}
                                delete={this.props.deleteChild}
                            />
                        )}
                    </div>
                    {/*---sub_comment_list---*/}

                </div>
            </div>
        );
    }
}

export default CommentItem;