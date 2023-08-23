import { ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { RootState } from '../../../store/reducers';

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { text } = useSelector((state: RootState) => state.search);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLSpanElement>) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="search"
        value={text}
        className="form-control mr-sm-2"
        placeholder="Search"
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: 'pointer' }} />
    </form>
  );
};

export default Search;
