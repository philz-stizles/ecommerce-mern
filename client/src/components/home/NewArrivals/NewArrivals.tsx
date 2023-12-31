import { useCallback, useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { getProducts, getProductsTotal } from '../../../actions/product';
import { LoadingCard, ProductCard } from '../../cards';
import { Product } from '../../../types';

const NewArrivals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [productsTotal, setProductsTotal] = useState(0);
  const [page, setPage] = useState(1);

  const loadAllProducts = useCallback(() => {
    setLoading(true);
    // sort, order, limit
    getProducts('createdAt', 'desc', page)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);
  ;

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsTotal()
      .then((res) => setProductsTotal(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  

  // console.log('page', page)
  // console.log('productsTotal', productsTotal)
  // console.log('(productsTotal / 3) * 10', (productsTotal / 3) * 10)
  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard length={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={(productsTotal / 3) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default NewArrivals;
