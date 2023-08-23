import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';

import { createProduct } from '../../../actions/product';
import { getCategories, getCategorySubs } from '../../../actions/category';
import { RootState } from '../../../store/reducers';
import AdminNav from '../../../components/navs/AdminNav';
import { FileUpload } from '../../../components/ui';
import ProductCreateForm from '../../../components/products/ProductCreateForm';
import { InputOrSelectE, ProductModel, SelectE } from '../../../types';

const initialState: ProductModel = {
  title: 'Macbook Pro',
  description: 'This is the best Apple product',
  price: '45000',
  categories: [],
  category: '',
  subs: [],
  shipping: 'yes',
  quantity: '50',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  color: 'White',
  brand: 'Apple',
};

const ProductCreate = () => {
  const [values, setValues] = useState<ProductModel>(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSubCategories, setShowSubCategories] = useState(false);
  const [loading, setIsLoading] = useState(false);

  // redux hook(s)
  const { user } = useSelector((state: RootState) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createProduct(values, user!.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e: InputOrSelectE) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCategoryChange = (e: SelectE) => {
    e.preventDefault();
    const value = e.target.value.trim();
    setValues((prevState) => ({ ...prevState, subs: [], category: value }));
    if (value !== '') {
      getCategorySubs(e.target.value).then((res) => {
        setSubOptions(res.data);
      });
    } else {
      setSubOptions([]);
    }
    setShowSubCategories(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product create</h4>
          )}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setIsLoading={setIsLoading}
            />
          </div>

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSubCategories={showSubCategories}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
