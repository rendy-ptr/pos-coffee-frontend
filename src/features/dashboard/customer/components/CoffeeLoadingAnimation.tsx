import { useState, useEffect } from 'react';

const CoffeeLoadingAnimation = () => {
  const [loadingText, setLoadingText] = useState('Brewing your data');
  const [dots, setDots] = useState('');

  useEffect(() => {
    const textInterval = setInterval(() => {
      const texts = [
        'Brewing your data',
        'Grinding fresh results',
        'Steaming information',
        'Pouring insights',
      ];
      setLoadingText(texts[Math.floor(Math.random() * texts.length)]);
    }, 2000);

    const dotsInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => {
      clearInterval(textInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="text-center">
        {/* Coffee Cup Animation */}
        <div className="relative mb-8">
          {/* Cup */}
          <div className="relative mx-auto h-32 w-24 rounded-b-3xl border-4 border-amber-800 bg-gradient-to-b from-amber-100 to-amber-200">
            {/* Coffee liquid with animated fill */}
            <div
              className="absolute right-1 bottom-1 left-1 animate-pulse rounded-b-3xl bg-gradient-to-t from-amber-900 to-amber-700"
              style={{
                height: '70%',
                animation: 'fillCoffee 3s ease-in-out infinite',
              }}
            ></div>

            {/* Handle */}
            <div className="absolute top-6 -right-6 h-12 w-6 rounded-r-full border-4 border-amber-800 bg-transparent"></div>
          </div>

          {/* Saucer */}
          <div className="mx-auto -mt-2 h-4 w-32 rounded-full border-2 border-amber-800 bg-gradient-to-b from-amber-200 to-amber-300"></div>

          {/* Steam Animation */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 transform">
            <div className="flex space-x-1">
              <div
                className="h-8 w-1 animate-bounce rounded-full bg-gradient-to-t from-gray-300 to-transparent"
                style={{ animationDelay: '0s', animationDuration: '1.5s' }}
              ></div>
              <div
                className="h-6 w-1 animate-bounce rounded-full bg-gradient-to-t from-gray-300 to-transparent"
                style={{ animationDelay: '0.3s', animationDuration: '1.5s' }}
              ></div>
              <div
                className="h-8 w-1 animate-bounce rounded-full bg-gradient-to-t from-gray-300 to-transparent"
                style={{ animationDelay: '0.6s', animationDuration: '1.5s' }}
              ></div>
            </div>
          </div>

          {/* Coffee Beans Animation */}
          <div className="absolute top-1/2 -left-12 -translate-y-1/2 transform">
            <div
              className="h-5 w-3 animate-spin rounded-full bg-gradient-to-br from-amber-800 to-amber-900"
              style={{ animationDuration: '2s' }}
            >
              <div className="mx-auto h-5 w-0.5 rounded-full bg-amber-700"></div>
            </div>
          </div>

          <div className="absolute top-1/3 -right-12 -translate-y-1/2 transform">
            <div
              className="h-5 w-3 animate-spin rounded-full bg-gradient-to-br from-amber-800 to-amber-900"
              style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}
            >
              <div className="mx-auto h-5 w-0.5 rounded-full bg-amber-700"></div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-bold text-amber-900">
            {loadingText}
            {dots}
          </h2>
        </div>

        {/* Progress Bar */}
        <div className="mx-auto mb-4 h-2 w-64 overflow-hidden rounded-full bg-amber-200">
          <div
            className="h-full animate-pulse rounded-full bg-gradient-to-r from-amber-600 to-amber-800"
            style={{
              width: '70%',
              animation: 'progressFill 2s ease-in-out infinite alternate',
            }}
          ></div>
        </div>

        {/* Coffee Drops */}
        <div className="flex justify-center space-x-2">
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-amber-800"
            style={{ animationDelay: '0s' }}
          ></div>
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-amber-700"
            style={{ animationDelay: '0.2s' }}
          ></div>
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-amber-800"
            style={{ animationDelay: '0.4s' }}
          ></div>
        </div>

        {/* Custom Keyframes */}
        <style>
          {`
            @keyframes fillCoffee {
              0% {
                height: 60%;
              }
              50% {
                height: 80%;
              }
              100% {
                height: 60%;
              }
            }

            @keyframes progressFill {
              0% {
                width: 30%;
              }
              100% {
                width: 90%;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default CoffeeLoadingAnimation;
