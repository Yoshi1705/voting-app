import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Vote from './pages/voting/Vote';
import Candidates from './pages/candidates/Candidates';
import Results from './pages/results/Results';
import ElectionControl from './pages/admin/ElectionControl';
import ManageCandidates from './pages/coordinator/ManageCandidates';
import Unauthorized from './pages/error/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              
              {/* Voting routes - for voters and candidates */}
              <Route
                path="vote"
                element={
                  <ProtectedRoute requiredRoles={['VOTER']}>
                    <Vote />
                  </ProtectedRoute>
                }
              />
              
              {/* Candidates list - accessible to all roles */}
              <Route path="candidates" element={<Candidates />} />
              
              {/* Results - admin only */}
              <Route
                path="results"
                element={
                  <ProtectedRoute requiredRoles={['ADMIN']}>
                    <Results />
                  </ProtectedRoute>
                }
              />
              
              {/* Admin routes */}
              <Route
                path="election-control"
                element={
                  <ProtectedRoute requiredRoles={['ADMIN']}>
                    <ElectionControl />
                  </ProtectedRoute>
                }
              />
              
              {/* Coordinator routes */}
              <Route
                path="manage-candidates"
                element={
                  <ProtectedRoute requiredRoles={['COORDINATOR']}>
                    <ManageCandidates />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#4ade80',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
