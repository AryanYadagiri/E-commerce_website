"use client"; // Add this line at the top

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SellerSignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await axios.post('/api/auth/signup/seller', {
        name: data.name,
        number: data.number,
        email: data.email,
        password: data.password,
        businessName: data.businessName,
        businessAddress: data.businessAddress,
      });
      router.push('/login');
    } catch (error) {
      console.error('Error during sign up', error);
    }
  };

  return (
    <section className="flex flex-col items-center pt-6 my-24">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create a seller account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your full name
              </label>
              <input
                type="text"
                id="name"
                {...register('name', { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Emelia Erickson"
              />
              {errors.name && <span className="text-red-500">This field is required</span>}
            </div>
            <div>
              <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Phone Number
              </label>
              <input
                type="text"
                id="number"
                {...register('number', { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="123-456-7890"
              />
              {errors.number && <span className="text-red-500">This field is required</span>}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email', { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="emelia@example.com"
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
            <div>
              <label htmlFor="businessName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                {...register('businessName', { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your Business Name"
              />
              {errors.businessName && <span className="text-red-500">This field is required</span>}
            </div>
            <div>
              <label htmlFor="businessAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Business Address
              </label>
              <input
                type="text"
                id="businessAddress"
                {...register('businessAddress', { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="123 Business St, City, Country"
              />
              {errors.businessAddress && <span className="text-red-500">This field is required</span>}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create a seller account
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account? <a className="font-medium text-blue-600 hover:underline dark:text-blue-500" href="/login">Sign in here</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SellerSignUp;
