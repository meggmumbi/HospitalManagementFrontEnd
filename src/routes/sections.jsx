import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const PatientPage = lazy(() => import('src/pages/patient'));
export const LabPage = lazy(() => import('src/pages/labs'));
export const PharmacyPage = lazy(() => import('src/pages/pharmacy'));
export const HospitalPage = lazy(() => import('src/pages/hospital'));
export const MedicalHistoryPage = lazy(() => import('src/pages/medicalHistory'));
export const CreateNewPatientPage = lazy(() => import('src/pages/create-new-patient'));
export const CreateNewItemPage = lazy(() => import('src/pages/create-new-item'));
export const CreateNewBranchPage = lazy(() => import('src/pages/create-hospital-branch'));
export const TriagePage = lazy(() => import('src/pages/triage-form'));
export const PatientProfilePage = lazy(() => import('src/pages/patient-info'));
export const LabReportPage = lazy(() => import('src/pages/lab-report-form'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: 'dashboard', element: <IndexPage />},
        { path: 'user', element: <UserPage /> },
        { path: 'patients', element: <PatientPage /> },
        { path: 'labs', element: <LabPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'pharmacy', element: <PharmacyPage /> },
        { path: 'hospital', element: <HospitalPage /> },
        { path: 'medicalHistory', element: <MedicalHistoryPage /> },
        { path: 'createPatient', element: <CreateNewPatientPage /> },
        { path: 'createItem', element: <CreateNewItemPage /> },
        { path: 'createBranch', element: <CreateNewBranchPage /> },
        { path: 'patientprofile', element: <PatientProfilePage /> },
        { path: 'labreport', element: <LabReportPage /> },
        { path: 'triage', element: <TriagePage /> },
       
      ],
    },
    {
     
      element: <LoginPage />,index: true,
    },
    {
      path: '404',
      element: <Page404 />,
    },
   
  ]);

  return routes;
}
