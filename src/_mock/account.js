import { LoginView } from 'src/sections/login';
// ----------------------------------------------------------------------

export const account = {
  displayName: LoginView.user?.displayName || 'Jaydon Frankie',
  email: LoginView.user?.email || 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_25.jpg',
};
