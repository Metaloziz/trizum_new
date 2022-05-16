import { useState, useEffect, useRef } from 'react';

const useComponentVisible = (
  initialIsVisible: boolean,
  onClose: () => void,
) => {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef<HTMLDivElement>(null);
  const element = document.querySelector(
    `[data-auto='burger']`,
  ) as HTMLDivElement;
  const handleHideDropdown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsComponentVisible(false);
    }
  };
  const handleClickOutside = (e: Event) => {
    if (
      ref.current &&
      !ref.current.contains(e.currentTarget as Node) &&
      !element.contains(e.currentTarget as Node)
    ) {
      setIsComponentVisible(false);
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleHideDropdown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return { ref, isComponentVisible, setIsComponentVisible };
};

export default useComponentVisible;
