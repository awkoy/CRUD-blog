import React, { Component } from 'react';
import loadComments from './../../actions/loadComments';
import FontAwesome from 'react-fontawesome';

class CommentReply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
        const url = 'http://frontend-test.pingbull.com/pages/y.boikodevelop@gmail.com';
        this.loader = new loadComments(url);
    }
    handleChange(event) {
        this.setState({value: event.target.value})
    }
    getDataForm() {
        if( this.state.value.length > 0 ){
            this.loader.addComments(this.state.value);
            this.addCommentTextarea.value = '';
        }
    }
    render() {
        return (
            <div className={`page__comment__subform`}>
                    <div className="page__comment__subinfo">
                        <div className="page__comment__subinfo">
                            <FontAwesome className="page__comment__info__icon" name='share' />
                            Kurt Thompson
                        </div>
                        <div className="page__comment__subinfo">
                            <FontAwesome className="page__comment__info__icon" name='times' />
                            Cancel
                        </div>
                    </div>
                    <textarea placeholder="Your Message" className="page__comment__form__textarea page__textarea"
                              onBlur={this.handleChange.bind(this)}
                              defaultValue={this.state.value}
                              ref={(textarea) => {this.addCommentTextarea = textarea}}
                    />
                    <button className="page__comment__form__btn page__btn"
                            onClick={this.getDataForm.bind(this)}>
                        Send
                    </button>
            </div>
        );
    }
}
export default CommentReply;