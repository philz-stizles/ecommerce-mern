import { FormEvent } from "react";

type Props = {
  name: string;
  setName: (value: string) => void
  handleSubmit: (e: FormEvent) => void
};

const CategoryForm = ({ handleSubmit, name, setName }: Props) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Name</label>
      <input
        type="text"
        className="form-control"
        onChange={(e) => setName(e.target.value)}
        value={name}
        autoFocus
        required
      />
      <br />
      <button type="submit" className="btn btn-outline-primary">
        Save
      </button>
    </div>
  </form>
);

export default CategoryForm;
