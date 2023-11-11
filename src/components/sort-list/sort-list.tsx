import classNames from 'classnames';
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setSortType} from '../../store/action.ts';
import {sortOptions} from './sort-offers.ts';

function SortList() {
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const currentSortType = useAppSelector((state) => state.data.currentSortType);
  const dispatch = useAppDispatch();

  function toggleSortMenu() {
    setIsSortMenuOpen(!isSortMenuOpen);
  }

  function handleSortChange(value: keyof typeof sortOptions) {
    dispatch(setSortType(value));
    toggleSortMenu();
  }

  function handleKeyDown(event: React.KeyboardEvent, action: () => void) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type"
        onClick={toggleSortMenu}
        onKeyDown={(event) => handleKeyDown(event, toggleSortMenu)}
        tabIndex={0}
      >{sortOptions[currentSortType].title}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classNames('places__options', 'places__options--custom', {'places__options--opened': isSortMenuOpen})}>
        {Object.entries(sortOptions).map(([key , {title}], index) => (
          <li
            key={key}
            className={classNames('places__option', {'places__option--active': currentSortType === key})}
            tabIndex={index}
            onClick={() => handleSortChange(key as keyof typeof sortOptions)}
            onKeyDown={(event) => handleKeyDown(event, () => handleSortChange(key as keyof typeof sortOptions))}
          >
            {title}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortList;
