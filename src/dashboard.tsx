import { useAuth } from './features/auth/AuthContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

export default function Dashboard() {
  const { state, dispatch } = useAuth();

  return (
    <>
      <Header
        title="TaskFlow"
        onMenuClick={() => {}}
        userName={state.user?.name}
        onLogout={() => dispatch({ type: 'LOGOUT' })}
      />

      <Sidebar projects={[]} isOpen={true} />
      <MainContent columns={[]} />
    </>
  );
}