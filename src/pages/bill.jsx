import { Helmet } from 'react-helmet-async';

import { BillView} from 'src/sections/bill';

// ----------------------------------------------------------------------

export default function BillPage() {
  return (
    <>
      <Helmet>
        <title> Bill | HMS </title>
      </Helmet>

      <BillView />
    </>
  );
}
