import TextEditor from '@components/text-editor/TextEditor';

export default function TestPage() {
  const str = `RGG
  asdfasdf`;
  console.log(str);
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '20px',
      }}
    >
      <div>{str}</div>
    </div>
  );
}
