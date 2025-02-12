import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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