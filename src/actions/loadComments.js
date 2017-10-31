import axios from 'axios';

class loadComments {
    constructor(url) {
        this.url = url;
    }
    getComments(count) {
        store.dispatch((dispatch) => {
            axios.get(`${this.url}/comments?count=${count}`)
                .then((response) => {
                    dispatch({type: 'COMMENTS_LOAD', payload: response.data})
                })
                .catch((err) => {
                    dispatch({type: 'COMMENTS_ERROR', payload: err})
                });
        });
    }
    addComments(content) {
        store.dispatch((dispatch) => {
            axios.post(`${this.url}/comments/children`, {ID: 1782, content})
                .then((response) => {
                    dispatch({type: 'COMMENTS_ADDED', payload: response.data})
                })
                .catch((err) => {
                    console.log('error', err)
                });
        });
    }
    editComments(content) {
        store.dispatch((dispatch) => {
            axios.put(`${this.url}/comments/`, content)
                .then((response) => {
                    dispatch({type: 'COMMENTS_EDIT', payload: response})
                })
                .catch((err) => {
                    console.log('error', err)
                });
        });
    }
    deleteComments(id) {
        store.dispatch((dispatch) => {
            axios.delete(`${this.url}/comments/${id}`)
                .then(() => {
                    dispatch({type: 'COMMENTS_DELETE', payload: id})
                })
                .catch((err) => {
                    console.log('error', err)
                });
        });
    }

}
