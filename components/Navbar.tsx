"use client";

import React from "react";
import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Navbar = () => {

  const { data: session, status } = useSession();
  const isSeller = session?.user.role === "SELLER"

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Shopi</a>
        <div className="ml-10 space-x-10">
          <Link href={isSeller ? "/seller-dashboard" : "/"}>
            {isSeller ? "Dashboard" : "Home"}
          </Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact Us</Link>
        </div>
      </div>
      {!isSeller && (
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <Link href={`/shopping-cart/${session?.user.id}`}><TiShoppingCart className="text-5xl mx-2" /></Link>
        </div>
      )}
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            {status === "loading" ? (
              <li>Loading...</li>
            ) : session ? (
              isSeller ? (
                <>
                  <li>
                    <Link href="/profile">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <a onClick={() => signOut({ callbackUrl: '/' })}>Logout</a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/profile">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings">Settings</Link>
                  </li>
                  <li>
                    <Link href="/seller-signup">Become seller</Link>
                  </li>
                  <li>
                    <a onClick={() => signOut({ callbackUrl: '/' })}>Logout</a>
                  </li>
                </>
              )
            ) : (
              <>
                <li>
                  <Link href="/login">Login</Link>
                </li>
                <li>
                  <Link href="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link href="/seller-signup">Become Seller</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;