import Routes from "./Routes";
import { BrowserRouter } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastProvider } from 'react-toast-notifications';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Header />
        <Routes />
        <Footer />
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;