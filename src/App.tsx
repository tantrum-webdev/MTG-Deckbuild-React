import { RecoilRoot } from 'recoil';
import { Listing } from '@/modules/Listing';
import './styles.css';

function App() {
  return (
    <RecoilRoot>
      <Listing />
    </RecoilRoot>
  );
}

export default App;
