import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { TaskListPage } from './pages/TaskListPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const NavigationBar = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="p-4 bg-white shadow">
      <div className="flex gap-4 items-center">
        <Link to="/" className="font-bold text-lg">ホーム</Link>
        <div className="flex-1"></div>
        {isLoggedIn ? (
          <>
            <Link 
              to="/tasks" 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              タスク一覧
            </Link>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              ログアウト
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login" 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              ログイン
            </Link>
            <Link 
              to="/signup" 
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              サインアップ
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/health')
      .then(response => {
        setMessage('バックエンドと接続成功!');
      })
      .catch(error => {
        setMessage('バックエンドとの接続に失敗...');
      });
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <NavigationBar />
        <div className="min-h-screen bg-gray-100">
          {/* ヘルスチェックの表示 */}
          <div className="p-4">
            <h2 className="text-xl font-bold">接続状態:{message}</h2>
          </div>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/tasks" element={
              <ProtectedRoute><TaskListPage /></ProtectedRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;