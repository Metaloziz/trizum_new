import { items } from '@components/moks-data/moks-data-admininfolist';

import AdminInfoItem from './admin-info-item/AdminInfoItem';

const AdminInfoList = () => (
  <div>
    {items.map(item => (
      <AdminInfoItem key={item.id} title={item.title} value={item.value} />
    ))}
  </div>
);

export default AdminInfoList;
