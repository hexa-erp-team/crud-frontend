import { useEffect, useState } from 'react';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from './api';

const emptyForm = { name: '', description: '', price: '', quantity: '' };

export default function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const load = async () => {
    try {
      setProducts(await getProducts());
    } catch {
      setMessage('Cannot reach backend. Is it running on port 8080?');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage('');
    const payload = {
      name: form.name,
      description: form.description,
      price: form.price === '' ? null : Number(form.price),
      quantity: form.quantity === '' ? null : Number(form.quantity),
    };
    try {
      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }
      setForm(emptyForm);
      setEditingId(null);
      load();
    } catch (err) {
      if (err.details) setErrors(err.details);
      else setMessage('Something went wrong.');
    }
  };

  const onEdit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      description: p.description || '',
      price: p.price,
      quantity: p.quantity,
    });
    setErrors({});
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await deleteProduct(id);
    if (editingId === id) {
      setEditingId(null);
      setForm(emptyForm);
    }
    load();
  };

  const onCancel = () => {
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
  };

  return (
    <div className="container">
      <h1>Product Manager</h1>
      {message && <p className="error">{message}</p>}

      <form onSubmit={onSubmit} className="card">
        <h2>{editingId ? 'Edit Product' : 'Add Product'}</h2>

        <label>
          Name
          <input name="name" value={form.name} onChange={onChange} />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>

        <label>
          Description
          <input name="description" value={form.description} onChange={onChange} />
        </label>

        <label>
          Price
          <input name="price" type="number" step="0.01" value={form.price} onChange={onChange} />
          {errors.price && <span className="error">{errors.price}</span>}
        </label>

        <label>
          Quantity
          <input name="quantity" type="number" value={form.quantity} onChange={onChange} />
          {errors.quantity && <span className="error">{errors.quantity}</span>}
        </label>

        <div className="actions">
          <button type="submit">{editingId ? 'Update' : 'Add'}</button>
          {editingId && (
            <button type="button" className="secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <table className="card">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Qty</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="6" className="empty">No products yet</td>
            </tr>
          )}
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.price}</td>
              <td>{p.quantity}</td>
              <td className="row-actions">
                <button onClick={() => onEdit(p)}>Edit</button>
                <button className="danger" onClick={() => onDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
