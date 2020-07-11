import React from 'react';
import './Note.css';

function Title(props) {
    return(
        <div className='note-title'>
            <input 
            type = 'text'
            placeholder = 'Title'
            value = {props.title}
            onChange = {props.onTitleChange}
            />
        </div>
    );
}

function Text(props) {
    return(
        <div>
            <textarea 
            placeholder ='Type note here ...'
            onChange = {props.onTextChange}
            value = {props.text}
            ></textarea>
        </div>
    );
}

function Bottom(props) {
    return(
        <div className='note-bottom'>
            <button onClick={props.onLeftButtonClick}>{props.leftButtonText}</button>
            <button onClick={props.onRightButtonClick}>{props.rightButtonText}</button>
        </div>
    );
}

function Note(props) {
    return(
        <div className='note'>
            <Title 
            title = {props.title}
            onTitleChange = {props.onTitleChange}
            />
            <Text 
            text = {props.text}
            onTextChange = {props.onTextChange}
            />

            <Bottom
            leftButtonText = {props.leftButtonText}
            rightButtonText = {props.rightButtonText}
            onLeftButtonClick = {props.onLeftButtonClick}
            onRightButtonClick = {props.onRightButtonClick}
            />
        </div>
    );
}

export default Note;
