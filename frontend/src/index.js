import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { registerLicense } from '@syncfusion/ej2-base'
import { ContextProvider } from './contexts/ContextProvider';

import App from './App';

registerLicense('Mgo+DSMBaFt+QHFqVk9rXVNbdV5dVGpAd0N3RGlcdlR1fUUmHVdTRHRcQlliTX9VckZgWntbdnc=;Mgo+DSMBPh8sVXJ1S0d+X1hPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXpSckRlXXxdc3BTT2M=;ORg4AjUWIQA/Gnt2VFhhQlJNfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5Xd0FiX3tdc3dRTmRf;MTcyOTk4N0AzMjMxMmUzMTJlMzMzOUhFQ0N6Z2gzNWh0b2Y5a2lUSjR6R3Z3aUxiaEZidVBQMXZBcHB5cjh4dE09;MTcyOTk4OEAzMjMxMmUzMTJlMzMzOWFMc0d3SWNKMU55d1NHVlBOMnEvbWRZQnliRG8rdXhTSE95citwUEpVYUk9;NRAiBiAaIQQuGjN/V0d+XU9Hf1RDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31TckRnWHlac3dWQ2ZdUg==;MTcyOTk5MEAzMjMxMmUzMTJlMzMzOVptVm56Q012UVhBWnRidnIwZ1BiTlUxWkNvd3d4VEVURk5qRjFGTk5oOHc9;MTcyOTk5MUAzMjMxMmUzMTJlMzMzOVNFTWhmMlhtcXdTYW5iQnFGcU5WamtmUWorWXZ5TnFSWWVvNXdEeGpPQ0U9;Mgo+DSMBMAY9C3t2VFhhQlJNfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5Xd0FiX3tdc3dTRWJf;MTcyOTk5M0AzMjMxMmUzMTJlMzMzOUwxb1VVdExaaFJtSFJPclM0MUJCV0NOZ093VnFTUVppM1Y2a3c4WUNHM0U9;MTcyOTk5NEAzMjMxMmUzMTJlMzMzOVZUQXkyb3RFaGFVS1pZM0FVOFl2Rmx4V3Q0V0JOSnZqcWxTUThpSjRtQWs9;MTcyOTk5NUAzMjMxMmUzMTJlMzMzOVptVm56Q012UVhBWnRidnIwZ1BiTlUxWkNvd3d4VEVURk5qRjFGTk5oOHc9')

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);