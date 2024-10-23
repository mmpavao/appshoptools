import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import AddSupplierModal from '../../components/Suppliers/AddSupplierModal';
import SupplierCard from '../../components/Suppliers/SupplierCard';
import { Supplier } from '../../types/supplier';
import { getSuppliers, addSupplier, updateSupplier } from '../../services/firebase/suppliers';
import { useAuthStore } from '../../store/authStore';

const SuppliersPage = () => {
  const { user } = useAuthStore();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.companyId) {
      loadSuppliers();
    }
  }, [user?.companyId]);

  const loadSuppliers = async () => {
    if (!user?.companyId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getSuppliers(user.companyId);
      setSuppliers(data);
    } catch (err) {
      setError('Failed to load suppliers. Please try again later.');
      console.error('Error loading suppliers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSupplier = async (supplierData: Partial<Supplier>) => {
    if (!user?.companyId) {
      setError('User company not found');
      return;
    }

    try {
      if (editingSupplier) {
        const updated = await updateSupplier(editingSupplier.id, supplierData);
        setSuppliers(suppliers.map(supplier => 
          supplier.id === editingSupplier.id 
            ? { ...supplier, ...updated }
            : supplier
        ));
      } else {
        const newSupplier = await addSupplier({
          ...supplierData as Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>,
          companyId: user.companyId
        });
        setSuppliers([newSupplier, ...suppliers]);
      }
      handleCloseModal();
    } catch (err) {
      console.error('Error saving supplier:', err);
      setError('Failed to save supplier. Please try again.');
    }
  };

  const handleEditSupplier = (id: string) => {
    const supplier = suppliers.find(s => s.id === id);
    if (supplier) {
      setEditingSupplier(supplier);
      setIsAddModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingSupplier(null);
    setError(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Suppliers</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Supplier
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {suppliers.map((supplier) => (
          <SupplierCard
            key={supplier.id}
            supplier={supplier}
            onEdit={handleEditSupplier}
          />
        ))}
      </div>

      {suppliers.length === 0 && !error && (
        <div className="text-center py-12 text-gray-500">
          No suppliers found. Click "Add Supplier" to create one.
        </div>
      )}

      <AddSupplierModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onSave={handleAddSupplier}
        initialData={editingSupplier}
      />
    </div>
  );
};

export default SuppliersPage;