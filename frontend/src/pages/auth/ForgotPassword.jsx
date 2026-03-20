import { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/authService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const result = await authService.forgotPassword(email);
      
      setSuccess(result.message || "Email reset password telah dikirim");
      setEmailSent(true);
      
      // Clear form
      setEmail("");
      
    } catch (error) {
      setError(error.response?.data?.message || "Gagal mengirim email reset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo ditempatkan di luar card */}
        <div className="flex justify-center mb-6">
          <img 
            src="/images/logo/hris-auth.png" 
            alt="Klinik Absensi" 
            className="h-17 w-auto"
          />
        </div>

        {/* Forgot Password Card */}
        <div className="bg-white rounded-2xl shadow-xs overflow-hidden">
          <div className="p-8">
            <div className="max-w-sm mx-auto w-full">
              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-xl font-bold text-gray-900 mb-1">
                  Reset Password
                </h1>
                <p className="text-sm text-gray-600">
                  Masukkan email Anda untuk menerima link reset password
                </p>
              </div>

              {/* Success Message */}
              {success && (
                <div className="mb-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="text-sm font-medium text-green-700">Email Terkirim!</span>
                      <p className="text-sm text-green-600 mt-1">{success}</p>
                      <p className="text-xs text-green-600 mt-2">
                        Cek kotak masuk email Anda. Link akan kadaluarsa dalam 1 jam.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-red-700 flex-1">{error}</span>
                  </div>
                </div>
              )}

              {/* Form - Only show if email hasn't been sent */}
              {!emailSent ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Input */}
                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-xs font-medium text-gray-700">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#1C4D8D] focus:border-[#1C4D8D] transition-all duration-200"
                        placeholder="Masukkan email Anda"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-[#1C4D8D] text-white text-sm font-medium rounded-lg hover:bg-[#163a6f] transition-all duration-200 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Mengirim...</span>
                      </span>
                    ) : (
                      "Kirim Link Reset"
                    )}
                  </button>
                </form>
              ) : null}

              {/* Back to Login Link */}
              <div className="text-center mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-600">
                  Ingat password Anda?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-[#1C4D8D] hover:text-[#163a6f] transition-colors"
                  >
                    Kembali ke Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Klinik Absensi HRIS. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}