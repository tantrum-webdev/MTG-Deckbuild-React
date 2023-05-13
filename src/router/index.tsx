import { createBrowserRouter } from 'react-router-dom';
import { Listing } from '@/modules/listing';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Listing />,
  },
]);
