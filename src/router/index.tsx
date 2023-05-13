import { createBrowserRouter } from 'react-router-dom';
import { Listing } from '@/modules/listing';
import { Error } from '@/modules/error';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Listing />,
  },
  {
    path: '*',
    element: <Error />,
  },
]);
