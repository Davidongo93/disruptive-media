import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      setAvatar('/avatar.svg');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Si el scroll es mayor que 50px, aplicar blur
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        email,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      setToken(token);
      setAvatar('/avatar.svg');

      setIsModalOpen(false);
    } catch (error) {
      setError('Invalid username or email');
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setAvatar(null);
  };

  return (
    <div>
      {/* Botón o avatar que cambia en función del token */}
      {!token ? (
        <button
          className={`fixed bottom-5 right-5 ${isScrolled ? 'bg-blue-900 bg-opacity-50 backdrop-blur-md' : 'bg-blue-900'} text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-opacity duration-300`}
          onClick={() => setIsModalOpen(true)}
        >
          {/* Icono de login */}
          <span className="text-2xl font-bold">+</span>
        </button>
      ) : (
        <div
          className={`fixed bottom-5 right-5 ${isScrolled ? 'bg-opacity-50 backdrop-blur-md' : ''} rounded-full shadow-lg transition-opacity duration-300`}
          onClick={() => setIsModalOpen(true)} // Al hacer clic en el avatar, se abre el modal de perfil
        >
          <Image
            className="w-16 h-16 rounded-full"
            src={avatar || ''}
            width={64}
            height={64}
            alt="user avatar"
          />
        </div>
      )}

      {/* Modal de login o perfil */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
            {token ? (
              // Modal de perfil cuando el usuario está logueado
              <div>
                <h2 className="text-xl font-semibold text-center mb-4">Perfil</h2>
                <div className="text-center mb-4">
                  <Image
                    className="w-16 h-16 rounded-full mx-auto"
                    src={avatar || ''}
                    width={64}
                    height={64}
                    alt="user avatar"
                  />
                  <p className="text-gray-700 mt-2">{username}</p>
                  <p className="text-gray-700">{email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  Logout
                </button>
              </div>
            ) : (
              // Modal de login si el usuario no está logueado
              <div>
                <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
                <form onSubmit={handleLogin} className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  {error && <p className="text-red-500 text-xs italic">{error}</p>}
                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      disabled={loading}
                    >
                      {loading ? 'Logging in...' : 'Login'}
                    </button>
                  </div>
                </form>
              </div>
            )}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
