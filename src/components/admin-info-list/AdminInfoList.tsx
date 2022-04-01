import { items } from '@components/moks-data/moks-data-admininfolist';
import AdminInfoItem from './admin-info-item/AdminInfoItem';

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
