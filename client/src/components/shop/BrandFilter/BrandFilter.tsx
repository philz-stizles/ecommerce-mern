import {
  useState,
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
  ForwardRefRenderFunction,
} from 'react';
import { useDispatch } from 'react-redux';
import { Radio, RadioChangeEvent } from 'antd';
import { FilterProps, ResetHandle } from '..';

const BrandFilter: ForwardRefRenderFunction<ResetHandle, FilterProps> = (
  { resetFilters, filterProducts },
  ref
) => {
  const [brands, setBrands] = useState([
    'Apple',
    'Samsung',
    'Microsoft',
    'Lenovo',
    'ASUS',
  ]);
  const [brand, setBrand] = useState('');
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    reset() {
      setBrand('');
    },
  }));

  const handleBrand = (e: RadioChangeEvent) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: '',
    });
    resetFilters();
    setBrand(e.target.value);
    filterProducts({ brand: e.target.value });
  };

  const showBrands = () =>
    brands.map((b) => (
      <Radio
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-4"
      >
        {b}
      </Radio>
    ));

  return (
    <div style={{ margin: '10px 0' }} className="pr-5">
      {showBrands()}
    </div>
  );
};

export default forwardRef(BrandFilter);
