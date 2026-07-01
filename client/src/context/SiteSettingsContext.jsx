import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api.js';

const defaults = { siteName: 'SAS Academy', supportEmail: '', announcement: '', maintenanceMode: false };
const SiteSettingsContext = createContext({ settings: defaults, loading: true, error: '' });

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaults);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/settings')
      .then((data) => setSettings({ ...defaults, ...data.settings }))
      .catch((err) => setError(err.message || 'Unable to load website settings'))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(() => ({ settings, loading, error }), [settings, loading, error]);
  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
}

export const useSiteSettings = () => useContext(SiteSettingsContext);
