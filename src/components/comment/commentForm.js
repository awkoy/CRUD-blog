import React, {Component} from 'react';
import {connect} from 'react-redux';
import user from './../../static/img/item.jpg';
import classnames from 'classnames';
import {func, string} from 'prop-types';
import { addComment } from './../../actions/crudComment';

class CommentForm extends Component {

    static propTypes = {
        photo: string,
        addComment: func.isRequired
    };

    static defaultProps = {
         photo: user
    };

    state = {
        message: '',
        errors: {}
    };

    handleChange = (e) => {
        let errors = {...this.state.errors};
        delete errors[e.target.name];
        this.setState({
            [e.target.name]: e.target.value,
            errors: errors
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        //validation
        let errors = {};
        if (this.state.message === '') errors.message = "Can't be empty";
        this.setState({errors});
        const isValid = Object.keys(errors).length === 0;

        //submit
        if (isValid) {
            const {message} = this.state;
            this.props.addComment(message);
            this.addCommentField.value = '';
            this.setState({message: ''});
        }
    };

    render() {

        const {
            errors,
            message
        } = this.state;

        return (
            <div className="page__comment">
                <div className="page__comment__title">Leave comment:</div>
                <div className="page__comment__form">
                    <div className="page__comment__form__author page__photo">
                        <img src={'http://api.randomuser.me/portraits/thumb/men/69.jpg'} alt=""/>
                    </div>
                    <form className={classnames("page__comment__form__add", {error: !!errors.message})}
                          onSubmit={this.handleSubmit}>
                    <textarea className="page__comment__form__textarea page__textarea"
                              placeholder="Your Message"
                              name="message"
                              onChange={this.handleChange}
                              defaultValue={message}
                              ref={(textarea) => {this.addCommentField = textarea}}/>
                        <span className="page__comment__error">{errors.message}</span>
                        <button className="page__comment__form__btn page__btn">Send</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default connect(null, { addComment })(CommentForm);