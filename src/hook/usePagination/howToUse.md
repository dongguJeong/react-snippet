# usePagination

페이지네이션을 구현하는 훅입니다. 페이지 번호 배열, 이전/다음 버튼 상태 등을 자동으로 계산합니다.

## 사용 방법

### 기본 사용법

```tsx
import { useState } from "react";
import { usePagination } from "./usePagination";

interface Item {
  id: number;
  name: string;
}

function PaginatedList() {
  const [currentPage, setCurrentPage] = useState(1);
  const items: Item[] = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `아이템 ${i + 1}`,
  }));

  const {
    pages,
    canGoNext,
    canGoPrev,
    nextPage,
    prevPage,
    startIndex,
    endIndex,
    totalPages,
  } = usePagination({
    totalItems: items.length,
    itemsPerPage: 10,
    initialPage: currentPage,
  });

  const currentItems = items.slice(startIndex, endIndex);

  return (
    <div>
      <div>
        {currentItems.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>

      <div>
        <button onClick={prevPage} disabled={!canGoPrev}>
          이전
        </button>

        {pages.map((page, index) => {
          if (page === "...") {
            return <span key={`dots-${index}`}>...</span>;
          }
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(Number(page))}
              disabled={currentPage === page}
            >
              {page}
            </button>
          );
        })}

        <button onClick={nextPage} disabled={!canGoNext}>
          다음
        </button>
      </div>

      <p>
        {currentPage} / {totalPages} 페이지
      </p>
    </div>
  );
}
```

## 예시 1: Pagination 컴포넌트와 함께 사용

```tsx
import { useState } from "react";
import { usePagination } from "./usePagination";
import { Pagination } from "../../component/Pagination/Pagination";

interface User {
  id: number;
  name: string;
  email: string;
}

function UserList() {
  const [currentPage, setCurrentPage] = useState(1);
  const users: User[] = []; // 사용자 데이터

  const { startIndex, endIndex } = usePagination({
    totalItems: users.length,
    itemsPerPage: 20,
    initialPage: currentPage,
  });

  const currentUsers = users.slice(startIndex, endIndex);

  return (
    <div>
      <div>
        {currentUsers.map((user) => (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>

      <Pagination
        totalItems={users.length}
        itemsPerPage={20}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
```

## 예시 2: API 페이지네이션

```tsx
import { useState, useEffect } from "react";
import { usePagination } from "./usePagination";
import { AsyncBoundary } from "../../component/AsyncBoundary/AsyncBoundary";

function ApiPaginatedList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  const { pages, canGoNext, canGoPrev } = usePagination({
    totalItems,
    itemsPerPage,
    initialPage: currentPage,
  });

  return (
    <div>
      <AsyncBoundary
        url={`https://api.example.com/items?page=${currentPage}&limit=${itemsPerPage}`}
        method="GET"
      >
        {(data: any) => {
          // 첫 로드 시 총 개수 설정
          if (totalItems === 0) {
            setTotalItems(data.total);
          }

          return (
            <div>
              {data.items.map((item: any) => (
                <div key={item.id}>{item.name}</div>
              ))}
            </div>
          );
        }}
      </AsyncBoundary>

      <div>
        <button onClick={() => setCurrentPage((p) => p - 1)} disabled={!canGoPrev}>
          이전
        </button>
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={`dots-${index}`}>...</span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(Number(page))}
            >
              {page}
            </button>
          )
        )}
        <button onClick={() => setCurrentPage((p) => p + 1)} disabled={!canGoNext}>
          다음
        </button>
      </div>
    </div>
  );
}
```

## 예시 3: 검색 결과 페이지네이션

```tsx
import { useState } from "react";
import { usePagination } from "./usePagination";
import { useDebounce } from "../useDebounce/useDebounce";

function SearchWithPagination() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // 검색어 변경 시 첫 페이지로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const { startIndex, endIndex, totalPages } = usePagination({
    totalItems: filteredItems.length,
    itemsPerPage: 10,
    initialPage: currentPage,
  });

  const currentItems = filteredItems.slice(startIndex, endIndex);

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

      {totalPages > 1 && (
        <Pagination
          totalItems={filteredItems.length}
          itemsPerPage={10}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
```

## 매개변수

- `totalItems`: `number` - 전체 아이템 개수
- `itemsPerPage`: `number` - 페이지당 아이템 개수
- `initialPage`: `number` (선택사항, 기본값: 1) - 초기 페이지 번호
- `siblingCount`: `number` (선택사항, 기본값: 1) - 현재 페이지 양옆에 보여줄 페이지 수

## 반환값

- `currentPage`: `number` - 현재 페이지 번호
- `totalPages`: `number` - 전체 페이지 수
- `pages`: `(number | string)[]` - 표시할 페이지 번호 배열 (... 포함)
- `goToPage`: `(page: number) => void` - 특정 페이지로 이동
- `nextPage`: `() => void` - 다음 페이지로 이동
- `prevPage`: `() => void` - 이전 페이지로 이동
- `canGoNext`: `boolean` - 다음 페이지로 이동 가능 여부
- `canGoPrev`: `boolean` - 이전 페이지로 이동 가능 여부
- `startIndex`: `number` - 현재 페이지의 시작 인덱스
- `endIndex`: `number` - 현재 페이지의 끝 인덱스

## siblingCount 예시

- `siblingCount: 1` → [1, ..., 4, **5**, 6, ..., 10]
- `siblingCount: 2` → [1, ..., 3, 4, **5**, 6, 7, ..., 10]

## 장점

- 페이지 번호 배열 자동 생성
- ... (dots) 자동 처리
- 이전/다음 버튼 상태 자동 계산
- 데이터 슬라이싱을 위한 인덱스 제공
