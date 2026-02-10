# Table 컴포넌트 사용법

재사용 가능한 테이블 컴포넌트로 정렬, 선택, 필터링, zebra 스타일링, 페이지네이션 등의 기능을 제공합니다.

## 기본 사용법

### 예시 1: 기본 테이블

```tsx
import { Table, type Column } from "./Table/Table";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const users: User[] = [
  { id: 1, name: "김철수", email: "kim@example.com", age: 25 },
  { id: 2, name: "이영희", email: "lee@example.com", age: 30 },
  { id: 3, name: "박민수", email: "park@example.com", age: 28 },
];

const columns: Column<User>[] = [
  { key: "id", header: "ID" },
  { key: "name", header: "이름" },
  { key: "email", header: "이메일" },
  { key: "age", header: "나이" },
];

function BasicTable() {
  return <Table data={users} columns={columns} />;
}
```

## 정렬 기능

### 예시 2: 정렬 가능한 테이블

```tsx
import { Table, type Column } from "./Table/Table";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const products: Product[] = [
  { id: 1, name: "노트북", price: 1200000, stock: 5 },
  { id: 2, name: "마우스", price: 30000, stock: 50 },
  { id: 3, name: "키보드", price: 80000, stock: 30 },
];

const columns: Column<Product>[] = [
  { key: "id", header: "ID", sortable: false }, // 정렬 비활성화
  { key: "name", header: "상품명" },
  { key: "price", header: "가격" },
  { key: "stock", header: "재고" },
];

function SortableTable() {
  return (
    <Table
      data={products}
      columns={columns}
      sortable={true}
      defaultSortKey="price"
      defaultSortOrder="desc"
    />
  );
}
```

## 선택 기능

### 예시 3: 단일 선택 테이블

```tsx
import { useState } from "react";
import { Table, type Column } from "./Table/Table";

interface Task {
  id: number;
  title: string;
  status: string;
}

const tasks: Task[] = [
  { id: 1, title: "디자인 작업", status: "진행중" },
  { id: 2, title: "코드 리뷰", status: "완료" },
  { id: 3, title: "테스트 작성", status: "대기" },
];

const columns: Column<Task>[] = [
  { key: "id", header: "ID" },
  { key: "title", header: "제목" },
  { key: "status", header: "상태" },
];

function SingleSelectTable() {
  const [selectedTask, setSelectedTask] = useState<Task[]>([]);

  return (
    <div>
      <Table
        data={tasks}
        columns={columns}
        selectable="single"
        onSelectionChange={(selected) => setSelectedTask(selected)}
        rowKey="id"
      />
      {selectedTask.length > 0 && (
        <div>선택된 작업: {selectedTask[0].title}</div>
      )}
    </div>
  );
}
```

### 예시 4: 다중 선택 테이블

```tsx
import { useState } from "react";
import { Table, type Column } from "./Table/Table";

interface Email {
  id: number;
  from: string;
  subject: string;
  date: string;
}

const emails: Email[] = [
  { id: 1, from: "admin@example.com", subject: "공지사항", date: "2024-01-15" },
  { id: 2, from: "team@example.com", subject: "회의 일정", date: "2024-01-16" },
  { id: 3, from: "hr@example.com", subject: "급여 명세서", date: "2024-01-17" },
];

const columns: Column<Email>[] = [
  { key: "from", header: "보낸사람" },
  { key: "subject", header: "제목" },
  { key: "date", header: "날짜" },
];

function MultiSelectTable() {
  const [selectedEmails, setSelectedEmails] = useState<Email[]>([]);

  const handleDelete = () => {
    console.log("삭제할 이메일:", selectedEmails);
  };

  return (
    <div>
      <Table
        data={emails}
        columns={columns}
        selectable="multiple"
        onSelectionChange={(selected) => setSelectedEmails(selected)}
        rowKey="id"
      />
      {selectedEmails.length > 0 && (
        <button onClick={handleDelete}>
          선택된 {selectedEmails.length}개 삭제
        </button>
      )}
    </div>
  );
}
```

## Zebra 스타일링

### 예시 5: Zebra 스타일 테이블

```tsx
import { Table, type Column } from "./Table/Table";

interface Log {
  id: number;
  timestamp: string;
  level: string;
  message: string;
}

const logs: Log[] = [
  { id: 1, timestamp: "2024-01-15 10:00", level: "INFO", message: "서버 시작" },
  { id: 2, timestamp: "2024-01-15 10:05", level: "WARN", message: "메모리 경고" },
  { id: 3, timestamp: "2024-01-15 10:10", level: "ERROR", message: "연결 실패" },
  { id: 4, timestamp: "2024-01-15 10:15", level: "INFO", message: "재연결 성공" },
];

const columns: Column<Log>[] = [
  { key: "timestamp", header: "시간" },
  { key: "level", header: "레벨" },
  { key: "message", header: "메시지" },
];

function ZebraTable() {
  return <Table data={logs} columns={columns} zebra={true} />;
}
```

## 필터링 기능

### 예시 6: 필터링 가능한 테이블

```tsx
import { useState } from "react";
import { Table, type Column } from "./Table/Table";

interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
}

const employees: Employee[] = [
  { id: 1, name: "김철수", department: "개발", position: "시니어" },
  { id: 2, name: "이영희", department: "디자인", position: "주니어" },
  { id: 3, name: "박민수", department: "개발", position: "주니어" },
  { id: 4, name: "정수진", department: "마케팅", position: "시니어" },
];

const columns: Column<Employee>[] = [
  { key: "id", header: "ID", filterable: false },
  { key: "name", header: "이름" },
  { key: "department", header: "부서" },
  { key: "position", header: "직급" },
];

function FilterableTable() {
  const [filteredCount, setFilteredCount] = useState(employees.length);

  return (
    <div>
      <div>총 {filteredCount}명의 직원</div>
      <Table
        data={employees}
        columns={columns}
        filterable={true}
        onFilterChange={(filtered) => setFilteredCount(filtered.length)}
      />
    </div>
  );
}
```

## 커스텀 렌더링

### 예시 7: 커스텀 셀 렌더링

```tsx
import { Table, type Column } from "./Table/Table";

interface Order {
  id: number;
  product: string;
  amount: number;
  status: "pending" | "completed" | "cancelled";
}

const orders: Order[] = [
  { id: 1, product: "노트북", amount: 1200000, status: "completed" },
  { id: 2, product: "마우스", amount: 30000, status: "pending" },
  { id: 3, product: "키보드", amount: 80000, status: "cancelled" },
];

const columns: Column<Order>[] = [
  { key: "id", header: "주문번호" },
  { key: "product", header: "상품" },
  {
    key: "amount",
    header: "금액",
    render: (order) => `₩${order.amount.toLocaleString()}`,
  },
  {
    key: "status",
    header: "상태",
    render: (order) => {
      const statusMap = {
        pending: "대기중",
        completed: "완료",
        cancelled: "취소",
      };
      const colorMap = {
        pending: "#ffc107",
        completed: "#28a745",
        cancelled: "#dc3545",
      };
      return (
        <span
          style={{
            color: colorMap[order.status],
            fontWeight: "bold",
          }}
        >
          {statusMap[order.status]}
        </span>
      );
    },
  },
];

function CustomRenderTable() {
  return <Table data={orders} columns={columns} />;
}
```

## 페이지네이션

### 예시 8: 페이지네이션 테이블

```tsx
import { Table, type Column } from "./Table/Table";

interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
}

// 많은 데이터 생성
const items: Item[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `상품 ${i + 1}`,
  category: ["전자기기", "의류", "식품", "도서"][i % 4],
  price: Math.floor(Math.random() * 100000) + 10000,
}));

const columns: Column<Item>[] = [
  { key: "id", header: "ID" },
  { key: "name", header: "상품명" },
  { key: "category", header: "카테고리" },
  {
    key: "price",
    header: "가격",
    render: (item) => `₩${item.price.toLocaleString()}`,
  },
];

function PaginatedTable() {
  return (
    <Table
      data={items}
      columns={columns}
      paginated={true}
      pageSize={10}
      defaultPage={1}
      pageSizeOptions={[5, 10, 20, 50]}
      showPageInfo={true}
      onPageChange={(page, pageSize) => {
        console.log(`페이지 ${page}, 크기 ${pageSize}`);
      }}
    />
  );
}
```

### 예시 9: 페이지네이션 + 정렬 + 필터링

```tsx
import { Table, type Column } from "./Table/Table";

interface Transaction {
  id: number;
  date: string;
  type: "입금" | "출금";
  amount: number;
  description: string;
}

const transactions: Transaction[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  date: `2024-01-${String((i % 30) + 1).padStart(2, "0")}`,
  type: i % 2 === 0 ? "입금" : "출금",
  amount: Math.floor(Math.random() * 500000) + 10000,
  description: `거래 ${i + 1}`,
}));

const columns: Column<Transaction>[] = [
  { key: "id", header: "ID" },
  { key: "date", header: "날짜" },
  { key: "type", header: "유형" },
  {
    key: "amount",
    header: "금액",
    render: (transaction) => (
      <span
        style={{
          color: transaction.type === "입금" ? "green" : "red",
        }}
      >
        {transaction.type === "입금" ? "+" : "-"}₩
        {transaction.amount.toLocaleString()}
      </span>
    ),
  },
  { key: "description", header: "설명" },
];

function TransactionTable() {
  return (
    <Table
      data={transactions}
      columns={columns}
      sortable={true}
      defaultSortKey="date"
      defaultSortOrder="desc"
      filterable={true}
      paginated={true}
      pageSize={15}
      zebra={true}
    />
  );
}
```

## 모든 기능을 결합한 예시

### 예시 10: 종합 예시

```tsx
import { useState } from "react";
import { Table, type Column } from "./Table/Table";

interface Student {
  id: number;
  name: string;
  grade: number;
  score: number;
  status: "active" | "inactive";
}

const students: Student[] = [
  { id: 1, name: "김철수", grade: 3, score: 85, status: "active" },
  { id: 2, name: "이영희", grade: 2, score: 92, status: "active" },
  { id: 3, name: "박민수", grade: 3, score: 78, status: "inactive" },
  { id: 4, name: "정수진", grade: 1, score: 88, status: "active" },
  { id: 5, name: "최동훈", grade: 2, score: 95, status: "active" },
];

const columns: Column<Student>[] = [
  { key: "id", header: "학번" },
  { key: "name", header: "이름" },
  { key: "grade", header: "학년" },
  {
    key: "score",
    header: "점수",
    render: (student) => (
      <span style={{ color: student.score >= 90 ? "green" : "inherit" }}>
        {student.score}점
      </span>
    ),
  },
  {
    key: "status",
    header: "상태",
    render: (student) => (student.status === "active" ? "활동" : "비활동"),
  },
];

function ComprehensiveTable() {
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);

  return (
    <div>
      <h2>학생 목록</h2>
      <Table
        data={students}
        columns={columns}
        sortable={true}
        defaultSortKey="score"
        defaultSortOrder="desc"
        selectable="multiple"
        onSelectionChange={setSelectedStudents}
        rowKey="id"
        zebra={true}
        filterable={true}
        emptyMessage="등록된 학생이 없습니다."
      />
      {selectedStudents.length > 0 && (
        <div style={{ marginTop: "16px" }}>
          <strong>선택된 학생: </strong>
          {selectedStudents.map((s) => s.name).join(", ")}
        </div>
      )}
    </div>
  );
}
```

## Props 설명

### TableProps

| Prop                | Type                                  | Default             | 설명                                    |
| ------------------- | ------------------------------------- | ------------------- | --------------------------------------- |
| `data`              | `T[]`                                 | required            | 테이블에 표시할 데이터 배열             |
| `columns`           | `Column<T>[]`                         | required            | 컬럼 정의 배열                          |
| `sortable`          | `boolean`                             | `false`             | 전역 정렬 기능 활성화                   |
| `defaultSortKey`    | `keyof T \| string`                   | `undefined`         | 초기 정렬 키                            |
| `defaultSortOrder`  | `"asc" \| "desc"`                     | `"asc"`             | 초기 정렬 순서                          |
| `selectable`        | `"single" \| "multiple" \| false`     | `false`             | 행 선택 모드                            |
| `onSelectionChange` | `(selected: T[]) => void`             | `undefined`         | 선택 변경 시 콜백                       |
| `rowKey`            | `keyof T`                             | `"id"`              | 행을 식별하는 고유 키                   |
| `zebra`             | `boolean`                             | `false`             | zebra 스트라이프 스타일 활성화          |
| `className`         | `string`                              | `""`                | 추가 CSS 클래스                         |
| `filterable`        | `boolean`                             | `false`             | 전역 필터링 기능 활성화                 |
| `onFilterChange`    | `(filteredData: T[]) => void`         | `undefined`         | 필터링된 데이터 변경 시 콜백            |
| `paginated`         | `boolean`                             | `false`             | 페이지네이션 활성화                     |
| `pageSize`          | `number`                              | `10`                | 페이지당 표시할 항목 수                 |
| `defaultPage`       | `number`                              | `1`                 | 초기 페이지                             |
| `onPageChange`      | `(page: number, pageSize: number) => void` | `undefined`    | 페이지 변경 시 콜백                     |
| `pageSizeOptions`   | `number[]`                            | `[5, 10, 20, 50, 100]` | 페이지 크기 선택 옵션                |
| `showPageInfo`      | `boolean`                             | `true`              | 페이지 정보 표시 여부                   |
| `emptyMessage`      | `ReactNode`                           | `"데이터가 없습니다."` | 데이터가 없을 때 표시할 메시지          |

### Column

| Prop         | Type                         | Default     | 설명                                             |
| ------------ | ---------------------------- | ----------- | ------------------------------------------------ |
| `key`        | `keyof T \| string`          | required    | 데이터 객체의 키                                 |
| `header`     | `string`                     | required    | 컬럼 헤더 텍스트                                 |
| `render`     | `(item: T) => ReactNode`     | `undefined` | 커스텀 셀 렌더링 함수                            |
| `sortable`   | `boolean`                    | `true`      | 이 컬럼의 정렬 가능 여부 (전역 sortable이 true일 때) |
| `filterable` | `boolean`                    | `true`      | 이 컬럼의 필터링 가능 여부 (전역 filterable이 true일 때) |

## 스타일 커스터마이징

Table.css 파일을 수정하거나 className prop을 통해 커스텀 스타일을 적용할 수 있습니다.

```tsx
<Table
  data={data}
  columns={columns}
  className="my-custom-table"
/>
```

```css
.my-custom-table {
  font-size: 14px;
}

.my-custom-table .table-header-cell {
  background-color: #007bff;
  color: white;
}
```
