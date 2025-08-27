import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { AuthContextProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import Todos from './pages/Todos';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/todos" 
              element={
                <ProtectedRoute>
                  <Todos />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/logout" 
              element={
                <ProtectedRoute>
                  <Logout />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Footer />
        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;