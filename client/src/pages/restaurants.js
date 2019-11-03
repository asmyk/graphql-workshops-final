import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { RestaurantCard, Button, Loading } from '../components';

export const RESTAURANT_TILE_DATA = gql`
	fragment RestaurantTile on Restaurant {
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
				}
			}
			totalCount
		}
	}
`;

const GET_RESTAURANTS = gql`
	query restaurants_list($after: String) {
		restaurants(pageSize: 5, after: $after) {
			edges {
				node {
					...RestaurantTile
				}
			}
			totalCount
			pageInfo {
				cursor
				hasNextPage
			}
		}
	}
  ${RESTAURANT_TILE_DATA}
`;

export default function Launches() {
	const { data, loading, error, fetchMore } = useQuery(GET_RESTAURANTS);
	if (loading) return <Loading />;
	if (error) return <p>ERROR</p>;
	return (
		<Fragment>
			{data.restaurants &&
				data.restaurants.edges &&
				data.restaurants.edges.map((item) => 
				<RestaurantCard key={item.node.id} restaurant={item.node} />)}

			{data.restaurants &&
			data.restaurants.pageInfo.hasNextPage && (
				<Button
					onClick={() =>
						fetchMore({
							variables: {
								after: data.restaurants.pageInfo.cursor
							},
							updateQuery: (prev, { fetchMoreResult, ...rest }) => {
								if (!fetchMoreResult) return prev;
								return {
									...fetchMoreResult,
									restaurants: {
										...fetchMoreResult.restaurants,
										edges: [ ...prev.restaurants.edges, ...fetchMoreResult.restaurants.edges ]
									}
								};
							}
						})}
				>
					Load More
				</Button>
			)}
		</Fragment>
	);
}
