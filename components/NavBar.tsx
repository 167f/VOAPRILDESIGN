"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Update the navigation items and add contact button
export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navItems = [
    { name: "HOME", action: () => scrollToSection("home-section") },
    { name: "WORKS", action: () => scrollToSection("works-section") },
    { name: "CONTACT", action: () => scrollToSection("contact-section") },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 bg-white/90 backdrop-blur-md">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-black">
          APRIL&apos;S DESIGN PORTFOLIO
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button key={item.name} onClick={item.action} className="text-black/80 hover:text-black transition-colors">
              {item.name}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button
            variant="outline"
            className="rounded-full px-6 border-black text-black hover:bg-black hover:text-white"
            onClick={() => scrollToSection("contact-section")}
          >
            Contact Me
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-black">
              <Menu />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
            <nav className="flex flex-col space-y-6 mt-12">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    item.action()
                    setIsOpen(false)
                  }}
                  className="text-xl font-medium text-black/80 hover:text-black transition-colors text-left"
                >
                  {item.name}
                </button>
              ))}
              <Button
                variant="outline"
                className="rounded-full px-6 border-black text-black hover:bg-black hover:text-white w-fit"
                onClick={() => {
                  scrollToSection("contact-section")
                  setIsOpen(false)
                }}
              >
                Contact Me
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

