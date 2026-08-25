"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { 
  Upload, 
  X, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Loader2, 
  Sparkles,
  ShieldCheck
} from "lucide-react";

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function BulkUploadModal({ isOpen, onClose, onSuccess }: BulkUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleDownloadTemplate = () => {
    const templateData = [
      {
        model_sku: "EX-IT500-150AH",
        brand_name: "Exide",
        brand_series: "Inva Tubular Heavy Duty",
        capacity: "150 Ah",
        voltage: "12V",
        plate_technology: "Tall Tubular Technology",
        total_warranty_months: 60,
        foc_months: 36,
        pro_rata_months: 24,
        approx_mrp: 18500,
        image_url: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e",
        is_in_stock: true,
        initial_quantity: 15,
        features: "High pressure spine cast;Factory charged;Low maintenance",
      },
      {
        model_sku: "LUM-EV-NEO-1050",
        brand_name: "Luminous",
        brand_series: "Eco Volt Neo",
        capacity: "900 VA",
        voltage: "12V DC",
        plate_technology: "Pure Sine Wave",
        total_warranty_months: 24,
        foc_months: 24,
        pro_rata_months: 0,
        approx_mrp: 7200,
        image_url: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5",
        is_in_stock: true,
        initial_quantity: 8,
        features: "Fast Charging Technology;Adaptive battery support",
      },
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Product_Template");
    XLSX.writeFile(wb, "Pivasa_Power_Products_Template.xlsx");
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/products/bulk-upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
      if (data.success && onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setResult({ error: err.message || "Failed to upload file." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-black uppercase text-primary tracking-wider">
              Catalog Management
            </span>
            <h2 className="text-2xl font-black text-navy">Bulk Upload Products (Excel / CSV)</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-navy hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Instructions & Template Download */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-navy flex items-center gap-1.5">
              <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
              Download Standard Excel Template
            </span>
            <button
              onClick={handleDownloadTemplate}
              className="bg-navy hover:bg-navy-light text-white font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Download className="h-3.5 w-3.5" /> Download .XLSX Template
            </button>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Include columns: <code className="text-navy font-bold">model_sku</code>, <code className="text-navy font-bold">brand_name</code>, <code className="text-navy font-bold">approx_mrp</code>, <code className="text-navy font-bold">image_url</code>, and <code className="text-navy font-bold">is_in_stock</code>. Remote image URLs will be automatically downloaded and stored in Supabase Storage.
          </p>
        </div>

        {/* File Dropzone */}
        <div className="border-2 border-dashed border-slate-300 hover:border-primary rounded-2xl p-8 text-center space-y-4 transition-colors bg-slate-50/50">
          <Upload className="h-10 w-10 text-primary mx-auto" />
          <div>
            <label className="cursor-pointer">
              <span className="text-primary font-bold hover:underline text-sm">Click to select an Excel / CSV file</span>
              <input
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
            <p className="text-xs text-slate-400 mt-1">Supports .xlsx, .xls and .csv (Max 15MB)</p>
          </div>

          {file && (
            <div className="inline-flex items-center gap-2 bg-navy text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm">
              <FileSpreadsheet className="h-4 w-4 text-emerald-400" />
              <span>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
            </div>
          )}
        </div>

        {/* Results / Progress Status */}
        {result && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            {result.error ? (
              <div className="flex items-center gap-2 text-xs font-bold text-rose-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>Upload Failed: {result.error}</span>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 mb-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>
                    Upload Completed! Processed {result.totalRows} rows: {result.successCount} succeeded, {result.failedCount} failed.
                  </span>
                </div>

                {result.errors && result.errors.length > 0 && (
                  <div className="mt-3 max-h-36 overflow-y-auto space-y-1.5 text-[11px] bg-white p-3 rounded-xl border border-slate-200">
                    <div className="font-bold text-rose-700 uppercase">Errors encountered:</div>
                    {result.errors.map((err: any, idx: number) => (
                      <div key={idx} className="text-slate-600">
                        • <strong className="text-navy">{err.sku}:</strong> {err.error}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="bg-primary hover:bg-primary-hover disabled:bg-slate-300 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs shadow-md shadow-primary/20 transition-all flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Ingesting & Fetching Images...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" /> Start Ingestion
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
