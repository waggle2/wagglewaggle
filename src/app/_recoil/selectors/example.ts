// 리코일 셀렉터 예시
// const charCountState = selector({
//     key: 'charCountState', // unique ID (with respect to other atoms/selectors)
//     get: ({get}) => {
//       const text = get(textState);

//       return text.length;
//     },
//   });

//  사용하고 싶은 컴포넌트 내에서 사용
// function CharacterCount() {
//     const count = useRecoilValue(charCountState);

//     return <>Character Count: {count}</>;
//   }
