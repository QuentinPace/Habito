import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import BrowseProgramsPage from '../components/BrowseProgramsPage';
import CreateProgramPage from '../components/CreateProgramPage'
import ProgramDetailsPage from '../components/ProgramDetailsPage';
import EditProgramForm from '../components/EditProgramForm';
import ProfilePage from '../components/ProfilePage';
import Home from '../components/Home'
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "createprogram",
        element: <CreateProgramPage />,
      },
      {
        path: "browse",
        element: <BrowseProgramsPage />,
      },
      {
        path: "program/:programId",
        element: <ProgramDetailsPage />,
      },
      {
        path: "program/:programId/edit",
        element: <EditProgramForm />,
      },
      {
        path: "profile/:userId",
        element: <ProfilePage/>,
      }
    ],
  },
]);