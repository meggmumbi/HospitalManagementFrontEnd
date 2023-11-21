import { Helmet } from 'react-helmet-async';

import { RecordView } from 'src/sections/records';

// ----------------------------------------------------------------------

export default function RecordPage() {
  return (
    <>
      <Helmet>
        <title> Pharmacy Records | HMS </title>
      </Helmet>

      <RecordView />
    </>
  );
}
