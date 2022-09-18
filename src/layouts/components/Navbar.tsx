import styled from '@emotion/styled';
import { Row } from 'lib/custom';
import { useAuth } from 'hooks/useAuth';
import { resetRoute } from 'utils';
import { ReactComponent as Logo } from 'assets/logo.svg';
import { Dropdown, Menu, Button, Typography } from 'antd';
import { ProjectPopOver } from 'components/ProjectPopOver';

const Navbar = (props: { setProjectModalOpen: (isOpen: boolean) => void }) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <NavbarList setProjectModalOpen={props.setProjectModalOpen} />
      </HeaderLeft>
      <HeaderRight>
        <NavbarUser />
      </HeaderRight>
    </Header>
  );
};

const NavbarList = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  return (
    <>
      <LogoButton onClick={resetRoute}>
        <Logo
          title="Jira Software"
          width="55"
          height="70"
          viewBox="0 0 70 55"
        />
      </LogoButton>
      <NavTitle>Users</NavTitle>
      <ProjectPopOver setProjectModalOpen={props.setProjectModalOpen} />
    </>
  );
};

const NavbarUser = () => {
  const { logout, user } = useAuth();

  const menuItems = [
    {
      key: 'logout',
      label: 'Logout',
      onClick: logout
    }
  ];

  return (
    <>
      <Dropdown overlay={<Menu items={menuItems} />} trigger={['click']}>
        <ButtonRight type="link" onClick={(e) => e.preventDefault()}>
          Hi, {user?.name}
        </ButtonRight>
      </Dropdown>
    </>
  );
};

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const ButtonRight = styled(Button)`
  font-size: 2.3rem;
`;

const LogoButton = styled.span`
  cursor: pointer;
`;

export const NavTitle = styled(Typography.Text)`
  font-size: 2.5rem;
  cursor: pointer;
`;

export default Navbar;
