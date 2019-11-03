import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { LoginForm, RegisterForm, Loading } from '../components';

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			jwt
			user {
				username
				email
			}
		}
	}
`;

export const REGISTER_USER = gql`
	mutation register($email: String!, $username: String!, $password: String!) {
		register(username: $username, email: $email, password: $password) {
			username
		}
	}
`;

export default function Login() {
	const client = useApolloClient();
	const [ register ] = useMutation(REGISTER_USER, {
		onError(e) {
			console.log(e);
		}
	});
	const [ login, { loading, error } ] = useMutation(LOGIN_USER, {
		onCompleted({ login }) {
			localStorage.setItem('token', 'Bearer ' + login.jwt);
			client.writeData({
				data: { isLoggedIn: true }
			});
		},
		onError: ({ graphQLErrors, networkError, operation, forward }) => {
			if (graphQLErrors) {
				for (let err of graphQLErrors) {
					console.log(err);
				}
			}
		}
	});
	if (loading) return <Loading />;
	if (error) return <p>An error occurred</p>;

	return (
		<React.Fragment>
			<LoginForm login={login} />
			<RegisterForm register={register} />
		</React.Fragment>
	);
}
