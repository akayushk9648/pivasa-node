const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function fetchProducts(filters: Record<string, string> = {}) {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`${API_BASE_URL}/products?${query}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchPublicCategories() {
  const res = await fetch(`${API_BASE_URL}/products/meta/categories`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function fetchPublicBrands() {
  const res = await fetch(`${API_BASE_URL}/products/meta/brands`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch brands');
  return res.json();
}

export async function fetchProductById(id: string) {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch product details');
  return res.json();
}

export async function createProduct(token: string, product: any) {
  const res = await fetch(`${API_BASE_URL}/admin/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(product)
  });
  if (!res.ok) throw new Error('Failed to create product');
  return res.json();
}

export async function updateProduct(token: string, id: string | number, product: any) {
  const res = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(product)
  });
  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
}

export async function deleteProduct(token: string, id: string | number) {
  const res = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to delete product');
  return res.json();
}

export async function submitOrder(orderData: any) {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to submit order');
  return data;
}

export async function fetchAdminOrders(token: string) {
  const res = await fetch(`${API_BASE_URL}/admin/orders`, {
    headers: { 'Authorization': `Bearer ${token}` },
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

export async function updateAdminOrderStatus(token: string, id: number, status: string) {
  const res = await fetch(`${API_BASE_URL}/admin/orders/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error('Failed to update order status');
  return res.json();
}

export async function submitSolarLead(leadData: any) {
  const res = await fetch(`${API_BASE_URL}/solar-leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to submit lead');
  return data;
}

export async function fetchAdminSolarLeads(token: string) {
  const res = await fetch(`${API_BASE_URL}/admin/solar-leads`, {
    headers: { 'Authorization': `Bearer ${token}` },
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch solar leads');
  return res.json();
}

export async function updateAdminSolarLeadStatus(token: string, id: number, status: string) {
  const res = await fetch(`${API_BASE_URL}/admin/solar-leads/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error('Failed to update lead status');
  return res.json();
}

// Categories Admin API
export async function fetchAdminCategories(token: string) {
  const res = await fetch(`${API_BASE_URL}/admin/categories`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function createAdminCategory(token: string, category: any) {
  const res = await fetch(`${API_BASE_URL}/admin/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(category)
  });
  if (!res.ok) throw new Error('Failed to create category');
  return res.json();
}

export async function deleteAdminCategory(token: string, id: number) {
  const res = await fetch(`${API_BASE_URL}/admin/categories/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to delete category');
  return res.json();
}

// Brands Admin API
export async function fetchAdminBrands(token: string) {
  const res = await fetch(`${API_BASE_URL}/admin/brands`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch brands');
  return res.json();
}

export async function createAdminBrand(token: string, brand: any) {
  const res = await fetch(`${API_BASE_URL}/admin/brands`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(brand)
  });
  if (!res.ok) throw new Error('Failed to create brand');
  return res.json();
}

export async function deleteAdminBrand(token: string, id: number) {
  const res = await fetch(`${API_BASE_URL}/admin/brands/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to delete brand');
  return res.json();
}

// Upload Logs & Audit History API
export async function fetchAdminUploadLogs(token: string) {
  const res = await fetch(`${API_BASE_URL}/admin/upload-logs`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch upload logs');
  return res.json();
}

// Admin Users API
export async function fetchAdminUsers(token: string) {
  const res = await fetch(`${API_BASE_URL}/admin/users`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch admin users');
  return res.json();
}

export async function deleteAdminUser(token: string, id: number) {
  const res = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to delete admin user');
  return res.json();
}

export async function deleteAdminOrder(token: string, id: number) {
  const res = await fetch(`${API_BASE_URL}/admin/orders/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to delete order');
  return res.json();
}

export async function deleteAdminSolarLead(token: string, id: number) {
  const res = await fetch(`${API_BASE_URL}/admin/solar-leads/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to delete solar lead');
  return res.json();
}

export async function createAdminUser(token: string, user: any) {
  const res = await fetch(`${API_BASE_URL}/admin/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(user)
  });
  if (!res.ok) throw new Error('Failed to create admin user');
  return res.json();
}

export async function adminLogin(credentials: { username: string; password: string }) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Invalid admin credentials');
  return data;
}

export async function fetchAdminDashboard(token: string) {
  const res = await fetch(`${API_BASE_URL}/admin/dashboard`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch admin metrics');
  return res.json();
}

export async function fetchAdminActivityLogs(token: string) {
  const res = await fetch(`${API_BASE_URL}/admin/activity-logs`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch system activity audit logs');
  return res.json();
}

export async function previewXlsxBulkUpload(token: string, fileBase64: string) {
  const res = await fetch(`${API_BASE_URL}/admin/products/bulk-upload/preview`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ fileBase64 })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to preview XLSX file');
  return data;
}

export async function commitXlsxBulkUpload(token: string, rows: any[], fileName: string) {
  const res = await fetch(`${API_BASE_URL}/admin/products/bulk-upload/commit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ rows, fileName })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to commit bulk upload');
  return data;
}
