import { Keyboard } from 'lucide-react';
import { useSiteSettings } from '../context/SiteSettingsContext.jsx';
export function Brand() { const { settings } = useSiteSettings(); return <div className="brand"><span className="brand-mark"><Keyboard size={21} /></span><span>{settings.siteName || 'SAS Academy'}</span></div>; }
