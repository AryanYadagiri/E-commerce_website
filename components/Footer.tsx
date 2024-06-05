import React from "react";
import { RiInstagramFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <nav className="grid grid-flow-col gap-4 space-x-7">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Project code</a>
        <a className="link link-hover">Return to top</a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4 space-x-5">
          <a>
          <RiInstagramFill className="text-4xl" />
          </a>
          <a>
          <BsTwitterX className="text-3xl"/>
          </a>
          <a>
          <FaLinkedinIn className="text-4xl"/>
          </a>
        </div>
      </nav>
      <aside>
        <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
      </aside>
    </footer>
  );
};

export default Footer;
