
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-medium mb-4 text-white font-playfair">SOUL 7 APPAREL</h3>
            <p className="text-sm text-gray-400 mb-4">
              Premium clothing for the discerning individual. Experience style as it was meant to be worn.
            </p>
            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Soul 7 Apparel. All rights reserved.
            </div>
          </div>
          
          <FooterColumn title="Shop">
            <FooterLink href="/mens/tees" label="T-Shirts" />
            <FooterLink href="/mens/hats" label="Hats" />
            <FooterLink href="/mens/hoodies" label="Hoodies" />
            <FooterLink href="/shop" label="All Products" />
          </FooterColumn>
          
          <FooterColumn title="Support">
            <FooterLink href="/blog" label="Help Center" />
            <FooterLink href="#" label="FAQ" />
            <FooterLink href="#" label="Shipping" />
            <FooterLink href="#" label="Returns" />
          </FooterColumn>
          
          <FooterColumn title="Company">
            <FooterLink href="/blog" label="About Us" />
            <FooterLink href="#" label="Sustainability" />
            <FooterLink href="#" label="Press" />
            <FooterLink href="/wordpress-test" label="WordPress" />
          </FooterColumn>
        </div>
      </div>
    </footer>
  );
};

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
}

const FooterColumn = ({ title, children }: FooterColumnProps) => (
  <div>
    <h4 className="font-medium mb-4 text-sm text-white font-playfair">{title}</h4>
    <ul className="space-y-2 text-sm">
      {children}
    </ul>
  </div>
);

interface FooterLinkProps {
  href: string;
  label: string;
}

const FooterLink = ({ href, label }: FooterLinkProps) => (
  <li>
    <Link to={href} className="text-gray-400 hover:text-gray-300">
      {label}
    </Link>
  </li>
);

export default Footer;
