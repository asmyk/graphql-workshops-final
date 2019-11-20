import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Redirect } from '@react-router';

import { RegisterForm, Loading } from '../components';

export const REGISTER_USER = gql`
	mutation register($email: String!, $username: String!, $password: String!) {
		register(username: $username, email: $email, password: $password)
	}
`;

export default function Register() {
	const client = useApolloClient();
	let isCompleted = false;
	const [ register, { loading, error } ] = useMutation(REGISTER_USER, {
		onCompleted() {
			isCompleted = true;
		},
		onError: ({ graphQLErrors, networkError, operation, forward }) => {
			if (graphQLErrors) {
				for (let err of graphQLErrors) {
					console.error(err);
				}
			}
		}
	});
	if (loading) return <Loading />;
	if (error) return <p>An error occurred</p>;

	if (isCompleted) {
		return <Redirect to="/" />;
	}

	return <RegisterForm login={register} />;
}
