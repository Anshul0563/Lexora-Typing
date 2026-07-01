import { Link } from 'react-router-dom';
import { Brand } from './Brand.jsx';

export function Footer({ variant = 'public' }) {
  const isPublic = variant === 'public';
  return <footer className={`site-footer site-footer-${variant}`}><div className="site-footer-inner"><div className="site-footer-about">{isPublic && <Link to="/" aria-label="SAS Academy home"><Brand /></Link>}<p>Focused typing practice for competitive exams.</p></div>{isPublic && <nav aria-label="Footer navigation"><Link to="/login">Log in</Link><Link to="/register">Create account</Link></nav>}<p className="site-footer-copyright">&copy; {new Date().getFullYear()} SAS Academy. All rights reserved.</p></div></footer>;
}
