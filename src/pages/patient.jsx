import { Helmet } from 'react-helmet-async';

import { PatientView } from 'src/sections/patient';

// ----------------------------------------------------------------------

export default function PatientPage() {
  return (
    <>
      <Helmet>
        <title> Patients | HMS </title>
      </Helmet>

      <PatientView />
    </>
  );
}
