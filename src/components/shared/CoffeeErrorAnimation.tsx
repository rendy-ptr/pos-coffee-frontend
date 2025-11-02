import { useState, useEffect } from 'react';

interface CoffeeErrorAnimationProps {
  messages?: string[];
  interval?: number;
  title?: string;
  onRetry?: () => void;
}

const CoffeeErrorAnimation = ({
  messages = ['Oops! Something went wrong'],
  interval = 2000,
  title = 'Error',
  onRetry,
}: CoffeeErrorAnimationProps) => {
  const [errorText, setErrorText] = useState(messages[0]);
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (messages.length > 1) {
      const textInterval = setInterval(() => {
        setErrorText(messages[Math.floor(Math.random() * messages.length)]);
      }, interval);

      return () => clearInterval(textInterval);
    }
  }, [messages, interval]);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f3e9]">
      <div className="text-center">
        {/* Tipped Over Coffee Cup Animation */}
        <div className="relative mb-8 h-40">
          {/* Spilled Coffee Puddle */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform">
            <div
              className="h-3 w-40 animate-pulse rounded-full bg-gradient-to-r from-red-900 via-red-800 to-red-900 opacity-60"
              style={{
                animation: 'spillPuddle 2s ease-in-out infinite',
              }}
            ></div>
          </div>

          {/* Tipped Cup */}
          <div
            className="relative mx-auto h-24 w-20 origin-bottom-right transform"
            style={{
              transform: 'rotate(45deg) translateY(20px)',
              animation: 'shake 0.5s ease-in-out infinite',
            }}
          >
            {/* Cup Body */}
            <div className="relative h-28 w-20 rounded-b-3xl border-4 border-red-800 bg-gradient-to-b from-red-100 to-red-200">
              {/* Crack in the cup */}
              <div className="absolute top-2 left-1/2 h-16 w-0.5 -translate-x-1/2 transform bg-red-900 opacity-70">
                <div className="absolute top-8 left-0 h-0.5 w-4 -translate-x-2 bg-red-900 opacity-70"></div>
              </div>

              {/* Remaining Coffee */}
              <div className="absolute right-1 bottom-1 left-1 h-8 rounded-b-3xl bg-gradient-to-t from-red-900 to-red-700 opacity-80"></div>

              {/* Handle */}
              <div className="absolute top-6 -right-6 h-12 w-6 rounded-r-full border-4 border-red-800 bg-transparent"></div>
            </div>
          </div>

          {/* Broken Saucer */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform">
            <div className="relative h-4 w-32">
              <div className="absolute left-0 h-4 w-14 rounded-l-full border-2 border-red-800 bg-gradient-to-b from-red-200 to-red-300"></div>
              <div className="absolute right-0 h-4 w-14 rounded-r-full border-2 border-red-800 bg-gradient-to-b from-red-200 to-red-300"></div>
              {/* Gap in middle to show break */}
              <div className="absolute top-0 left-14 h-4 w-4 border-l-2 border-red-800"></div>
            </div>
          </div>

          {/* Dripping Coffee Drops */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 transform">
            <div className="flex space-x-1">
              <div
                className="h-3 w-1 animate-bounce rounded-full bg-gradient-to-b from-red-800 to-transparent"
                style={{ animationDelay: '0s', animationDuration: '1s' }}
              ></div>
              <div
                className="h-4 w-1 animate-bounce rounded-full bg-gradient-to-b from-red-800 to-transparent"
                style={{ animationDelay: '0.2s', animationDuration: '1s' }}
              ></div>
              <div
                className="h-3 w-1 animate-bounce rounded-full bg-gradient-to-b from-red-800 to-transparent"
                style={{ animationDelay: '0.4s', animationDuration: '1s' }}
              ></div>
            </div>
          </div>

          {/* Sad Coffee Beans */}
          <div className="absolute top-1/3 -left-12 -translate-y-1/2 transform">
            <div
              className="h-5 w-3 rounded-full bg-gradient-to-br from-red-800 to-red-900 opacity-70"
              style={{ animation: 'float 2s ease-in-out infinite' }}
            >
              <div className="mx-auto h-5 w-0.5 rounded-full bg-red-700"></div>
            </div>
          </div>

          <div className="absolute top-1/2 -right-12 -translate-y-1/2 transform">
            <div
              className="h-5 w-3 rounded-full bg-gradient-to-br from-red-800 to-red-900 opacity-70"
              style={{
                animation: 'float 2s ease-in-out infinite',
                animationDelay: '0.5s',
              }}
            >
              <div className="mx-auto h-5 w-0.5 rounded-full bg-red-700"></div>
            </div>
          </div>
        </div>

        {/* Error Text */}
        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-bold text-red-900">
            {title}: {errorText}
            {dots}
          </h2>
        </div>

        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="ring-opacity-50 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 ring-4 ring-red-300">
            <svg
              className="h-10 w-10 text-red-600"
              fill="none"
              strokeWidth="3"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-amber-700 hover:to-amber-800 hover:shadow-xl active:scale-95"
          >
            Try Again
          </button>
        )}

        {/* Animated Coffee Drops (Error State) */}
        <div className="mt-6 flex justify-center space-x-2">
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-red-800"
            style={{ animationDelay: '0s' }}
          ></div>
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-red-700"
            style={{ animationDelay: '0.2s' }}
          ></div>
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-red-800"
            style={{ animationDelay: '0.4s' }}
          ></div>
        </div>

        {/* Custom Keyframes */}
        <style>
          {`
            @keyframes spillPuddle {
              0% {
                width: 140px;
                opacity: 0.4;
              }
              50% {
                width: 160px;
                opacity: 0.6;
              }
              100% {
                width: 140px;
                opacity: 0.4;
              }
            }

            @keyframes shake {
              0%, 100% {
                transform: rotate(45deg) translateY(20px) translateX(0);
              }
              25% {
                transform: rotate(45deg) translateY(20px) translateX(-2px);
              }
              75% {
                transform: rotate(45deg) translateY(20px) translateX(2px);
              }
            }

            @keyframes float {
              0%, 100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-10px);
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default CoffeeErrorAnimation;
