import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaGoogle, FaUser, FaEnvelope, FaLock, FaMobile, FaArrowRight, FaCheck } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const { login: contextLogin } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // OTP related states
  const [step, setStep] = useState(1); // 1: Form, 2: OTP Verification
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpResendTimer, setOtpResendTimer] = useState(0);
  const [verificationMethod, setVerificationMethod] = useState('mobile'); // 'mobile' or 'email'

  // Base API URL from .env
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(0, 1);
    if (isNaN(value) && value !== '') return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    if (pastedData.length <= 6) {
      const newOtp = [...otp];
      for (let i = 0; i < Math.min(pastedData.length, 6); i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      const lastIndex = Math.min(pastedData.length, 6) - 1;
      const nextInput = document.getElementById(`otp-${lastIndex}`);
      if (nextInput) nextInput.focus();
    }
  };

  // OTP resend timer
  useEffect(() => {
    let timer;
    if (otpResendTimer > 0) {
      timer = setInterval(() => {
        setOtpResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpResendTimer]);

  // Send OTP
  const sendOtp = async () => {
    if (verificationMethod === 'email' && !email) {
      setError('Please provide email address for verification');
      return;
    }
    if (verificationMethod === 'mobile' && !mobile) {
      setError('Please provide mobile number for verification');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: verificationMethod === 'email' ? email : '',
          mobile: verificationMethod === 'mobile' ? mobile : '',
          method: verificationMethod,
        }),
      });
      let data;
      try { data = await res.json(); } catch { data = {}; }
      if (!res.ok) { setError(data.message || 'Failed to send OTP'); setLoading(false); return; }

      setOtpSent(true);
      setStep(2);
      if (data.otp) alert(`Your OTP is ${data.otp}. Please enter it manually.`);
      setOtpResendTimer(30);
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally { setLoading(false); }
  };

  // Verify OTP
  const verifyOtp = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) { setOtpError('Please enter the complete 6-digit OTP'); return; }
    setLoading(true); setOtpError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mobile, otp: otpValue, method: verificationMethod }),
      });
      let data; try { data = await res.json(); } catch { data = {}; }
      if (!res.ok) { setOtpError(data.message || 'Invalid OTP'); setLoading(false); return; }
      registerUser();
    } catch (err) {
      setOtpError('Server error. Please try again later.'); setLoading(false);
    }
  };

  // Register user
  const registerUser = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, mobile, password, role: 'user' }),
      });
      let data; try { data = await res.json(); } catch { data = {}; }
      if (!res.ok) { setError(data.message || 'Registration failed'); setLoading(false); return; }

      if (data.token && data.user) {
        contextLogin(data.user, data.token);
        navigate('/');
      } else {
        alert('Registration successful! Please login.');
        navigate('/login');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally { setLoading(false); }
  };

  const handleSubmit = async (e) => { e.preventDefault(); step === 1 ? sendOtp() : verifyOtp(); };
  const handleGoogleLogin = () => { alert('Google login functionality will be implemented soon!'); };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-xl">
      {/* ...rest of the JSX stays exactly same... */}
    </div>
  );
};

export default Register;
