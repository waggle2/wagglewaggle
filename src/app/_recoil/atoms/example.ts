// 리코일 상태 만들기
// const textState = atom({
//     key: 'textState', // unique ID (with respect to other atoms/selectors)
//     default: '', // default value (aka initial value)
//   });

// 사용하고 싶은 컴포넌트 내에서 사용
// function TextInput() {
//     const [text, setText] = useRecoilState(textState);

//     const onChange = (event) => {
//       setText(event.target.value);
//     };
