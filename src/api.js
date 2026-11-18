const BASE_URL = 'http://localhost:8080/api/products';

async function handle(res) {
  if (!res.ok) {
    let body = null;
    try { body = await res.json(); } catch { /* ignore */ }
    const err = new Error('Request failed');
    err.details = body;
    throw err;
  }
  return res.status === 204 ? null : res.json();
}

export const getProducts = () => fetch(BASE_URL).then(handle);

export const createProduct = (p) =>
  fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(p),
  }).then(handle);

export const updateProduct = (id, p) =>
  fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(p),
  }).then(handle);

export const deleteProduct = (id) =>
  fetch(`${BASE_URL}/${id}`, { method: 'DELETE' }).then(handle);
