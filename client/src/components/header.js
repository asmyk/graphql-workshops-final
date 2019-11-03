import React from 'react';
import styled from 'react-emotion';
import { size } from 'polished';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Loading } from '../components';
import { LogoutButton } from '../containers';
import { Link } from '@reach/router';
import { css } from 'react-emotion';

import { unit, colors } from '../styles';

const GET_LOGGED_USER = gql`
	query GetLoggedUser {
		me {
			username
			email
			picture
		}
	}
`;

export default function Header({ image }) {
	const { data, loading, error } = useQuery(GET_LOGGED_USER);

	if (loading) return <Loading />;
	if (error) return <p>ERROR: {error.message}</p>;
	console.log(data)
	const email = data.me.email;
	const username = data.me.username;
	const avatar = data.me.picture;
	return (
		<Container>
			<Link
				className={css`
					padding: 20px;
					font-size: 14px;
					align-self: flex-start;
				`}
				to="/"
			>
				Home
			</Link>
			<Image round={!image} src={`http://localhost:1337${avatar}`} />
			<Subheading>
				{username} {email}
			</Subheading>
			<LogoutButton />
		</Container>
	);
}

const Container = styled('div')({
	display: 'flex',
	justifyContent: 'flex-end',
	alignItems: 'center',
	background: '#f9f9f9',
	paddingRight: unit * 4,
	paddingBottom: unit * 2,
	marginBottom: unit * 2,
	borderBottom: '3px solid #f9f9f9'
});

const Image = styled('img')(size(60), (props) => ({
	marginRight: unit * 2.5,
	borderRadius: props.round && '50%'
}));

const Subheading = styled('span')({
	marginRight: unit,
	marginTop: unit / 2,
	color: colors.textSecondary
});
