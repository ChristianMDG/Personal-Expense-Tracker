import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const { signup } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const calculatePasswordStrength = (password) => {
            let strength = 0;
            if (password.length >= 8) strength += 1;
            if (/[A-Z]/.test(password)) strength += 1;
            if (/[0-9]/.test(password)) strength += 1;
            if (/[^A-Za-z0-9]/.test(password)) strength += 1;
            return strength;
        };
        setPasswordStrength(calculatePasswordStrength(formData.password));
    }, [formData.password]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setLoading(true);
        try {
            const result = await signup(formData.email, formData.password);
            if (result.success) navigate('/dashboard');
            else setError(result.error);
        } catch {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const getPasswordStrengthColor = (strength) => {
        if (strength === 0) return 'var(--secondary-color)';
        if (strength === 1) return 'var(--error-color)';
        if (strength === 2) return 'var(--accent-color)';
        return 'var(--primary-color)';
    };

    const getPasswordStrengthText = (strength) => {
        if (strength === 0) return 'Very weak';
        if (strength === 1) return 'Weak';
        if (strength === 2) return 'Medium';
        if (strength === 3) return 'Strong';
        return 'Very strong';
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
                        <p style={{ color: 'var(--secondary-color)' }}>Join thousands managing their expenses smarter</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 border rounded-lg" style={{ borderColor: 'var(--error-color)' }}>
                            <div className="flex items-center">
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
                                required
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
                                    placeholder="Create a password"
                                    disabled={loading}
                                    required
                                    minLength="8"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    style={{ color: 'var(--secondary-color)' }}
                                    disabled={loading}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>

                            {formData.password && (
                                <div className="mt-3">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs" style={{ color: 'var(--text-color)' }}>Password strength:</span>
                                        <span className="text-xs font-medium" style={{ color: getPasswordStrengthColor(passwordStrength) }}>
                                            {getPasswordStrengthText(passwordStrength)}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${(passwordStrength / 4) * 100}%`, backgroundColor: getPasswordStrengthColor(passwordStrength) }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-color)' }}>Confirm Password</label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors pr-12"
                                    style={{ borderColor: 'var(--secondary-color)', color: 'var(--text-color)' }}
                                    placeholder="Confirm your password"
                                    disabled={loading}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    style={{ color: 'var(--secondary-color)' }}
                                    disabled={loading}
                                >
                                    {showConfirmPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}
                            className="w-full py-3 px-4 rounded-lg font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-xs" style={{ color: 'var(--text-color)' }}>
                            Already have an account?{' '}
                            <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: '500' }}>Sign in</Link>
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm" style={{ color: 'var(--secondary-color)' }}>
                        © 2024 Expense Tracker. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;


