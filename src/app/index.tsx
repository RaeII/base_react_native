import { HomeView } from '../viewModels/Home/home.view';
import { useHomeModel } from '@/viewModels/Home/home.model';

export default function App() {

  const props = useHomeModel();

  return (
    <HomeView {...props} />
  );
}


