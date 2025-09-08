import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (type = 'user') => {
    const demoAccounts = {
      user: { email: 'demo@example.com', password: 'password123' },
      premium: { email: 'premium@example.com', password: 'premium123' }
    };
    setFormData(demoAccounts[type]);
    setRememberMe(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="w-full max-w-md">
        <div className="rounded-2xl shadow-xl p-8" style={{ backgroundColor: 'var(--bg-color)' }}>
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--primary-color)' }}>
              <span className="text-2xl text-white">💰</span>
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-color)' }}>Planifieo</h1>
            <p style={{ color: 'var(--secondary-color)' }}>Sign in to your expense tracker account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 border rounded-lg" style={{ borderColor: 'var(--error-color)' }}>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-600 text-sm">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-color)' }}>Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors"
                style={{ borderColor: 'var(--secondary-color)', color: 'var(--text-color)' }}
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-color)' }}>Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors pr-12"
                  style={{ borderColor: 'var(--secondary-color)', color: 'var(--text-color)' }}
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"ù
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  disabled={loading}
                  style={{ color: 'var(--secondary-color)' }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded focus:ring-2"
                  style={{ accentColor: 'var(--primary-color)' }}
                  disabled={loading}
                />
                <span className="ml-2 text-sm" style={{ color: 'var(--text-color)' }}>Remember me</span>
              </label>

              <Link to="/forgot-password" className="text-sm" style={{ color: 'var(--primary-color)' }}>
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}
              className="w-full py-3 px-4 rounded-lg font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: 'var(--secondary-color)' }}></div>
            </div>
            <div className="relative flex justify-center text-sm" style={{ color: 'var(--text-color)' }}>
              <span className="px-2" style={{ backgroundColor: 'var(--bg-color)' }}>Demo accounts</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={() => handleDemoLogin('user')}
              disabled={loading}
              className="flex items-center justify-center px-4 py-2 border rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              style={{ borderColor: 'var(--secondary-color)', color: 'var(--text-color)' }}
            >
              Demo User
            </button>
            <button
              onClick={() => handleDemoLogin('premium')}
              disabled={loading}
              className="flex items-center justify-center px-4 py-2 border rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              style={{ borderColor: 'var(--secondary-color)', color: 'var(--text-color)' }}
            >
              Demo Premium
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className='text-xs' style={{ color: 'var(--text-color)' }}>
              Don't have an account?{' '}
              <Link to="/signup" style={{ color: 'var(--primary-color)', fontWeight: '500' }}>
                Signup
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p style={{ color: 'var(--secondary-color)', fontSize: '500' }}>
            © 2025 Planifieo. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
