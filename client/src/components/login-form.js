import React, { useState, Component } from 'react';
import styled, { css } from 'react-emotion';
import { size } from 'polished';

import Button from './button';
import { colors, unit } from '../styles';



const LoginForm = (props) => {
	const [ email, setEmail ] = useState();
	const [ password, setPassword ] = useState();

	const onSubmit = (event) => {
		event.preventDefault();
		props.login({ variables: { email, password } });
	};

	return (
		<Container>
			<Heading>Sign in</Heading>
			<StyledForm onSubmit={onSubmit}>
				<StyledInput
					required
					type="email"
					name="email"
					placeholder="Email"
					data-testid="login-input"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<StyledInput
					required
					type="password"
					name="password"
					placeholder="Password"
					data-testid="password-input"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button type="submit">Log in</Button>
			</StyledForm>
		</Container>
	);
};

export default LoginForm;

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	flexGrow: 1,
	paddingBottom: unit * 6,
	color: 'white',
	backgroundColor: colors.primary,
});

const Header = styled('header')({
	width: '100%',
	marginBottom: unit * 5,
	padding: unit * 2.5,
	position: 'relative'
});

const Heading = styled('h1')({
	margin: `${unit * 3}px 0 ${unit * 6}px`
});


const StyledForm = styled('form')({
	width: '100%',
	maxWidth: 406,
	padding: unit * 3.5,
	borderRadius: 3,
	boxShadow: '6px 6px 1px rgba(0, 0, 0, 0.25)',
	color: colors.text,
	backgroundColor: 'white'
});

const StyledInput = styled('input')({
	width: '100%',
	marginBottom: unit * 2,
	padding: `${unit * 1.25}px ${unit * 2.5}px`,
	border: `1px solid ${colors.grey}`,
	fontSize: 16,
	outline: 'none',
	':focus': {
		borderColor: colors.primary
	}
});
