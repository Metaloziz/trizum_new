import CardStudent from '@components/card-student/CardStudent';

export default function TestPage() {
  return (
    <div style={{ marginTop: '50px' }}>
      <CardStudent title={'Днепровский Александр Алексеевич'} user={'teacher'} size={'large'} flag={false} settings={true} />
    </div>
  );
}
