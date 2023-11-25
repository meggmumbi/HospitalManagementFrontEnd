import SvgColor from 'src/components/svg-color';


// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Appointments',
    path: '/appointment',
    icon: icon('ic_stethoscope'),
  },
  {
    title: 'Patient',
    path: '/labs',
    icon: icon('ic_patient'),
  },
  {
    title: 'Doctors',
    path: '/user',
    icon: icon('ic_doctor'),
  },
  {
    title: 'Pharmacy',
    path: '/pharmacy',
    icon: icon('ic_pharmacy'),
  },
  {
    title: 'Payments',
    path: '/bill',
    icon: icon('ic_payments'),
  },
  // {
  //   title: 'Departments',
  //   path: '',
  //   icon: icon('ic_department'),
  // },
  // {
  //   title: 'Labs',
  //   path: '/labs',
  //   icon: icon('ic_laboratory'),
  // },
  {
    title: 'Hospital',
    path: '/hospital',
    icon: icon('ic_hospital'),
  },
  {
    title: 'Medical Records',
    path: '/medicalHistory',
    icon: icon('ic_medical-records'),
  },
  // {
  //   title: 'user',
  //   path: '/user',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
