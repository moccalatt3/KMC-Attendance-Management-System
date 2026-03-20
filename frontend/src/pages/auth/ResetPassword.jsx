import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import authService from "../../services/authService";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [tokenEmail, setTokenEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Validate token on mount
    const validateToken = async () => {
      if (!token) {
        setValidating(false);
        setError("Token reset tidak ditemukan. Gunakan link dari email Anda.");
        return;
      }

      try {
        const result = await authService.validateResetToken(token);

        if (result.valid) {
          setTokenValid(true);
          setTokenEmail(result.email);
        } else {
          setError(
            result.message || "Token reset tidak valid atau sudah kadaluarsa",
          );
        }
      } catch (error) {
        setError("Gagal memvalidasi token. Silakan coba lagi.");
      } finally {
        setValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (password !== confirmPassword) {
      setError("Password tidak cocok");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    setLoading(true);

    try {
      const result = await authService.resetPassword(token, password);

      setSuccess(result.message || "Reset password berhasil!");

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login", {
          state: {
            message:
              "Reset password berhasil! Silakan login dengan password baru Anda.",
            type: "success",
          },
        });
      }, 3000);
    } catch (error) {
      setError(error.response?.data?.message || "Gagal mereset password");
    } finally {
      setLoading(false);
    }
  };

  if (validating) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1C4D8D] mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600">Memvalidasi token...</p>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
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

          <div className="bg-white rounded-2xl shadow-xs overflow-hidden">
            <div className="p-8">
              <div className="max-w-sm mx-auto w-full">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h1 className="text-xl font-bold text-gray-900 mb-2">
                    Link Tidak Valid
                  </h1>
                  <p className="text-sm text-gray-600 mb-4">
                    {error ||
                      "Link reset password ini tidak valid atau sudah kadaluarsa."}
                  </p>

                  <div className="p-4 bg-red-50 rounded-lg mb-4">
                    <p className="text-xs text-red-700">
                      Untuk keamanan, link reset password kadaluarsa setelah 1
                      jam.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Link
                      to="/forgot-password"
                      className="inline-block w-full py-2.5 px-4 bg-[#1C4D8D] text-white text-sm font-medium rounded-lg hover:bg-[#163a6f] transition-all duration-200"
                    >
                      Minta Link Baru
                    </Link>

                    <Link
                      to="/login"
                      className="inline-block w-full py-2.5 px-4 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Kembali ke Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Klinik Absensi HRIS. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo ditempatkan di luar card */}
        <div className="flex justify-center mb-6">
          <img
            src="/images/logo/Logo.jpg"
            alt="Klinik Absensi"
            className="h-20 w-auto"
          />
        </div>

        {/* Reset Password Card */}
        <div className="bg-white rounded-2xl shadow-xs overflow-hidden">
          <div className="p-8">
            <div className="max-w-sm mx-auto w-full">
              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-xl font-bold text-gray-900 mb-1">
                  Buat Password Baru
                </h1>
                <p className="text-sm text-gray-600">
                  Untuk: <span className="font-medium">{tokenEmail}</span>
                </p>
              </div>

              {/* Success Message */}
              {success && (
                <div className="mb-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-start">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <span className="text-sm font-medium text-green-700">
                        Berhasil!
                      </span>
                      <p className="text-sm text-green-600 mt-1">{success}</p>
                      <p className="text-xs text-green-600 mt-2">
                        Mengalihkan ke halaman login...
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && !success && (
                <div className="mb-4 p-3 bg-red-50 rounded-lg">
                  <div className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-red-700 flex-1">{error}</span>
                  </div>
                </div>
              )}

              {/* Form */}
              {!success && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Password Input */}
                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-xs font-medium text-gray-700"
                    >
                      Password Baru
                    </label>
                    <div className="relative">
                      <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                        </svg>
                      </div>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#1C4D8D] focus:border-[#1C4D8D] transition-all duration-200"
                        placeholder="Masukkan password baru"
                        required
                        disabled={loading}
                      />
                    </div>
                    <p className="text-xs text-gray-500">Minimal 6 karakter</p>
                  </div>

                  {/* Confirm Password Input */}
                  <div className="space-y-1">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-xs font-medium text-gray-700"
                    >
                      Konfirmasi Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </div>
                      <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#1C4D8D] focus:border-[#1C4D8D] transition-all duration-200"
                        placeholder="Konfirmasi password baru"
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
                        <svg
                          className="animate-spin h-4 w-4 mr-2 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Memproses...</span>
                      </span>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </form>
              )}

              {/* Back to Login Link */}
              <div className="text-center mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-600">
                  Kembali ke{" "}
                  <Link
                    to="/login"
                    className="font-medium text-[#1C4D8D] hover:text-[#163a6f] transition-colors"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Klinik Absensi HRIS. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
