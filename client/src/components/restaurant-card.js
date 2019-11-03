import React from 'react';
import styled, { css } from 'react-emotion';
import { Link } from '@reach/router';
import { unit } from '../styles';

const descriptionText = css({
	paddingTop: `${unit * 1}px`,
	paddingBottom: `${unit * 1}px`,
	color: '#666699'
});

const reviewText = css({
	fontSize: '12px',
	paddingBottom: `${unit * 1}px`
});

const descriptionCol = css({
	flexGrow: 1,
	marginLeft: `${unit * 2}px`
});

const Card = styled(Link)({
	display: 'flex',
	padding: `${unit * 2}px ${unit * 3}px`,
	transition: 'all .2s',
	flexDirection: 'row',
	border: '1px solid #e0e0ea',
	marginBottom: unit * 4,
	textDecoration: 'none',
	'&:visited': {
		textDecoration: 'none',
		color: 'inherit'
	},
	'&:hover': {
		backgroundColor: '#ffe5ef',
		cursor: 'pointer'
	}
});

const RestaurantCard = ({ restaurant: { id, avatar, name, description, reviews }, onClick }) => (
	<Card to={`/restaurant/${id}`} onClick={onClick}>
		<div>
			<img src={`http://localhost:1337${avatar}`} width="200" height="200" />
		</div>
		<div className={descriptionCol}>
			<h3
				style={{
					color: '#6666ff'
				}}
			>
				{name}
			</h3>
			<div className={descriptionText}>{description}</div>
			<div className={reviewText}>Total reviews: {reviews.totalCount}</div>
		</div>
	</Card>
);

export default RestaurantCard;
