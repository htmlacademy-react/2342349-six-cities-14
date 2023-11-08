import classNames from 'classnames';
import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {updateSortType} from '../../store/action.ts';
import {SortOfferTypes} from './sort-offers.ts';

function SortList() {
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const currentSortType = useAppSelector((state) => state.currentSortType);
  const dispatch = useAppDispatch();

  function toggleSortMenu() {
    setIsSortMenuOpen(!isSortMenuOpen);
  }

  function handleSortChange(value: SortOfferTypes) {
    dispatch(updateSortType(value));
    toggleSortMenu();
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type"
        onClick={toggleSortMenu}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleSortMenu();
          }
        }}
        tabIndex={0}
      >{currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classNames('places__options', 'places__options--custom', {'places__options--opened': isSortMenuOpen})}>
        {Object.entries(SortOfferTypes).map(([key, value], index) => (
          <li
            key={key}
            className={classNames('places__option', {'places__option--active': currentSortType === value})}
            tabIndex={index}
            onClick={() => handleSortChange(value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSortChange(value);
              }
            }}
          >
            {value}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortList;
