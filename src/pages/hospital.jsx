import { Helmet } from 'react-helmet-async';

import { HospitalView } from 'src/sections/hospital';

// ----------------------------------------------------------------------

export default function HospitalPage() {
  return (
    <>
      <Helmet>
        <title> Hospital | HMS </title>
      </Helmet>

      <HospitalView />
    </>
  );
}
