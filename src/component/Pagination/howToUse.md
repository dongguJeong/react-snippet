# Pagination

페이지네이션 UI 컴포넌트입니다. usePagination 훅과 함께 사용하거나 독립적으로 사용할 수 있습니다.

## 사용 방법

### 기본 사용법

```tsx
import { useState } from "react";
import { Pagination } from "./Pagination";

function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const products = []; // 상품 데이터
  const itemsPerPage = 12;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div>
      <div className="product-grid">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        totalItems={products.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
```

## 예시 1: API 페이지네이션

```tsx
import { useState } from "react";
import { Pagination } from "./Pagination";
import { AsyncBoundary } from "../AsyncBoundary/AsyncBoundary";

function ApiPaginatedList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  return (
    <div>
      <AsyncBoundary
        url={`https://api.example.com/posts?page=${currentPage}&limit=${itemsPerPage}`}
        method="GET"
      >
        {(data: { posts: any[]; total: number }) => (
          <>
            <div>
              {data.posts.map((post) => (
                <div key={post.id}>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                </div>
              ))}
            </div>

            <Pagination
              totalItems={data.total}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </AsyncBoundary>
    </div>
  );
}
```

## 예시 2: siblingCount 커스터마이징

```tsx
import { Pagination } from "./Pagination";

function CustomPagination() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      {/* siblingCount가 1일 때 (기본값): [1, ..., 4, 5, 6, ..., 10] */}
      <Pagination
        totalItems={100}
        itemsPerPage={10}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        siblingCount={1}
      />

      {/* siblingCount가 2일 때: [1, ..., 3, 4, 5, 6, 7, ..., 10] */}
      <Pagination
        totalItems={100}
        itemsPerPage={10}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        siblingCount={2}
      />
    </div>
  );
}
```

## 예시 3: 검색 결과와 함께

```tsx
import { useState, useEffect } from "react";
import { Pagination } from "./Pagination";
import { useDebounce } from "../../hook/useDebounce/useDebounce";

function SearchResults() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // 검색어가 변경되면 첫 페이지로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  const allItems = []; // 전체 아이템
  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="검색..."
      />

      <div>
        {currentItems.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>

      {filteredItems.length > itemsPerPage && (
        <Pagination
          totalItems={filteredItems.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
```

## 예시 4: 커스텀 스타일링

```tsx
import { Pagination } from "./Pagination";

function StyledPagination() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Pagination
      totalItems={100}
      itemsPerPage={10}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      className="my-custom-pagination"
    />
  );
}

// CSS
/*
.my-custom-pagination .pagination-button {
  border-radius: 50%;
  min-width: 40px;
  height: 40px;
}

.my-custom-pagination .pagination-button.active {
  background-color: #28a745;
  border-color: #28a745;
}
*/
```

## Props

- `totalItems`: `number` (필수) - 전체 아이템 개수
- `itemsPerPage`: `number` (필수) - 페이지당 아이템 개수
- `currentPage`: `number` (필수) - 현재 페이지 번호
- `onPageChange`: `(page: number) => void` (필수) - 페이지 변경 핸들러
- `siblingCount`: `number` (선택사항, 기본값: 1) - 현재 페이지 양옆에 보여줄 페이지 수
- `className`: `string` (선택사항) - 추가 CSS 클래스

## 스타일 클래스

- `.pagination` - 전체 컨테이너
- `.pagination-button` - 페이지 버튼
- `.pagination-button.active` - 현재 페이지 버튼
- `.pagination-dots` - ... (dots)

## 다크모드 지원

컴포넌트는 `.dark` 클래스를 감지하여 자동으로 다크모드 스타일을 적용합니다.

## 접근성

- `aria-label`: 이전/다음 버튼에 레이블 제공
- `aria-current`: 현재 페이지 표시
- `disabled` 속성: 이동 불가능한 버튼 비활성화

## 장점

- 자동 페이지 번호 계산
- ... (dots) 자동 처리
- 다크모드 지원
- 접근성 고려
- 커스터마이징 가능
