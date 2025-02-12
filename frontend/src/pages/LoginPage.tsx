import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginCredentials } from '../types/auth';
import axios from 'axios';

export const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>();

  const onSubmit = async (data: LoginCredentials) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', data);
      localStorage.setItem('token', response.data.token);
      console.log('Login success:', response.data);
      // ログイン成功後の処理（例：ホームページへリダイレクト）
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">ログイン</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">メールアドレス</label>
            <input
              {...register('email', { required: true })}
              type="email"
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.email && <span className="text-red-500">メールアドレスは必須です</span>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">パスワード</label>
            <input
              {...register('password', { required: true })}
              type="password"
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.password && <span className="text-red-500">パスワードは必須です</span>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
};