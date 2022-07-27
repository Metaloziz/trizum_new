import React, { useEffect, useState } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import styles from './ClassesPage.module.scss';

import groupStore from 'app/stores/groupStore';
import CardStudent from 'components/card-student/CardStudent';
import BlockGames from 'components/classes-page/block-games/BlockGames';
import SearchBar from 'components/classes-page/search-bar/SearchBar';

const ClassesPage = observer(() => {
  const { getGroups, groups, getOneGroup, currentGroup } = groupStore;

  const [isLoaded, setIsLoaded] = useState(false);

  const load = async () => {
    await getGroups();
    setIsLoaded(true);
  };
  const onGroupClick = async (id: string) => {
    await getOneGroup(id);
  };

  useEffect(() => {
    load();
  }, []);

  return !isLoaded ? (
    <>Loading...</>
  ) : (
    <div className={styles.wrapper}>
      <div className={styles.searchBar}>
        <SearchBar />
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
          {/* ЗАКОМЕНТИРОВАНО ВО ВРЕМЯ ДОБАВЛЕНИЯ НОВОЙ ТИПИЗАЦИИ ГРУПП */}
          {/* {currentGroup && */}
          {/*  currentGroup.users.map(user => ( */}
          {/*    <CardStudent key={user.user.id} type="teacher" user={user.user} /> */}
          {/*  ))} */}
        </div>
      </div>
    </div>
  );
});

export default ClassesPage;
