"use client";

import React, { useState } from "react";
import {
  Gauge,
  Droplet,
  Thermometer,
  AlertTriangle,
  Send,
  Heart,
  FileText,
  Calendar,
  CheckCircle,
} from "lucide-react";

interface HealthData {
  tanggal: string;
  gulaDarah: string;
  kolesterol: string;
  asamUrat: string;
  tekananDarah: string;
  catatan: string;
}

const initialData: HealthData = {
  tanggal: new Date().toISOString().split("T")[0],
  gulaDarah: "",
  kolesterol: "",
  asamUrat: "",
  tekananDarah: "",
  catatan: "",
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  info = "",
  icon: Icon,
  required = false,
}: any) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm ${
          Icon ? "pl-9" : ""
        } transition duration-150`}
      />
    </div>
    {info && <p className="text-xs text-gray-500 mt-1">{info}</p>}
  </div>
);

const InputDataForm = () => {
  const [data, setData] = useState<HealthData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    console.log("Data submitted:", data);

    setTimeout(() => {
      setIsSubmitting(false);
      setMessage({
        type: "success",
        text: "Data kesehatan berhasil disimpan! Silakan tunggu analisis AI Anda.",
      });
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-xl border border-gray-100 max-w-5xl w-full mx-auto"
    >
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Input Data Kesehatan Harian
        </h2>
        <button
          type="reset"
          onClick={() => setData(initialData)}
          className="flex items-center text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors"
        >
          <CheckCircle className="w-4 h-4 mr-1" /> Reset Form
        </button>
      </div>

      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-100">
            Metrik Vital dan Hasil Lab
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <InputField
              label="Tanggal Pengambilan Data"
              name="tanggal"
              type="date"
              value={data.tanggal}
              onChange={handleChange}
              icon={Calendar}
              required={true}
            />
            <InputField
              label="Gula Darah (mg/dL)"
              name="gulaDarah"
              type="number"
              value={data.gulaDarah}
              onChange={handleChange}
              placeholder="Masukkan hasil Gula Darah"
              icon={Droplet}
              required={true}
            />

            <InputField
              label="Kolesterol Total (mg/dL)"
              name="kolesterol"
              type="number"
              value={data.kolesterol}
              onChange={handleChange}
              placeholder="Masukkan hasil Kolesterol"
              icon={Heart}
              required={true}
            />
            <InputField
              label="Asam Urat (mg/dL)"
              name="asamUrat"
              type="number"
              value={data.asamUrat}
              onChange={handleChange}
              placeholder="Masukkan hasil Asam Urat"
              icon={Gauge}
              required={true}
            />

            <div className="md:col-span-2">
              <InputField
                label="Tekanan Darah (Sistolik/Diastolik)"
                name="tekananDarah"
                type="text"
                value={data.tekananDarah}
                onChange={handleChange}
                placeholder="Contoh: 120/80"
                icon={Thermometer}
                required={true}
                info="Gunakan format Sistolik/Diastolik."
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-100">
            Catatan dan Riwayat
          </h3>

          <label
            htmlFor="catatan"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Catatan Tambahan (Gejala, Obat, atau Aktivitas)
          </label>
          <textarea
            id="catatan"
            name="catatan"
            rows={4}
            value={data.catatan}
            onChange={handleChange}
            placeholder="Informasi ini membantu AI menganalisis kesehatan Anda lebih akurat..."
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 transition duration-150 resize-none"
          />
        </div>

        {message && (
          <div
            className={`p-4 mb-4 rounded-xl flex items-start ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <AlertTriangle className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 flex justify-end items-center space-x-3 bg-gray-50 rounded-b-xl">
        <button
          type="button"
          onClick={() => setData(initialData)}
          className="px-6 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-150"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center px-6 py-2 text-sm font-bold rounded-lg text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {isSubmitting ? (
            "Menyimpan..."
          ) : (
            <>
              <Send className="w-4 h-4 mr-2 transform rotate-[315deg]" />
              Simpan Data
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default InputDataForm;
