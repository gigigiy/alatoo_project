// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateEntry from './components/CreateEntry';
import EditEntry from './components/EditEntry';
import AppRoutes from './routes';
import PrivateRoute from './PrivateRoute';

function App() {
  return (

      <div>
        <Navbar />
        <div>
          <Routes>
            {/* Private routes */}
            <Route path="/create" element={<PrivateRoute element={<CreateEntry />} />} />
            <Route path="/edit/:id" element={<PrivateRoute element={<EditEntry />} />} />

            {/* Public routes */}
            <Route path="/*" element={<AppRoutes />} />
          </Routes>
        </div>

      </div>

  );
}

export default App;
