import { useState, useEffect, type ReactNode } from "react";

interface SliderProps {
  children: ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showIndicators?: boolean;
  infinite?: boolean;
  className?: string;
}

export function Slider({
  children,
  autoPlay = false,
  autoPlayInterval = 3000,
  showArrows = true,
  showIndicators = true,
  infinite = true,
  className = "",
}: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalSlides = children.length;

  useEffect(() => {
    if (!autoPlay || totalSlides <= 1) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, currentIndex, totalSlides]);

  const goToPrevious = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    if (currentIndex === 0) {
      if (infinite) {
        setCurrentIndex(totalSlides - 1);
      }
    } else {
      setCurrentIndex(currentIndex - 1);
    }

    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    if (currentIndex === totalSlides - 1) {
      if (infinite) {
        setCurrentIndex(0);
      }
    } else {
      setCurrentIndex(currentIndex + 1);
    }

    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;

    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  if (totalSlides === 0) {
    return null;
  }

  return (
    <div className={`slider ${className}`}>
      <div className="slider-container">
        <div
          className="slider-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {children.map((child, index) => (
            <div key={index} className="slider-slide">
              {child}
            </div>
          ))}
        </div>

        {showArrows && totalSlides > 1 && (
          <>
            <button
              className="slider-arrow left"
              onClick={goToPrevious}
              disabled={!infinite && currentIndex === 0}
              aria-label="이전 슬라이드"
            >
              ‹
            </button>
            <button
              className="slider-arrow right"
              onClick={goToNext}
              disabled={!infinite && currentIndex === totalSlides - 1}
              aria-label="다음 슬라이드"
            >
              ›
            </button>
          </>
        )}
      </div>

      {showIndicators && totalSlides > 1 && (
        <div className="slider-indicators">
          {children.map((_, index) => (
            <button
              key={index}
              className={`slider-indicator ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      )}

      <style>{`
        .slider {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .slider-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 8px;
        }

        .slider-track {
          display: flex;
          transition: transform 0.3s ease-in-out;
        }

        .slider-slide {
          min-width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slider-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: bold;
          color: #333;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 10;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .slider-arrow:hover:not(:disabled) {
          background-color: rgba(255, 255, 255, 1);
          transform: translateY(-50%) scale(1.1);
        }

        .slider-arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .slider-arrow.left {
          left: 16px;
        }

        .slider-arrow.right {
          right: 16px;
        }

        .slider-indicators {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
        }

        .slider-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: none;
          background-color: #ddd;
          cursor: pointer;
          transition: all 0.2s;
          padding: 0;
        }

        .slider-indicator:hover {
          background-color: #999;
        }

        .slider-indicator.active {
          background-color: #007bff;
          width: 24px;
          border-radius: 5px;
        }

        /* Dark mode */
        .dark .slider-arrow {
          background-color: rgba(42, 42, 42, 0.9);
          color: #fff;
        }

        .dark .slider-arrow:hover:not(:disabled) {
          background-color: rgba(42, 42, 42, 1);
        }

        .dark .slider-indicator {
          background-color: #555;
        }

        .dark .slider-indicator:hover {
          background-color: #777;
        }

        .dark .slider-indicator.active {
          background-color: #4a9eff;
        }
      `}</style>
    </div>
  );
}

interface SlideProps {
  children: ReactNode;
  className?: string;
}

export function Slide({ children, className = "" }: SlideProps) {
  return (
    <div className={`slide ${className}`}>
      {children}

      <style>{`
        .slide {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
