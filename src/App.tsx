import { Toaster } from 'react-hot-toast';
import Router from './routes';
import { GlobalStyles } from './styles/global';

const App = () => (
  <>
    <GlobalStyles />
    <Router />
    <Toaster
      position='top-right'
      reverseOrder={false}
      toastOptions={{ duration: 3500 }}
    />
  </>
);

export default App;
