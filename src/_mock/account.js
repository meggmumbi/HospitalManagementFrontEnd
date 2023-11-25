import { LoginView } from 'src/sections/login';
// ----------------------------------------------------------------------

export const account = {
  displayName: LoginView.user?.displayName || 'Doctor 1',
  email: LoginView.user?.email || 'doctor1@gmail.com',
  photoURL: '/assets/images/avatars/avatar_25.jpg',
};
