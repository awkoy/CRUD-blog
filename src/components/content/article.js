import React from 'react';
import FontAwesome from 'react-fontawesome';
import {getCreateDate} from "../../helpers/helpers";

const Article = (props) => {
    const {
        author,
        title,
        time,
        content,
        countComment
    } = props;

    return (
        <div>
            <h2 className="page__content__title">{title}</h2>
            <div className="page__content__date">June 18, 2015</div>
            <div className="page__content__text">
                {content}
            </div>
            <div className="page__content__info">
                <div className="page__content__info__author">
                    <FontAwesome className="page__content__info__icon" name='user'/>
                    Post by <b>{author}</b>
                </div>
                <div className="page__content__info__date">
                    <FontAwesome className="page__content__info__icon" name='clock-o'/>
                    Posted <b>{getCreateDate(time)}</b>
                </div>
                <div className="page__content__info__count">
                    <FontAwesome className="page__content__info__icon" name='comment'/>
                    <b>{countComment} comments</b>
                </div>
            </div>
        </div>
    );
};

export default Article;