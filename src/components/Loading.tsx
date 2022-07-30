import { Spin } from 'antd';
import styled from '@emotion/styled';

export const Loading = () => {
	return (
		<Container>
			<Spin tip='Loading...' size='large' />
		</Container>
	);
};

const Container = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
