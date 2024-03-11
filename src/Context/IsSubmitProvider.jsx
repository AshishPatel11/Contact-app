import { useState } from 'react';
import { isSubmit } from './context';

function IsSubmitProvider({ children }) {
  const [isSubmitted, setSubmitted] = useState(false);
  return (
    <>
      <isSubmit.Provider value={[isSubmitted, setSubmitted]}>
        {children}
      </isSubmit.Provider>
    </>
  );
}

export default IsSubmitProvider;
