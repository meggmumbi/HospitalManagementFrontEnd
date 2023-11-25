import { Helmet } from 'react-helmet-async';

import { AppointmentView} from 'src/sections/appointment';

// ----------------------------------------------------------------------

export default function AppointmentPage() {
  return (
    <>
      <Helmet>
        <title> Appointment | HMS </title>
      </Helmet>

      <AppointmentView />
    </>
  );
}
