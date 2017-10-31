import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

class Home extends Component {
    render() {
        return (
            <div className="main">
                <div className="main__container">
                    <div className="main__title">
                        CRUD web application
                    </div>
                    <div className="main__technologies"/>
                    <Link className="main__btn" to='/articles/1'>
                        L
                        <FontAwesome className="main__btn__icon" name='eye' />
                        <FontAwesome className="main__btn__icon" name='eye' />
                        K
                    </Link>
                </div>
            </div>
        );
    }
}

export default Home;