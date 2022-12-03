import Routes from "./Routes";
import { BrowserRouter } from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;