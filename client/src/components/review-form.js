import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { css } from 'react-emotion';

import { GET_RESTAURANT_DETAILS } from '../pages/restaurant';

const containerStyle = css`
	display: flex;
	justify-content: center;
	padding: 34px;
`;

const formStyle = css`
	width: 400px;
	padding: 16px;
	background: #f9f9f9;

	input[type=text],
	select {
		width: 100%;
		padding: 12px 20px;
		margin: 8px 0;
		display: inline-block;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
	}

	input[type=submit] {
		width: 100%;
		background-color: #4caf50;
		color: white;
		padding: 14px 20px;
		margin: 8px 0;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	input[type=submit]:hover {
		background-color: #45a049;
	}
`;

export const ADD_REVIEW = gql`
	mutation addReview($content: String!, $note: Int!, $restaurant: ID!) {
		review(content: $content, note: $note, restaurant: $restaurant) {
			id
			note
			content
			author {
				username
				picture
			}
		}
	}
`;

const ReviewForm = ({ restaurantId }) => {
	let input;
	const [ addReview ] = useMutation(ADD_REVIEW);
	const [ content, setContent ] = useState('');
	const [ note, setNote ] = useState('5');

	return (
		<React.Fragment>
			<h2>Add a new review</h2>

			<div className={containerStyle}>
				<form
					className={formStyle}
					onSubmit={(e) => {
						e.preventDefault();
						addReview({
							variables: { content, note: parseInt(note, 10), restaurant: restaurantId },
							optimisticResponse: {
								__typename: 'Mutation',
								review: {
									__typename: 'Review',
									content,
									note,
									author: {
										__typename: 'User',
										username: '',
										email: ''
									}
								}
							},
							update: (proxy, updatedData) => {
								// Read the data from our cache for this query.
								const { restaurant } = proxy.readQuery({
									query: GET_RESTAURANT_DETAILS,
									variables: {
										id: restaurantId
									}
								});

								proxy.writeQuery({
									query: GET_RESTAURANT_DETAILS,
									variables: {
										id: restaurantId
									},
									data: {
										restaurant: {
											...restaurant,
											reviews: {
												...restaurant.reviews,
												totalCount: restaurant.reviews.totalCount + 1,
												edges: [
													...restaurant.reviews.edges,
													{
														__typename: 'ReviewEdge',
														node: {
															...updatedData.data.review
														}
													}
												]
											}
										}
									}
								});
							}
						});
					}}
				>
					<input
						type="text"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						name="content"
						placeholder="Add your review..."
					/>

					<label htmlFor="note">Note</label>
					<select value={note} onChange={(e) => setNote(e.target.value)} name="note">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</select>

					<input type="submit" value="Add review" />
				</form>
			</div>
		</React.Fragment>
	);
};

export default ReviewForm;
