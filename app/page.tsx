"use client"

import { useState, useEffect, useRef } from "react"
import NavBar from "@/components/NavBar"
import FeaturedCard from "@/components/FeaturedCard"
import ProjectCard from "@/components/ProjectCard"
import SkillsCard from "@/components/SkillsCard"
import { Mail, Phone, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Hero slider images
const heroImages = [
  "/placeholder.svg?height=800&width=1400",
  "/placeholder.svg?height=800&width=1400",
  "/placeholder.svg?height=800&width=1400",
  "/placeholder.svg?height=800&width=1400",
  "/placeholder.svg?height=800&width=1400",
]

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideInterval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setMounted(true)

    // Auto-advance slides
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current)
      }
    }
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    resetSlideInterval()
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1))
    resetSlideInterval()
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    resetSlideInterval()
  }

  const resetSlideInterval = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current)
    }
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
  }

  if (!mounted) {
    return null
  }

  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 pt-24 pb-12">
        {/* Hero Section with Slider */}
        <section id="home-section" className="w-full py-16 md:py-24">
          <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden rounded-2xl">
            {/* Slider */}
            <div
              className="w-full h-full flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {heroImages.map((image, index) => (
                <div key={index} className="min-w-full h-full" style={{ flex: "0 0 100%" }}>
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Hero slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-black z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-black z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-white w-4" : "bg-white/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-16 max-w-xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-bold text-black mb-4">APRIL</h1>
            <p className="text-black/70 mb-8">Get Your Design Fix. Where Creativity Meets Functionality.</p>
          </div>
        </section>

        {/* Works Section */}
        <section id="works-section" className="w-full py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">MY WORKS</h2>
            <p className="text-black/60">Design in its purest form</p>
          </div>

          {/* Main Content Area */}
          <div className="w-full h-full flex flex-col space-y-4">
            {/* Top Row - Featured Projects */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Featured Project - Industrial Design */}
              <div className="w-full aspect-[1/1.2] md:aspect-[1/1.1]">
                <FeaturedCard
                  title="Industrial Design"
                  description="Showcasing product design projects with a focus on form and function"
                  href="/projects/industrial-design"
                  textPosition="bottom"
                  textColor="dark"
                  className="w-full h-full"
                  bgColor="bg-gray-100"
                />
              </div>

              {/* Right Column - Two Medium Cards */}
              <div className="w-full grid grid-rows-2 gap-4">
                {/* Top Right Card - AIGC Design */}
                <div className="w-full aspect-[2/1]">
                  <FeaturedCard
                    title="AIGC-Assisted Design"
                    description="Exploring the intersection of AI and creative design"
                    href="/projects/aigc-design"
                    textPosition="bottom"
                    textColor="dark"
                    className="w-full h-full"
                    bgColor="bg-gray-100"
                  />
                </div>

                {/* Bottom Right Card - Motion Design */}
                <div className="w-full aspect-[2/1]">
                  <FeaturedCard
                    title="Motion Design"
                    description="Dynamic visual experiences and animations"
                    href="/projects/motion-design"
                    textPosition="right"
                    textColor="dark"
                    className="w-full h-full"
                    bgColor="bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Row - Project Cards */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="w-full aspect-[3/1] sm:aspect-[3/0.8]">
                <ProjectCard
                  title="Project 1"
                  value="Phantom"
                  description="Award-winning speaker design"
                  color="white"
                  href="/projects/phantom"
                  className="w-full h-full"
                />
              </div>

              <div className="w-full aspect-[3/1] sm:aspect-[3/0.8]">
                <ProjectCard
                  title="Project 2"
                  value="Gemini"
                  description="Wireless audio system"
                  color="blue"
                  href="/projects/gemini"
                  className="w-full h-full"
                />
              </div>

              <div className="w-full aspect-[3/1] sm:aspect-[3/0.8]">
                <SkillsCard
                  category="Software Skills"
                  skills={["Rhino", "KEYSHOT", "C4D", "Midjourney", "Stable Diffusion", "AI", "Photoshop"]}
                  color="gray"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact-section" className="w-full py-16 mt-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">CONTACT ME</h2>
            <p className="text-black/60">Let's work together</p>
          </div>

          <div className="max-w-md mx-auto bg-gray-100 rounded-3xl p-8 shadow-sm">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-full">
                  <Mail className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-sm text-black/60">Email</p>
                  <p className="font-medium">April.design2025@163.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-full">
                  <Phone className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-sm text-black/60">Phone</p>
                  <p className="font-medium">17857133360</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-12 flex justify-center space-x-4 pb-8">
          <span className="text-sm text-black/60">© 2025 April's Design Portfolio</span>
        </div>
      </div>
    </main>
  )
}

