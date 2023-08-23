import {
  useState,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from 'react';
import { useDispatch } from 'react-redux';
import { FilterProps, ResetHandle } from '..';
import { SubCategory } from '../../../types';

const SubCategoryFilter: ForwardRefRenderFunction<
  ResetHandle,
  FilterProps & { subs: SubCategory[] }
> = ({ subs, resetFilters, filterProducts }, ref) => {
  const [sub, setSub] = useState<SubCategory | null>(null);
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    reset() {
      setSub(null);
    },
  }));

  const handleSub = (sub: SubCategory) => {
    console.log(sub, typeof sub);
    dispatch({
      type: 'SEARCH_QUERY',
      payload: '',
    });
    resetFilters();
    setSub(sub);
    filterProducts({ sub });
  };

  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: 'pointer' }}
      >
        {s.name}
      </div>
    ));
  return (
    <div style={{ margin: '10px 0' }} className="pl-4 pr-4">
      {showSubs()}
    </div>
  );
};

export default forwardRef(SubCategoryFilter);
