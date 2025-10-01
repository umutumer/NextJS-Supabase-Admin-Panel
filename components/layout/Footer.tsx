import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-8 px-24 pt-12 border-t border-t-foreground/10">
      <div className="w-full flex justify-between">
        <div className="max-w-xs">
          <h6 className="font-bold text-xl mb-4">DASHBOARD</h6>
          <p>
            This project is a project created using Next.js and Supabase to
            learn Supabase.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h6 className="font-bold text-xl">Site Map</h6>
          <Link href="/" className="hover:underline transition duration-300">Home</Link>
          <Link href="/products" className="hover:underline transition duration-300">Products</Link>
          <Link href="/users" className="hover:underline transition duration-300">Users</Link>
        </div>
        <div className="flex flex-col gap-2">
          <h6 className="font-bold text-xl">Contact</h6>
          <p>Email: utumer6@gmail.com</p>
          <p>Phone: +90 534 591 84 76</p>
          <div className="flex gap-4">
            <Link href="https://instagram.com/umutumer" className="hover:bg-primary hover:text-white p-2 rounded-full transition duration-300" target="_blank">
              <Instagram />
            </Link>
            <Link href="https://github.com/umutumer" className="hover:bg-primary hover:text-white p-2 rounded-full transition duration-300" target="_blank">
              <Github />
            </Link>
            <Link href="https://linkedin.com/in/umutumer" className="hover:bg-primary hover:text-white p-2 rounded-full transition duration-300" target="_blank">
              <Linkedin />
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full border-t border-t-foreground/10 flex justify-center items-center py-4">
        <p>© 2025 <Link href="https://linkedin.com/in/umutumer" className="hover:underline" target="_blank">Umut Can Tümer</Link>. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
