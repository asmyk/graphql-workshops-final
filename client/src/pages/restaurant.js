import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { RestaurantDetails, Loading, ReviewForm } from '../components';
import { RESTAURANT_TILE_DATA } from './restaurants';

export const RESTAURANT_DETAILS_DATA = gql`
	fragment RestaurantDetailsData on Restaurant {
		__typename
		name
		description
		id
		avatar
		reviews {
			edges {
				node {
					id
					note
					content
					author {
						username
						picture
					}
				}
			}
			totalCount
		}
	}
`;

export const GET_RESTAURANT_DETAILS = gql`
	query RestaurantDetails($id: ID!) {
		restaurant(id: $id) {
			...RestaurantDetailsData
		}
	}

${RESTAURANT_DETAILS_DATA}
`;

export default function Restaurant({ restaurantId }) {
	const { data, loading, error } = useQuery(GET_RESTAURANT_DETAILS, { variables: { id: restaurantId } });
	if (loading) return <Loading />;
	if (error) return <p>ERROR: {error.message}</p>;
 
	return (
		<Fragment>
			<RestaurantDetails restaurant={data.restaurant} />

			<ReviewForm restaurantId={data.restaurant.id} />
		</Fragment>
	);
}
