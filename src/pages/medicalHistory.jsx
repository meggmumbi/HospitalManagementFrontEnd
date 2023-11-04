import { Helmet } from 'react-helmet-async';

import { MedicalRecordView } from 'src/sections/medrecords';

// ----------------------------------------------------------------------

export default function MedicalRecordPage() {
  return (
    <>
      <Helmet>
        <title> Medical History | HMS </title>
      </Helmet>

      <MedicalRecordView />
    </>
  );
}
