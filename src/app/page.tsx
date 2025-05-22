"use client"

import Image from "next/image"
import {
  Users,
  Maximize,
  Calendar,
  Mail,
  Star,
  Share,
  Wifi,
  Coffee,
  Tv,
  Award,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  X,
  Expand,
  MapPin,
  ParkingCircle,
  Phone,
  Building,
  Briefcase,
  Presentation,
  ListChecks,
  CheckCircle,
  Crown,
  MaximizeIcon,
  Zap, // Added Zap for Innovation Studio
  Layers, // Added Layers for Workshop Studio & Flex Training
  MessageSquare, // Added MessageSquare for Consultation Rooms
  Dumbbell, // Added Dumbbell for Sports Hall
  Utensils, // Added Utensils for Dining Hall
  Music, // Added Music for Dance Studio
  Video, // Added Video for Boardroom
  UserPlus, // Added UserPlus for Team Plan
  FlaskConical, // Added FlaskConical for Creative Labs
  Beaker, // Added Beaker for Creative Labs
  Instagram, // Added Instagram icon
  Linkedin, // Added LinkedIn icon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect, FormEvent, ChangeEvent } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { toast } from "sonner"
import { format, isValid as isValidDate } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react" 
import { Calendar as DatePicker } from "@/components/ui/calendar" // This is the Shadcn Calendar component
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Add this after the imports
const scrollbarHideStyles = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`

// Add this after the scrollbarHideStyles
const calendarStyles = `
  /* DEBUG STYLES */
  /* Target popper wrapper to identify it */
  [data-radix-popper-content-wrapper] {
    border: 2px solid red !important;
  }
  
  /* Highlight all buttons inside calendar */
  [data-radix-popper-content-wrapper] button {
    cursor: pointer !important;
    outline: 1px solid blue !important;
  }
  
  /* Highlight and add cursor to cells */
  [data-radix-popper-content-wrapper] td,
  [data-radix-popper-content-wrapper] th {
    cursor: pointer !important;
    outline: 1px dashed green !important;
  }
  
  /* Add hover effect to verify mouse interaction */
  [data-radix-popper-content-wrapper] button:hover,
  [data-radix-popper-content-wrapper] td:hover {
    background-color: rgba(255, 0, 0, 0.2) !important;
  }
  
  /* Target the entire dialog to ensure we're getting all elements */
  [data-radix-popper-content-wrapper] [role="dialog"] {
    background-color: rgba(200, 200, 255, 0.1) !important;
  }
  
  /* Ensure all elements have pointer events */
  [data-radix-popper-content-wrapper] * {
    pointer-events: auto !important;
  }
  
  /* Override any cursor:default or cursor:text styles */
  [role="dialog"] *,
  .rdp *,
  .calendar * {
    cursor: pointer !important;
  }
`

// Image gallery data - THIS ENTIRE ARRAY WILL BE REPLACED
const galleryImages: GalleryImage[] = [
  // Existing Vercel-hosted images (assuming these are general or preferred overview shots)
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oaisis_VillageSTMartins_LR_YCUK_37.jpg-8tJus4VLL1unO3W2GqgZhuUEmg4f1U.jpeg", alt: "Sports Hall", title: "Sports Hall Overview" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-J1JfTbYkgSepnXl508WAXWz3NlWOB0.png", alt: "Sports Hall Interior View", title: "Sports Hall - Court View" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kvGh92OC5G2xIS6IHvcPBuF9mj7eg6.png", alt: "Sports Hall Alternative Angle", title: "Sports Hall - Side View" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gSby6nWOx8F8TTgpzd7yc4C0kwksbV.png", alt: "Dining Hall", title: "Dining Hall Overview" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sycTGTgmxbm26AzLTC1iLynci6tZ5D.png", alt: "Dining Hall Wide View", title: "Dining Hall - Main View" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W53HD6zezriSntHucj1hxoB8EwNKA1.png", alt: "Dining Hall Natural Light", title: "Dining Hall - Window View" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8ZRunh5Qe30WzwwbGAIgbnrHrEffs7.png", alt: "Dining Hall Setup", title: "Dining Hall - Service Area" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-w1VqIK2ahAzbnnnLZymKrVcvxUf2d9.png", alt: "Dining Hall Length View", title: "Dining Hall - Full Length" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0p7SmbepYizLFydtqTQpAt9pqLqi8o.png", alt: "Old Gym", title: "Old Gym Overview" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9FKSmC4UKMXxOdlN0SSrUzVTyaRJXZ.png", alt: "Main Hall", title: "Main Hall Overview" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wgwCaPenSqlI67CU00k4xwv5sJUt29.png", alt: "Main Hall Front View", title: "Main Hall - Front View" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ErExc3vicyqzf3afsfr1y4j7oirMtw.png", alt: "Main Hall Wide View", title: "Main Hall - Wide View" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tGXo3uZrqa9VaBMkRwf9JjfP482Yox.png", alt: "Main Hall Stage View", title: "Main Hall - Stage View" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jr3A6atOugGXCNIE8wOP8tpameDAvl.png", alt: "Main Hall Floor View", title: "Main Hall - Floor View" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qgIXiWAbA38FrHUDhLp6unMD1T2D4R.png", alt: "Main Hall Alternative Angle", title: "Main Hall - Alternative Angle" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tXdAiGpDOsuLeEdDxxJdJKyTw7uzCe.png", alt: "Main Hall Stage Close-up", title: "Main Hall - Stage Close-up" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oaisis_VillageSTMartins_LR_YCUK_1.jpg-VhdTZUj8klX8GSxBfc8oOTmMSO3yzF.jpeg", alt: "Conference Room", title: "Conference Room Overview" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WOw0VVMz5NOzUtG676H5gySUsnMkZY.png", alt: "Conference Room Meeting Setup", title: "Conference Room - Meeting Setup" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BDn8vsBl4uPM7JvK2bLfe7y8eWEgMd.png", alt: "Conference Room with Kitchen Area", title: "Conference Room - Kitchen View" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-agxqbv5GQXGW6zi2EnSs6GEyndt0qC.png", alt: "Conference Room Storage", title: "Conference Room - Storage View" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oaisis_VillageSTMartins_LR_YCUK_17.jpg-rtkQJA64TkYQ8Zmf66QratWDfBLceq.jpeg", alt: "Heads Room", title: "Heads Room Overview" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hmL7SQpQeoX7bemYs7BPnaJ2KtfRnR.png", alt: "Heads Room Meeting Setup", title: "Heads Room - Meeting Setup" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NTQIQ7BFz5rE3EE0b96NFKlOimd4DJ.png", alt: "Heads Room Alternative View", title: "Heads Room - Alternative View" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-bdfx6xYMaQIW7Vl6pCKgJlahA99n7N.png", alt: "Heads Room Bay Window", title: "Heads Room - Bay Window View" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ABwkNmsR7MDZmNCejm2ZwfTRdiXugd.png", alt: "Heads Room Full Length", title: "Heads Room - Full Length View" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EjDqdXA93OR2a69Br5uvJ9jigEhXY8.png", alt: "The Old School Workspace", title: "Building Exterior" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zeO2qpBKQVxg8ehWKzvEDxXYOgXebP.png", alt: "Historic Ceiling Dome", title: "Ornate Ceiling Dome" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BShkMp1j00KpBAlfp5ty3Nh57lP61d.png", alt: "Historic Staircase", title: "Grand Staircase" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nfnIjq98YeCgQ40q9pYsp10iLzZud5.png", alt: "Staff Room", title: "Staff Room General View" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GbmcQGFgmOWftqrV0tzECNRSRzUDEp.png", alt: "Staff Room Alternative View", title: "Staff Room - Alt View" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-N5j7MYosX1clkq2Ju3yo5jYbyO5ODa.png", alt: "Staff Room Training Area", title: "Staff Room - Training Area" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-14%20at%2011.11.13_88be90ab.jpg-W5U1QHw1ADiUWYI6z9bpStK0cu8NQy.jpeg", alt: "Reception and Breakout Area", title: "Reception Area" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-14%20at%2011.11.13_3ab0ae3f.jpg-FEAUcbWEINt2t9kyj9gAo8wZ4RZE5q.jpeg", alt: "Office Space 1", title: "Private Office - Type A" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-14%20at%2011.11.13_2322a3e7.jpg-eqaTCSH6r5mGeg4jFG85xcGN3ECw9I.jpeg", alt: "Office Space 2", title: "Private Office - Type B" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-14%20at%2011.11.13_94373665.jpg-RFMLjdVtfSsVBBZX8LRLkVMLh0tUQy.jpeg", alt: "Meeting Room Setup", title: "Conference Room - General Setup" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-14%20at%2011.11.13_6cf7e5f6.jpg-rIlmQemkVELik3PC3wI8xjO15fqWf7.jpeg", alt: "Office Corridor", title: "Office Wing" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-14%20at%2011.11.13_e7000cff.jpg-kBUyxqcQ3fi8eo0mL8j8NdbM5ZwUYy.jpeg", alt: "Open Plan Office", title: "Open Plan Space" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-14%20at%2018.21.24_b7cf0214.jpg-SYLKVaLv1V13jiSQiKCifoaBuySVJt.jpeg", alt: "Flexible Meeting Space", title: "Flexible Workspace" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-14%20at%2018.21.25_7f8edfb5.jpg-C7IzfkRF8fRSTI3aI8u9rQSo9D9nPj.jpeg", alt: "Classroom Style Training Room", title: "Training Room - Classroom Style" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-14%20at%2018.21.25_564bf7db.jpg-UomhHCLNKyI6oar2SGJgcXTqXnXTkt.jpeg", alt: "Executive Meeting Room", title: "Executive Suite" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-14%20at%2018.24.32_12190efc.jpg-xRIEsG9EF15HNmEDQDHXamuozsivzM.jpeg", alt: "Modern Computer Lab", title: "Computer Training Suite" },

  // Event Spaces (/images/ local)
  { src: "/images/sports-hall1.jpg", alt: "Sports Hall", title: "Sports Hall - View 1" },
  { src: "/images/sports-hall2.jpg", alt: "Sports Hall", title: "Sports Hall - View 2" },
  { src: "/images/sports-hall3.jpg", alt: "Sports Hall", title: "Sports Hall - View 3" },
  { src: "/images/school-hall1.jpg", alt: "Main Hall", title: "Main Hall - View 1" },
  { src: "/images/school-hall2.jpg", alt: "Main Hall", title: "Main Hall - View 2" },
  { src: "/images/school-hall3.jpg", alt: "Main Hall", title: "Main Hall - View 3" },
  { src: "/images/school-hall4.jpg", alt: "Main Hall", title: "Main Hall - View 4" },
  { src: "/images/school-hall5.jpg", alt: "Main Hall", title: "Main Hall - View 5" },
  { src: "/images/dininghall1.png", alt: "Dining Hall", title: "Dining Hall - View 1" },
  { src: "/images/dininghall2.jpg", alt: "Dining Hall", title: "Dining Hall - View 2" },
  { src: "/images/dininghall3.jpg", alt: "Dining Hall", title: "Dining Hall - View 3" },
  { src: "/images/wooden-hall.png", alt: "Old Gym", title: "Old Gym - View 1" },
  { src: "/images/wooden-hall2.jpeg", alt: "Old Gym", title: "Old Gym - View 2" },
  { src: "/images/wooden-hall3 - Copy.jpg", alt: "Old Gym", title: "Old Gym - View 3" },
  { src: "/images/staff-room1.jpg", alt: "Staff Room", title: "Staff Room - View 1" },
  { src: "/images/staff-room2.jpg", alt: "Staff Room", title: "Staff Room - View 2" },
  { src: "/images/staff-room3.jpg", alt: "Staff Room", title: "Staff Room - View 3" },
  { src: "/images/staff-room4.jpg", alt: "Staff Room", title: "Staff Room - View 4" },
  { src: "/images/staff-room5.jpg", alt: "Staff Room", title: "Staff Room - View 5" },
  { src: "/images/staff-room6.jpg", alt: "Staff Room", title: "Staff Room - View 6" },
  { src: "/images/staff-room7.jpg", alt: "Staff Room", title: "Staff Room - View 7" },
  { src: "/images/dance-studio.png", alt: "Dance Studio", title: "Dance Studio" },
  { src: "/images/6th-form-common-room.jpg", alt: "6th Form Common Room", title: "6th Form Common Room" },

  // Office Options (/images/ local)
  { src: "/images/director-office.png", alt: "Director's Office", title: "Director's Office" },
  { src: "/images/lab-room.png", alt: "Science Lab Classroom", title: "Creative Lab - Science Classroom" },
  { src: "/images/coworking-pink-sofa.png", alt: "Team Office", title: "Team Office - Sofa Area" },
  { src: "/images/coworking-green-chairs.png", alt: "Team Office", title: "Team Office - Green Chairs" },
  { src: "/images/team-office-1.png", alt: "Team Office", title: "Team Office - View 1" },
  { src: "/images/team-office-2.png", alt: "Team Office", title: "Team Office - View 2" },
  { src: "/images/innovation-studio-1.png", alt: "Innovation Studio", title: "Innovation Studio - View 1" },
  { src: "/images/innovation-studio-2.png", alt: "Innovation Studio", title: "Innovation Studio - View 2" },
  { src: "/images/innovation-studio-3.png", alt: "Innovation Studio", title: "Innovation Studio - View 3" },
  { src: "/images/innovation-studio-4.png", alt: "Innovation Studio", title: "Innovation Studio - View 4" },
  { src: "/images/training-room.png", alt: "Workshop Studio & Conservatory", title: "Workshop Studio - Training Setup" },
  { src: "/images/conservatory.png", alt: "Workshop Studio & Conservatory", title: "Conservatory View" },
  { src: "/images/team-collab.png", alt: "Team Collaboration Suite", title: "Team Collaboration Suite - Main View" },
  { src: "/images/placeholder-team-collaboration-suite-1.png", alt: "Team Collaboration Suite", title: "Team Collaboration Suite (Placeholder)" },
  { src: "/images/team-office-1.jpg", alt: "Team Hub", title: "Modern Team Office Space" },
  { src: "/images/team-office-2.jpg", alt: "Team Hub", title: "Collaborative Meeting Area" },
  { src: "/images/team-office-3.jpg", alt: "Team Hub", title: "Open Plan Workspace" },
  { src: "/images/team-office-4.jpg", alt: "Team Hub", title: "Professional Workstations" },
  { src: "/images/consultation1.png", alt: "Consultation Rooms", title: "Consultation Room 1" },
  { src: "/images/consultation2.png", alt: "Consultation Rooms", title: "Consultation Room 2" },
  { src: "/images/consultation3.png", alt: "Consultation Rooms", title: "Consultation Room 3" },
  { src: "/images/education-suite-classroom.png", alt: "Education Suite", title: "Education Suite - Classroom" },
  { src: "/images/seminar-room-office.jpg", alt: "Seminar Room", title: "Seminar Room - Office Style" },
  { src: "/images/flex-training-suite-office.jpg", alt: "Flex Training Suite", title: "Flex Training Suite - Office Style" },

  // Meeting Rooms (/images/ local)
  { src: "/images/board-room1.jpg", alt: "Boardroom", title: "Boardroom - View 1" },
  { src: "/images/board-room2.jpg", alt: "Boardroom", title: "Boardroom - View 2" },
  { src: "/images/board-room3.jpg", alt: "Boardroom", title: "Boardroom - View 3" },
  { src: "/images/conference-room1.jpg", alt: "Conference Room", title: "Conference Room - View 1" },
  { src: "/images/conference-room2.jpg", alt: "Conference Room", title: "Conference Room - View 2" },
  { src: "/images/conference-room3.jpg", alt: "Conference Room", title: "Conference Room - View 3" },

  // Coworking Options (/images/ local - mostly placeholders)
  { src: "/images/placeholder-coworking-community.png", alt: "Community Coworking", title: "Community Coworking (Placeholder)" },
  { src: "/images/placeholder-coworking-flex.png", alt: "Flex Coworking", title: "Flex Coworking (Placeholder)" },
  { src: "/images/placeholder-coworking-dedicated.png", alt: "Dedicated Coworking", title: "Dedicated Coworking (Placeholder)" },
  { src: "/images/placeholder-coworking-team-plan.png", alt: "Team Plan Coworking", title: "Team Plan Coworking (Placeholder)" },
  { src: "/images/lab-room.png", alt: "Creative Labs", title: "Creative Labs" },
];

// Deduplicate galleryImages by src to ensure no issues with findIndex
const uniqueGalleryImages = Array.from(new Map(galleryImages.map(item => [item.src, item])).values());
const finalGalleryImages = uniqueGalleryImages; // Use this for the component state if galleryImages becomes state

// Hero images for carousel
const heroImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EjDqdXA93OR2a69Br5uvJ9jigEhXY8.png",
    alt: "The Old School Workspace",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zeO2qpBKQVxg8ehWKzvEDxXYOgXebP.png",
    alt: "Historic Ceiling Dome",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BShkMp1j00KpBAlfp5ty3Nh57lP61d.png",
    alt: "Historic Staircase",
  },
  {
    src: "/images/wooden-hall2.jpeg",
    alt: "Old Gym",
  },
  {
    src: "/images/staff-room1.jpg",
    alt: "Staff Room",
  },
  {
    src: "/images/sports-hall3.jpg",
    alt: "Sports Hall",
  },
];

// Define types for our data structures
interface GalleryImage {
  src: string;
  alt: string;
  title: string;
}

interface HeroImage {
  src: string;
  alt: string;
}

interface CapacityItem {
  type: string;
  count: string;
}

interface SpaceDetails {
  title: string;
  description: string;
  images: string[];
  capacity: CapacityItem[];
  dimensions: string;
  features: string[];
  price?: string;
  period?: string;
  popular?: boolean;
  icon?: string; // Added optional icon field
}

interface EventSpacesData {
  [key: string]: SpaceDetails;
}
interface OfficeOptionsData {
  [key: string]: SpaceDetails;
}
interface MeetingRoomOptionsData {
  [key: string]: SpaceDetails;
}
interface CoworkingOptionsData {
  [key: string]: SpaceDetails;
}

  // Event spaces data
  const eventSpacesData: EventSpacesData = {
    "sports-hall": {
      title: "Sports Hall",
    icon: "Dumbbell",
      description:
        "A spacious multi-purpose hall suitable for various events and sports activities. With high ceilings and excellent natural light, this versatile space can be configured to suit a wide range of needs.",
      images: [
      "/images/sports-hall1.jpg", 
      "/images/sports-hall2.jpg", 
      "/images/sports-hall3.jpg"
      ],
      capacity: [
        { type: "Seated at round tables", count: "192 (24 tables, 8 per table)" },
        { type: "Standing capacity", count: "At least 800" },
      ],
      dimensions: "18m x 32.9m (592.2 sqm / 6,374 sq ft)",
      features: [
        "High ceilings",
        "Excellent natural light",
        "Football capacity: 6-a-side",
        "Versatile configuration options",
        "Our largest venue space",
        "Multiple basketball hoops",
        "Professional wooden sports flooring",
      ],
    },
    "main-hall": {
      title: "Main Hall",
    icon: "Calendar",
      description:
        "A versatile hall for performances, conferences, and large events. With excellent acoustics and a stage area, this space is perfect for presentations, performances, and formal gatherings.",
      images: [
      "/images/school-hall1.jpg", 
      "/images/school-hall2.jpg", 
      "/images/school-hall3.jpg",
      "/images/school-hall4.jpg",
      "/images/school-hall5.jpg"
      ],
      capacity: [
        { type: "Seated on benches", count: "144 (36 benches, 4 per bench)" },
        { type: "Seated on chairs", count: "250" },
        { type: "Standing capacity", count: "250" },
      ],
      dimensions: "11m x 21.9m (240.9 sqm / 2,593 sq ft)",
      features: [
        "Stage area",
        "Excellent acoustics",
        "Natural lighting",
        "AV equipment available",
        "Flexible seating arrangements",
      ],
    },
    "dining-hall": {
    title: "Dining Hall", // Updated title
    icon: "Utensils",
    description: "Elegant space with historic features, perfect for formal dining events and receptions.", // Updated description
      images: [
      "/images/dininghall1.png",
      "/images/dininghall2.jpg",
      "/images/dininghall3.jpg"
      ],
      capacity: [
      { type: "Seated dining", count: "Up to 150 people" }, // Updated capacity
        { type: "Reception style", count: "Up to 200 people" },
      ],
    dimensions: "15m x 25m (375 sqm / 4,036 sq ft)", // Updated dimensions
      features: [
        "Historic architecture",
        "Excellent natural light",
        "Kitchen access",
        "Flexible layout options",
        "Period features",
        "Elegant atmosphere",
      ],
    },
    "old-gym": {
      title: "Old Gym",
    icon: "Users",
    description: "Intimate space with character, suitable for smaller gatherings and community events.", // Updated description
      images: [
      "/images/wooden-hall.png",
      "/images/wooden-hall2.jpeg",
      "/images/wooden-hall3 - Copy.jpg"
      ],
      capacity: [
      { type: "Workshop style", count: "Up to 50 people" }, // Updated capacity
      { type: "Theatre style", count: "Up to 100 people" },
      ],
    dimensions: "10m x 15m (150 sqm / 1,615 sq ft)", // Updated dimensions
      features: [
        "Cozy atmosphere",
        "Original features",
        "Flexible layout",
        "Good acoustics",
        "Intimate setting",
        "Community feel",
      ],
    },
    "staff-room": {
      title: "Staff Room",
    icon: "Coffee",
      description:
      "Comfortable meeting space with a relaxed atmosphere, ideal for team gatherings and informal meetings.", // Updated description
      images: [
      "/images/staff-room1.jpg",
      "/images/staff-room2.jpg",
      "/images/staff-room3.jpg",
      "/images/staff-room4.jpg",
      "/images/staff-room5.jpg",
      "/images/staff-room6.jpg",
      "/images/staff-room7.jpg"
      ],
      capacity: [
      { type: "Meeting style", count: "Up to 20 people" }, // Updated capacity
      { type: "Casual seating", count: "Up to 15 people" },
      ],
    dimensions: "8m x 12m (96 sqm / 1,033 sq ft)", // Updated dimensions
      features: [
        "Comfortable seating",
        "Kitchenette facilities",
        "Relaxed environment",
        "Natural lighting",
        "Presentation equipment",
        "Breakout areas",
      ],
    },
  "dance-studio": {
    title: "Dance Studio",
    icon: "Music",
    description: "Professional dance studio with wooden flooring, full-length mirrors, and excellent lighting. Perfect for dance classes, fitness sessions, rehearsals, and movement workshops.",
    images: ["/images/dance-studio.png"],
    capacity: [
      { type: "Dance class", count: "Up to 15 people" },
      { type: "Fitness session", count: "Up to 20 people" },
      { type: "Workshop", count: "Up to 25 people" },
    ],
    dimensions: "6.7m x 6.3m (42.21 sqm / 454 sq ft)",
    features: [
      "Sprung wooden floor",
      "Full-length mirrors",
      "Track lighting",
      "Natural light from windows",
      "Sound system available",
      "Climate controlled",
    ],
  },
  "6th-form-common-room": {
    title: "6th Form Common Room",
    icon: "Coffee",
    description: "A bright, modern, and versatile common room space with large windows and access to outdoor seating. Ideal for informal meetings, workshops, presentations, or social gatherings.",
    images: ["/images/6th-form-common-room.jpg"],
    capacity: [
        { type: "Informal meeting", count: "Up to 25 people" },
        { type: "Workshop style", count: "Up to 35 people" },
        { type: "Standing reception", count: "Up to 50 people" },
    ],
    dimensions: "5.8m x 14m (81.2 sqm / 874 sq ft)",
    features: [
        "Flexible layout for workshops, team sessions, or production setup",
        "Excellent natural light with direct outdoor patio access",
        "Ideal as production base, crew room, or casting space",
        "Presentation ready (AV equipment available on request)",
        "Ample space for equipment staging or breakout groups",
        "Comfortable seating options for informal meetings or downtime",
        "Multiple power outlets throughout the room",
        "Modern, adaptable environment",
      ],
    },
  }

  // Office options data
  const officeOptions: OfficeOptionsData = {
  "director-office": {
    title: "Director's Office",
    icon: "Star",
    description:
      "Premium office space combining an executive desk with an integrated meeting area. Ideal for directors, managers, or small teams requiring a professional environment with meeting capabilities.",
    images: ["/images/director-office.png"],
    capacity: [{ type: "Capacity", count: "1 executive + up to 8 meeting attendees" }],
    dimensions: "60.75 sqm (8.1m × 7.5m)",
    features: [
      "Executive desk with ergonomic chair",
      "Meeting table for 8 people",
      "Natural lighting with garden views",
      "Storage cabinets and filing space",
      "Professional, quiet environment",
      "Artwork and premium furnishings",
    ],
  },
  "creative-labs": {
    title: "Creative Labs",
    icon: "FlaskConical",
    description:
      "Specialized science laboratory equipped for experiments, research, and practical activities. Features built-in workbenches with sinks, storage for equipment, and a projector for presentations.",
    images: ["/images/lab-room.png"],
    capacity: [{ type: "Capacity", count: "Up to 20-25 students/participants" }],
    dimensions: "Approx. 60 sqm (e.g., 8m x 7.5m)",
    features: [
      "Lab-style workbenches with sinks",
      "Ample storage cabinets and drawers",
      "Projector and whiteboard/screen",
      "Safety equipment (e.g., eyewash station - if applicable)",
      "Durable, chemical-resistant surfaces",
      "Good ventilation and lighting",
      "Flexible layout for group work or individual experiments",
    ],
  },
  "team-office": {
    title: "Team Office",
    icon: "Users",
    description: "Dedicated private office space designed for collaborative teams requiring both privacy and interaction. Features ergonomic workstations, dedicated meeting areas, and customizable layouts to support team productivity and creativity in a professional environment.",
    images: [
      "/images/coworking-pink-sofa.png",
      "/images/coworking-green-chairs.png",
      "/images/team-office-1.png",
      "/images/team-office-2.png"
    ],
    capacity: [{ type: "Capacity", count: "5-15 people" }],
    dimensions: "300-500 sq ft",
    features: [
      "Private entrance with secure access",
      "Dedicated internal meeting area",
      "Ergonomic height-adjustable workstations",
      "High-speed fiber internet connection",
      "Built-in storage solutions and filing cabinets",
      "Customizable layout to suit team workflows",
      "Natural lighting with garden views",
      "Climate control and excellent acoustics",
    ],
  },
  "innovation-studio": {
    title: "Innovation Studio",
    icon: "Zap",
    description: "Versatile creative space specifically designed for innovation workshops, design thinking, and collaborative ideation sessions. Features modular furniture, writable surfaces, and flexible layouts that can be reconfigured to support different creative processes and team dynamics.",
    images: [
      "/images/innovation-studio-1.png",
      "/images/innovation-studio-2.png",
      "/images/innovation-studio-3.png",
      "/images/innovation-studio-4.png"
    ],
    capacity: [{ type: "Capacity", count: "Up to 20 people" }],
    dimensions: "400-600 sq ft",
    features: [
      "360° whiteboard walls for ideation",
      "Modular, reconfigurable furniture",
      "Advanced presentation equipment",
      "Dedicated breakout areas for small groups",
      "Abundant natural lighting with blackout options",
      "Integrated technology for digital collaboration",
      "Inspiration wall for pinning ideas and materials",
      "Creative supplies and design thinking toolkits",
    ],
  },
  "workshop-studio": {
    title: "Workshop Studio & Conservatory",
    icon: "Layers",
    description: "Practical workspace for hands-on projects and creative production. Features a beautiful conservatory area with floor-to-ceiling windows, abundant natural light, and long wooden workbenches perfect for creative work and workshops.",
    images: [
      "/images/training-room.png",
      "/images/conservatory.png"
    ],
    capacity: [{ type: "Capacity", count: "Up to 15 people" }],
    dimensions: "60.75 sqm (8.1m × 7.5m) / 654 sq ft",
    features: [
      "Modern classroom setup",
      "Conservatory with panoramic views",
      "Large display screen for presentations",
      "Flexible seating arrangements",
      "Abundant natural lighting",
      "Perfect for workshops and training",
    ],
  },
  "executive-suite": {
    title: "Team Collaboration Suite",
    icon: "Users",
    description: "Versatile workspace designed for team productivity with integrated meeting and work areas. Perfect for collaborative teams requiring both individual workstations and discussion space.",
    images: ["/images/team-collab.png"],
    capacity: [{ type: "Capacity", count: "4-8 team members" }],
    dimensions: "42.34 sqm (7.3m × 5.8m)",
    features: [
      "L-shaped workstations",
      "Central meeting table",
      "Natural lighting with panoramic views",
      "Multiple computer stations",
      "Integrated storage solutions",
      "Collaborative layout",
    ],
  },
  "team-hub": {
    title: "Team Hub",
    icon: "Users",
    description: "Open-concept collaborative workspace designed to foster team productivity, spontaneous interaction, and cross-functional collaboration. Features a mix of workstations, meeting pods, and social areas that create a dynamic environment for teams that thrive on communication and shared energy.",
    images: [
      "/images/team-office-1.jpg",
      "/images/team-office-2.jpg",
      "/images/team-office-3.jpg",
      "/images/team-office-4.jpg"
    ],
    capacity: [{ type: "Capacity", count: "8-20 team members" }],
    dimensions: "400-700 sq ft",
    features: [
      "Open plan design with acoustic considerations",
      "Collaborative zones with shared displays",
      "Private meeting pods for focused discussions",
      "Shared resources and technology hub",
      "Flexible breakout spaces with comfortable seating",
      "Team storage solutions and lockers",
      "Natural lighting with large windows",
      "Modern office furniture and equipment",
    ],
  },
  "consultation-rooms": {
    title: "Consultation Rooms",
    icon: "MessageSquare",
    description:
      "Private, professional spaces designed for one-on-one meetings and client consultations. Ideal for therapists, advisors, and consultants requiring confidentiality and comfort.",
    images: [
      "/images/consultation1.png",
      "/images/consultation2.png",
      "/images/consultation3.png"
    ],
    capacity: [{ type: "Capacity", count: "2-8 people" }],
    dimensions: "Various sizes from 14 sqm to 23.4 sqm. (Room 1: 14 sqm, Room 2: 23.4 sqm, Room 3: 14.84 sqm)",
    features: [
      "Complete privacy",
      "Professional furnishings",
      "Natural lighting",
      "Soundproofed spaces",
      "Comfortable seating",
      "Multiple room options",
    ],
  },
  "education-suite": {
    title: "Education Suite",
    icon: "Calendar",
    description:
      "Traditional classroom environment ideal for training sessions, workshops, and educational programs. Features rows of tables with comfortable seating, ceiling-mounted projector, and large windows providing natural light.",
    images: ["/images/education-suite-classroom.png"],
    capacity: [{ type: "Capacity", count: "Up to 30 students" }],
    dimensions: "400-600 sq ft",
    features: [
      "Classroom-style setup",
      "Ceiling-mounted projector",
      "Multiple windows for natural light",
      "Ergonomic green chairs",
      "High-speed internet",
      "Ideal for training and workshops",
    ],
  },
  "seminar-room": {
    title: "Seminar Room",
    icon: "Calendar",
    description: "Classroom-style setup ideal for training sessions, workshops, or team projects requiring separated workstations. Features ample natural light, a ceiling-mounted projector, and whiteboard space.",
    images: ["/images/seminar-room-office.jpg"],
    capacity: [{ type: "Capacity", count: "Up to 20 people (classroom style)" }],
    dimensions: "Approx. 9m x 6m (54 sqm / 580 sq ft)",
    features: [
      "Flexible classroom layout",
      "Ceiling-mounted projector",
      "Large whiteboard area",
      "Excellent natural light",
      "Multiple workstations/tables",
      "High-speed internet",
      "Ideal for training & team workshops",
    ],
  },
  "flex-training-suite": {
    title: "Flex Training Suite",
    icon: "Layers",
    description: "Flexible room setup ideal for hands-on workshops, training, or team breakout sessions. Can be divided for smaller groups. Features adaptable tables, projector, and wall space for displays or notes.",
    images: ["/images/flex-training-suite-office.jpg"],
    capacity: [{ type: "Capacity", count: "Up to 25 people (workshop style)" }],
    dimensions: "Approx. 8m x 7m (56 sqm / 600 sq ft)",
    features: [
      "Dividable room capability",
      "Adaptable table arrangement",
      "Ceiling-mounted projector",
      "Pinboards/Whiteboard space",
      "Good natural light",
      "Multiple power outlets",
      "Ideal for group activities/training",
    ],
  },
}

  // Meeting room options data
  const meetingRoomOptions: MeetingRoomOptionsData = {
    "boardroom": {
      title: "Boardroom",
    icon: "Video",
      description:
        "Executive boardroom with premium furnishings and technology. Perfect for important client meetings, board discussions, and presentations requiring a professional setting.",
      images: [
      "/images/board-room1.jpg", 
      "/images/board-room2.jpg",
      "/images/board-room3.jpg"
      ],
      capacity: [{ type: "Capacity", count: "8-12 people" }],
      dimensions: "Approximately 25-30 sqm",
      features: [
        "Executive furniture",
        "Large display screen",
        "Video conferencing",
        "Whiteboard",
        "Refreshment service",
      ],
    },
    "conference-room": {
      title: "Conference Room",
    icon: "Users",
      description:
        "Larger meeting space ideal for team gatherings, workshops, and presentations. Features flexible seating arrangements and comprehensive presentation equipment.",
      images: [
      "/images/conference-room1.jpg",
      "/images/conference-room2.jpg",
      "/images/conference-room3.jpg"
      ],
      capacity: [{ type: "Capacity", count: "Up to 20 people" }],
      dimensions: "Approximately 40-50 sqm",
      features: [
        "Flexible seating",
        "Projector and screen",
        "Sound system",
        "High-speed WiFi",
        "Catering options"
      ],
    },
  }

  // Coworking options data
  const coworkingOptions: CoworkingOptionsData = {
    "community": {
    title: "Community", // Updated title to match Community Membership
    icon: "Coffee",
      description: "For occasional use and networking. Our most flexible membership option.",
    images: ["/images/coworking1.png"],
      price: "£75",
      period: "per month",
      capacity: [{ type: "Available spots", count: "Unlimited" }],
      dimensions: "Access to all shared spaces",
      features: [
      "8 days access per month (more flexible than standard 5-day plans)",
        "Access to coworking lounge & community events",
        "Discounted meeting rooms (£10/hour)",
        "High-speed Wi-Fi & free tea/coffee",
        "Printing available (pay-as-you-go)",
      ],
    },
    "flex": {
    title: "Flex", // Updated title to match Flex Membership
    icon: "Wifi",
      description: "For freelancers & remote workers who need regular space.",
    images: ["/images/coworking1.png"],
      price: "£225",
      period: "per month",
      popular: true,
      capacity: [{ type: "Available spots", count: "Unlimited hot desks" }],
      dimensions: "Access to all shared coworking areas",
      features: [
        "Unlimited hot desk access (8 AM – 8 PM)",
        "Use of shared coworking areas",
      "4 hours of meeting room credits (more than typical 2-hour offers)",
        "Printing credits (50 pages/month)",
      "Locker storage option (+£20/month for dedicated storage)",
      ],
    },
    "dedicated": {
    title: "Dedicated", // Updated title to match Dedicated Membership
    icon: "Users",
      description: "For those who need a fixed, reliable workspace.",
    images: ["/images/coworking1.png"],
      price: "£350",
      period: "per month",
      capacity: [{ type: "Capacity", count: "1 person per desk" }],
      dimensions: "Personal desk space plus access to all shared areas",
      features: [
        "Unlimited access (8 AM – 8 PM)",
        "Dedicated desk (your own reserved workspace)",
      "8 hours of meeting room credits (competitive vs. the usual 5-hour offers)",
        "Printing credits (100 pages/month)",
        "Personal locker included",
      "Business address & mail handling (+£30/month option)",
    ],
  },
  "team-plan": { // New coworking plan
    title: "Team Plan",
    icon: "UserPlus",
    description: "For small teams needing collaborative workspace.",
    images: ["/images/coworking1.png"],
    price: "From £600",
    period: "per month",
    capacity: [{ type: "Capacity", count: "Up to 5 people" }],
    dimensions: "Shared team space with flexible seating",
    features: [
      "3 floating desks for a team of up to 5 people (rotational use)",
      "15 hours of meeting room credits per month",
      "Printing & storage access for all members",
      "Ability to add more seats at discounted rates",
      "Option for private breakout area (+£300/month)",
      ],
    },
  }

// Helper function to check which row a tab is in for the Office section
const isFirstRowTab = (tab: string): boolean => {
  const firstRowTabs = ["director-office", "creative-labs", "team-office", "innovation-studio"];
  return firstRowTabs.includes(tab);
};

export default function WorkspaceBrochure() {
  // Update the activeSection state to include more options
  const [activeSection, setActiveSection] = useState<string>("day-hire")
  const [activeSubTab, setActiveSubTab] = useState<string>("sports-hall")
  const [currentSpaceImageIndex, setCurrentSpaceImageIndex] = useState<number>(0)
  const [aboutExpanded, setAboutExpanded] = useState<boolean>(false)
  const [galleryOpen, setGalleryOpen] = useState<boolean>(false)
  
  // Use the consolidated and deduplicated list for the gallery state
  // If galleryImages were to become state, it would be initialized with finalGalleryImages
  // For now, the modal will directly reference the globally scoped `finalGalleryImages` if we replace `galleryImages` with `finalGalleryImages` globally
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const [currentHeroIndex, setCurrentHeroIndex] = useState<number>(0)
  // Add this state for the email collection dialog
  // const [bookingDialogOpen, setBookingDialogOpen] = useState<boolean>(false) // Old - Will be removed
  // const [visitorEmail, setVisitorEmail] = useState<string>('') // Old - Will be removed
  // const [emailError, setEmailError] = useState<string>('') // Old - Will be removed

  // State for Inquiry Dialog
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState<boolean>(false);
  const [inquiryName, setInquiryName] = useState<string>('');
  const [inquiryEmail, setInquiryEmail] = useState<string>('');
  const [inquiryPhoneNumber, setInquiryPhoneNumber] = useState<string>('');
  const [inquiryNameError, setInquiryNameError] = useState<string>('');
  const [inquiryEmailError, setInquiryEmailError] = useState<string>('');
  const [inquiryPhoneNumberError, setInquiryPhoneNumberError] = useState<string>('');
  const [inquiryMessage, setInquiryMessage] = useState<string>(''); // New state for inquiry message
  const [inquirySubmitting, setInquirySubmitting] = useState<boolean>(false);
  const [inquirySubmitSuccess, setInquirySubmitSuccess] = useState<boolean>(false);
  const [inquirySubmitError, setInquirySubmitError] = useState<string>('');

  // State for Book a Tour Dialog (New)
  const [tourDialogOpen, setTourDialogOpen] = useState<boolean>(false);
  const [tourName, setTourName] = useState<string>('');
  const [tourEmail, setTourEmail] = useState<string>('');
  const [tourPhoneNumber, setTourPhoneNumber] = useState<string>('');
  const [tourDate, setTourDate] = useState<Date | undefined>(undefined); // Changed to Date object
  const [tourTime, setTourTime] = useState<string>(''); // Keep as string for now, can be improved later
  const [tourMessage, setTourMessage] = useState<string>('');
  const [tourNameError, setTourNameError] = useState<string>('');
  const [tourEmailError, setTourEmailError] = useState<string>('');
  const [tourPhoneNumberError, setTourPhoneNumberError] = useState<string>('');
  const [tourDateError, setTourDateError] = useState<string>('');
  const [tourTimeError, setTourTimeError] = useState<string>('');
  const [tourSubmitting, setTourSubmitting] = useState<boolean>(false);
  const [tourSubmitSuccess, setTourSubmitSuccess] = useState<boolean>(false);
  const [tourSubmitError, setTourSubmitError] = useState<string>(''); // New state for submission error
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false); // State for Popover

  // State for Get In Touch Dialog (New)
  const [getInTouchDialogOpen, setGetInTouchDialogOpen] = useState<boolean>(false);
  const [getInTouchName, setGetInTouchName] = useState<string>('');
  const [getInTouchEmail, setGetInTouchEmail] = useState<string>('');
  const [getInTouchPhoneNumber, setGetInTouchPhoneNumber] = useState<string>('');
  const [getInTouchMessage, setGetInTouchMessage] = useState<string>('');
  const [getInTouchNameError, setGetInTouchNameError] = useState<string>('');
  const [getInTouchEmailError, setGetInTouchEmailError] = useState<string>('');
  const [getInTouchPhoneNumberError, setGetInTouchPhoneNumberError] = useState<string>('');
  const [getInTouchSubmitting, setGetInTouchSubmitting] = useState<boolean>(false);
  const [getInTouchSubmitSuccess, setGetInTouchSubmitSuccess] = useState<boolean>(false);
  const [getInTouchSubmitError, setGetInTouchSubmitError] = useState<string>('');

  // Define time slots for the tour booking
  const generateTimeSlots = (startHour: number, endHour: number, intervalMinutes: number): string[] => {
    const slots: string[] = [];
    const today = new Date(); // Use a fixed date for time generation, only time matters
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minutes = 0; minutes < 60; minutes += intervalMinutes) {
        // Ensure we don't create slots like 16:60 if interval is 30 and endHour is 17
        if (hour === endHour -1 && minutes >= (60 - intervalMinutes +1) && intervalMinutes !== 60) continue; 
        const time = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minutes);
        slots.push(format(time, "HH:mm")); // e.g., "09:00", "14:30"
      }
    }
    // Add the endHour sharp if interval allows (e.g., for 9 to 17, include 17:00)
    if (endHour <= 23 && (60 % intervalMinutes === 0 || intervalMinutes === 60)) { // Ensure endHour is valid
       const endTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), endHour, 0);
       slots.push(format(endTime, "HH:mm"));
    }
    return slots;
  };
  const timeSlots = generateTimeSlots(8, 19, 60); // 8:00 AM to 7:00 PM, every 60 mins

  const [indicatorStyle, setIndicatorStyle] = useState({ left: '0px', width: '0px' })
  // Add state for current space images in the gallery
  const [currentSpaceImages, setCurrentSpaceImages] = useState<string[]>([])
  // Add state to track if panel has been auto-shown already
  const [panelAutoShown, setPanelAutoShown] = useState<boolean>(false)

  // Add these new state variables for each swipe section
  const [highlightsIndex, setHighlightsIndex] = useState<number>(0);
  const [communityIndex, setCommunityIndex] = useState<number>(0);
  const [getInTouchIndex, setGetInTouchIndex] = useState<number>(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768); // Tailwind 'md' breakpoint
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add this effect to handle auto-showing the panel on scroll
  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (isMobile) {
        // Mobile: Show later, hide later
        if (!panelAutoShown && scrollY > 800 && scrollY < 1100 && !aboutExpanded) {
          setAboutExpanded(true);
          setPanelAutoShown(true);
        }
        if (panelAutoShown && aboutExpanded && scrollY > 1150) {
          setAboutExpanded(false);
        }
      } else {
        // Desktop: Original logic
        if (!panelAutoShown && scrollY > 50 && scrollY < 300 && !aboutExpanded) {
          setAboutExpanded(true);
          setPanelAutoShown(true);
        }
        if (panelAutoShown && aboutExpanded && scrollY > 350) {
          setAboutExpanded(false);
        }
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [aboutExpanded, panelAutoShown, isMobile]); // Add isMobile to dependencies

  // Cycle through hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  // Add auto-scrolling functionality for the thumbnails
  useEffect(() => {
    const thumbnailsContainer = document.getElementById('thumbnails-container');
    if (!thumbnailsContainer) return;

    let scrollIntervalId: NodeJS.Timeout | null = null;
    const scrollSpeed = 0.5; // Reduced speed from 2 to 0.5 for slower movement
    
    const setupInfiniteScroll = () => {
      const thumbnails = thumbnailsContainer.querySelectorAll('.thumbnail-item');
      if (thumbnails.length === 0) return;
      thumbnails.forEach(thumb => {
        const clone = thumb.cloneNode(true) as HTMLElement;
        thumbnailsContainer.appendChild(clone);
      });
    };

    const startScrolling = () => {
      if (scrollIntervalId) clearInterval(scrollIntervalId as NodeJS.Timeout); // Clear existing interval if any, ensure type
      scrollIntervalId = setInterval(() => {
        if (!thumbnailsContainer) return;
        const totalWidth = thumbnailsContainer.scrollWidth;
        const halfwayPoint = totalWidth / 2;
        thumbnailsContainer.scrollLeft += scrollSpeed;
        if (thumbnailsContainer.scrollLeft >= halfwayPoint && thumbnailsContainer.scrollLeft % scrollSpeed === 0) {
          const resetPosition = thumbnailsContainer.scrollLeft - halfwayPoint;
          thumbnailsContainer.scrollLeft = resetPosition;
        }
      }, 50); // Increased interval from 20ms to 50ms for slower scrolling
    };

    const stopScrolling = () => {
      if (scrollIntervalId) {
        clearInterval(scrollIntervalId as NodeJS.Timeout); // ensure type
        scrollIntervalId = null;
      }
    };
    
    const setupTimeout = setTimeout(() => {
      setupInfiniteScroll();
      startScrolling(); // Start scrolling after setup
    }, 100);

    // Add mouse event listeners
    thumbnailsContainer.addEventListener('mouseenter', stopScrolling);
    thumbnailsContainer.addEventListener('mouseleave', startScrolling);
    
    return () => {
      stopScrolling(); // Clear interval on component unmount
      clearTimeout(setupTimeout);
      // Remove mouse event listeners on component unmount
      if (thumbnailsContainer) { // Check if container still exists
        thumbnailsContainer.removeEventListener('mouseenter', stopScrolling);
        thumbnailsContainer.removeEventListener('mouseleave', startScrolling);
      }
    };
  }, []);

  // Effect to update indicator style when activeSubTab or activeSection changes
  useEffect(() => {
    if (activeSubTab) {
      const activeElement = document.querySelector(`[data-subtab="${activeSubTab}"]`) as HTMLElement;
      if (activeElement) {
        let trueOffsetLeft = activeElement.offsetLeft;
        setIndicatorStyle({
          left: `${trueOffsetLeft}px`,
          width: `${activeElement.offsetWidth}px`,
        });
      } else {
        setIndicatorStyle({ left: '0px', width: '0px' });
      }
    } else {
      setIndicatorStyle({ left: '0px', width: '0px' });
    }
  }, [activeSubTab, activeSection]);

  // useEffect(() => {
  //   if (galleryOpen && typeof window !== 'undefined') {
  //     setModalContentWidth(window.innerWidth * 0.9 - 32);
  //     setModalContentHeight(window.innerHeight * 0.9 - 32);
  //   }
  // }, [galleryOpen]);


  const nextImage = () => {
    if (currentSpaceImages.length > 0) {
      // Find the current image in the filtered space images
      const currentImgSrc = uniqueGalleryImages[currentImageIndex].src;
      const currentIdxInSpace = currentSpaceImages.indexOf(currentImgSrc);
      
      if (currentIdxInSpace !== -1) {
        // Get the next image src in the filtered list
        const nextImgSrc = currentSpaceImages[(currentIdxInSpace + 1) % currentSpaceImages.length];
        // Find its index in the main gallery array
        const nextIdxInGallery = uniqueGalleryImages.findIndex(img => img.src === nextImgSrc);
        
        if (nextIdxInGallery !== -1) {
          setCurrentImageIndex(nextIdxInGallery);
        }
      }
    } else {
      // Fallback to original behavior if no space images are set
      setCurrentImageIndex((prev) => (prev + 1) % uniqueGalleryImages.length);
    }
  }

  const prevImage = () => {
    if (currentSpaceImages.length > 0) {
      // Find the current image in the filtered space images
      const currentImgSrc = uniqueGalleryImages[currentImageIndex].src;
      const currentIdxInSpace = currentSpaceImages.indexOf(currentImgSrc);
      
      if (currentIdxInSpace !== -1) {
        // Get the previous image src in the filtered list
        const prevImgSrc = currentSpaceImages[(currentIdxInSpace - 1 + currentSpaceImages.length) % currentSpaceImages.length];
        // Find its index in the main gallery array
        const prevIdxInGallery = uniqueGalleryImages.findIndex(img => img.src === prevImgSrc);
        
        if (prevIdxInGallery !== -1) {
          setCurrentImageIndex(prevIdxInGallery);
        }
      }
    } else {
      // Fallback to original behavior if no space images are set
      setCurrentImageIndex((prev) => (prev - 1 + uniqueGalleryImages.length) % uniqueGalleryImages.length);
    }
  }

  const openGalleryWithImage = (index: number) => {
    setCurrentImageIndex(index)
    
    // Set the current space images if opening from a space view
    if (activeSection && activeSubTab) {
      let spaceImages: string[] = [];
      
    switch (activeSection) {
      case "day-hire":
          spaceImages = eventSpacesData[activeSubTab]?.images || [];
          break;
      case "office":
          spaceImages = officeOptions[activeSubTab]?.images || [];
          break;
      case "meeting-rooms":
          spaceImages = meetingRoomOptions[activeSubTab]?.images || [];
          break;
      case "coworking":
          spaceImages = coworkingOptions[activeSubTab]?.images || [];
          break;
      }
      
      setCurrentSpaceImages(spaceImages);
    } else {
      // If not in a specific space view, use the clicked image collection
      // This handles clicks from thumbnails in the main gallery
      const clickedImage = uniqueGalleryImages[index];
      
      // Try to identify which space this image belongs to
      for (const section of ["day-hire", "office", "meeting-rooms", "coworking"]) {
        let found = false;
        
        if (section === "day-hire") {
          for (const key in eventSpacesData) {
            if (eventSpacesData[key].images.includes(clickedImage.src)) {
              setCurrentSpaceImages(eventSpacesData[key].images);
              found = true;
              break;
            }
          }
        } else if (section === "office") {
          for (const key in officeOptions) {
            if (officeOptions[key].images.includes(clickedImage.src)) {
              setCurrentSpaceImages(officeOptions[key].images);
              found = true;
              break;
            }
          }
        } else if (section === "meeting-rooms") {
          for (const key in meetingRoomOptions) {
            if (meetingRoomOptions[key].images.includes(clickedImage.src)) {
              setCurrentSpaceImages(meetingRoomOptions[key].images);
              found = true;
              break;
            }
          }
        } else if (section === "coworking") {
          for (const key in coworkingOptions) {
            if (coworkingOptions[key].images.includes(clickedImage.src)) {
              setCurrentSpaceImages(coworkingOptions[key].images);
              found = true;
              break;
            }
          }
        }
        
        if (found) break;
      }
      
      // If we couldn't associate with a specific space, just clear the filter
      if (currentSpaceImages.length === 0) {
        setCurrentSpaceImages([]);
      }
    }
    
    setGalleryOpen(true)
  }

  // Fix the openGalleryWithImage call for the current content images
  const handleContentImageClick = (spaceImageIndex: number) => {
    const content = getCurrentContent();
    if (content && content.images && content.images.length > 0) {
      const currentImageSrc = content.images[spaceImageIndex];
      // Find the index in the uniqueGalleryImages
      const galleryIdx = uniqueGalleryImages.findIndex(galleryImg => galleryImg.src === currentImageSrc);

      if (galleryIdx !== -1) {
        openGalleryWithImage(galleryIdx);
      }
    }
  };

  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  const scrollToExploreSpaces = () => {
    document.getElementById('explore-spaces-section')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  // Add this function to handle the booking process
  const handleBookTour = () => {
    setTourDialogOpen(true); 
    setTourSubmitSuccess(false); // Reset success state
    setTourSubmitError(''); // Clear previous errors
  }

  // Add this function to handle form submission
  // const handleBookingSubmit = (e: FormEvent<HTMLFormElement>) => { // Old - Will be removed
  //   e.preventDefault()
  //   if (!visitorEmail) {
  //     setEmailError('Please enter your email')
  //     return
  //   }
  //   if (!/^\S+@\S+\.\S+$/.test(visitorEmail)) {
  //     setEmailError('Please enter a valid email address')
  //     return
  //   }
  //   setEmailError('')
  //   setBookingDialogOpen(false)
  //   window.open(`https://calendar.google.com/calendar/u/3/r/eventedit?text=Tour+of+The+Village+Workspace&add=george@scailer.io,josh@scailer.io,${encodeURIComponent(visitorEmail)}&state=%5Bnull%2Cnull%2Cnull%2Cnull%2C%5B13%5D%5D`, "_blank")
  //   setVisitorEmail('')
  // }

  const handleOpenInquiryDialog = () => {
    setInquiryDialogOpen(true);
    setInquirySubmitSuccess(false);
    setInquirySubmitError('');
    // Clear form fields if you want them reset each time the dialog opens
    // setInquiryName('');
    // setInquiryEmail('');
    // setInquiryPhoneNumber('');
    setInquiryMessage(''); // Assuming you add a state for inquiryMessage
  };

  const handleInquirySubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;
    setInquirySubmitError('');

    if (!inquiryName) {
      setInquiryNameError('Please enter your name');
      isValid = false;
    } else {
      setInquiryNameError('');
    }

    if (!inquiryEmail) {
      setInquiryEmailError('Please enter your email');
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(inquiryEmail)) {
      setInquiryEmailError('Please enter a valid email address (e.g., name@example.com)');
      isValid = false;
    } else {
      setInquiryEmailError('');
    }

    if (!inquiryPhoneNumber) {
      setInquiryPhoneNumberError('Please enter your phone number');
      isValid = false;
    } else if (!/^[+]?[\d\s()-]{8,20}$/.test(inquiryPhoneNumber)) { // Added phone number format validation
      setInquiryPhoneNumberError('Please enter a valid phone number (digits, spaces, -, () are allowed)');
      isValid = false;
    } else {
      setInquiryPhoneNumberError('');
    }

    if (isValid) {
      setInquirySubmitting(true);
      setInquirySubmitSuccess(false);
      try {
        const currentSpace = getCurrentContent();
        const spaceTitle = currentSpace?.title || 'General Inquiry';
        // Add a state for inquiryMessage if you want to include it
        // const inquiryMessage = "User typed message here"; 

        const response = await fetch('/api/inquiry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inquiryName,
            inquiryEmail,
            inquiryPhoneNumber,
            inquiryMessage: "User wants to inquire about this space.", // Placeholder, add state if needed
            spaceTitle,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || data.details || `Server responded with ${response.status}`);
        }

        setInquirySubmitSuccess(true);
        console.log("Inquiry submitted successfully:", data);
        // Close dialog first, then show toast
        setInquiryDialogOpen(false); 
        toast.success("Inquiry Sent!", {
          description: "Thank you for your inquiry! We will get back to you shortly.",
          duration: 5000,
        });

        // Optionally close dialog and reset form after a delay
        // setTimeout(() => {
        //   setInquiryDialogOpen(false);
        //   setInquiryName('');
        //   setInquiryEmail('');
        //   setInquiryPhoneNumber('');
        //   setInquiryMessage('');
        // }, 2000); // Delay removed as toast provides feedback and dialog closes

      } catch (error) {
        console.error("Error submitting inquiry:", error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        const userFriendlyError = "Sorry, there was an issue submitting your inquiry. Please try again later.";
        setInquirySubmitError(userFriendlyError);
        toast.error("Inquiry Failed", { description: userFriendlyError, duration: 5000 });
      } finally {
        setInquirySubmitting(false);
      }
    }
  };

  const handleTourSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let tourIsValid = true;
    setTourSubmitError(''); // Clear previous errors on new submission attempt

    if (!tourName) {
      setTourNameError('Please enter your name');
      tourIsValid = false;
    } else {
      setTourNameError('');
    }

    if (!tourEmail) {
      setTourEmailError('Please enter your email');
      tourIsValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(tourEmail)) {
      setTourEmailError('Please enter a valid email address (e.g., name@example.com)');
      tourIsValid = false;
    } else {
      setTourEmailError('');
    }

    if (!tourPhoneNumber) {
      setTourPhoneNumberError('Please enter your phone number');
      tourIsValid = false;
    } else if (!/^[+]?[\d\s()-]{8,20}$/.test(tourPhoneNumber)) { // Added phone number format validation
      setTourPhoneNumberError('Please enter a valid phone number (digits, spaces, -, () are allowed)');
      tourIsValid = false;
    } else {
      setTourPhoneNumberError('');
    }

    if (!tourDate || !isValidDate(tourDate)) { // Updated validation for Date object
      setTourDateError('Please select a valid date');
      tourIsValid = false;
    } else {
      setTourDateError('');
    }

    if (!tourTime) {
      setTourTimeError('Please select a time');
      tourIsValid = false;
    } else {
      setTourTimeError('');
    }

    if (tourIsValid && tourDate) { // Ensure tourDate is defined before formatting
      try {
        setTourSubmitting(true);
        setTourSubmitSuccess(false); // Reset success state before new attempt
        
        // Get the base URL - use window.location.origin for the current domain
        const baseUrl = window.location.origin;
        console.log("Making API request to:", `${baseUrl}/api/tour-booking`);
        
        // Send data to our API endpoint
        const res = await fetch(`${baseUrl}/api/tour-booking`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tourName,
            tourEmail,
            tourPhoneNumber,
            tourDate: format(tourDate, "yyyy-MM-dd"), // Format Date to string for API
            tourTime,
            tourMessage
          }),
        });

        const data = await res.json();
        
        if (!res.ok) {
          console.error("API response error:", data);
          // Use data.error or data.details from the response if available
          throw new Error(data.error || data.details || `Server responded with ${res.status}`);
        }
        
        console.log("Tour request submitted successfully:", data);
        setTourSubmitSuccess(true);
        // Close dialog first, then show toast for better UX
        setTourDialogOpen(false);
        toast.success("Tour Request Submitted!", {
          description: "You'll receive a confirmation email with a calendar invite shortly.",
          duration: 5000,
        });
        
        // Reset form fields
        setTourName('');
        setTourEmail('');
        setTourPhoneNumber('');
        setTourDate(undefined); // Reset date
        setTourTime('');
        setTourMessage('');
        
        // Show success alert or toast notification
        // alert("Your tour has been booked successfully! You will receive a confirmation email with calendar invite shortly.");
      } catch (error) {
        console.error("Error booking tour:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        const userFriendlyError = "Sorry, there was an issue booking your tour. Please check your details or try again later.";
        
        if (errorMessage.includes('Missing required fields')) {
          setTourSubmitError("Please ensure all required fields are correctly filled and try again.");
        } else if (errorMessage.includes('Server responded with 500') || errorMessage.toLowerCase().includes('failed to process booking')) {
          setTourSubmitError("We couldn't book your tour due to a server issue. Please try again later or contact us.");
        } else {
          setTourSubmitError(userFriendlyError);
        }
        toast.error("Booking Failed", { description: tourSubmitError || userFriendlyError, duration: 5000 });
        setTourSubmitSuccess(false);
      } finally {
        setTourSubmitting(false);
      }
    }
  };

  const handleTabChange = (value: string) => {
    setActiveSection(value);
    let defaultSubTab = '';
    switch (value) {
      case "day-hire": defaultSubTab = "sports-hall"; break;
      case "office": defaultSubTab = "director-office"; break;
      case "meeting-rooms": defaultSubTab = "boardroom"; break;
      case "coworking": defaultSubTab = "community"; break;
    }
    setActiveSubTab(defaultSubTab);
    setCurrentSpaceImageIndex(0);
  }

  const handleSubTabChange = (value: string) => {
    setActiveSubTab(value);
    setCurrentSpaceImageIndex(0);
  }

  const getCurrentContent = () => {
    switch (activeSection) {
      case "day-hire": return eventSpacesData[activeSubTab] || null;
      case "office": return officeOptions[activeSubTab] || null;
      case "meeting-rooms": return meetingRoomOptions[activeSubTab] || null;
      case "coworking": return coworkingOptions[activeSubTab] || null;
      default: return null;
    }
  }

  // REMOVE the previous empty useEffect for gallery images that was here

  // Add this after all the state declarations
  // Debug effect to inspect calendar structure when dialog opens
  useEffect(() => {
    if (tourDialogOpen) {
      console.log('Tour dialog opened - inspecting calendar DOM');
      // Set a timeout to allow the dialog to fully render
      const timeout = setTimeout(() => {
        const popperContent = document.querySelector('[data-radix-popper-content-wrapper]');
        if (popperContent) {
          console.log('Found popper content:', popperContent);
          // Log all buttons inside the calendar
          const buttons = popperContent.querySelectorAll('button');
          console.log(`Found ${buttons.length} buttons inside calendar:`, buttons);
          // Log all table cells
          const cells = popperContent.querySelectorAll('td');
          console.log(`Found ${cells.length} cells inside calendar:`, cells);
          // Check computed styles on a button to see what's overriding our cursor
          if (buttons.length > 0) {
            const firstButton = buttons[0];
            const computedStyle = window.getComputedStyle(firstButton);
            console.log('Computed cursor style on first button:', computedStyle.cursor);
            console.log('Button element:', firstButton);
          }
        } else {
          console.log('No popper content found - calendar may not be rendered yet');
        }
      }, 1000); // Wait 1 second for DOM to be fully rendered
      
      return () => clearTimeout(timeout);
    }
  }, [tourDialogOpen]);

  // Add a useEffect to set up a mutation observer for the calendar elements
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    console.log('Setting up mutation observer for calendar elements');
    
    // Create a MutationObserver to watch for changes to the DOM
    const observer = new MutationObserver((mutations) => {
      // Look for the popper element on each mutation
      const popperElement = document.querySelector('[data-radix-popper-content-wrapper]');
      if (popperElement) {
        console.log('Calendar popper found by mutation observer');
        
        // Apply cursor styles directly to all interactive elements
        const allButtons = popperElement.querySelectorAll('button');
        const allCells = popperElement.querySelectorAll('td');
        const allElements = popperElement.querySelectorAll('*');
        
        console.log(`Applying direct styles to ${allButtons.length} buttons and ${allCells.length} cells`);
        
        // Apply styles to buttons
        allButtons.forEach(button => {
          (button as HTMLElement).style.cursor = 'pointer';
          (button as HTMLElement).style.pointerEvents = 'auto';
          // Add a data attribute for debugging
          button.setAttribute('data-cursor-fixed', 'true');
        });
        
        // Apply styles to cells
        allCells.forEach(cell => {
          (cell as HTMLElement).style.cursor = 'pointer';
          (cell as HTMLElement).style.pointerEvents = 'auto';
          cell.setAttribute('data-cursor-fixed', 'true');
        });
        
        // Apply pointer-events to all elements to ensure hover works
        allElements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.pointerEvents = 'auto';
          }
        });
      }
    });
    
    // Start observing the document body for any changes
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    // Clean up the observer when component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleOpenGetInTouchDialog = () => {
    setGetInTouchDialogOpen(true);
    setGetInTouchSubmitSuccess(false);
    setGetInTouchSubmitError('');
    // Clear form fields
    setGetInTouchName('');
    setGetInTouchEmail('');
    setGetInTouchPhoneNumber('');
    setGetInTouchMessage('');
  };

  const handleGetInTouchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;
    setGetInTouchSubmitError('');

    if (!getInTouchName) {
      setGetInTouchNameError('Please enter your name');
      isValid = false;
    } else {
      setGetInTouchNameError('');
    }

    if (!getInTouchEmail) {
      setGetInTouchEmailError('Please enter your email');
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(getInTouchEmail)) {
      setGetInTouchEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setGetInTouchEmailError('');
    }

    if (!getInTouchPhoneNumber) {
      setGetInTouchPhoneNumberError('Please enter your phone number');
      isValid = false;
    } else if (!/^[+]?[\d\s()-]{8,20}$/.test(getInTouchPhoneNumber)) { // Added phone number format validation
      setGetInTouchPhoneNumberError('Please enter a valid phone number (digits, spaces, -, () are allowed)');
      isValid = false;
    } else {
      setGetInTouchPhoneNumberError('');
    }

    if (isValid) {
      setGetInTouchSubmitting(true);
      setGetInTouchSubmitSuccess(false);
      try {
        const response = await fetch('/api/inquiry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inquiryName: getInTouchName,
            inquiryEmail: getInTouchEmail,
            inquiryPhoneNumber: getInTouchPhoneNumber,
            inquiryMessage: getInTouchMessage || "General inquiry via Get in Touch form.",
            spaceTitle: "General Inquiry (Get in Touch)",
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || data.details || `Server responded with ${response.status}`);
        }

        setGetInTouchSubmitSuccess(true);
        setGetInTouchDialogOpen(false); 
        toast.success("Message Sent!", {
          description: "Thank you for reaching out! We will get back to you shortly.",
          duration: 5000,
        });

      } catch (error) {
        console.error("Error submitting Get in Touch form:", error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        const userFriendlyError = "Sorry, there was an issue sending your message. Please try again later.";
        setGetInTouchSubmitError(userFriendlyError);
        toast.error("Message Failed", { description: userFriendlyError, duration: 5000 });
      } finally {
        setGetInTouchSubmitting(false);
      }
    }
  };

  // Add these helper functions for the swipe sections
  const nextHighlight = () => {
    setHighlightsIndex((prev) => (prev + 1) % 3);
  };

  const prevHighlight = () => {
    setHighlightsIndex((prev) => (prev - 1 + 3) % 3);
  };

  const nextCommunity = () => {
    setCommunityIndex((prev) => (prev + 1) % 3);
  };

  const prevCommunity = () => {
    setCommunityIndex((prev) => (prev - 1 + 3) % 3);
  };

  const nextGetInTouch = () => {
    setGetInTouchIndex((prev) => (prev + 1) % 3);
  };

  const prevGetInTouch = () => {
    setGetInTouchIndex((prev) => (prev - 1 + 3) % 3);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Global Styles */}
      <style jsx global>{scrollbarHideStyles}</style>
      {/* <style jsx global>{calendarStyles}</style> */} {/* Also comment out here if it was applied twice */}
      
      {/* Additional global styles for calendar specific issues */}
      <style jsx global>{`
        /* Fix calendar component cursor issues */
        .rdp button, 
        .rdp td, 
        .rdp th, 
        .rdp-day, 
        .rdp-day_selected, 
        .rdp-day_today,
        .rdp-nav button,
        [data-radix-popper-content-wrapper] [role="dialog"] button,
        [data-radix-popper-content-wrapper] [role="dialog"] td {
          cursor: pointer !important;
        }
        
        /* Force all calendar cells to be clickable */
        .rdp-cell:not(.rdp-day_outside):not(.rdp-day_disabled) {
          cursor: pointer !important;
        }

        /* === REVISED STYLES START === */
        /* Target disabled day buttons */
        button[disabled].rdp-day_button {
          color: #9ca3af !important; /* Tailwind gray-400 */
          opacity: 0.5 !important;
          cursor: not-allowed !important;
          /* Add any other desired styling for disabled look */
        }

        /* Target calendar header cells (day names) */
        th.rdp-weekday {
          display: inline-block !important; /* Force display type */
          width: calc(100% / 7 - 1px) !important; /* Explicit width, account for potential borders/spacing if any */
          text-align: center !important;
          font-weight: normal !important; 
          font-size: 0.8rem !important; 
          color: #374151 !important; /* Changed to Tailwind gray-700 for darker text */
          padding: 0.25rem 0 !important; /* Adjusted padding */
          box-sizing: border-box !important;
        }

        /* Target calendar day cells (td) for width */
        td.rdp-cell {
          display: inline-block !important; /* Match header cell display for consistency */
          width: calc(100% / 7 - 1px) !important; /* Match header cell width */
          text-align: center !important; /* Ensure content within is centered */
          padding: 0 !important; /* Override default padding if any */
          box-sizing: border-box !important;
        }
        /* === REVISED STYLES END === */
      `}</style>
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-light text-[#1a365d]">
            The <span className="font-bold">Village</span>
          </h1>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/thevillagebyoasis/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#1a365d] hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/company/oasisvillagestmartins/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#1a365d] hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#1a365d] font-medium hidden md:flex hover:bg-primary/10 hover:text-primary transition-colors duration-200"
              onClick={handleOpenGetInTouchDialog} // Changed from scrollToContact
            >
              Get in Touch
            </Button>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white font-medium rounded-md shadow-sm hover:shadow-md transform hover:-translate-y-px transition-all duration-200 sm:px-3 sm:py-1.5 px-2 py-1 text-xs sm:text-sm"
              onClick={handleBookTour}
            >
              <span className="hidden sm:inline">Book a Tour </span><ArrowRight className="ml-1 sm:ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Listing Title */}
      <section className="container mx-auto px-4 pt-8 pb-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a365d] max-w-3xl">
          The Village: A Historic School Building Reimagined
        </h1>
        <div className="flex flex-wrap items-center justify-between mt-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium ml-1 text-[#1a365d]">Exceptional Venue</span>
            </div>
            <span className="mx-1 text-gray-300">|</span>
            <Badge
              variant="outline"
              className="rounded-full font-medium bg-accent text-accent-foreground border-0 hover:bg-accent"
            >
              <Award className="h-3 w-3 mr-1" /> Award Winning
            </Badge>
            <span className="mx-1 text-gray-300">|</span>
            <span className="font-medium text-[#1a365d]">Tulse Hill, London SW2 3UP</span>
          </div>
          <div className="flex items-center gap-3 mt-2 sm:mt-0">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-md flex items-center gap-2 text-[#1a365d] hover:text-primary hover:bg-accent"
            >
              <Share className="h-4 w-4" />
              <span className="font-medium">Share</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-md flex items-center gap-2 text-[#1a365d] hover:text-primary hover:bg-accent"
            >
              <Mail className="h-4 w-4" />
              <span className="font-medium">Email</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col space-y-4 relative">
          {/* Container for Hero Image and Side Panel */}
          <div className="flex justify-end relative">
            {/* Side Panel - now positioned to right of hero image with overlap */}
            <div
              className={`fixed bg-gradient-to-br from-white to-gray-50 backdrop-blur-sm rounded-xl shadow-2xl transition-all transform duration-700 ease-in-out z-50 ${  // Removed overflow-hidden from base
                isMobile ? 
                  `w-[90vw] left-1/2 h-auto ${aboutExpanded ? 'opacity-100 -translate-x-1/2 translate-y-0' : 'opacity-0 -translate-x-1/2 translate-y-[100vh] pointer-events-none'}` // Removed max-h-[70vh] and overflow-y-auto for mobile
                : 
                  `w-[400px] h-[72vh] right-[50px] overflow-hidden ${aboutExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`
              }`}
              style={{ 
                border: '1px solid rgba(255, 255, 255, 0.8)',
                top: isMobile ? '15vh' : '100px',
              }}
            >
              {/* Remove decorative elements */}
              
              <div className="relative p-6 h-full flex flex-col">
                {/* Close button at top-right */}
                <button
                  onClick={() => setAboutExpanded(false)}
                  className="absolute top-4 right-4 rounded-full p-2 bg-white hover:bg-gray-100 transition-all duration-300 shadow-sm hover:shadow group border border-gray-100"
                >
                  <X className="h-4 w-4 text-gray-600 group-hover:text-[#0f766e] transform group-hover:rotate-90 transition-all duration-300" />
                </button>
                
                <div className="mb-4 flex items-center">
                  <div className="h-8 w-1 bg-[#0f766e] rounded-full mr-3"></div>
                  <h3 className="text-2xl font-light text-[#1a365d]">
                    About <span className="font-bold">The Old School</span>
                  </h3>
                </div>
                
                <div className="mt-5 space-y-4 prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    The Old School Workspace is a historic Grade II listed school building thoughtfully converted into versatile venue spaces while preserving its original character and charm, from intimate meeting rooms to large halls.
                  </p>
                  
                  <div className="flex items-center py-2 my-2">
                    <div className="flex-grow h-px bg-gray-200"></div>
                    <Building className="h-5 w-5 text-[#0f766e] mx-3" />
                    <div className="flex-grow h-px bg-gray-200"></div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Each space, from private offices to large event halls, highlights original features while incorporating modern amenities and technology. Perfect for focused work, collaborative projects, corporate events, community gatherings, or private celebrations.
                  </p>
                  
                  <div className="flex items-center py-2 my-2">
                    <div className="flex-grow h-px bg-gray-200"></div>
                    <Calendar className="h-5 w-5 text-[#0f766e] mx-3" />
                    <div className="flex-grow h-px bg-gray-200"></div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Our dedicated team ensures your event runs smoothly, with support from initial inquiry through to the day of your event.
                  </p>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button 
                    onClick={scrollToExploreSpaces} // Changed from scrollToContact
                    className="bg-[#0f766e] hover:bg-[#0f766e]/90 text-white px-4 py-2 shadow-sm transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Explore Our Spaces
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Image (positioned to fill the available space) */}
          <div className="relative w-full h-[70vh] rounded-lg overflow-hidden shadow-xl">
            {heroImages.map((image, index) => (
              <div
                key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${index === currentHeroIndex ? "opacity-100" : "opacity-0"}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                  priority={true} // Add priority to all hero images
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h2 className="text-5xl md:text-6xl font-light mb-2">
                The Old School <span className="font-bold">Workspace</span>
              </h2>
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-xl md:text-2xl font-light">
                    A historic building reimagined for modern events and gatherings
                    <button
                      onClick={() => setAboutExpanded(!aboutExpanded)}
                      className="ml-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white font-medium text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      {aboutExpanded ? "Read Less" : "Read More"}
                      {aboutExpanded ? (
                        <ChevronRight className="h-4 w-4 rotate-90 transition-transform duration-300" />
                      ) : (
                        <ChevronRight className="h-4 w-4 -rotate-90 transition-transform duration-300" />
                      )}
                    </button>
                  </p>
                </div>
              </div>
            </div>
            {/* <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleContentImageClick(currentSpaceImageIndex);
                }}
                className="absolute top-4 right-4 bg-white/60 hover:bg-white/80 rounded-full p-2 shadow-sm transition-all z-10"
              aria-label="Expand image"
            >
                <Expand className="h-5 w-5 text-gray-700" />
            </button> */}

            {/* Image indicator dots */}
            {/* <div className="absolute bottom-4 right-4 flex space-x-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHeroIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${index === currentHeroIndex ? "bg-white scale-125" : "bg-white/50"}`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
              </div> */}
            </div>
          </div>

          {/* Thumbnails - Fixed Width Row */}
          <div className="relative">
            {/* Remove left scroll arrow */}
            
            {/* Remove right scroll arrow */}
           
            <div id="thumbnails-container" className="flex overflow-x-auto overflow-y-hidden space-x-4 pb-4 hide-scrollbar">
  {/* Office Spaces */}
  <div className="relative flex-shrink-0 w-48 aspect-[4/3] rounded-lg overflow-hidden shadow-md group transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:z-10 thumbnail-item">
    <Image
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-14%20at%2011.11.13_88be90ab.jpg-W5U1QHw1ADiUWYI6z9bpStK0cu8NQy.jpeg" // This is a specific existing image for office thumbnail
      alt="Office Spaces"
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500"></div>
    {/* Remove text label */}
    <button
      onClick={() => openGalleryWithImage(32)} // Adjust index based on galleryImages
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100"
      aria-label="Expand office spaces image"
    >
      <Expand className="h-5 w-5 text-white" />
    </button>
  </div>
 
  {/* Sports Hall */}
  <div className="relative flex-shrink-0 w-48 aspect-[4/3] rounded-lg overflow-hidden shadow-md group transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:z-10 thumbnail-item">
    <Image
      src={galleryImages[0].src || "/placeholder.svg"} // From general galleryImages
      alt="Sports Hall"
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500"></div>
    {/* Remove text label */}
    <button
      onClick={() => openGalleryWithImage(0)} // Index from galleryImages
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100"
      aria-label="Expand Sports Hall image"
    >
      <Expand className="h-5 w-5 text-white" />
    </button>
  </div>

  {/* Dining Hall */}
  <div className="relative flex-shrink-0 w-48 aspect-[4/3] rounded-lg overflow-hidden shadow-md group transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:z-10 thumbnail-item">
    <Image
      src={galleryImages[3].src || "/placeholder.svg"} // From general galleryImages
      alt="Dining Hall"
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500"></div>
    {/* Remove text label */}
    <button
      onClick={() => openGalleryWithImage(3)} // Index from galleryImages
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100"
      aria-label="Expand Dining Hall image"
    >
      <Expand className="h-5 w-5 text-white" />
    </button>
  </div>

  {/* Old Gym */}
  <div className="relative flex-shrink-0 w-48 aspect-[4/3] rounded-lg overflow-hidden shadow-md group transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:z-10 thumbnail-item">
    <Image
      src={galleryImages[8].src || "/placeholder.svg"} // From general galleryImages
      alt="Old Gym"
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500"></div>
    {/* Remove text label */}
    <button
      onClick={() => openGalleryWithImage(8)} // Index from galleryImages
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100"
      aria-label="Expand Old Gym image"
    >
      <Expand className="h-5 w-5 text-white" />
    </button>
  </div>

  {/* Main Hall */}
  <div className="relative flex-shrink-0 w-48 aspect-[4/3] rounded-lg overflow-hidden shadow-md group transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:z-10 thumbnail-item">
    <Image
      src={galleryImages[9].src || "/placeholder.svg"} // From general galleryImages
      alt="Main Hall"
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500"></div>
    {/* Remove text label */}
    <button
      onClick={() => openGalleryWithImage(9)} // Index from galleryImages
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100"
      aria-label="Expand Main Hall image"
    >
      <Expand className="h-5 w-5 text-white" />
    </button>
  </div>

  {/* Conference Room */}
  <div className="relative flex-shrink-0 w-48 aspect-[4/3] rounded-lg overflow-hidden shadow-md group transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:z-10 thumbnail-item">
    <Image
      src={galleryImages[16].src || "/placeholder.svg"} // From general galleryImages
      alt="Conference Room"
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500"></div>
    {/* Remove text label */}
    <button
      onClick={() => openGalleryWithImage(16)} // Index from galleryImages
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100"
      aria-label="Expand Conference Room image"
    >
      <Expand className="h-5 w-5 text-white" />
    </button>
  </div>

  {/* Heads Room */}
  <div className="relative flex-shrink-0 w-48 aspect-[4/3] rounded-lg overflow-hidden shadow-md group transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:z-10 thumbnail-item">
    <Image
      src={galleryImages[20].src || "/placeholder.svg"} // From general galleryImages
      alt="Heads Room"
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500"></div>
    {/* Remove text label */}
    <button
      onClick={() => openGalleryWithImage(20)} // Index from galleryImages
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100"
      aria-label="Expand Heads Room image"
    >
      <Expand className="h-5 w-5 text-white" />
    </button>
  </div>

  {/* Staff Room */}
  <div className="relative flex-shrink-0 w-48 aspect-[4/3] rounded-lg overflow-hidden shadow-md group transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:z-10 thumbnail-item">
    <Image
      src={galleryImages[29].src || "/placeholder.svg"} // From general galleryImages
      alt="Staff Room"
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500"></div>
    {/* Remove text label */}
    <button
      onClick={() => openGalleryWithImage(29)} // Index from galleryImages
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100"
      aria-label="Expand Staff Room image"
    >
      <Expand className="h-5 w-5 text-white" />
    </button>
  </div>

  {/* Remove "View all photos" button */}
</div>
          </div>
        </div>
      </section>

{/* Introduction Banner */}
<section className="bg-[#F1F5F9] py-12 sm:py-16 mb-12">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#1a365d] mb-4">
      A Versatile Venue for <span className="font-bold">Every Occasion</span>
    </h2>
    <p className="max-w-2xl sm:max-w-3xl mx-auto text-base sm:text-lg text-gray-600 mb-8">
      Our historic school building has been reimagined as a modern, flexible workspace with character and charm.
      From corporate events to sports activities, we offer a range of spaces to suit your needs.
    </p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Button 
        className="bg-[#0f766e] hover:bg-[#0f766e]/90 text-white px-8 py-3 text-lg rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
        onClick={handleBookTour}
      >
        Book a Tour <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
      <Button 
        variant="outline" 
        className="text-gray-700 border-gray-300 px-8 py-3 text-lg rounded-lg hover:bg-gray-100 transition-all duration-300"
        onClick={scrollToExploreSpaces} // Changed from scrollToContact
      >
        Explore Spaces <ChevronRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  </div>
</section>

      {/* Image Gallery Modal */}
      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
        <DialogContent 
          className="bg-black/90 border-none flex items-center justify-center p-4" 
          style={{ width: '90vmin', height: '90vmin', maxWidth: '90vmin' }} // Added maxWidth
        >
          <DialogPrimitive.Title className="sr-only"> {/* Visually hidden title */}
            {uniqueGalleryImages[currentImageIndex]?.title || 'Image Gallery'}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Image gallery showcasing various spaces and features. Current image: {uniqueGalleryImages[currentImageIndex]?.title || 'Image'}
          </DialogPrimitive.Description>
          <div className="relative w-full h-full z-[100]"> {/* Removed flex items-center justify-center */}
            {/* Close button ... */}
            <button
              onClick={() => setGalleryOpen(false)}
              className="absolute top-4 right-4 z-[150] bg-black/50 hover:bg-black/70 p-2 rounded-full transition-all duration-300"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {/* Conditionally render image only if it exists */}
            {uniqueGalleryImages[currentImageIndex] && (
              <div className="relative w-full h-full"> {/* Simplified parent div */}
                      <Image
                  key={uniqueGalleryImages[currentImageIndex].src}
                  src={uniqueGalleryImages[currentImageIndex].src || "/placeholder.svg"}
                  alt={uniqueGalleryImages[currentImageIndex].alt}
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="90vw"
                      />
                    </div>
            )}

            {/* Image title ... */}
            <div className="absolute bottom-8 left-0 right-0 text-center z-[120]">
              <h3 className="text-white text-xl font-medium bg-black/30 inline-block px-4 py-2 rounded-full backdrop-blur-sm transition-all duration-500 transform">
                {uniqueGalleryImages[currentImageIndex]?.title || 'Image'}
              </h3>
            </div>

            {/* Navigation arrows ... */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-[120] bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-[120] bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>

            {/* Image counter ... */}
            <div className="absolute top-4 left-4 z-[120] bg-black/50 px-3 py-1 rounded-full text-white text-sm">
              {currentImageIndex + 1} / {uniqueGalleryImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-5xl mx-auto dark:text-neutral-900">
          {/* Spaces Tabs - MOVED UP */}
         
{/* Main navigation tabs */}
<div id="explore-spaces-section" className="relative mb-12 mt-4">
  <div className="absolute inset-0 bg-gradient-to-r from-[#f0fdfa] via-[#ecfdf5] to-[#f0fdfa] rounded-xl -z-10"></div>
 
  <div className="max-w-5xl mx-auto py-6 px-4">
    <h3 className="text-center text-2xl sm:text-3xl md:text-4xl font-light text-[#1a365d] mb-8">
      <span className="relative inline-block">
        Explore Our <span className="font-bold">Spaces</span>
      </span>
    </h3>
   
    {/* Update grid classes for better mobile layout */}
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mx-auto">
      {/* Day Hire Card */}
      <div 
        onClick={() => handleTabChange("day-hire")}
        className={`group relative overflow-hidden rounded-xl transition-all duration-500 cursor-pointer ${activeSection === "day-hire" ? "ring-4 ring-[#0f766e] ring-offset-2" : "hover:shadow-xl"}`}
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${activeSection === "day-hire" ? "from-[#0f766e] to-[#134e4a]" : "from-gray-50 to-white group-hover:from-[#f0fdfa] group-hover:to-white"} transition-colors duration-500 z-0`}></div>
        <div className="relative z-10 p-3 sm:p-6 flex flex-col items-center text-center transition-transform duration-500 transform-gpu h-full">
          <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-2 sm:mb-3 transition-all duration-500 ${activeSection === "day-hire" ? "bg-white/20 scale-110" : "bg-[#0f766e]/10 group-hover:scale-110"}`}>
            <Building className={`h-5 w-5 sm:h-7 sm:w-7 ${activeSection === "day-hire" ? "text-white" : "text-[#0f766e] group-hover:text-[#0f766e]"}`} />
          </div>
          <h4 className={`font-semibold text-sm sm:text-lg mb-1 sm:mb-2 text-center transition-colors duration-300 ${activeSection === "day-hire" ? "text-white" : "text-gray-900"}`}>Day Hire Spaces</h4>
          <p className={`text-sm text-center mb-4 transition-colors duration-300 hidden sm:block ${activeSection === "day-hire" ? "text-white/80" : "text-gray-600"}`}>Perfect for events, workshops, and gatherings</p>
          <span className={`mt-auto py-1 px-2 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${activeSection === "day-hire" ? "bg-white/20 text-white" : "bg-[#0f766e]/10 text-[#0f766e] group-hover:bg-[#0f766e] group-hover:text-white"}`}>
            {activeSection === "day-hire" ? "Currently Viewing" : "Explore Spaces"}
          </span>
        </div>
      </div>

      {/* Office Space Card */}
      <div 
        onClick={() => handleTabChange("office")}
        className={`group relative overflow-hidden rounded-xl transition-all duration-500 cursor-pointer ${activeSection === "office" ? "ring-4 ring-[#0f766e] ring-offset-2" : "hover:shadow-xl"}`}
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${activeSection === "office" ? "from-[#0f766e] to-[#134e4a]" : "from-gray-50 to-white group-hover:from-[#f0fdfa] group-hover:to-white"} transition-colors duration-500 z-0`}></div>
        <div className="relative z-10 p-3 sm:p-6 flex flex-col items-center text-center transition-transform duration-500 transform-gpu h-full">
          <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-2 sm:mb-3 transition-all duration-500 ${activeSection === "office" ? "bg-white/20 scale-110" : "bg-[#0f766e]/10 group-hover:scale-110"}`}>
            <Briefcase className={`h-5 w-5 sm:h-7 sm:w-7 ${activeSection === "office" ? "text-white" : "text-[#0f766e] group-hover:text-[#0f766e]"}`} />
          </div>
          <h4 className={`font-semibold text-sm sm:text-lg mb-1 sm:mb-2 text-center transition-colors duration-300 ${activeSection === "office" ? "text-white" : "text-gray-900"}`}>Office Rentals</h4>
          <p className={`text-sm text-center mb-4 transition-colors duration-300 hidden sm:block ${activeSection === "office" ? "text-white/80" : "text-gray-600"}`}>Long-term dedicated workspace solutions</p>
          <span className={`mt-auto py-1 px-2 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${activeSection === "office" ? "bg-white/20 text-white" : "bg-[#0f766e]/10 text-[#0f766e] group-hover:bg-[#0f766e] group-hover:text-white"}`}>
            {activeSection === "office" ? "Currently Viewing" : "Explore Offices"}
          </span>
        </div>
      </div>

      {/* Meeting Rooms Card */}
      <div 
        onClick={() => handleTabChange("meeting-rooms")}
        className={`group relative overflow-hidden rounded-xl transition-all duration-500 cursor-pointer ${activeSection === "meeting-rooms" ? "ring-4 ring-[#0f766e] ring-offset-2" : "hover:shadow-xl"}`}
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${activeSection === "meeting-rooms" ? "from-[#0f766e] to-[#134e4a]" : "from-gray-50 to-white group-hover:from-[#f0fdfa] group-hover:to-white"} transition-colors duration-500 z-0`}></div>
        <div className="relative z-10 p-3 sm:p-6 flex flex-col items-center text-center transition-transform duration-500 transform-gpu h-full">
          <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-2 sm:mb-3 transition-all duration-500 ${activeSection === "meeting-rooms" ? "bg-white/20 scale-110" : "bg-[#0f766e]/10 group-hover:scale-110"}`}>
            <Presentation className={`h-5 w-5 sm:h-7 sm:w-7 ${activeSection === "meeting-rooms" ? "text-white" : "text-[#0f766e] group-hover:text-[#0f766e]"}`} />
          </div>
          <h4 className={`font-semibold text-sm sm:text-lg mb-1 sm:mb-2 text-center transition-colors duration-300 ${activeSection === "meeting-rooms" ? "text-white" : "text-gray-900"}`}>Meeting Rooms</h4>
          <p className={`text-sm text-center mb-4 transition-colors duration-300 hidden sm:block ${activeSection === "meeting-rooms" ? "text-white/80" : "text-gray-600"}`}>Professional spaces for productive meetings</p>
          <span className={`mt-auto py-1 px-2 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${activeSection === "meeting-rooms" ? "bg-white/20 text-white" : "bg-[#0f766e]/10 text-[#0f766e] group-hover:bg-[#0f766e] group-hover:text-white"}`}>
            {activeSection === "meeting-rooms" ? "Currently Viewing" : "Explore Rooms"}
          </span>
        </div>
      </div>

      {/* Coworking Card */}
      <div 
        onClick={() => handleTabChange("coworking")}
        className={`group relative overflow-hidden rounded-xl transition-all duration-500 cursor-pointer ${activeSection === "coworking" ? "ring-4 ring-[#0f766e] ring-offset-2" : "hover:shadow-xl"}`}
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${activeSection === "coworking" ? "from-[#0f766e] to-[#134e4a]" : "from-gray-50 to-white group-hover:from-[#f0fdfa] group-hover:to-white"} transition-colors duration-500 z-0`}></div>
        <div className="relative z-10 p-3 sm:p-6 flex flex-col items-center text-center transition-transform duration-500 transform-gpu h-full">
          <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-2 sm:mb-3 transition-all duration-500 ${activeSection === "coworking" ? "bg-white/20 scale-110" : "bg-[#0f766e]/10 group-hover:scale-110"}`}>
            <Users className={`h-5 w-5 sm:h-7 sm:w-7 ${activeSection === "coworking" ? "text-white" : "text-[#0f766e] group-hover:text-[#0f766e]"}`} />
          </div>
          <h4 className={`font-semibold text-sm sm:text-lg mb-1 sm:mb-2 text-center transition-colors duration-300 ${activeSection === "coworking" ? "text-white" : "text-gray-900"}`}>Coworking</h4>
          <p className={`text-sm text-center mb-4 transition-colors duration-300 hidden sm:block ${activeSection === "coworking" ? "text-white/80" : "text-gray-600"}`}>Flexible shared workspaces for professionals</p>
          <span className={`mt-auto py-1 px-2 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${activeSection === "coworking" ? "bg-white/20 text-white" : "bg-[#0f766e]/10 text-[#0f766e] group-hover:bg-[#0f766e] group-hover:text-white"}`}>
            {activeSection === "coworking" ? "Currently Viewing" : "Explore Options"}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>

{/* Sub-tabs section */}
<div className="mb-8 mt-0">
            {activeSection === "day-hire" && (
    <div className="w-full flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-4 mb-6 overflow-x-auto pb-4 px-2 -mx-2 relative">
      <div 
        className="absolute bottom-0 h-0.5 bg-[#0f766e] transition-all duration-300 ease-in-out" 
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
          bottom: '8px', // Add distance from bottom to prevent overlap with scrollbar
        }}
      ></div>
                {Object.keys(eventSpacesData).map((key) => (
        <button
          key={key}
          data-subtab={key}
          onClick={() => handleSubTabChange(key)}
          className={`px-4 py-1.5 text-base transition-all duration-300 ${activeSubTab === key ? "text-gray-800 font-medium" : "text-gray-500 hover:text-gray-800"}`}
        >
          {eventSpacesData[key].title}
                  </button>
                ))}
              </div>
            )}

  {activeSection === "office" && (
    <div className="w-full mb-6 px-2 -mx-2"> {/* Container for all tab layouts */}
      {/* Single row for mobile, hidden on md and above */}
      <div className="md:hidden w-full flex flex-nowrap justify-start gap-4 pb-3 relative overflow-x-auto">
        <div 
          className="absolute bottom-0 h-0.5 bg-[#0f766e] transition-all duration-300 ease-in-out" 
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            bottom: '8px', // Add distance from bottom to prevent overlap with scrollbar
          }}
        ></div>
        
        {/* All office tab buttons in a single row for mobile */}
        <button
          data-subtab="director-office"
          onClick={() => handleSubTabChange("director-office")}
          className={`px-4 py-1.5 text-base whitespace-nowrap transition-all duration-300 ${activeSubTab === "director-office" ? "text-gray-800 font-medium" : "text-gray-500 hover:text-gray-800"}`}
        >
          {officeOptions["director-office"].title}
        </button>
        <button
          data-subtab="creative-labs"
          onClick={() => handleSubTabChange("creative-labs")}
          className={`px-4 py-1.5 text-base whitespace-nowrap transition-all duration-300 ${activeSubTab === "creative-labs" ? "text-gray-800 font-medium" : "text-gray-500 hover:text-gray-800"}`}
        >
          {officeOptions["creative-labs"].title}
        </button>
        <button
          data-subtab="team-office"
          onClick={() => handleSubTabChange("team-office")}
          className={`px-4 py-1.5 text-base whitespace-nowrap transition-all duration-300 ${activeSubTab === "team-office" ? "text-gray-800 font-medium" : "text-gray-500 hover:text-gray-800"}`}
        >
          {officeOptions["team-office"].title}
        </button>
        <button
          data-subtab="innovation-studio"
          onClick={() => handleSubTabChange("innovation-studio")}
          className={`px-4 py-1.5 text-base whitespace-nowrap transition-all duration-300 ${activeSubTab === "innovation-studio" ? "text-gray-800 font-medium" : "text-gray-500 hover:text-gray-800"}`}
        >
          {officeOptions["innovation-studio"].title}
        </button>
        <button
          data-subtab="workshop-studio"
          onClick={() => handleSubTabChange("workshop-studio")}
          className={`px-4 py-1.5 text-base whitespace-nowrap transition-all duration-300 ${activeSubTab === "workshop-studio" ? "text-gray-800 font-medium" : "text-gray-500 hover:text-gray-800"}`}
        >
          {officeOptions["workshop-studio"].title}
        </button>
        <button
          data-subtab="executive-suite"
          onClick={() => handleSubTabChange("executive-suite")}
          className={`px-4 py-1.5 text-base whitespace-nowrap transition-all duration-300 ${activeSubTab === "executive-suite" ? "text-gray-800 font-medium" : "text-gray-500 hover:text-gray-800"}`}
        >
          {officeOptions["executive-suite"].title}
        </button>
        <button
          data-subtab="team-hub"
          onClick={() => handleSubTabChange("team-hub")}
          className={`px-4 py-1.5 text-base whitespace-nowrap transition-all duration-300 ${activeSubTab === "team-hub" ? "text-gray-800 font-medium" : "text-gray-500 hover:text-gray-800"}`}
        >
          {officeOptions["team-hub"].title}
        </button>
        <button
          data-subtab="consultation-rooms"
          onClick={() => handleSubTabChange("consultation-rooms")}
          className={`px-4 py-1.5 text-base whitespace-nowrap transition-all duration-300 ${activeSubTab === "consultation-rooms" ? "text-gray-800 font-medium" : "text-gray-500 hover:text-gray-800"}`}
        >
          {officeOptions["consultation-rooms"].title}
        </button>
        <button
          data-subtab="education-suite"
          onClick={() => handleSubTabChange("education-suite")}
          className={`px-4 py-1.5 text-base whitespace-nowrap transition-all duration-300 ${activeSubTab === "education-suite" ? "text-gray-800 font-medium" : "text-gray-500 hover:text-gray-800"}`}
        >
          {officeOptions["education-suite"].title}
        </button>
      </div>
      
      {/* Original desktop view with two rows (hidden on mobile, visible on md and up) */}
      <div className="hidden md:block">
        {/* First row of tabs */}
        <div className="w-full flex flex-nowrap justify-start md:justify-center gap-4 mb-1 pb-3 relative overflow-x-auto">
          {isFirstRowTab(activeSubTab) && (
            <div 
              className="absolute bottom-0 h-0.5 bg-[#0f766e] transition-all duration-300 ease-in-out" 
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                bottom: '8px', // Add distance from bottom to prevent overlap with scrollbar
              }}
            ></div>
          )}
          <button
            data-subtab="director-office"
            onClick={() => handleSubTabChange("director-office")}
            className={`px-4 py-1.5 text-base transition-all duration-300 ${activeSubTab === "director-office" ? "text-gray-800 font-medium" : "text-gray-500 hover:text-gray-800"}`}
          >
            {officeOptions["director-office"].title}
          </button>
          <button
            data-subtab="creative-labs"
            onClick={() => handleSubTabChange("creative-labs")}
            className={`px-4 py-1.5 text-base transition-all duration-300 ${activeSubTab === "creative-labs" ? "text-gray-800 font-medium" : "text-gray-500 hover:text-gray-800"}`}
          >
            {officeOptions["creative-labs"].title}
          </button>
          <button
            data-subtab="team-office"
            onClick={() => handleSubTabChange("team-office")}
            className={`px-4 py-1.5 text-base transition-all duration-300 ${activeSubTab === "team-office" ? "text-gray-800 font-medium" : "text-gray-500 hover:text-gray-800"}`}
          >
            {officeOptions["team-office"].title}
          </button>
          <button
            data-subtab="innovation-studio"
            onClick={() => handleSubTabChange("innovation-studio")}
            className={`px-4 py-1.5 text-base transition-all duration-300 ${activeSubTab === "innovation-studio" ? "text-gray-800 font-medium" : "text-gray-500 hover:text-gray-800"}`}
          >
            {officeOptions["innovation-studio"].title}
          </button>
        </div>
        
        {/* Second row of tabs */}
        <div className="w-full flex flex-nowrap justify-start md:justify-center gap-4 pb-3 relative overflow-x-auto hide-scrollbar">
          {!isFirstRowTab(activeSubTab) && officeOptions[activeSubTab] && (
            <div 
              className="absolute bottom-0 h-0.5 bg-[#0f766e] transition-all duration-300 ease-in-out" 
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                bottom: '8px', // Add distance from bottom to prevent overlap with scrollbar
              }}
            ></div>
          )}
          <button
            data-subtab="workshop-studio"
            onClick={() => handleSubTabChange("workshop-studio")}
            className={`px-4 py-1.5 text-base transition-all duration-300 whitespace-nowrap ${activeSubTab === "workshop-studio" ? "text-gray-800 font-medium" : "text-gray-500 hover:text-gray-800"}`}
          >
            {officeOptions["workshop-studio"].title}
          </button>
          <button
            data-subtab="executive-suite"
            onClick={() => handleSubTabChange("executive-suite")}
            className={`px-4 py-1.5 text-base transition-all duration-300 whitespace-nowrap ${activeSubTab === "executive-suite" ? "text-gray-800 font-medium" : "text-gray-500 hover:text-gray-800"}`}
          >
            {officeOptions["executive-suite"].title}
          </button>
          <button
            data-subtab="team-hub"
            onClick={() => handleSubTabChange("team-hub")}
            className={`px-4 py-1.5 text-base transition-all duration-300 whitespace-nowrap ${activeSubTab === "team-hub" ? "text-gray-800 font-medium" : "text-gray-500 hover:text-gray-800"}`}
          >
            {officeOptions["team-hub"].title}
          </button>
          <button
            data-subtab="consultation-rooms"
            onClick={() => handleSubTabChange("consultation-rooms")}
            className={`px-4 py-1.5 text-base transition-all duration-300 whitespace-nowrap ${activeSubTab === "consultation-rooms" ? "text-gray-800 font-medium" : "text-gray-500 hover:text-gray-800"}`}
          >
            {officeOptions["consultation-rooms"].title}
          </button>
          <button
            data-subtab="education-suite"
            onClick={() => handleSubTabChange("education-suite")}
            className={`px-4 py-1.5 text-base transition-all duration-300 whitespace-nowrap ${activeSubTab === "education-suite" ? "text-gray-800 font-medium" : "text-gray-500 hover:text-gray-800"}`}
          >
            {officeOptions["education-suite"].title}
          </button>
        </div>
      </div>
    </div>
  )}

  {activeSection === "meeting-rooms" && (
    <div className="w-full flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-4 mb-6 overflow-x-auto pb-4 px-2 -mx-2 relative">
      <div 
        className="absolute bottom-0 h-0.5 bg-[#0f766e] transition-all duration-300 ease-in-out" 
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
          bottom: '8px', // Add distance from bottom to prevent overlap with scrollbar
        }}
      ></div>
      {Object.keys(meetingRoomOptions).map((key) => (
        <button
          key={key}
          data-subtab={key}
          onClick={() => handleSubTabChange(key)}
          className={`px-4 py-1.5 text-base transition-all duration-300 ${activeSubTab === key ? "text-gray-800 font-medium" : "text-gray-500 hover:text-gray-800"}`}
        >
          {meetingRoomOptions[key].title}
        </button>
      ))}
    </div>
  )}

  {activeSection === "coworking" && (
    <div className="w-full flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-4 mb-6 overflow-x-auto pb-4 px-2 -mx-2 relative">
      <div 
        className="absolute bottom-0 h-0.5 bg-[#0f766e] transition-all duration-300 ease-in-out" 
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
          bottom: '8px', // Add distance from bottom to prevent overlap with scrollbar
        }}
      ></div>
      {Object.keys(coworkingOptions).map((key) => (
        <button
          key={key}
          data-subtab={key}
          onClick={() => handleSubTabChange(key)}
          className={`px-4 py-1.5 text-base transition-all duration-300 ${activeSubTab === key ? "text-gray-800 font-medium" : "text-gray-500 hover:text-gray-800"}`}
        >
          {coworkingOptions[key].title}
        </button>
      ))}
    </div>
  )}
</div>

{/* Content for selected tab and option */}
{getCurrentContent() && (
  <div 
    key={`${activeSection}-${activeSubTab}`} 
    className="bg-white rounded-2xl overflow-hidden shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-8 duration-500"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
      <div className="relative h-[300px] md:h-[400px] lg:h-full transition-all duration-500">
        {/* Main image with navigation */}
        <div className="absolute inset-0 transition-opacity duration-500 ease-out">
          <Image
            src={getCurrentContent()!.images[currentSpaceImageIndex] || "/images/placeholder-default.png"} // Added fallback
            alt={getCurrentContent()!.title}
            fill
            className={`object-cover transition-transform duration-700 ease-in-out hover:scale-105 ${
              activeSection === 'day-hire' && activeSubTab === '6th-form-common-room' ? 'object-contain' : 'object-cover'
            }`}
            unoptimized={getCurrentContent()!.images[currentSpaceImageIndex]?.startsWith('/images')} // Add this if using local /images folder
          />
            </div>

        <div className="absolute top-4 left-4">
          <Badge
            className="text-white font-normal px-3 py-1 text-xs"
            style={{ backgroundColor: "#0f766e" }}
          >
            {getCurrentContent()!.title}
            {activeSubTab === "consultation-rooms" && getCurrentContent()!.images.length > 1 ? ` - Room ${currentSpaceImageIndex + 1}` : ""}
            {getCurrentContent()!.popular && (
              <span className="ml-2 bg-white text-[#0f766e] px-1 rounded-sm text-[10px]">POPULAR</span>
            )}
          </Badge>
        </div>

        {/* Add expand button */}
        {/* <button
          onClick={(e) => {
            e.stopPropagation();
            handleContentImageClick(currentSpaceImageIndex);
          }}
          className="absolute top-4 right-4 bg-white/60 hover:bg-white/80 rounded-full p-2 shadow-sm transition-all z-10"
          aria-label="Expand image"
        >
          <Expand className="h-5 w-5 text-gray-700" />
        </button> */}

        {/* Image navigation controls */}
        {getCurrentContent()!.images.length > 1 && (
          <>
            {/* Left arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setCurrentSpaceImageIndex((prev) =>
                  prev === 0 ? getCurrentContent()!.images.length - 1 : prev - 1
                )
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
                setCurrentSpaceImageIndex((prev) =>
                  prev === getCurrentContent()!.images.length - 1 ? 0 : prev + 1
                )
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full p-2 shadow-sm transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Image counter */}
            <div className="absolute bottom-3 right-3 bg-white/70 rounded-full px-2 py-0.5 text-xs font-medium text-gray-700">
              {currentSpaceImageIndex + 1} / {getCurrentContent()!.images.length}
            </div>
          </>
        )}
      </div>

      <div className="p-8 animate-in fade-in-50 duration-500 ease-in-out">
        <h3 className="text-2xl font-medium mb-3 text-foreground animate-in fade-in slide-in-from-right-8 duration-300 ease-in-out">
          {getCurrentContent()!.title}
        </h3>
        <p className="text-gray-700 mb-6 animate-in fade-in slide-in-from-right-12 duration-500 ease-in-out delay-75">
          <span className="md:hidden block">
            {getCurrentContent()!.description.length > 100 
              ? getCurrentContent()!.description.substring(0, 100).split('.')[0] + '.' 
              : getCurrentContent()!.description}
          </span>
          <span className="hidden md:inline">{getCurrentContent()!.description}</span>
        </p>

        {/* Capacity */}
        {getCurrentContent()!.capacity && (
          <div className="mb-4 animate-in fade-in slide-in-from-right-12 duration-500 ease-in-out delay-150">
            <h4 className="font-semibold text-gray-800 mb-2">Capacity:</h4>
            <ul className="list-disc pl-5 text-gray-700">
              {getCurrentContent()!.capacity.map((item: CapacityItem, index: number) => (
                <li key={index}>
                  {item.type}: {item.count}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Dimensions */}
        {getCurrentContent()!.dimensions && (
          <div className="mb-4 animate-in fade-in slide-in-from-right-12 duration-500 ease-in-out delay-200">
            <h4 className="font-semibold text-gray-800 mb-2">Dimensions:</h4>
            <p className="text-gray-700">{getCurrentContent()!.dimensions}</p>
          </div>
        )}

        {/* Features */}
        {getCurrentContent()!.features && (
          <div className="animate-in fade-in slide-in-from-right-12 duration-500 ease-in-out delay-250">
            <h4 className="font-semibold text-gray-800 mb-2">Features:</h4>
            <ul className="list-disc pl-5 text-gray-700">
              {getCurrentContent()!.features.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Price if available (for coworking) */}
        {getCurrentContent()!.price && (
          <div className="mt-6 mb-4 animate-in fade-in slide-in-from-right-12 duration-500 ease-in-out delay-300">
            <p className="text-3xl font-bold text-gray-900">
              {getCurrentContent()!.price}
              {getCurrentContent()!.period && <span className="text-base font-normal text-gray-600"> {getCurrentContent()!.period}</span>}
            </p>
          </div>
        )}

        <Button
          className="mt-10 bg-primary hover:bg-primary/80 text-white px-14 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1.5 transition-all duration-300 ease-in-out animate-in fade-in-50 delay-300 duration-500 focus:outline-none focus:ring-4 focus:ring-primary/50 focus:ring-offset-2 active:bg-primary/70"
          onClick={handleOpenInquiryDialog}
        >
          Enquire About This Space
        </Button>
      </div>
    </div>
  </div>
)}

        {/* Host Introduction - MOVED DOWN */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start border-b pb-6 mb-12 text-center sm:text-left">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Managed by Josh and George</h2>
            <p className="text-gray-700">Multiple spaces · Suitable for events, meetings, and activities</p>
          </div>
          <div className="flex -space-x-4">
            <Avatar className="h-20 w-20 border-2 border-white shadow-sm rounded-full overflow-hidden transition-transform duration-300 ease-in-out hover:scale-125">
              <AvatarImage src="/images/Josh.jpg" alt="Josh" className="object-cover" />
              <AvatarFallback>J</AvatarFallback>
            </Avatar>
            <Avatar className="h-20 w-20 border-2 border-white shadow-sm rounded-full overflow-hidden transition-transform duration-300 ease-in-out hover:scale-125">
              <AvatarImage src="/images/george.jpg" alt="George" className="object-cover" />
              <AvatarFallback>G</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-16">
          <div className="relative">
            {/* Mobile swipe controls */}
            <div className="md:hidden relative overflow-hidden mb-12">
              <div 
                className="flex transition-transform duration-300 ease-in-out" 
                style={{ transform: `translateX(-${highlightsIndex * 100}%)` }}
              >
                <div className="flex-shrink-0 w-full p-2">
          <div className="text-center card-hover p-6 rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-full">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Award className="w-12 h-12 text-[#0f766e]" strokeWidth={1.25} />
            </div>
            <h3 className="font-bold text-lg mb-2 text-foreground">Grade II Listed Building</h3>
            <p className="text-[#1a365d]">
              Originally known as Silwood House (formerly Berry House), our building was granted Grade II listed status in 1981, recognizing its special architectural and historic interest.
            </p>
          </div>
                </div>
                <div className="flex-shrink-0 w-full p-2">
          <div className="text-center card-hover p-6 rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-full">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MapPin className="w-12 h-12 text-[#0f766e]" strokeWidth={1.25} />
            </div>
            <h3 className="font-bold text-lg mb-2 text-foreground">Convenient Location</h3>
            <p className="text-[#1a365d]">
              Located in Tulse Hill, South London, with good transport links and ample on-site parking. Easy to reach and well-connected for your convenience.
            </p>
          </div>
                </div>
                <div className="flex-shrink-0 w-full p-2">
          <div className="text-center card-hover p-6 rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-full">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Calendar className="w-12 h-12 text-[#0f766e]" strokeWidth={1.25} />
            </div>
            <h3 className="font-bold text-lg mb-2 text-foreground">Flexible Spaces & Booking</h3>
            <p className="text-[#1a365d]">
              From individual workspaces and longer-term office rentals to large event halls, find the perfect fit for your needs. Book by the hour, half-day, full day, or discuss longer arrangements.
            </p>
          </div>
                </div>
              </div>
              
              {/* Navigation buttons */}
              <button 
                onClick={prevHighlight}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
                aria-label="Previous highlight"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
              <button 
                onClick={nextHighlight}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
                aria-label="Next highlight"
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>
              
              {/* Navigation dots */}
              <div className="flex justify-center gap-2 mt-4">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setHighlightsIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${idx === highlightsIndex ? "bg-primary scale-125" : "bg-gray-300"}`}
                    aria-label={`Go to highlight ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Desktop view (unchanged) */}
            <div className="hidden md:flex md:overflow-x-auto md:space-x-4 md:pb-4 hide-scrollbar md:grid md:grid-cols-3 md:gap-6 md:space-x-0 md:pb-0 md:overflow-visible">
              <div className="flex-shrink-0 w-72 sm:w-80 md:w-auto bg-white p-6 rounded-lg shadow-sm border border-gray-100 card-hover h-full">
                <Award className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-lg mb-2 text-foreground">Grade II Listed Building</h3>
                <p className="text-[#1a365d]">
                  Originally known as Silwood House (formerly Berry House), our building was granted Grade II listed status in 1981, recognizing its special architectural and historic interest.
                </p>
              </div>
              <div className="flex-shrink-0 w-72 sm:w-80 md:w-auto bg-white p-6 rounded-lg shadow-sm border border-gray-100 card-hover h-full">
                <MapPin className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-lg mb-2 text-foreground">Convenient Location</h3>
                <p className="text-[#1a365d]">
                  Located in Tulse Hill, South London, with good transport links and ample on-site parking. Easy to reach and well-connected for your convenience.
                </p>
              </div>
              <div className="flex-shrink-0 w-72 sm:w-80 md:w-auto bg-white p-6 rounded-lg shadow-sm border border-gray-100 card-hover h-full">
                <Calendar className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-lg mb-2 text-foreground">Flexible Spaces & Booking</h3>
                <p className="text-[#1a365d]">
                  From individual workspaces and longer-term office rentals to large event halls, find the perfect fit for your needs. Book by the hour, half-day, full day, or discuss longer arrangements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-8 text-foreground">Amenities & Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8">
            <div className="flex items-center gap-3">
              <Wifi className="h-6 w-6 text-primary" />
              <span className="text-[#1a365d]">High-speed WiFi</span>
            </div>
            <div className="flex items-center gap-3">
              <ParkingCircle className="h-6 w-6 text-primary" />
              <span className="text-[#1a365d]">Free parking (50+ spaces)</span>
            </div>
            <div className="flex items-center gap-3">
              <Tv className="h-6 w-6 text-primary" />
              <span className="text-[#1a365d]">AV equipment</span>
            </div>
            <div className="flex items-center gap-3">
              <Coffee className="h-6 w-6 text-primary" />
              <span className="text-[#1a365d]">Catering options</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-primary" />
              <span className="text-[#1a365d]">Event staff available</span>
            </div>
            <div className="flex items-center gap-3">
              <Maximize className="h-6 w-6 text-primary" />
              <span className="text-[#1a365d]">Flexible layouts</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-primary" />
              <span className="text-[#1a365d]">7-day availability</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-primary" />
              <span className="text-[#1a365d]">Central location</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-primary" />
              <span className="text-[#1a365d]">Accessible facilities</span>
            </div>
          </div>
        </div>

        {/* Who We Are */}
        <div className="mb-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-8 text-foreground">Who We Are</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[#1a365d] mb-6">
                The Village carries forward a powerful legacy dating back to 1699, when Thomas Tenison founded a school for girls — a radical act in a time when few believed in their education.
              </p>
              <p className="text-[#1a365d] mb-6">
                Rooted in the values of the Oasis charity, we believe it takes more than a classroom to raise a child — it takes a village. Our historic Grade II listed building has been thoughtfully transformed into a modern workspace while preserving its unique architectural character and historical significance.
              </p>
              <p className="text-[#1a365d]">
                By combining education, community development, and co-working under one roof, The Village offers a unique environment where purpose-driven work and meaningful relationships grow side by side — for the good of each other, and the good of all.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-md">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EjDqdXA93OR2a69Br5uvJ9jigEhXY8.png"
                alt="The Village Workspace"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Our Historic Building</h3>
                <p className="text-sm">Preserving heritage while creating inclusive spaces</p>
              </div>
            </div>
          </div>
        </div>

        {/* Community */}
        <div className="mb-16 bg-accent/30 p-6 sm:p-8 rounded-xl">
          <h2 className="text-xl sm:text-2xl font-bold mb-8 text-foreground text-center">Community Engagement</h2>
          
          {/* Mobile swipe controls */}
          <div className="md:hidden relative overflow-hidden mb-12">
            <div 
              className="flex transition-transform duration-300 ease-in-out" 
              style={{ transform: `translateX(-${communityIndex * 100}%)` }}
            >
              <div className="flex-shrink-0 w-full p-2">
            <div className="text-center card-hover p-6 rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-full bg-white shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary/10 rounded-full">
                <Users className="h-8 w-8 text-[#0f766e]" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">Local Events</h3>
              <p className="text-[#1a365d]">
                We regularly host community events, workshops, and networking opportunities that bring together local businesses and residents.
              </p>
            </div>
              </div>
              <div className="flex-shrink-0 w-full p-2">
            <div className="text-center card-hover p-6 rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-full bg-white shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary/10 rounded-full">
                <Award className="h-8 w-8 text-[#0f766e]" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">Charity Partnerships</h3>
              <p className="text-[#1a365d]">
                    We partner with local charities and non-profit organizations to amplify their impact, offering dedicated space and collaborative opportunities for community initiatives.
              </p>
            </div>
              </div>
              <div className="flex-shrink-0 w-full p-2">
            <div className="text-center card-hover p-6 rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-full bg-white shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary/10 rounded-full">
                <Calendar className="h-8 w-8 text-[#0f766e]" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">Sustainability</h3>
              <p className="text-[#1a365d]">
                    Our commitment to sustainability is reflected in the adaptive reuse of this historic building, giving it new purpose and preserving its unique character for the community and future generations.
              </p>
            </div>
          </div>
            </div>
            
            {/* Navigation buttons */}
            <button 
              onClick={prevCommunity}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
              aria-label="Previous community item"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button 
              onClick={nextCommunity}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
              aria-label="Next community item"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
            
            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-4">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setCommunityIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${idx === communityIndex ? "bg-primary scale-125" : "bg-gray-300"}`}
                  aria-label={`Go to community item ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Desktop view (unchanged) */}
          <div className="hidden md:flex md:overflow-x-auto md:space-x-4 md:pb-4 hide-scrollbar md:grid md:grid-cols-3 md:gap-6 md:space-x-0 md:pb-0 md:overflow-visible">
            <div className="flex-shrink-0 w-72 sm:w-80 md:w-auto bg-white p-6 rounded-lg shadow-sm border border-gray-100 card-hover">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">Local Events</h3>
              <p className="text-[#1a365d]">
                We regularly host community events, workshops, and networking opportunities that bring together local businesses and residents.
              </p>
            </div>
            <div className="flex-shrink-0 w-72 sm:w-80 md:w-auto bg-white p-6 rounded-lg shadow-sm border border-gray-100 card-hover">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">Charity Partnerships</h3>
              <p className="text-[#1a365d]">
                We partner with local charities and non-profit organizations to amplify their impact, offering dedicated space and collaborative opportunities for community initiatives.
              </p>
            </div>
            <div className="flex-shrink-0 w-72 sm:w-80 md:w-auto bg-white p-6 rounded-lg shadow-sm border border-gray-100 card-hover">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">Sustainability</h3>
              <p className="text-[#1a365d]">
                Our commitment to sustainability is reflected in the adaptive reuse of this historic building, giving it new purpose and preserving its unique character for the community and future generations.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5"
              onClick={scrollToContact}
            >
              Get Involved
            </Button>
          </div>
        </div>

        {/* Location */}
        <div className="mb-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-8 text-[#1a365d]">Location</h2>
         
<div className="relative h-64 sm:h-80 w-full rounded-lg overflow-hidden mb-6 shadow-md">
  {/* Google Maps iframe embed */}
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.9558246235247!2d-0.10840492292969251!3d51.44037917180777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760467d8d3a2c7%3A0x7e3d1e8d4c2c1c0a!2s155%20Tulse%20Hill%2C%20London%20SW2%203UP%2C%20UK!5e0!3m2!1sen!2sus!4v1710442800000!5m2!1sen!2sus"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen={false}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="absolute inset-0"
  ></iframe>
 
  {/* Semi-transparent overlay */}
  <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
 
  {/* Content overlay */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-md shadow-md max-w-xs text-center z-10 pointer-events-auto">
    <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
    <h3 className="text-base font-bold text-foreground mb-1">155 Tulse Hill, London SW2 3UP</h3>
    <p className="text-[#1a365d] text-sm mb-3">
      Located in Tulse Hill, easily accessible by public transport and car.
    </p>
    <a
      href="https://www.google.com/maps/search/?api=1&query=155+Tulse+Hill+London+SW2+3UP"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
    >
      <MapPin className="h-3 w-3" />
      View on Google Maps
    </a>
  </div>
</div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-3 text-foreground">Getting Here</h3>
              <p className="text-[#1a365d] mb-4">
                Located in Tulse Hill, South London, our venue is easily accessible by public transport and car. The
                building is surrounded by beautiful gardens and is within walking distance of local amenities.
              </p>
              <ul className="space-y-2 text-[#1a365d]">
                <li className="flex items-center gap-2">
                  <span className="font-semibold">Address:</span> 155 Tulse Hill, London SW2 3UP
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-semibold">Parking:</span> Free on-site parking for up to 50 vehicles
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-semibold">Train:</span> Tulse Hill Station (5 min walk)
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-semibold">Bus:</span> Routes 2, 196, 201, 415, 432 stop nearby
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3 text-foreground">Local Amenities</h3>
              <p className="text-[#1a365d] mb-4">
                Our venue is surrounded by a variety of amenities to enhance your event experience.
              </p>
              <ul className="space-y-2 text-[#1a365d]">
                <li className="flex items-center gap-2">
                  <span className="font-semibold">Accommodation:</span> 3 hotels within 5 minutes' walk
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-semibold">Dining:</span> Multiple restaurants and cafés nearby
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-semibold">Shopping:</span> Town center shops within walking distance
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-semibold">Green Spaces:</span> Adjacent to Memorial Park
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact & Booking */}
          
        <div id="contact-section" className="bg-[#f8fafc] p-6 sm:p-12 rounded-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-12 text-center text-[#1a365d]">Get in Touch</h2>
          
          {/* Mobile swipe controls */}
          <div className="md:hidden relative overflow-hidden mb-12">
            <div 
              className="flex transition-transform duration-300 ease-in-out" 
              style={{ transform: `translateX(-${getInTouchIndex * 100}%)` }}
            >
              <div className="flex-shrink-0 w-full p-2">
            <div className="text-center card-hover p-6 rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="w-12 h-12 text-[#0f766e]" strokeWidth={1.25} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[#1a365d]">Call Us</h3>
              <p className="text-gray-700 mb-1">+447975708289</p>
              <p className="text-gray-600">Monday-Friday: 9am-5pm</p>
            </div>
              </div>
              <div className="flex-shrink-0 w-full p-2">
                <div 
                  className="text-center card-hover p-6 rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer"
                  onClick={handleOpenGetInTouchDialog}
                >
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Mail className="w-12 h-12 text-[#0f766e]" strokeWidth={1.25} />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-[#1a365d]">Email Us</h3>
                  <p className="text-gray-700 mb-1 hover:underline">thevillagestmartins@gmail.com</p>
                  <p className="text-gray-600">We respond within 24 hours</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-full p-2">
            <div className="text-center card-hover p-6 rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Calendar className="w-12 h-12 text-[#0f766e]" strokeWidth={1.25} />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-[#1a365d]">Visit Us</h3>
                  <p className="text-gray-700 mb-1">
                    <button 
                      onClick={handleBookTour}
                      className="text-primary hover:underline hover:text-primary/80 transition-all duration-300"
                    >
                      Book a tour of our facilities
                    </button>
                  </p>
                  <p className="text-gray-600">Available 7 days a week</p>
                </div>
              </div>
            </div>
            
            {/* Navigation buttons */}
            <button 
              onClick={prevGetInTouch}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
              aria-label="Previous contact method"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button 
              onClick={nextGetInTouch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
              aria-label="Next contact method"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
            
            {/* Navigation dots */}
            <div className="flex justify-center mt-4 gap-2">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setGetInTouchIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${idx === getInTouchIndex ? "bg-primary scale-125" : "bg-gray-300"}`}
                  aria-label={`Go to contact method ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Desktop view (unchanged) */}
          <div className="hidden md:flex md:overflow-x-auto md:space-x-4 md:pb-4 hide-scrollbar md:grid md:grid-cols-3 md:gap-8 md:space-x-0 md:pb-0 md:overflow-visible sm:gap-12 mb-12">
            <div className="flex-shrink-0 w-72 sm:w-80 md:w-auto text-center card-hover p-6 rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="w-12 h-12 text-[#0f766e]" strokeWidth={1.25} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[#1a365d]">Call Us</h3>
              <p className="text-gray-700 mb-1">+447975708289</p>
              <p className="text-gray-600">Monday-Friday: 9am-5pm</p>
            </div>
            
            <div 
              className="flex-shrink-0 w-72 sm:w-80 md:w-auto text-center card-hover p-6 rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer"
              onClick={handleOpenGetInTouchDialog}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Mail className="w-12 h-12 text-[#0f766e]" strokeWidth={1.25} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[#1a365d]">Email Us</h3>
              <p className="text-gray-700 mb-1 hover:underline">thevillagestmartins@gmail.com</p>
              <p className="text-gray-600">We respond within 24 hours</p>
            </div>
            
            <div className="flex-shrink-0 w-72 sm:w-80 md:w-auto text-center card-hover p-6 rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Calendar className="w-12 h-12 text-[#0f766e]" strokeWidth={1.25} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[#1a365d]">Visit Us</h3>
              <p className="text-gray-700 mb-1">
                <button 
                  onClick={handleBookTour}
                  className="text-primary hover:underline hover:text-primary/80 transition-all duration-300"
                >
                  Book a tour of our facilities
                </button>
              </p>
              <p className="text-gray-600">Available 7 days a week</p>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              className="bg-[#0f766e] hover:bg-[#0f766e]/90 text-white px-12 py-5 text-xl rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              onClick={handleBookTour}
            >
              Book a Tour <Calendar className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        </div>
      </section>

      {/* Footer */}
    <footer className="border-t py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Site Info */}
          <div className="mb-6 sm:mb-0">
            <h3 className="text-xl font-bold text-[#1a365d] mb-4">The <span className="font-light">Village</span></h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              A historic school building reimagined as a modern, flexible workspace with character and charm, offering versatile venue spaces for every occasion.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="mb-6 sm:mb-0">
            <h3 className="text-lg font-semibold text-[#1a365d] mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleTabChange('day-hire'); }} className="text-gray-600 hover:text-primary transition-colors">Day Hire</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleTabChange('office'); }} className="text-gray-600 hover:text-primary transition-colors">Office Rentals</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleTabChange('meeting-rooms'); }} className="text-gray-600 hover:text-primary transition-colors">Meeting Rooms</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleTabChange('coworking'); }} className="text-gray-600 hover:text-primary transition-colors">Coworking</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToContact(); }} className="text-gray-600 hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="mb-6 sm:mb-0">
            <h3 className="text-lg font-semibold text-[#1a365d] mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1 text-primary flex-shrink-0" />
                <span>155 Tulse Hill, London, SW2 3UP</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                <a href="mailto:all@scailer.io" className="hover:text-primary transition-colors">all@scailer.io</a>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                <a href="tel:+447975708289" className="hover:text-primary transition-colors">+447975708289</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-[#1a365d] mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/thevillagebyoasis/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-500 hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/company/oasisvillagestmartins/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-500 hover:text-primary transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              {/* Add other social media links here if needed */}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} The Village Workspace. All rights reserved.</p>
          <p className="mt-1">A project by Scailer.</p>
        </div>
      </div>
    </footer>

      {/* Inquiry Dialog */}
      <Dialog open={inquiryDialogOpen} onOpenChange={(open) => {
        setInquiryDialogOpen(open);
        if (!open) {
          setInquirySubmitError(''); // Clear error when dialog is closed
          setInquirySubmitSuccess(false); // Reset success state
        }
      }}>
        <DialogContent className="sm:max-w-lg p-0">
          <div className="p-6 space-y-6">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-3">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <DialogPrimitive.Title className="text-2xl font-semibold text-foreground">
                Inquire About {getCurrentContent()?.title || 'This Space'}
          </DialogPrimitive.Title>
              <DialogPrimitive.Description className="text-sm text-muted-foreground mt-1">
                Fill in your details below, and we'll get back to you.
          </DialogPrimitive.Description>
            </div>
            {inquirySubmitError && (
              <div className="my-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm text-center">
                <p>{inquirySubmitError}</p>
              </div>
            )}
            <form onSubmit={handleInquirySubmit}>
            <div className="mb-4">
                <label htmlFor="inquiry-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="inquiry-name"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  className={`w-full px-3 py-2 border ${inquiryNameError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${inquiryNameError ? 'focus:ring-red-500' : 'focus:ring-primary'}`}
                  placeholder="Your Full Name"
                  disabled={inquirySubmitting}
                />
                {inquiryNameError && <p className="mt-1 text-sm text-red-600">{inquiryNameError}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="inquiry-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                  id="inquiry-email"
                  value={inquiryEmail}
                  onChange={(e) => setInquiryEmail(e.target.value)}
                  className={`w-full px-3 py-2 border ${inquiryEmailError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${inquiryEmailError ? 'focus:ring-red-500' : 'focus:ring-primary'}`}
                placeholder="your@email.com"
                disabled={inquirySubmitting}
              />
                {inquiryEmailError && <p className="mt-1 text-sm text-red-600">{inquiryEmailError}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="inquiry-phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="inquiry-phone"
                  value={inquiryPhoneNumber}
                  onChange={(e) => setInquiryPhoneNumber(e.target.value)}
                  className={`w-full px-3 py-2 border ${inquiryPhoneNumberError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${inquiryPhoneNumberError ? 'focus:ring-red-500' : 'focus:ring-primary'}`}
                  placeholder="+44 123 456 7890"
                  disabled={inquirySubmitting}
                />
                {inquiryPhoneNumberError && <p className="mt-1 text-sm text-red-600">{inquiryPhoneNumberError}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="inquiry-message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  id="inquiry-message"
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Any additional details or specific interests?"
                  rows={3}
                  disabled={inquirySubmitting}
                ></textarea>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                variant="outline"
                  onClick={() => {
                    setInquiryDialogOpen(false);
                    setInquirySubmitError(''); // Also clear error on explicit cancel
                  }}
                  disabled={inquirySubmitting}
              >
                Cancel
              </Button>
              <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 text-white"
                  disabled={inquirySubmitting}
                >
                  {inquirySubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : (
                    'Submit Inquiry'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tour Booking Dialog (New) */}
      <Dialog open={tourDialogOpen} onOpenChange={(open) => {
        setTourDialogOpen(open);
        if (!open) {
          setTourSubmitError(''); // Clear error when dialog is closed
          setTourSubmitSuccess(false); // Reset success state
        }
      }}>
        <DialogContent className="sm:max-w-lg p-0">
          <div className="p-6 space-y-6">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-3">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <DialogPrimitive.Title className="text-2xl font-semibold text-foreground">
                Book a Tour
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="text-sm text-muted-foreground mt-1">
                Enter your details below to schedule a tour.
              </DialogPrimitive.Description>
            </div>
            {tourSubmitError && (
              <div className="my-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm text-center">
                <p>{tourSubmitError}</p>
              </div>
            )}
            <form onSubmit={handleTourSubmit} className="space-y-4">
              <div>
                <label htmlFor="tour-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="tour-name"
                  value={tourName}
                  onChange={(e) => setTourName(e.target.value)}
                  className={`w-full px-3 py-2 border ${tourNameError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${tourNameError ? 'focus:ring-red-500' : 'focus:ring-primary'}`}
                  placeholder="Your Full Name"
                  disabled={tourSubmitting}
                />
                {tourNameError && <p className="mt-1 text-sm text-red-600">{tourNameError}</p>}
              </div>
              <div>
                <label htmlFor="tour-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="tour-email"
                  value={tourEmail}
                  onChange={(e) => setTourEmail(e.target.value)}
                  className={`w-full px-3 py-2 border ${tourEmailError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${tourEmailError ? 'focus:ring-red-500' : 'focus:ring-primary'}`}
                placeholder="your@email.com"
                  disabled={tourSubmitting}
                />
                {tourEmailError && <p className="mt-1 text-sm text-red-600">{tourEmailError}</p>}
              </div>
              <div>
                <label htmlFor="tour-phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="tour-phone"
                  value={tourPhoneNumber}
                  onChange={(e) => setTourPhoneNumber(e.target.value)}
                  className={`w-full px-3 py-2 border ${tourPhoneNumberError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${tourPhoneNumberError ? 'focus:ring-red-500' : 'focus:ring-primary'}`}
                  placeholder="+44 123 456 7890"
                  disabled={tourSubmitting}
                />
                {tourPhoneNumberError && <p className="mt-1 text-sm text-red-600">{tourPhoneNumberError}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="tour-date" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Date
                  </label>
                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !tourDate && "text-muted-foreground",
                          tourDateError && "border-red-500 focus-visible:ring-red-500"
                        )}
                        disabled={tourSubmitting}
                        onClick={() => setIsCalendarOpen(true)}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {tourDate && isValidDate(tourDate) ? format(tourDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <DatePicker
                        mode="single"
                        selected={tourDate}
                        onSelect={(selectedDate: Date | undefined) => {
                          setTourDate(selectedDate);
                          if (selectedDate) {
                            setTourDateError('');
                            setIsCalendarOpen(false); // Close calendar on date select
                          }
                        }}
                        disabled={(date: Date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {tourDateError && <p className="mt-1 text-sm text-red-600">{tourDateError}</p>}
                </div>
                <div>
                  <label htmlFor="tour-time" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Time
                  </label>
                  {tourTimeError && <p className="mt-1 text-sm text-red-600">{tourTimeError}</p>}
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot}
                        type="button"
                        variant={tourTime === slot ? "default" : "outline"}
                        onClick={() => {
                          setTourTime(slot);
                          if (slot) setTourTimeError('');
                        }}
                        className={cn(
                          "w-full text-xs sm:text-sm h-10", // Adjusted height and text size
                          tourTime === slot ? "bg-primary text-white hover:bg-primary/90" : "text-gray-700 hover:bg-gray-50",
                          tourSubmitting && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={tourSubmitting}
                      >
                        {format(new Date(`1970-01-01T${slot}:00`), slot.endsWith(":00") ? "h aa" : "h:mm aa")}
                      </Button>
                    ))}
                  </div>
                  {!tourTime && !tourTimeError && <p className="mt-1 text-xs text-muted-foreground">Please select a time.</p>}
                </div>
              </div>
              <div>
                <label htmlFor="tour-message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  id="tour-message"
                  value={tourMessage}
                  onChange={(e) => setTourMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Any additional details or specific interests?"
                  rows={3}
                  disabled={tourSubmitting}
                ></textarea>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setTourDialogOpen(false);
                    setTourSubmitError(''); // Also clear error on explicit cancel
                  }}
                  className="px-6 py-2"
                  disabled={tourSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-2"
                  disabled={tourSubmitting}
                >
                  {tourSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    'Submit Request'
                  )}
              </Button>
            </div>
          </form>
        </div>
        </DialogContent>
      </Dialog>

      {/* Get In Touch Dialog (New) */}
      <Dialog open={getInTouchDialogOpen} onOpenChange={(open) => {
        setGetInTouchDialogOpen(open);
        if (!open) {
          setGetInTouchSubmitError(''); // Clear error when dialog is closed
          setGetInTouchSubmitSuccess(false); // Reset success state
        }
      }}>
        <DialogContent className="sm:max-w-lg p-0">
          <div className="p-6 space-y-6">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-3">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <DialogPrimitive.Title className="text-2xl font-semibold text-foreground">
                Get in Touch
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="text-sm text-muted-foreground mt-1">
                Fill in your details below, and we'll get back to you.
              </DialogPrimitive.Description>
            </div>
            {getInTouchSubmitError && (
              <div className="my-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm text-center">
                <p>{getInTouchSubmitError}</p>
              </div>
            )}
            <form onSubmit={handleGetInTouchSubmit}>
              <div className="mb-4">
                <label htmlFor="get-in-touch-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="get-in-touch-name"
                  value={getInTouchName}
                  onChange={(e) => setGetInTouchName(e.target.value)}
                  className={`w-full px-3 py-2 border ${getInTouchNameError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${getInTouchNameError ? 'focus:ring-red-500' : 'focus:ring-primary'}`}
                  placeholder="Your Full Name"
                  disabled={getInTouchSubmitting}
                />
                {getInTouchNameError && <p className="mt-1 text-sm text-red-600">{getInTouchNameError}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="get-in-touch-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="get-in-touch-email"
                  value={getInTouchEmail}
                  onChange={(e) => setGetInTouchEmail(e.target.value)}
                  className={`w-full px-3 py-2 border ${getInTouchEmailError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${getInTouchEmailError ? 'focus:ring-red-500' : 'focus:ring-primary'}`}
                  placeholder="your@email.com"
                  disabled={getInTouchSubmitting}
                />
                {getInTouchEmailError && <p className="mt-1 text-sm text-red-600">{getInTouchEmailError}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="get-in-touch-phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="get-in-touch-phone"
                  value={getInTouchPhoneNumber}
                  onChange={(e) => setGetInTouchPhoneNumber(e.target.value)}
                  className={`w-full px-3 py-2 border ${getInTouchPhoneNumberError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${getInTouchPhoneNumberError ? 'focus:ring-red-500' : 'focus:ring-primary'}`}
                  placeholder="+44 123 456 7890"
                  disabled={getInTouchSubmitting}
                />
                {getInTouchPhoneNumberError && <p className="mt-1 text-sm text-red-600">{getInTouchPhoneNumberError}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="get-in-touch-message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  id="get-in-touch-message"
                  value={getInTouchMessage}
                  onChange={(e) => setGetInTouchMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="How can we help you?"
                  rows={3}
                  disabled={getInTouchSubmitting}
                ></textarea>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                variant="outline"
                  onClick={() => {
                    setGetInTouchDialogOpen(false);
                    setGetInTouchSubmitError(''); // Also clear error on explicit cancel
                  }}
                  disabled={getInTouchSubmitting}
              >
                Cancel
              </Button>
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 text-white"
                  disabled={getInTouchSubmitting}
                >
                  {getInTouchSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </div>
                  ) : (
                    'Send Message'
                  )}
              </Button>
            </div>
          </form>
        </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
