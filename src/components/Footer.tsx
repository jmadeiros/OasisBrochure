export function Footer() {
  return (
    <footer className="border-t py-8 sm:py-10 md:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h3 className="font-bold mb-4 text-foreground">The Village</h3>
            <p className="text-secondary">
              A historic school building reimagined as a modern, flexible workspace with character and charm.
            </p>
            <p className="text-secondary mt-4">© {new Date().getFullYear()} The Village. All rights reserved.</p>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-foreground">Contact</h3>
            <ul className="space-y-2 text-secondary">
              <li>155 Tulse Hill</li>
              <li>London, SW2 3UP</li>
              <li>all@scailer.io</li>
              <li>+447975708289</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-foreground">Links</h3>
            <ul className="space-y-2 text-secondary">
              <li>About Us</li>
              <li>Services</li>
              <li>Booking</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
} 