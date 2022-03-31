import React from 'react';
import BlockGames from '@components/page-your-classes/block-games/BlockGames';
import CardStudent from '@components/page-your-classes/card-student/CardStudent';
import SearchBar from '@components/page-your-classes/search-bar/SearchBar';
import TabsPanel from '@components/page-your-classes/tabs-panel/TabsPanel';
import styles from './StudentsPage.module.scss';

const StudentsPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBar}>
        <SearchBar />
      </div>
      <div className={styles.row}>
        <div className={styles.tabs}>
          <TabsPanel />
        </div>
        <div className={styles.blockGames}>
          <BlockGames />
        </div>
        <div className={styles.blockCardStudents}>
          <CardStudent />
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;
