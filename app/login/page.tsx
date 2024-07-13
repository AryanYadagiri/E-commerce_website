"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

      if (response.status === 200) {
        router.push('/');
      } else {
        setLoginError('Invalid email or password');
      }
    } catch (error) {
      setLoginError('Error during login');
      console.error('Error during login', error);
    }
  };

  return (
    <section className="flex flex-col items-center pt-6 my-24">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Login to your account
          </h1>
          {loginError && <p className="text-red-500">{loginError}</p>}
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email', { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john@example.com"
              />
              {errors.email && <span className="text-red-500">This field is required</span>}
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register('password', { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
              />
              {errors.password && <span className="text-red-500">This field is required</span>}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don't have an account? <a className="font-medium text-blue-600 hover:underline dark:text-blue-500" href="/signup/regular">Sign up here</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
