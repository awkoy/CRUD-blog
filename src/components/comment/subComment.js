import React from 'react';
import FontAwesome from 'react-fontawesome';


const SubComment = (props) => {

    const handleDeleteClick = () => {
        props.delete(props.id,props.parentID);
    };
    const {
        photo,
        name,
        created,
        content,
        parentName
    } = props;

    return (
        <div className="page__comment__item">
            <div className="page__comment__photo page__photo">
                <img src={photo} alt=""/>
            </div>
            <div className="page__comment__content">
                <div className="page__comment__info">
                    <div className="page__comment__info__name">
                        {name}
                    </div>
                    <div className="page__comment__info__reply">
                        <FontAwesome className="page__comment__info__icon" name='share'/>
                        {parentName}
                    </div>
                    <div className="page__comment__info__date">
                        <FontAwesome className="page__comment__info__icon" name='clock-o'/>
                        {created}
                    </div>
                </div>
                <div className="page__comment__text">
                    {content}
                </div>
                <div className="page__comment__redactor">
                    <div onClick={handleDeleteClick}
                         className="page__comment__delete page__comment__redactor__btn">
                        <FontAwesome className="page__comment__info__icon" name='times'/>
                        Delete
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubComment;