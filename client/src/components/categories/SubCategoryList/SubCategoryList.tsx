import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SubCategory } from '../../../types';
import { getSubCategories } from '../../../actions/sub-category';

const SubCategoryList = () => {
  const [subs, setSubs] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubCategories()
      .then((res) => {
        setSubs(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <Link to={`/sub/${s.slug}`}>{s.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? <h4 className="text-center">Loading...</h4> : showSubs()}
      </div>
    </div>
  );
};

export default SubCategoryList;
