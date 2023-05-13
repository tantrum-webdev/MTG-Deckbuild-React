import { createBrowserRouter } from 'react-router-dom';
import { Listing } from '@/modules/listing';
import { Error } from '@/modules/error';
import { Deck } from '@/modules/deck';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Listing />,
  },
  {
    path: '/decks/:id',
    element: <Deck />,
    errorElement: <Error message="No matching deck" />,
  },
  {
    path: '*',
    element: <Error message="No matching route" />,
  },
]);
