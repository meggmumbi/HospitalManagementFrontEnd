import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const PatientPage = lazy(() => import('src/pages/patient'));
export const BillPage = lazy(() => import('src/pages/bill'));
export const LabPage = lazy(() => import('src/pages/labs'));
export const AppointmentPage = lazy(() => import('src/pages/appointments'));
export const PharmacyPage = lazy(() => import('src/pages/pharmacy'));
export const RecordPage = lazy(() => import('src/pages/pharmacy-records'));
export const HospitalPage = lazy(() => import('src/pages/hospital'));
export const MedicalHistoryPage = lazy(() => import('src/pages/medicalHistory'));
export const CreateNewPatientPage = lazy(() => import('src/pages/create-new-patient'));
export const CreateNewAppointmentPage = lazy(() => import('src/pages/create-new-appoinment'));
export const CreateNewUserPage = lazy(() => import('src/pages/create-new-user'));
export const CreateNewBillPage = lazy(() => import('src/pages/create-new-bill'));
export const CreateNewItemPage = lazy(() => import('src/pages/create-new-item'));
export const CreateNewBranchPage = lazy(() => import('src/pages/create-hospital-branch'));
export const TriagePage = lazy(() => import('src/pages/triage-form'));
export const PatientProfilePage = lazy(() => import('src/pages/patient-info'));
export const LabReportPage = lazy(() => import('src/pages/lab-report-form'));
export const ReportPage = lazy(() => import('src/pages/lab-report'));
export const PharmacyDispensePage = lazy(() => import('src/pages/pharmacy-dispense'));
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
        { path: 'appointment', element: <AppointmentPage /> },
        { path: 'bill', element: <BillPage /> },
        { path: 'patients', element: <PatientPage /> },
        { path: 'labs', element: <LabPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'pharmacy', element: <PharmacyPage /> },
        { path: 'hospital', element: <HospitalPage /> },
        { path: 'medicalHistory', element: <MedicalHistoryPage /> },
        { path: 'createPatient', element: <CreateNewPatientPage /> },
        { path: 'createAppointment', element: <CreateNewAppointmentPage /> },
        { path: 'createBill', element: <CreateNewBillPage /> },
        { path: 'createUser', element: <CreateNewUserPage /> },
        { path: 'createItem', element: <CreateNewItemPage /> },
        { path: 'createBranch', element: <CreateNewBranchPage /> },
        { path: 'patientprofile', element: <PatientProfilePage /> },
        { path: 'labreport', element: <LabReportPage /> },
        { path: 'report', element: <ReportPage /> },
        { path: 'triage', element: <TriagePage /> },
        { path: 'records', element: <RecordPage /> },
        { path: 'pharmacyDispence', element: <PharmacyDispensePage /> },
       
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
