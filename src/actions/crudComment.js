import axios from 'axios';
import { SET_COMMENT, DELETE_CHILD_COMMENT, ADD_COMMENT, DELETE_COMMENT, UPDATE_COMMENT, REPLY_COMMENT} from './actionType';

const url = 'http://frontend-test.pingbull.com/pages/y.boikodevelop@gmail.com';

const setComments = (comments) => {
    return {
        type: SET_COMMENT,
        comments
    }
};

const loadComments = (count) => {
    return dispatch => {
        axios.get(`${url}/comments?count=${count}`)
            .then((response) => {
                dispatch(setComments(response.data));
            })
            .catch((err) => {
                console.log('error:', err);
            });
    }
};

const addComment = (content) => {
    return dispatch => {
        axios.post(`${url}/comments/`, {content, id: 2082})
            .then((response) => {
                dispatch({type: ADD_COMMENT, payload: {...response.data, children: []}})
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
};

const deleteComment = (id) => {
    return dispatch => {
        axios.delete(`${url}/comments/${id}`)
            .then(() => {
                dispatch({type: DELETE_COMMENT, payload: id})
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
};

const deleteChildComment = (id, parentID) => {
    return dispatch => {
        axios.delete(`${url}/comments/${id}`)
            .then((response) => {
                console.log(response.data);
                dispatch({type: DELETE_CHILD_COMMENT, payload: {id, parentID}})
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
};

const editComment = (id, content) => {
    return dispatch => {
        axios.put(`${url}/comments/${id}`, {content})
            .then(() => {
                dispatch({type: UPDATE_COMMENT, payload: { id, content }})
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
};

const replyComment = (id, content) => {
    return dispatch => {
        axios.post(`${url}/comments/`, {content, parent: id})
            .then((response) => {
                dispatch({type: REPLY_COMMENT, payload: response.data})
            })
            .catch((err) => {
                console.log('error', err)
            });
    }
};

export {loadComments, addComment, deleteComment, deleteChildComment, editComment, replyComment};