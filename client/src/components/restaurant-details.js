import React from 'react';
import styled, { css } from 'react-emotion';
import { unit } from '../styles';

import ReviewItem from './review-item';

const textBlockStyle = css`
	position: absolute;
	bottom: 20px;
	right: 0px;
	background-color: rgba(0, 0, 0, 0.5);
	color: white;
	padding-left: 20px;
	padding-right: 20px;
`;

const Card = styled('div')({
	position: 'relative',
	marginBottom: `34px`
});

const RestaurantDetails = ({ restaurant: { id, avatar, name, description, reviews }, onClick }) => (
	<React.Fragment>
		<Card>
			<img src={`http://localhost:1337${avatar}`} className={css`width: 100%;`} />

			<div className={textBlockStyle}>
				<h3>{name}</h3>
				<p>{description}</p>
			</div>
		</Card>
		{reviews.edges.map(({ node }) => <ReviewItem key={node.id} {...node} />)}
	</React.Fragment>
);

export default RestaurantDetails;
