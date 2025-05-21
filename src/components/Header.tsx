"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Award, Share, Mail } from "lucide-react"

interface HeaderProps {
  scrollToContact: () => void
  handleBookTour: () => void
}

export function Header({ scrollToContact, handleBookTour }: HeaderProps) {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b py-3 md:py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-light text-foreground">
            The <span className="font-bold">Village</span>
          </h1>
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-secondary font-medium text-sm md:text-base px-2 py-1 md:px-3 md:py-2"
              onClick={scrollToContact}
            >
              Contact
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-primary border-primary text-sm md:text-base px-2 py-1 md:px-3 md:py-2"
              onClick={handleBookTour}
            >
              Book Tour
            </Button>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 pt-6 md:pt-8 pb-3 md:pb-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground max-w-3xl">
          The Village: A Historic School Building Reimagined
        </h1>
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between mt-3 md:mt-4 gap-2 sm:gap-0">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <div className="flex items-center">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-primary text-primary" />
              <span className="font-medium ml-1">Exceptional Venue</span>
            </div>
            <span className="mx-1 text-gray-300 hidden sm:inline">|</span>
            <Badge
              variant="outline"
              className="rounded-full font-medium bg-accent text-accent-foreground border-0 hover:bg-accent text-xs"
            >
              <Award className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" /> Award Winning
            </Badge>
            <span className="mx-1 text-gray-300 hidden sm:inline">|</span>
            <span className="font-medium">Tulse Hill, London SW2 3UP</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
            {/* <Button
              variant="ghost"
              size="sm"
              className="rounded-md flex items-center gap-1 sm:gap-2 text-secondary hover:text-primary hover:bg-accent p-1 sm:p-2 h-auto"
            >
              <Share className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="font-medium text-xs sm:text-sm">Share</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-md flex items-center gap-1 sm:gap-2 text-secondary hover:text-primary hover:bg-accent p-1 sm:p-2 h-auto"
            >
              <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="font-medium text-xs sm:text-sm">Email</span>
            </Button> */}
          </div>
        </div>
      </section>
    </>
  )
} 