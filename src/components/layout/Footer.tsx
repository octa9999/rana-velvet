import Link from "next/link";

const footerLinks = {
  products: [
    { label: "Bedroom Furniture", href: "/categories/bedroom" },
    { label: "Living Room", href: "/categories/living-room" },
    { label: "Sofas & Seating", href: "/categories/sofas" },
    { label: "Curtains & Fabrics", href: "/categories/curtains" },
    { label: "Accessories", href: "/categories/accessories" },
  ],
  services: [
    { label: "Custom Furniture", href: "/custom-furniture" },
    { label: "Free Consultation", href: "/consultation" },
    { label: "Contact Us", href: "/contact" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Collections", href: "/categories" },
    { label: "Affiliate Program", href: "/affiliate" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[var(--charcoal)] text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-[family-name:var(--font-playfair)] text-3xl font-semibold tracking-tight text-white mb-6 inline-block"
            >
              Rana Velvet
            </Link>
            <p className="font-[family-name:var(--font-sans)] text-base text-white/60 leading-relaxed max-w-md mb-8">
              Premium furniture and signature velvets crafted with heritage since 1960. Experience the difference of true craftsmanship and quality.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-12 h-[1px] bg-[var(--gold)]"></span>
              <span className="font-[family-name:var(--font-sans)] text-sm text-[var(--gold)]">
                Crafted with heritage since 1960
              </span>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-10">
            {/* Products */}
            <div>
              <h4 className="font-[family-name:var(--font-sans)] text-sm font-semibold uppercase tracking-wider text-white/80 mb-6">
                Products
              </h4>
              <ul className="space-y-4">
                {footerLinks.products.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-[family-name:var(--font-sans)] text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-[family-name:var(--font-sans)] text-sm font-semibold uppercase tracking-wider text-white/80 mb-6">
                Services
              </h4>
              <ul className="space-y-4">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-[family-name:var(--font-sans)] text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-[family-name:var(--font-sans)] text-sm font-semibold uppercase tracking-wider text-white/80 mb-6">
                Company
              </h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-[family-name:var(--font-sans)] text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white/10 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="font-[family-name:var(--font-sans)] text-sm text-white/50 text-center lg:text-left">
            © 2025 Rana Velvet Furniture. All rights reserved. Crafted with heritage since 1960.
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="font-[family-name:var(--font-sans)] text-sm text-white/50 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-[family-name:var(--font-sans)] text-sm text-white/50 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}