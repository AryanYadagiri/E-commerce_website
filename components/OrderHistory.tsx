"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';

type Order = {
  number: string;
  status: string;
  href: string;
  invoiceHref: string;
  products: Product[];
};

type Product = {
  id: string;
  name: string;
  color: string;
  size: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

const fetchOrders = async (): Promise<{ orders: Order[] }> => {
  const response = await fetch('/api/orders'); // example API endpoint
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const OrderHistory = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading orders</p>;
  }

  const orders = data?.orders || [];

  return (
    <main className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:pt-24 sm:pb-32 lg:px-8">
      <div className="max-w-xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Your Orders</h1>
        <p className="mt-2 text-sm text-gray-500">
          Check the status of recent orders, manage returns, and discover similar products.
        </p>
      </div>

      <div className="mt-12 space-y-16 sm:mt-16">
        {orders.map((order) => (
          <section key={order.number} aria-labelledby={`${order.number}-heading`}>
            <div className="space-y-1 md:flex md:items-baseline md:space-y-0 md:space-x-4">
              <h2 id={`${order.number}-heading`} className="text-lg font-medium text-gray-900 md:flex-shrink-0">
                Order #{order.number}
              </h2>
              <div className="space-y-5 md:flex-1 md:min-w-0 sm:flex sm:items-baseline sm:justify-between sm:space-y-0">
                <p className="text-sm font-medium text-gray-500">{order.status}</p>
                <div className="flex text-sm font-medium">
                  <a href={order.href} className="text-indigo-600 hover:text-indigo-500">
                    Manage order
                  </a>
                  <div className="border-l border-gray-200 ml-4 pl-4 sm:ml-6 sm:pl-6">
                    <a href={order.invoiceHref} className="text-indigo-600 hover:text-indigo-500">
                      View Invoice
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 -mb-6 flow-root border-t border-gray-200 divide-y divide-gray-200">
              {order.products.map((product) => (
                <div key={product.id} className="py-6 sm:flex">
                  <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="flex-none w-20 h-20 rounded-md object-center object-cover sm:w-48 sm:h-48"
                    />
                    <div className="pt-1.5 min-w-0 flex-1 sm:pt-0">
                      <h3 className="text-sm font-medium text-gray-900">
                        <a href={product.href}>{product.name}</a>
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        <span>{product.color}</span>{' '}
                        <span className="mx-1 text-gray-400" aria-hidden="true">
                          &middot;
                        </span>{' '}
                        <span>{product.size}</span>
                      </p>
                      <p className="mt-1 font-medium text-gray-900">{product.price}</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4 sm:mt-0 sm:ml-6 sm:flex-none sm:w-40">
                    <button
                      type="button"
                      className="w-full flex items-center justify-center bg-indigo-600 py-2 px-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full sm:flex-grow-0"
                    >
                      Buy again
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full sm:flex-grow-0"
                    >
                      Shop similar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
};

export default OrderHistory;
