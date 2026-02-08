### 사용 방법

```jsx


 function AccountList() {
   const [selectedId, setSelectedId] = useState<string | null>(null);

   // selectedId가 있을 때만 API 호출
   const { result, isLoading, ok, status } = useFetch<Account>(
     selectedId ? `/api/account/${selectedId}` : '',
     { method: 'GET' }
   );

   const handleButtonClick = (id: string) => {
     setSelectedId(id);
   };

   return (
     <div>
       <h2>계정 선택</h2>
       <div>
         <button onClick={() => handleButtonClick('123')}>
           계정 123 조회
         </button>
         <button onClick={() => handleButtonClick('456')}>
           계정 456 조회
         </button>
         <button onClick={() => handleButtonClick('789')}>
           계정 789 조회
         </button>
       </div>

       {isLoading && <p>로딩 중...</p>}

       {!isLoading && result && (
         <div>
           <h3>계정 정보</h3>
           <p>ID: {result.id}</p>
           <p>이름: {result.name}</p>
           <p>이메일: {result.email}</p>
         </div>
       )}

       {!isLoading && !ok && selectedId && (
         <p>에러 발생: {status}</p>
       )}
     </div>
   );
 }

 export default AccountList;
```
