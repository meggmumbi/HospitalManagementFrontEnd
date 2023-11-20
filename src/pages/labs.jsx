import { Helmet } from 'react-helmet-async';

import { LabView } from 'src/sections/labs';

// ----------------------------------------------------------------------

export default function LabPage() {
  return (
    <>
      <Helmet>
        <title> Triage | HMS </title>
      </Helmet>

      <LabView />
    </>
  );
}
