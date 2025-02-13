import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

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
      <nav className="p-4 bg-white shadow">
        <div className="flex gap-4">
          <Link to="/" className="font-bold text-lg">ホーム</Link>
          <div className="flex-1"></div>
          <Link 
            to="/login" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            ログイン
          </Link>
          <div className="flex-1"></div>
          <Link 
            to="/signup" 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            サインアップ
          </Link>
        </div>
      </nav>
      <div className="min-h-screen bg-gray-100">
        {/* ヘルスチェックの表示 */}
        <div className="p-4">
          <h1 className="text-xl font-bold">サーバー状態</h1>
          <p className="mt-2">{message}</p>
        </div>

        {/* メインコンテンツ */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* ここに他のルートを追加していく */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;