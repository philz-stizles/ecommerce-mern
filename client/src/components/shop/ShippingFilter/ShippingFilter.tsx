import {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { FilterProps, ResetHandle } from '..';

const ShippingFilter: ForwardRefRenderFunction<ResetHandle, FilterProps> = (
  { resetFilters, filterProducts },
  ref
) => {
  const [shipping, setShipping] = useState('');
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    reset() {
      setShipping('');
    },
  }));

  const handleShippingChange = (e: CheckboxChangeEvent) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: '',
    });

    resetFilters();

    setShipping(e.target.value);
    filterProducts({ shipping: e.target.value });
  };

  return (
    <div style={{ margin: '10px 0' }} className="pr-5">
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingChange}
        value="Yes"
        checked={shipping === 'Yes'}
      >
        Yes
      </Checkbox>

      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingChange}
        value="No"
        checked={shipping === 'No'}
      >
        No
      </Checkbox>
    </div>
  );
};
export default forwardRef(ShippingFilter);
