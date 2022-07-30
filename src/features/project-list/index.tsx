import { useState } from 'react';
import { useDebounce } from 'hooks/useDebounce';
import SearchPanel from './components/SearchPanel';
import List from './components/List';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';

const ProjectList = () => {
	const [param, setParam] = useState({
		name: '',
		personId: ''
	});
	const debouncedParam = useDebounce(param, 500);
	const { data: list, error, isLoading } = useProjects(debouncedParam);
	const { data: users } = useUsers();

	return (
		<Container>
			<Typography.Title level={2}>Project Lists</Typography.Title>
			<SearchPanel users={users || []} param={param} setParam={setParam} />
			{error ? <Typography.Text type='danger'>{error.message}</Typography.Text> : null}
			<List users={users || []} dataSource={list || []} loading={isLoading} />
		</Container>
	);
};

const Container = styled.div`
	padding: 3.2rem;
`;

export default ProjectList;
