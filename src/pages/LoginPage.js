import { useState } from 'react';
import './LoginPage.css';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

// Minimal Logo Component
const MinimalLogo = () => (
  <img src="/mimlablogo1.png" alt="Mimlab Logo" className="login-logo-icon" />
);
// const MinimalLogo = () => (
//   <svg
//     className="login-logo-icon"
//     fill="currentColor"
//     viewBox="0 0 20 20"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       fillRule="evenodd"
//       d="M10 3a1 1 0 00-1 1v1.668A7.002 7.002 0 003.999 10a1 1 0 100 2c1.05 0 2.04-.301 2.865-.826A5.002 5.002 0 0110 17a5 5 0 01-2.865-8.826A7.002 7.002 0 0011 5.668V4a1 1 0 00-1-1zm0 11.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
//       clipRule="evenodd"
//     />
//     <path d="M10 6.5A3.502 3.502 0 006.5 10H4.832a5.502 5.502 0 018.336-4.061A3.5 3.5 0 0010 6.5z" />
//   </svg>
// );

// Sparkle Icon Component
// const SparkleIcon = () => (
//   <svg
//     className="login-sparkle-icon"
//     fill="currentColor"
//     viewBox="0 0 20 20"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path d="M10 2.5a.75.75 0 01.692.462l1.413 3.423 3.765.547a.75.75 0 01.416 1.28l-2.724 2.654.643 3.75a.75.75 0 01-1.088.79L10 13.617l-3.367 1.77a.75.75 0 01-1.088-.79l.643-3.75-2.724-2.654a.75.75 0 01.416-1.28l3.765-.547L9.308 2.962A.75.75 0 0110 2.5zM10 6.012L8.944 8.43l-2.68.39.94 2.282-.224 2.67L10 12.31l2.02.962-.224-2.67.94-2.282-2.68-.39L10 6.012z" />
//   </svg>
// );

const LoginPage = () => {
  // Setup
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // State for Gemini API feature
  // const [mapStory, setMapStory] = useState('');
  // const [isLoadingStory, setIsLoadingStory] = useState(false);
  // const [storyError, setStoryError] = useState('');

  // Fetch map story from Gemini API
  // const fetchMapStory = async () => {
  //   setIsLoadingStory(true);
  //   setStoryError('');
  //   setMapStory('');

  //   const prompt =
  //     '지도, 지리 또는 탐험과 관련된 짧고 흥미로운 이야기나 재미있는 사실을 들려주세요. 2-3문장 정도로 간결하게 작성해주세요. 웹 지도 플랫폼에 관심 있는 사람이 흥미를 느낄 만하게 만들어주세요. 한국어로 답변해주세요.';
  //   const apiKey = ''; // API key should be provided
  //   const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         contents: [{ role: 'user', parts: [{ text: prompt }] }],
  //       }),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.error('Gemini API error data:', errorData);
  //       throw new Error(
  //         `API 요청 실패: ${response.status} ${response.statusText}. ${
  //           errorData?.error?.message || ''
  //         }`
  //       );
  //     }

  //     const result = await response.json();

  //     if (
  //       result.candidates &&
  //       result.candidates.length > 0 &&
  //       result.candidates[0].content &&
  //       result.candidates[0].content.parts &&
  //       result.candidates[0].content.parts.length > 0
  //     ) {
  //       const text = result.candidates[0].content.parts[0].text;
  //       setMapStory(text);
  //     } else {
  //       console.error('Gemini API 응답 형식이 예상과 다릅니다:', result);
  //       setStoryError(
  //         '이야기를 가져오는 데 실패했습니다. 응답 형식을 확인해주세요.'
  //       );
  //     }
  //   } catch (err) {
  //     console.error('Gemini API 호출 중 오류 발생:', err);
  //     setStoryError(`이야기를 가져오는 중 오류 발생: ${err.message}`);
  //   } finally {
  //     setIsLoadingStory(false);
  //   }
  // };

  // Fetch initial story on component mount
  // useEffect(() => {
  //   fetchMapStory();
  // }, []);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      // Your existing login logic here
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        login(data.user); // data = { token, user: {id: user.id, username: user.username, role: user.role } }
        navigate('/');
      } else {
        setError(
          '로그인 정보가 잘못되었습니다. 아이디 또는 비밀번호를 확인해주세요.'
        );
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <div className="login-page">
      {/* Left Branding Panel */}
      <div className="login-branding-panel">
        <div className="login-logo-top">
          <MinimalLogo />
        </div>

        {/* <div className="login-main-title">CRAFTS</div>
        <div className="login-main-title">DATA</div> */}
        <p className="login-subtitle">
          정확한 데이터로 세상을 탐색하고 분석하세요.
        </p>

        {/* Gemini Map Story Section */}
        {/* <div className="login-story-section">
          <h3 className="login-story-title">✨ 오늘의 지도 이야기</h3>

          {isLoadingStory && (
            <p className="login-story-loading">이야기를 불러오는 중...</p>
          )}

          {storyError && <p className="login-story-error">{storyError}</p>}

          {mapStory && !isLoadingStory && !storyError && (
            <p className="login-story-content">{mapStory}</p>
          )}

          <button
            onClick={fetchMapStory}
            disabled={isLoadingStory}
            className="login-story-button"
          >
            <SparkleIcon />
            새로운 이야기 보기
          </button>
        </div> */}

        <div className="login-copyright">
          &copy; {new Date().getFullYear()} MIMLAB
        </div>
      </div>

      {/* Right Login Form Panel */}
      <div className="login-form-panel">
        <div className="login-form-container">
          {/* Mobile Logo */}
          <div className="login-mobile-logo">
            <div>
              <img
                src="/mimlablogo1.png"
                alt="Mimlab Logo"
                className="login-logo-icon-mobile"
              />
            </div>

            {/* <svg
              className="login-mobile-logo-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 00-1 1v1.668A7.002 7.002 0 003.999 10a1 1 0 100 2c1.05 0 2.04-.301 2.865-.826A5.002 5.002 0 0110 17a5 5 0 01-2.865-8.826A7.002 7.002 0 0011 5.668V4a1 1 0 00-1-1zm0 11.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
                clipRule="evenodd"
              />
              <path d="M10 6.5A3.502 3.502 0 006.5 10H4.832a5.502 5.502 0 018.336-4.061A3.5 3.5 0 0010 6.5z" />
            </svg> */}
            <h2 className="login-mobile-title">로그인</h2>
          </div>

          {/* Desktop Welcome */}
          <h2 className="login-welcome-title">환영합니다!</h2>
          <p className="login-welcome-subtitle">
            계정에 로그인하여 서비스를 이용하세요.
          </p>

          <form onSubmit={handleLogin} className="login-form">
            <div className="login-form-group">
              <label htmlFor="username" className="login-form-label">
                아이디
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-form-input"
                placeholder="사용자 아이디"
              />
            </div>

            <div className="login-form-group">
              <label htmlFor="password" className="login-form-label">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-form-input"
                placeholder="비밀번호"
              />
            </div>

            {error && (
              <div className="login-error" role="alert">
                <p>{error}</p>
              </div>
            )}

            <button type="submit" className="login-submit-button">
              로그인
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="login-back-button"
            >
              뒤로가기
            </button>
          </form>

          <p className="login-mobile-copyright">
            &copy; {new Date().getFullYear()} MIMLAB
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
