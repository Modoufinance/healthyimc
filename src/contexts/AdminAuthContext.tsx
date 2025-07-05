import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminUser {
  id: string;
  username: string;
  email: string;
  twoFactorEnabled: boolean;
}

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  login: (username: string, password: string, totpCode?: string, recaptchaToken?: string) => Promise<{ success: boolean; error?: string; requires2FA?: boolean; requiresCaptcha?: boolean }>;
  logout: () => Promise<void>;
  loading: boolean;
  setupTwoFactor: () => Promise<{ secret: string; qrCode: string }>;
  verifyTwoFactor: (totpCode: string) => Promise<boolean>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifySession();
  }, []);

  const verifySession = async () => {
    const token = localStorage.getItem('admin_session_token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/functions/v1/admin-auth/verify-session', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAdminUser(data.user);
      } else {
        localStorage.removeItem('admin_session_token');
      }
    } catch (error) {
      console.error('Session verification error:', error);
      localStorage.removeItem('admin_session_token');
    }

    setLoading(false);
  };

  const login = async (username: string, password: string, totpCode?: string, recaptchaToken?: string) => {
    try {
      const response = await fetch('/functions/v1/admin-auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          totpCode,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('admin_session_token', data.sessionToken);
        setAdminUser(data.user);
        return { success: true };
      } else {
        return { 
          success: false, 
          error: data.error,
          requires2FA: data.requires2FA,
          requiresCaptcha: data.requiresCaptcha
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Erreur de connexion' };
    }
  };

  const logout = async () => {
    const token = localStorage.getItem('admin_session_token');
    if (token) {
      try {
        await fetch('/functions/v1/admin-auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    localStorage.removeItem('admin_session_token');
    setAdminUser(null);
  };

  const setupTwoFactor = async () => {
    const token = localStorage.getItem('admin_session_token');
    if (!token) throw new Error('Non autorisé');

    const response = await fetch('/functions/v1/admin-auth/setup-2fa', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la configuration 2FA');
    }

    const data = await response.json();
    return { secret: data.secret, qrCode: data.qrCode };
  };

  const verifyTwoFactor = async (totpCode: string) => {
    const token = localStorage.getItem('admin_session_token');
    if (!token) return false;

    try {
      const response = await fetch('/functions/v1/admin-auth/verify-2fa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ totpCode }),
      });

      if (response.ok) {
        // Update user state to reflect 2FA is now enabled
        if (adminUser) {
          setAdminUser({ ...adminUser, twoFactorEnabled: true });
        }
        return true;
      }
    } catch (error) {
      console.error('2FA verification error:', error);
    }

    return false;
  };

  return (
    <AdminAuthContext.Provider value={{
      adminUser,
      login,
      logout,
      loading,
      setupTwoFactor,
      verifyTwoFactor,
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};