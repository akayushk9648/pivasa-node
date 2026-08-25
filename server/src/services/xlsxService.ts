import * as XLSX from 'xlsx';

export interface ParsedProductRow {
  rowNumber: number;
  sku: string;
  name: string;
  brand: string;
  category: string;
  subCategory?: string;
  description?: string;
  price: number;
  discountPrice?: number;
  stock: number;
  warrantyMonths?: number;
  batteryType?: string;
  capacityAh?: number;
  weightKg?: number;
  dimensions?: string;
  status: string;
  tags: string[];
  imageUrls: string[];
  isValid: boolean;
  errors: string[];
}

export function parseAndValidateXlsx(buffer: Buffer): { rows: ParsedProductRow[]; totalRows: number; validCount: number; errorCount: number } {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  
  const rawData = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, { defval: '' });

  const rows: ParsedProductRow[] = [];
  const seenSkus = new Set<string>();

  rawData.forEach((item, idx) => {
    const rowNumber = idx + 2; // Row 1 is header
    const errors: string[] = [];

    const sku = String(item.sku || '').trim();
    const name = String(item.name || '').trim();
    const brand = String(item.brand || '').trim();
    const category = String(item.category || '').trim();
    const subCategory = String(item.sub_category || '').trim();
    const description = String(item.description || '').trim();
    
    const price = Number(item.price);
    const discountPrice = item.discount_price ? Number(item.discount_price) : undefined;
    const stock = Number(item.stock ?? 0);
    const warrantyMonths = item.warranty_months ? Number(item.warranty_months) : undefined;
    const capacityAh = item.capacity_ah ? Number(item.capacity_ah) : undefined;
    const weightKg = item.weight_kg ? Number(item.weight_kg) : undefined;
    const dimensions = String(item.dimensions || '').trim();
    const batteryType = String(item.battery_type || '').trim();
    const status = String(item.status || 'active').trim().toLowerCase();

    const tags = String(item.tags || '')
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const rawImages = item.image_urls || item.image_url || item.images || item.image || item.imageUrls || item.imageUrl || '';
    const imageUrls = String(rawImages)
      .split(',')
      .map(url => url.trim())
      .filter(Boolean);

    // Validation checks
    if (!sku) errors.push('SKU is required');
    else if (seenSkus.has(sku)) errors.push(`Duplicate SKU '${sku}' in spreadsheet`);
    else seenSkus.add(sku);

    if (!name) errors.push('Product Name is required');
    if (!brand) errors.push('Brand is required');
    if (!category) errors.push('Category is required');

    if (isNaN(price) || price <= 0) errors.push('Invalid Price');
    if (discountPrice !== undefined && (isNaN(discountPrice) || discountPrice < 0)) errors.push('Invalid Discount Price');
    if (isNaN(stock) || stock < 0) errors.push('Invalid Stock quantity');

    rows.push({
      rowNumber,
      sku,
      name,
      brand,
      category,
      subCategory,
      description,
      price: isNaN(price) ? 0 : price,
      discountPrice: discountPrice !== undefined && !isNaN(discountPrice) ? discountPrice : undefined,
      stock: isNaN(stock) ? 0 : stock,
      warrantyMonths,
      batteryType,
      capacityAh,
      weightKg,
      dimensions,
      status: ['active', 'draft', 'out_of_stock'].includes(status) ? status : 'active',
      tags,
      imageUrls,
      isValid: errors.length === 0,
      errors
    });
  });

  const validCount = rows.filter(r => r.isValid).length;
  const errorCount = rows.length - validCount;

  return {
    rows,
    totalRows: rows.length,
    validCount,
    errorCount
  };
}

export function generateSampleXlsx(): Buffer {
  const sampleData = [
    {
      sku: 'EX-INV-150AH',
      name: 'Exide Inverter battery 150Ah - Invamaster',
      brand: 'Exide',
      category: 'Inverter Batteries',
      sub_category: 'Tubular Battery',
      description: 'High performance tubular battery for long power backups in Varanasi.',
      price: 15500,
      discount_price: 13990,
      stock: 25,
      warranty_months: 36,
      battery_type: 'Tubular',
      capacity_ah: 150,
      weight_kg: 52,
      dimensions: '500x190x410 mm',
      image_urls: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e',
      status: 'active',
      tags: 'Authorized Exide, Best Seller'
    },
    {
      sku: 'LIV-UPS-1000',
      name: 'Livguard Smart UPS 1000VA',
      brand: 'Livguard',
      category: 'Home UPS',
      sub_category: 'Sinewave UPS',
      description: 'Heavy duty home UPS system supporting sensitive electronics.',
      price: 8500,
      discount_price: 7490,
      stock: 12,
      warranty_months: 24,
      battery_type: 'UPS System',
      capacity_ah: 0,
      weight_kg: 10,
      dimensions: '300x250x150 mm',
      image_urls: '',
      status: 'active',
      tags: 'Recommended'
    }
  ];

  const worksheet = XLSX.utils.json_to_sheet(sampleData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
}
