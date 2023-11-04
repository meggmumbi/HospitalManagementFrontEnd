import { Helmet } from 'react-helmet-async';

import { PharmacyView } from 'src/sections/pharmacy';

// ----------------------------------------------------------------------

export default function PharmacyPage() {
  return (
    <>
      <Helmet>
        <title> Pharmacy Items | HMS </title>
      </Helmet>

      <PharmacyView />
    </>
  );
}
