import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/layouts/main-layout";
import { Dashboard } from "./features/dashboard/routes";
import { AuthLayout } from "./components/layouts/auth-layout";
import { Login } from "./features/login/routes";
import { NotFound } from "./features/not-found/routes";
import { TeacherList } from "./features/teachers/routes";
import { StudentList } from "./features/students/routes";
import { AdminList } from "./features/admin/routes";
import { TemplateManager } from "./template/routes";
import { ScanJobManager } from "./scan-job/routes";


export const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'Teachers',
        element: <TeacherList />,
      },
      {
        path: 'Students',
        element: <StudentList />,
      },
      {
        path: 'Admins',
        element: <AdminList />,
      },

      {
        path: 'Template',
        element: <TemplateManager />,
      },
      {
        path: 'scan-job',
        element: <ScanJobManager />,
      },
    
    
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
