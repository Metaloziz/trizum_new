import React, { useEffect, useState } from 'react';

import { TextField } from '@mui/material';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import styles from './ClassesPage.module.scss';

import appStore, { Roles } from 'app/stores/appStore';
import groupStore from 'app/stores/groupStore';
import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
import CardStudent from 'components/card-student/CardStudent';
import AddEditGroup from 'components/classes-page/AddEditGroup';
import BlockGames from 'components/classes-page/block-games/BlockGames';
import SearchBar from 'components/classes-page/search-bar/SearchBar';

const ClassesPage = observer(() => {
  const { getGroups, groups, getOneGroup, currentGroup } = groupStore;
  console.log({ ...groups });
  const [isLoaded, setIsLoaded] = useState(false);

  const load = async () => {
    await getGroups();
    setIsLoaded(true);
  };
  const onGroupClick = async (id: string) => {
    await getOneGroup(id);
  };

  const [isOpen, setIsOpen] = useState(false);

  const addGroup = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    load();
  }, []);

  return !isLoaded ? (
    <>Loading...</>
  ) : (
    <>
      <div className={styles.wrapper}>
        <div className={styles.searchBar}>
          <Button onClick={addGroup}>Add</Button>
          {/* <SearchBar /> */}
        </div>
        <div className={styles.row}>
          <div className={styles.tabs}>
            <div className={styles.tabsWrapper}>
              {!!groups.length &&
                groups.map(group => (
                  <div
                    className={cn(
                      styles.button,
                      currentGroup?.id === group.id && styles.button_active,
                    )}
                    key={group.id}
                    onClick={() => onGroupClick(group.id)}
                  >
                    <span>{group.name}</span>
                  </div>
                ))}
            </div>
          </div>
          <div className={styles.blockGames}>
            <BlockGames />
          </div>
          <div className={styles.blockCardStudents}>
            {currentGroup &&
              currentGroup.users.map(user => (
                <CardStudent key={user.user.id} type="teacher" user={user.user} />
              ))}
          </div>
        </div>
      </div>
      {/* TODO: переделать по ролям */}
      {appStore.role === Roles.Admin && (
        <AddEditGroup setIsOpen={() => setIsOpen(false)} isOpen={isOpen} />
      )}
    </>
  );
});

export default ClassesPage;
