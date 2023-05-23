import { RecoilRoot } from 'recoil';
import './styles.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
