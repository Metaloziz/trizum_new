import AdminInfoItem from './admin-info-item/AdminInfoItem';

const items = [
  { id: 1, title: 'Оборот в месяц', value: 100 },
  { id: 2, title: 'Количество зарегистрированных пользователей за выбранный период', value: 100 },
  { id: 3, title: 'Суммарное количество пользователей за выбранный период', value: 16 },
  { id: 4, title: 'Количество новых оплат', value: 55 },
  { id: 5, title: 'Суммарное количество оплат', value: 36 },
  { id: 6, title: 'Количество повторных оплат', value: 15 },
  { id: 7, title: 'Количество отказов по оплате', value: 5 },
];

const AdminInfoList = () => {
  return (
    <div>
      {items.map((item) => {
        return <AdminInfoItem key={item.id} title={item.title} value={item.value} />;
      })}
    </div>
  );
};

export default AdminInfoList;
