import { useState, useEffect, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

// Styles.
import { LoadingOutlined } from '@ant-design/icons';

// UI Components.
import AdminNav from '../../../components/navs/AdminNav';
import { FileUpload } from '../../../components/ui';
import ProductUpdateForm from '../../../components/products/ProductUpdateForm';

// API Actions.
import { getProduct, updateProduct } from '../../../actions/product';
import { getCategories, getCategorySubs } from '../../../actions/category';

import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../../store/reducers';
import { Category, InputOrSelectE, ProductModel, SelectE, SubCategory } from '../../../types';

const initialState: ProductModel  = {
  title: '',
  description: '',
  price: '',
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  color: '',
  brand: '',
};

type Params = { slug: string };

const ProductUpdate = ({ match, history }: RouteComponentProps<Params>) => {
  // state
  const [values, setValues] = useState<ProductModel>(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setIsLoading] = useState(false);
  const { user } = useSelector((state: RootState) => ({ ...state }));
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      // 1 load single product
      setValues({ ...values, ...p.data });
      // 2 load single product category subs
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data); // on first load, show default subs
      });
      // 3 prepare array of sub ids to show as default sub values in antd Select
      let arr = (p.data.subs as SubCategory[]).map((s) => {
        return s._id;
      });
      setArrayOfSubs((prev) => arr); // required for ant design select to work
    });
  };

  const loadCategories = () =>
    getCategories().then((c) => {
      console.log('GET CATEGORIES IN UPDATE PRODUCT', c.data);
      setCategories(c.data);
    });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user!.token)
      .then((res) => {
        setIsLoading(false);
        toast.success(`"${res.data.title}" is updated`);
        history.push('/admin/products');
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
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
    setValues(prevState => ({ ...prevState, subs: [] }));

    setSelectedCategory(e.target.value);

    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
    });

    console.log('EXISTING CATEGORY values.category', values.category);

    // if user clicks back to the original category
    // show its sub categories in default
    if (values.category === e.target.value) {
      loadProduct();
    }
    // clear old sub category ids
    setArrayOfSubs([]);
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
            <h4>Product update</h4>
          )}

          {/* {JSON.stringify(values)} */}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setIsLoading={setIsLoading}
            />
          </div>

          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
