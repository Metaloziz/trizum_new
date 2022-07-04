import React from 'react';

import styles from './SearchBar.module.scss';

import SearchByGroup from 'components/classes-page/search-bar/search-by-groups/SearchByGroup';
import StudentPageSlider from 'components/classes-page/search-bar/student-page-slider/StudentPageSlider';

const SearchBar = () => (
  <div className={styles.wrapper}>
    <SearchByGroup />
    <StudentPageSlider />
  </div>
);

export default SearchBar;
