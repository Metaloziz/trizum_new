import React from 'react';

import styles from './ClassesPage.module.scss';

import CardStudent from 'components/card-student/CardStudent';
import BlockGames from 'components/classes-page/block-games/BlockGames';
import SearchBar from 'components/classes-page/search-bar/SearchBar';
import TabsPanel from 'components/classes-page/tabs-panel/TabsPanel';

const ClassesPage = () => (
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
        <CardStudent type="teacher" title="Днепровский Александр Алексеевич" />
      </div>
    </div>
  </div>
);

export default ClassesPage;
