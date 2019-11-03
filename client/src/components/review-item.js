import React from 'react';
import styled, { css } from 'react-emotion';
import { unit } from '../styles';

const ReviewCard = styled('div')({
	display: 'flex',
	borderBottom: '3px solid #f9f9f9',
	paddingTop: `${unit * 2}px`,
	paddingBottom: `${unit * 2}px`
});

const descriptionStyle = css`flex: auto;`;

const profilePictureStyle = css`
	width: 60px;
	height: 60px;
	border-radius: 30px;
`;

const profileStyle = css`
	min-width: 120px;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
`;

const usernameStyle = css`color: #c4c4c4;`;

const ReviewItem = ({ note, content, author: { username, picture } }) => {
	return (
		<ReviewCard>
			<div className={profileStyle}>
				<img src={`http://localhost:1337${picture}`} className={profilePictureStyle} />
				<p className={usernameStyle}>{username}</p>
			</div>
			<div className={descriptionStyle}>
				<h4>{note}/5</h4>
				<p>{content}</p>
			</div>
		</ReviewCard>
	);
};

export default ReviewItem;
