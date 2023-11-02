import SvgColor from 'src/components/svg-color';


// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Appointments',
    path: '',
    icon: icon('ic_stethoscope'),
  },
  {
    title: 'Patient',
    path: '/patients',
    icon: icon('ic_patient'),
  },
  {
    title: 'Doctors',
    path: '',
    icon: icon('ic_doctor'),
  },
  {
    title: 'Pharmacy',
    path: '/products',
    icon: icon('ic_pharmacy'),
  },
  {
    title: 'Payments',
    path: '',
    icon: icon('ic_payments'),
  },
  {
    title: 'Departments',
    path: '',
    icon: icon('ic_department'),
  },
  {
    title: 'Labs',
    path: '',
    icon: icon('ic_laboratory'),
  },
  {
    title: 'Hospital',
    path: '',
    icon: icon('ic_hospital'),
  },
  {
    title: 'Medical Records',
    path: '',
    icon: icon('ic_medical-records'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
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
