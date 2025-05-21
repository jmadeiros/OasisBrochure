"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Users, Maximize, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SpaceContentProps {
  content: any // We'll need to define this type properly later
  activeSubTab: string
  handleSubTabChange: (value: string) => void
  subTabs: Array<{ id: string; name: string }>
  scrollToContact: () => void
  handleBookTour: () => void
}

export function SpaceContent({
  content,
  activeSubTab,
  handleSubTabChange,
  subTabs,
  scrollToContact,
  handleBookTour,
}: SpaceContentProps) {
  const [currentSpaceImageIndex, setCurrentSpaceImageIndex] = useState(0)

  // Reset image index when content (and thus images) changes
  useEffect(() => {
    setCurrentSpaceImageIndex(0);
  }, [activeSubTab]); // Reset when activeSubTab changes, indicating new content is displayed

  if (!content) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>No content to display for this selection.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* SubTab Navigation - REMOVED */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-full">
          {/* Main image with navigation */}
          <div className="absolute inset-0">
            <Image
              src={content.images[currentSpaceImageIndex] || "/placeholder.svg"}
              alt={content.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute top-4 left-4">
            <Badge className="text-white font-normal px-3 py-1 text-xs" style={{ backgroundColor: "#0f766e" }}>
              {content.title}
              {activeSubTab === "consultation-rooms" ? ` - Room ${currentSpaceImageIndex + 1}` : ""}
              {content.popular && (
                <span className="ml-2 bg-white text-[#0f766e] px-1 rounded-sm text-[10px]">POPULAR</span>
              )}
            </Badge>
          </div>

          {/* Image navigation controls */}
          {content.images.length > 1 && (
            <>
              {/* Left arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentSpaceImageIndex((prev) => (prev === 0 ? content.images.length - 1 : prev - 1))
                }}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full p-2 shadow-sm transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Right arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentSpaceImageIndex((prev) => (prev === content.images.length - 1 ? 0 : prev + 1))
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full p-2 shadow-sm transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Image counter */}
              <div className="absolute bottom-3 right-3 bg-white/70 rounded-full px-2 py-0.5 text-xs font-medium text-gray-700">
                {currentSpaceImageIndex + 1} / {content.images.length}
              </div>
            </>
          )}
        </div>

        <div className="p-4 sm:p-6 md:p-8 flex flex-col">
          {/* Title with badge for price/popular if available */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 md:mb-4">
            <h3 className="text-xl sm:text-2xl font-medium text-foreground">{content.title}</h3>
            {content.price && (
              <div className="mt-2 sm:mt-0">
                <span className="inline-block bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full text-sm">
                  {content.price} <span className="font-normal">{content.period}</span>
                  {content.popular && (
                    <span className="ml-2 bg-primary text-white px-2 py-0.5 rounded-full text-xs">Popular</span>
                  )}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm sm:text-base mb-5 leading-relaxed">{content.description}</p>

          {/* Content sections with improved mobile layout */}
          <div className="space-y-5 mb-5 bg-gray-50 p-3 sm:p-4 rounded-lg">
            {/* Capacity */}
            {content.capacity && (
              <div className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Users className="h-4 w-4 mr-2 text-primary" />
                  Capacity
                </h4>
                <ul className="space-y-1.5 text-gray-700">
                  {content.capacity.map((item: any, index: number) => ( // item temporarily any
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>
                        <span className="font-medium">{item.type}:</span> {item.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Dimensions */}
            {content.dimensions && (
              <div className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Maximize className="h-4 w-4 mr-2 text-primary" />
                  Dimensions
                </h4>
                <p className="text-gray-700">{content.dimensions}</p>
              </div>
            )}

            {/* Features */} 
            {content.features && (
              <div className="last:border-0 last:pb-0">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Award className="h-4 w-4 mr-2 text-primary" />
                  Features
                </h4>
                <ul className="grid grid-cols-2 gap-x-2 gap-y-1 sm:gap-y-1.5 text-gray-700 text-xs sm:text-sm">
                  {content.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-1">•</span>
                      <span className="truncate overflow-hidden sm:overflow-visible">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="mt-auto pt-2 flex flex-col sm:flex-row gap-3">
            <Button
              className="w-full sm:w-auto bg-[#0f766e] hover:bg-[#0f766e]/90 text-white py-2.5 h-auto"
              onClick={scrollToContact}
            >
              Inquire About This Space
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto border-[#0f766e] text-[#0f766e] py-2.5 h-auto"
              onClick={handleBookTour}
            >
              Book a Tour
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 