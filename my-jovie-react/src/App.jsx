
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header"
import Home from "./pages/Home"
import Form from "./pages/Form"
import SubmitSuccess from "./pages/SubmitSuccess"
import Footer from "./components/Footer"
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apply" element={<Form />} />
            <Route path="/apply/success" element={<SubmitSuccess />} />
          </Routes>
          <Footer />
      </Router>
    </>
  )
}

export default App;
