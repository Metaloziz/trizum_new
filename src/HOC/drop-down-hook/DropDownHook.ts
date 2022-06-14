import { useState, useEffect, useRef } from 'react';

const useComponentVisible = (
  initialIsVisible: boolean,
  dataAuto: string,
  onClose?: () => void,
  constanta?: boolean,
) => {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
  const ref = useRef<HTMLDivElement>(null);
  const element =
    typeof window !== 'undefined' &&
    (document.querySelector(`[data-auto="${dataAuto}"]`) as HTMLDivElement);
  const handleHideDropdown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsComponentVisible(false);
    }
  };
  const handleClickOutside = (e: Event) => {
    if (constanta && element && !element.contains(e.target as Node)) {
      onClose && onClose();
      return;
    }
    if (
      element &&
      !element.contains(e.target as Node) &&
      ref.current &&
      !ref.current.contains(e.target as Node)
    ) {
      setIsComponentVisible(false);
      onClose && onClose();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleHideDropdown);
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  return { ref, isComponentVisible, setIsComponentVisible };
};

export default useComponentVisible;
