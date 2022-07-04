import AdminInfoItem from './admin-info-item/AdminInfoItem';

import { items } from 'components/moks-data/moks-data-admininfolist';

const AdminInfoList = () => (
  <div>
    {items.map(item => (
      <AdminInfoItem key={item.id} title={item.title} value={item.value} />
    ))}
  </div>
);

export default AdminInfoList;
