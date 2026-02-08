# Slider

이미지 슬라이더/캐러셀 컴포넌트입니다. 자동 재생, 무한 루프, 인디케이터 등을 지원합니다.

## 사용 방법

### 기본 사용법

```tsx
import { Slider, Slide } from "./Slider";

function App() {
  return (
    <Slider>
      <Slide>
        <img src="https://via.placeholder.com/800x400/FF6B6B" alt="Slide 1" />
      </Slide>
      <Slide>
        <img src="https://via.placeholder.com/800x400/4ECDC4" alt="Slide 2" />
      </Slide>
      <Slide>
        <img src="https://via.placeholder.com/800x400/45B7D1" alt="Slide 3" />
      </Slide>
    </Slider>
  );
}
```

## 예시 1: 자동 재생

```tsx
import { Slider, Slide } from "./Slider";

function AutoPlaySlider() {
  return (
    <Slider autoPlay autoPlayInterval={3000}>
      <Slide>
        <img src="https://via.placeholder.com/800x400/FF6B6B" alt="Slide 1" />
      </Slide>
      <Slide>
        <img src="https://via.placeholder.com/800x400/4ECDC4" alt="Slide 2" />
      </Slide>
      <Slide>
        <img src="https://via.placeholder.com/800x400/45B7D1" alt="Slide 3" />
      </Slide>
    </Slider>
  );
}
```

## 예시 2: 인디케이터 없이

```tsx
import { Slider, Slide } from "./Slider";

function NoIndicatorsSlider() {
  return (
    <Slider showIndicators={false}>
      <Slide>
        <img src="image1.jpg" alt="Slide 1" />
      </Slide>
      <Slide>
        <img src="image2.jpg" alt="Slide 2" />
      </Slide>
    </Slider>
  );
}
```

## 예시 3: 화살표 없이

```tsx
import { Slider, Slide } from "./Slider";

function NoArrowsSlider() {
  return (
    <Slider showArrows={false}>
      <Slide>
        <img src="image1.jpg" alt="Slide 1" />
      </Slide>
      <Slide>
        <img src="image2.jpg" alt="Slide 2" />
      </Slide>
    </Slider>
  );
}
```

## 예시 4: 무한 루프 비활성화

```tsx
import { Slider, Slide } from "./Slider";

function NoInfiniteSlider() {
  return (
    <Slider infinite={false}>
      <Slide>
        <img src="image1.jpg" alt="Slide 1" />
      </Slide>
      <Slide>
        <img src="image2.jpg" alt="Slide 2" />
      </Slide>
      <Slide>
        <img src="image3.jpg" alt="Slide 3" />
      </Slide>
    </Slider>
  );
}
```

## 예시 5: 배너 슬라이더

```tsx
import { Slider, Slide } from "./Slider";

function BannerSlider() {
  const banners = [
    {
      id: 1,
      image: "https://via.placeholder.com/1200x400/FF6B6B",
      title: "여름 세일",
      subtitle: "최대 50% 할인",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/1200x400/4ECDC4",
      title: "신상품 출시",
      subtitle: "지금 바로 확인하세요",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/1200x400/45B7D1",
      title: "무료 배송",
      subtitle: "5만원 이상 구매 시",
    },
  ];

  return (
    <Slider autoPlay autoPlayInterval={5000}>
      {banners.map((banner) => (
        <Slide key={banner.id}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "400px",
            }}
          >
            <img
              src={banner.image}
              alt={banner.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                color: "white",
              }}
            >
              <h2 style={{ fontSize: "48px", marginBottom: "16px" }}>
                {banner.title}
              </h2>
              <p style={{ fontSize: "24px" }}>{banner.subtitle}</p>
            </div>
          </div>
        </Slide>
      ))}
    </Slider>
  );
}
```

## 예시 6: 제품 슬라이더

```tsx
import { Slider, Slide } from "./Slider";

function ProductSlider() {
  const products = [
    { id: 1, name: "제품 1", price: "29,000원", image: "product1.jpg" },
    { id: 2, name: "제품 2", price: "39,000원", image: "product2.jpg" },
    { id: 3, name: "제품 3", price: "49,000원", image: "product3.jpg" },
  ];

  return (
    <Slider showIndicators={true} infinite={true}>
      {products.map((product) => (
        <Slide key={product.id}>
          <div
            style={{
              padding: "40px",
              textAlign: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "300px", height: "300px", objectFit: "cover" }}
            />
            <h3 style={{ marginTop: "16px" }}>{product.name}</h3>
            <p style={{ fontSize: "20px", fontWeight: "bold", color: "#007bff" }}>
              {product.price}
            </p>
          </div>
        </Slide>
      ))}
    </Slider>
  );
}
```

## 예시 7: 리뷰 슬라이더

```tsx
import { Slider, Slide } from "./Slider";

function ReviewSlider() {
  const reviews = [
    {
      id: 1,
      author: "홍길동",
      rating: 5,
      comment: "정말 좋은 제품입니다!",
    },
    {
      id: 2,
      author: "김철수",
      rating: 4,
      comment: "가격 대비 훌륭합니다.",
    },
    {
      id: 3,
      author: "이영희",
      rating: 5,
      comment: "강력 추천합니다!",
    },
  ];

  return (
    <Slider autoPlay autoPlayInterval={4000}>
      {reviews.map((review) => (
        <Slide key={review.id}>
          <div
            style={{
              padding: "60px",
              textAlign: "center",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <div style={{ fontSize: "24px", marginBottom: "16px" }}>
              {"⭐".repeat(review.rating)}
            </div>
            <p style={{ fontSize: "18px", fontStyle: "italic", marginBottom: "16px" }}>
              "{review.comment}"
            </p>
            <p style={{ fontWeight: "bold" }}>- {review.author}</p>
          </div>
        </Slide>
      ))}
    </Slider>
  );
}
```

## 예시 8: 이미지 갤러리

```tsx
import { Slider, Slide } from "./Slider";

function ImageGallery() {
  const images = [
    "https://via.placeholder.com/800x600/FF6B6B",
    "https://via.placeholder.com/800x600/4ECDC4",
    "https://via.placeholder.com/800x600/45B7D1",
    "https://via.placeholder.com/800x600/F38181",
    "https://via.placeholder.com/800x600/AA96DA",
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Slider>
        {images.map((image, index) => (
          <Slide key={index}>
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              style={{
                width: "100%",
                height: "600px",
                objectFit: "cover",
              }}
            />
          </Slide>
        ))}
      </Slider>
    </div>
  );
}
```

## 예시 9: 모바일 반응형

```tsx
import { Slider, Slide } from "./Slider";
import { useMediaQuery } from "../../hook/useMediaQuery/useMediaQuery";

function ResponsiveSlider() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Slider
      autoPlay={!isMobile}
      showArrows={!isMobile}
      autoPlayInterval={3000}
    >
      <Slide>
        <img
          src={isMobile ? "mobile-banner1.jpg" : "desktop-banner1.jpg"}
          alt="Banner 1"
        />
      </Slide>
      <Slide>
        <img
          src={isMobile ? "mobile-banner2.jpg" : "desktop-banner2.jpg"}
          alt="Banner 2"
        />
      </Slide>
    </Slider>
  );
}
```

## Slider Props

- `children`: `ReactNode[]` (필수) - Slide 컴포넌트 배열
- `autoPlay`: `boolean` (기본값: false) - 자동 재생
- `autoPlayInterval`: `number` (기본값: 3000) - 자동 재생 간격 (밀리초)
- `showArrows`: `boolean` (기본값: true) - 화살표 버튼 표시
- `showIndicators`: `boolean` (기본값: true) - 인디케이터 표시
- `infinite`: `boolean` (기본값: true) - 무한 루프
- `className`: `string` (선택사항) - 추가 CSS 클래스

## Slide Props

- `children`: `ReactNode` (필수) - 슬라이드 내용
- `className`: `string` (선택사항) - 추가 CSS 클래스

## 동작 방식

- 화살표 클릭 또는 자동 재생으로 슬라이드 전환
- `infinite={true}`: 마지막 슬라이드에서 다음 클릭 시 첫 슬라이드로
- `infinite={false}`: 마지막 슬라이드에서 화살표 비활성화
- 인디케이터 클릭으로 특정 슬라이드로 이동

## 애니메이션

- 부드러운 슬라이드 전환 (0.3초)
- transform translateX 사용

## 접근성

- `aria-label`: 화살표 버튼과 인디케이터에 레이블 제공
- 키보드 접근 가능

## 다크모드 지원

`.dark` 클래스를 감지하여 자동으로 다크모드 스타일을 적용합니다.

## 장점

- 자동 재생 지원
- 무한 루프 옵션
- 인디케이터 표시
- 부드러운 애니메이션
- 다크모드 지원
- 접근성 고려
- 반응형 디자인 지원
