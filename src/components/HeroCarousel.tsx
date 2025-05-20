"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronRight, Expand } from "lucide-react"
import { heroImages } from "@/data/hero-images"

interface HeroCarouselProps {
  openGalleryWithImage: (index: number) => void
}

export function HeroCarousel({ openGalleryWithImage }: HeroCarouselProps) {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0)
  const [aboutExpanded, setAboutExpanded] = useState(false)

  // Cycle through hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] rounded-lg overflow-hidden shadow-xl">
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentHeroIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 text-white right-4 sm:right-6 md:right-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-1 md:mb-2">
          The Old School <span className="font-bold">Workspace</span>
        </h2>
        <div className="flex flex-col gap-2 md:gap-3">
          <div>
            <p className="text-base sm:text-xl md:text-2xl font-light">
              A historic building reimagined for modern events and gatherings
              <button
                onClick={() => setAboutExpanded(!aboutExpanded)}
                className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/20 hover:bg-white/30 text-white font-medium text-sm sm:text-base md:text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                {aboutExpanded ? "Read Less" : "Read More"}
                {aboutExpanded ? (
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 rotate-90 transition-transform duration-300" />
                ) : (
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 -rotate-90 transition-transform duration-300" />
                )}
              </button>
            </p>
          </div>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              aboutExpanded ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="text-white/90 max-w-3xl">
              <p className="mb-4">
                The Old School Workspace is a historic school building that has been thoughtfully converted into a
                versatile venue while preserving its original character and charm. Our spaces range from intimate
                meeting rooms to large halls suitable for conferences, sports activities, and social events.
              </p>
              <p>
                Each space has been carefully restored to highlight original features while incorporating modern
                amenities and technology.
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => openGalleryWithImage(currentHeroIndex === 0 ? 6 : currentHeroIndex === 1 ? 6 : 6)} // This logic for index might need review based on actual galleryImages
        className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-all duration-300"
        aria-label="Expand image"
      >
        <Expand className="h-5 w-5 text-white" />
      </button>

      {/* Image indicator dots */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentHeroIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentHeroIndex ? "bg-white scale-125" : "bg-white/50"
            }`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
} 