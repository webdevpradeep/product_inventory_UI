// src/components/CategoryForm.jsx
import React, { useEffect, useState } from 'react';

export default function CategoryForm({
  category = null,
  onSave,
  onCancel,
  onDelete,
}) {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(category?.name || '');
  }, [category]);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('Name required');
    const payload = category ? { ...category, name } : { name };
    onSave(payload);
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        className="w-full border p-2 rounded"
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <div className="flex justify-end gap-2">
        {category && (
          <button
            type="button"
            onClick={() => onDelete(category.id)}
            className="px-3 py-2 bg-red-100 rounded"
          >
            Delete
          </button>
        )}
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-2 bg-gray-200 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-2 bg-indigo-600 text-white rounded"
        >
          {category ? 'Update' : 'Save'}
        </button>
      </div>
    </form>
  );
}
