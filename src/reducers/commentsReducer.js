import initialState from './initialState';

import {
    DELETE_CHILD_COMMENT,
    REPLY_COMMENT,
    SET_COMMENT,
    ADD_COMMENT,
    DELETE_COMMENT,
    UPDATE_COMMENT
} from './../actions/actionType';

const commentsReducer = (state = initialState.comments, action) => {
        switch (action.type) {

            case SET_COMMENT:
                return action.comments;

            case ADD_COMMENT:
                return [action.payload, ...state];

            case REPLY_COMMENT:
                let parentComment = state.map(item => {
                    if (item.id === action.payload.parent) {
                        let newItem = item;
                        newItem.children = [action.payload, ...newItem.children];
                        return newItem;
                    }
                    return item;
                });
                return parentComment;

            case UPDATE_COMMENT:
                let newState = state.map(item => {
                    if (item.id === action.payload.id) {
                        let newItem = item;
                        newItem.content = action.payload.content;
                        return newItem;
                    }
                    return item;
                });
                return newState;

            case DELETE_COMMENT:
                return [...state].filter(function (item) {
                    if (item.id !== action.payload) {
                        return item;
                    } else {
                        return false;
                    }
                });

            case DELETE_CHILD_COMMENT:
                let arr = [];
                arr = state.map(item => {
                    // find parent comment
                    if (item.id === action.payload.parentID) {
                        let newItem = item;
                        // delete sub_comment
                        newItem.children = item.children.filter(function (child) {
                                if (child.id !== action.payload.id) {
                                    return item;
                                } else {
                                    return false;
                                }
                        });
                        return newItem;
                    }
                    return item;
                });
                return arr;

            default:
                return state;
        }
    }
;

export default commentsReducer;