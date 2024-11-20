import { AnchorHTMLAttributes } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';

interface SocialLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  backgroundColor: `#${string}`;
  children: React.ReactNode;
}
const SocialLink = ({ backgroundColor, href, children }: SocialLinkProps) => {
  return (
    <a
      className={'btn text-white btn-floating m-1'}
      style={{ backgroundColor }}
      href={href}
      role="button"
    >
      {children}
    </a>
  );
};

const Footer = () => {
  return (
    <footer className="social-footer">
      <div className="container p-4 pb-0">
        <section className="social-links">
          {/* <!-- Facebook --> */}
          <SocialLink
            backgroundColor="#3b5998"
            href="https://www.facebook.com/"
          >
            <FontAwesomeIcon icon={faFacebook} className="fa-fw" />
          </SocialLink>

          {/* <!-- Twitter --> */}
          <SocialLink
            backgroundColor="#55acee"
            href="https://twitter.com/?lang=en"
          >
            <FontAwesomeIcon icon={faTwitter} className="fa-fw" />
          </SocialLink>

          {/* <!-- Instagram --> */}
          <SocialLink
            backgroundColor="#ac2bac"
            href="https://www.instagram.com/?hl=en"
          >
            <FontAwesomeIcon icon={faInstagram} className="fa-fw" />
          </SocialLink>

          {/* <!-- Linkedin --> */}
          <SocialLink
            backgroundColor="#0082ca"
            href="https://www.linkedin.com/"
          >
            <FontAwesomeIcon icon={faLinkedin} className="fa-fw" />
          </SocialLink>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
