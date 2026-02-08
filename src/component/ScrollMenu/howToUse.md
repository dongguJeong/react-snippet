# ScrollMenu

수평 스크롤 메뉴 컴포넌트입니다. 화살표 버튼으로 스크롤할 수 있으며, 자동으로 스크롤 가능 여부를 감지합니다.

## 사용 방법

### 기본 사용법

```tsx
import { ScrollMenu, ScrollMenuItem } from "./ScrollMenu";

function App() {
  const categories = ["전체", "음식", "패션", "전자기기", "가구", "스포츠"];

  return (
    <ScrollMenu>
      {categories.map((category) => (
        <ScrollMenuItem key={category}>
          {category}
        </ScrollMenuItem>
      ))}
    </ScrollMenu>
  );
}
```

## 예시 1: 활성 아이템

```tsx
import { useState } from "react";
import { ScrollMenu, ScrollMenuItem } from "./ScrollMenu";

function CategoryMenu() {
  const [active, setActive] = useState("all");

  const categories = [
    { id: "all", label: "전체" },
    { id: "food", label: "음식" },
    { id: "fashion", label: "패션" },
    { id: "electronics", label: "전자기기" },
    { id: "furniture", label: "가구" },
    { id: "sports", label: "스포츠" },
    { id: "books", label: "도서" },
    { id: "beauty", label: "뷰티" },
  ];

  return (
    <ScrollMenu>
      {categories.map((category) => (
        <ScrollMenuItem
          key={category.id}
          active={active === category.id}
          onClick={() => setActive(category.id)}
        >
          {category.label}
        </ScrollMenuItem>
      ))}
    </ScrollMenu>
  );
}
```

## 예시 2: 화살표 크기 조절

```tsx
import { ScrollMenu, ScrollMenuItem } from "./ScrollMenu";

function ScrollMenuSizes() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <div>
        <h3>Small 화살표</h3>
        <ScrollMenu arrowSize="small">
          {items.map((item) => (
            <ScrollMenuItem key={item}>{item}</ScrollMenuItem>
          ))}
        </ScrollMenu>
      </div>

      <div>
        <h3>Medium 화살표 (기본)</h3>
        <ScrollMenu arrowSize="medium">
          {items.map((item) => (
            <ScrollMenuItem key={item}>{item}</ScrollMenuItem>
          ))}
        </ScrollMenu>
      </div>

      <div>
        <h3>Large 화살표</h3>
        <ScrollMenu arrowSize="large">
          {items.map((item) => (
            <ScrollMenuItem key={item}>{item}</ScrollMenuItem>
          ))}
        </ScrollMenu>
      </div>
    </div>
  );
}
```

## 예시 3: 화살표 숨기기

```tsx
import { ScrollMenu, ScrollMenuItem } from "./ScrollMenu";

function NoArrowsMenu() {
  return (
    <ScrollMenu showArrows={false}>
      {items.map((item) => (
        <ScrollMenuItem key={item}>{item}</ScrollMenuItem>
      ))}
    </ScrollMenu>
  );
}
```

## 예시 4: 제품 카테고리

```tsx
import { useState } from "react";
import { ScrollMenu, ScrollMenuItem } from "./ScrollMenu";

interface Product {
  id: number;
  name: string;
  category: string;
}

function ProductCategoryMenu() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products] = useState<Product[]>([
    { id: 1, name: "제품 1", category: "electronics" },
    { id: 2, name: "제품 2", category: "fashion" },
    // ...
  ]);

  const categories = ["all", "electronics", "fashion", "food", "sports"];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div>
      <ScrollMenu>
        {categories.map((category) => (
          <ScrollMenuItem
            key={category}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </ScrollMenuItem>
        ))}
      </ScrollMenu>

      <div style={{ marginTop: "20px" }}>
        {filteredProducts.map((product) => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
    </div>
  );
}
```

## 예시 5: 이미지 썸네일

```tsx
import { ScrollMenu } from "./ScrollMenu";

function ImageThumbnails() {
  const images = [
    "https://via.placeholder.com/120x80/FF6B6B",
    "https://via.placeholder.com/120x80/4ECDC4",
    "https://via.placeholder.com/120x80/45B7D1",
    "https://via.placeholder.com/120x80/F38181",
    "https://via.placeholder.com/120x80/AA96DA",
  ];

  return (
    <ScrollMenu>
      {images.map((image, index) => (
        <div
          key={index}
          style={{
            flexShrink: 0,
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <img src={image} alt={`Thumbnail ${index + 1}`} />
        </div>
      ))}
    </ScrollMenu>
  );
}
```

## 예시 6: 뉴스 카테고리

```tsx
import { useState } from "react";
import { ScrollMenu, ScrollMenuItem } from "./ScrollMenu";

function NewsCategoryMenu() {
  const [category, setCategory] = useState("latest");

  const categories = [
    { id: "latest", label: "최신", icon: "🆕" },
    { id: "politics", label: "정치", icon: "🏛️" },
    { id: "economy", label: "경제", icon: "💰" },
    { id: "society", label: "사회", icon: "👥" },
    { id: "culture", label: "문화", icon: "🎭" },
    { id: "sports", label: "스포츠", icon: "⚽" },
    { id: "tech", label: "기술", icon: "💻" },
    { id: "world", label: "세계", icon: "🌍" },
  ];

  return (
    <ScrollMenu>
      {categories.map((cat) => (
        <ScrollMenuItem
          key={cat.id}
          active={category === cat.id}
          onClick={() => setCategory(cat.id)}
        >
          <span style={{ marginRight: "8px" }}>{cat.icon}</span>
          {cat.label}
        </ScrollMenuItem>
      ))}
    </ScrollMenu>
  );
}
```

## 예시 7: 커스텀 아이템

```tsx
import { ScrollMenu } from "./ScrollMenu";

function CustomItems() {
  const items = [
    { id: 1, title: "아이템 1", count: 12 },
    { id: 2, title: "아이템 2", count: 8 },
    { id: 3, title: "아이템 3", count: 24 },
  ];

  return (
    <ScrollMenu>
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            flexShrink: 0,
            padding: "12px 20px",
            borderRadius: "8px",
            backgroundColor: "#f5f5f5",
            cursor: "pointer",
            minWidth: "150px",
          }}
        >
          <div style={{ fontWeight: "bold" }}>{item.title}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            {item.count}개 항목
          </div>
        </div>
      ))}
    </ScrollMenu>
  );
}
```

## 예시 8: Tabs와 함께 사용

```tsx
import { useState } from "react";
import { ScrollMenu, ScrollMenuItem } from "./ScrollMenu";

function TabsWithScrollMenu() {
  const [activeTab, setActiveTab] = useState("tab1");

  const tabs = Array.from({ length: 20 }, (_, i) => ({
    id: `tab${i + 1}`,
    label: `탭 ${i + 1}`,
  }));

  return (
    <div>
      <ScrollMenu>
        {tabs.map((tab) => (
          <ScrollMenuItem
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </ScrollMenuItem>
        ))}
      </ScrollMenu>

      <div style={{ marginTop: "20px", padding: "20px" }}>
        <h3>{tabs.find((t) => t.id === activeTab)?.label} 내용</h3>
      </div>
    </div>
  );
}
```

## ScrollMenu Props

- `children`: `ReactNode` (필수) - 스크롤 메뉴 아이템들
- `showArrows`: `boolean` (기본값: true) - 화살표 버튼 표시 여부
- `arrowSize`: `"small" | "medium" | "large"` (기본값: "medium") - 화살표 크기
- `className`: `string` (선택사항) - 추가 CSS 클래스

## ScrollMenuItem Props

- `children`: `ReactNode` (필수) - 아이템 내용
- `onClick`: `() => void` (선택사항) - 클릭 핸들러
- `active`: `boolean` (기본값: false) - 활성 상태
- `className`: `string` (선택사항) - 추가 CSS 클래스

## 동작 방식

- 스크롤이 가능한지 자동으로 감지
- 스크롤이 불가능하면 화살표 숨김
- 왼쪽 끝에서는 왼쪽 화살표 숨김
- 오른쪽 끝에서는 오른쪽 화살표 숨김
- 화살표 클릭 시 80% 너비만큼 스크롤

## 다크모드 지원

`.dark` 클래스를 감지하여 자동으로 다크모드 스타일을 적용합니다.

## 장점

- 자동 스크롤 감지
- 부드러운 스크롤 애니메이션
- 다양한 화살표 크기
- 활성 상태 지원
- 다크모드 지원
- 커스터마이징 가능
