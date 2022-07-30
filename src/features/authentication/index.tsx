import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import { Button, Card, Divider, Typography } from 'antd';
import styled from '@emotion/styled';
import centerLogo from 'assets/center.svg';
import leftLogo from 'assets/left.svg';
import rightLogo from 'assets/right.svg';

const AuthForm = () => {
	const [isRegister, setIsRegister] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const handleSwitch = () => {
		setIsRegister(!isRegister);
		setError(null);
	};

	return (
		<Container>
			<Header />
			<Background />
			<ShadowCard>
				<Title>{isRegister ? 'Register new account' : 'Log in to your account'}</Title>
				{error ? <Typography.Text type='danger'>{error.message}</Typography.Text> : null}
				{isRegister ? <Register onError={setError} /> : <Login onError={setError} />}
				<Divider />
				<LongButton onClick={handleSwitch}>
					{isRegister ? 'Already have an account? Log in' : 'New member? Register'}
				</LongButton>
			</ShadowCard>
		</Container>
	);
};

const Header = styled.header`
	background: url(${centerLogo}) no-repeat center;
	padding: 5rem 0;
	background-size: 38rem;
	width: 100%;
	margin-bottom: 2rem;
`;

const Background = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-position: left bottom, right bottom;
	background-size: calc(((100vw - 40rem) / 3) - 3.2rem), calc(((100vw - 40rem) / 3) - 3.2rem), cover;
	background-image: url(${leftLogo}), url(${rightLogo});
`;

const Title = styled.h2`
	margin-bottom: 2.4rem;
	color: rgb(94, 108, 132);
`;

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	min-height: 100vh;
`;

const ShadowCard = styled(Card)`
	width: 50rem;
	min-height: 66rem;
	padding: 3.2rem 4rem;
	border-radius: 0.3rem;
	box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
	text-align: center;
`;

export const LongButton = styled(Button)`
	width: 100%;
`;

export default AuthForm;
