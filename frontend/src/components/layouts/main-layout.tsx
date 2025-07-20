import { Outlet } from 'react-router-dom';
import { AppShell, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { Protected } from '@/features/auth/components';


export const MainLayout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    
    <Protected>
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: opened ? 300 : 55,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Topbar toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar className="-z-0 py-3 px-1">
        <ScrollArea type="never">
          <Sidebar />
        </ScrollArea>
      </AppShell.Navbar>
      <AppShell.Main>
  <Outlet />
</AppShell.Main>
    </AppShell>
  </Protected>

  );
};
