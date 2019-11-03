import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import Restaurant from './restaurant';
import Restaurants from './restaurants';
import { PageContainer } from '../components';

export default function Pages() {
	return (
		<Fragment>
			<PageContainer>
				<Router primary={false} component={Fragment}>
					<Restaurants path="/" />
					<Restaurant path="restaurant/:restaurantId" />
				</Router>
			</PageContainer>
		</Fragment>
	);
}
