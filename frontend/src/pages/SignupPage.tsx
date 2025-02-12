import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface SignupCredentials {
  email: string;
  password: string;
  name: string;
}

export const SignupPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupCredentials>();

  const onSubmit = async (data: SignupCredentials) => {
    try {
      await axios.post('http://localhost:8080/auth/signup', data);
      // サインアップ成功後、ログインページへリダイレクト
      window.location.href = '/login';
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">サインアップ</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">名前</label>
            <input
              {...register('name', { required: true })}
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.name && <span className="text-red-500">名前は必須です</span>}
          </div>
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
            登録
          </button>
        </form>
      </div>
    </div>
  );
};