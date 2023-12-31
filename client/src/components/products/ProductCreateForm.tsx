import { Select } from 'antd';
import {
  InputOrSelectE,
  ProductModel,
  SelectE,
  SubCategory,
} from '../../types';
import { Dispatch, SetStateAction } from 'react';

const { Option } = Select;

type Props = {
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: InputOrSelectE) => void;
  setValues: Dispatch<SetStateAction<ProductModel>>;
  values: ProductModel;
  handleCategoryChange: (e: SelectE) => void;
  subOptions: SubCategory[];
  showSubCategories: boolean;
};

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCategoryChange,
  subOptions,
  showSubCategories,
}: Props) => {
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Shipping</label>
        <select
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option>Please select</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <input
          min="1"
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Color</label>
        <select name="color" className="form-control" onChange={handleChange}>
          <option>Please select</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Brand</label>
        <select name="brand" className="form-control" onChange={handleChange}>
          <option>Please select</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
        >
          <option value="">Please select</option>
          {categories!.length > 0 &&
            categories!.map(({ _id, name }) => (
              <option key={_id} value={_id}>
                {name}
              </option>
            ))}
        </select>
      </div>

      {showSubCategories && (
        <div>
          <label>Sub Categories</label>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            value={subs}
            onChange={(value) => setValues((prevState) => ({ ...prevState }))}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>
      )}

      <br />
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default ProductCreateForm;
