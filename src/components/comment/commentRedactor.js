import React, { Component } from 'react';
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { deleteComment } from './../../actions/crudComment';

class CommentRedactor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showReply: true
        };
    }
    toggleShow() {
        const { showReply } = this.state;
        this.state = {
            showReply: !showReply
        };
        console.log(showReply);
    }
    deleteComments() {
        this.props.deleteComment(this.props.id);
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}

export default connect(null, { deleteComment })(CommentRedactor);