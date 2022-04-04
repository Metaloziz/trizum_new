import React from 'react';
import SearchByGroup from '@components/page-your-classes/search-bar/search-by-groups/SearchByGroup';
import StudentPageSlider from '@components/page-your-classes/search-bar/student-page-slider/StudentPageSlider';
import styles from './SearchBar.module.scss';

const SearchBar = () => {
  return (
    <div className={styles.wrapper}>
      <SearchByGroup />
      <StudentPageSlider />
    </div>
  );
};

export default SearchBar;
