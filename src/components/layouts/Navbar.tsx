"use client";

import { Search, ChevronDown, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

export default function Navbar() {
  return (
    <header className="w-full shadow-md bg-white sticky top-0 z-50">
      <div className="mx-auto px-10 h-14 flex items-center justify-between">
        {/* LEFT: Logo + Menu (Desktop) */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2 cursor-pointer select-none">
            <Image src="/logo.png" alt="logo" width={170} height={50} />
          </div>

          {/* Navigation menu (Desktop only) */}
          <nav className="hidden md:flex items-center font-medium space-x-4 text-[15px] text-gray-600">
            <a
              href="#"
              className="hover:text-black hover:underline underline-offset-4"
            >
              Bài viết
            </a>
            <a
              href="#"
              className="hover:text-black hover:underline underline-offset-4"
            >
              Việc làm
            </a>
            <a
              href="#"
              className="hover:text-black hover:underline underline-offset-4"
            >
              CV PowerUp
            </a>
            <a
              href="#"
              className="hover:text-black hover:underline underline-offset-4"
            >
              Mentoring 1:1
            </a>
            <a
              href="#"
              className="hover:text-black hover:underline underline-offset-4"
            >
              Techspire
            </a>
            <a
              href="#"
              className="hover:text-black hover:underline underline-offset-4"
            >
              Job simulation
            </a>
            <a
              href="#"
              className="hover:text-black hover:underline underline-offset-4"
            >
              Giới thiệu
            </a>
          </nav>
        </div>

        {/* RIGHT: Search + Language + Login + Register (Desktop only) */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="hidden lg:flex items-center w-64 relative">
            <Search className="absolute left-3 text-gray-400 w-4 h-4" />
            <Input className="pl-10 border rounded-xl" placeholder="Tìm kiếm" />
          </div>
          <button className="hidden md:flex items-center text-sm text-gray-700 hover:text-black">
            Tiếng Việt <ChevronDown className="w-4 h-4 ml-1" />
          </button>
          <button className="flex items-center space-x-3 px-3 py-1 rounded-lg hover:bg-gray-100 transition">
            <Avatar className="w-10 h-10 rounded-full overflow-hidden">
              <AvatarImage
                src="https://i.pinimg.com/736x/af/0e/9c/af0e9cd7bceff14c6ba57d3ac4a41c6c.jpg"
                alt="avatar"
                className="object-cover w-full h-full"
              />
            </Avatar>

            <span className="text-sm font-medium text-gray-800 whitespace-nowrap">
              Trần Thanh Thanh
            </span>

            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="w-6 h-6 text-gray-700" />
            </SheetTrigger>

            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle className="mb-4">
                  <Image src="/logo.png" alt="logo" width={160} height={40} />
                </SheetTitle>
              </SheetHeader>
              {/* SEARCH */}
              <div className="relative my-4">
                <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <Input placeholder="Tìm kiếm" className="pl-10" />
              </div>

              {/* MENU ITEMS */}
              <nav className="flex flex-col space-y-4 mt-6 text-gray-700 text-sm">
                <a
                  href="#"
                  className="hover:text-black hover:underline underline-offset-4"
                >
                  Bài viết
                </a>
                <a href="#" className="hover:text-black">
                  Việc làm
                </a>
                <a href="#" className="hover:text-black">
                  CV PowerUp
                </a>
                <a href="#" className="hover:text-black">
                  Mentoring 1:1
                </a>
                <a href="#" className="hover:text-black">
                  Techspire
                </a>
                <a href="#" className="hover:text-black">
                  Job simulation
                </a>
                <a href="#" className="hover:text-black hover:underline">
                  Giới thiệu
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
