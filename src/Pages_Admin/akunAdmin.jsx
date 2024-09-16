import React, { useState, useEffect } from "react";
import HeaderAdmin from "../ComponentsAdmin/HeaderAdmin";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import ModalTambahAdmin from "../ComponentsAdmin/modalTambahAdmin";

function AkunAdmin() {
  const [adminData, setAdminData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fungsi untuk fetch data admin dari server
  const fetchAdminData = async () => {
    const token = localStorage.getItem('token'); // Ambil token dari local storage
    if (!token) {
      setError("Anda belum login. Silakan login terlebih dahulu.");
      window.location.href = "/loginadmin"; // Redirect to login page if not logged in
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/admins', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Gagal mengambil data admin');
      }

      const data = await response.json();
      setAdminData(data); // Set data admin ke state
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  // Fetch data admin saat komponen pertama kali di-render
  useEffect(() => {
    fetchAdminData();
  }, []);

  // Fungsi untuk menghapus admin
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token'); // Ambil token dari local storage

    try {
      const response = await fetch(`http://localhost:5000/api/admin/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Gagal menghapus admin');
      }

      // Update state untuk menghapus admin
      setAdminData(adminData.filter(admin => admin.id !== id));
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  // Fungsi untuk membuka modal tambah admin
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal tambah admin
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Fungsi untuk menambahkan admin baru
  const handleAddAdmin = async (newAdmin) => {
    const token = localStorage.getItem('token');

    try {
      // Lakukan fetch ulang data admin setelah admin baru berhasil ditambahkan
      const response = await fetch('http://localhost:5000/api/admins', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Gagal mengambil data admin setelah penambahan');
      }

      const updatedAdminData = await response.json();
      setAdminData(updatedAdminData); // Perbarui state dengan data admin terbaru

    } catch (error) {
      console.error('Error fetching updated admin data:', error);
    }

    handleCloseModal(); // Tutup modal setelah admin ditambahkan
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <HeaderAdmin className="relative z-20" />

      {/* Main Content */}
      <div className="ml-64 pt-16 p-6 mt-5">
        <div className="mt-8 bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center pb-5">
            <h3 className="text-xl font-bold">Data Admin</h3>
            <div>
              {/* Button to open modal */}
              <button
                className="px-4 py-2 rounded-md bg-[#D24545] text-white font-semibold flex justify-center items-center gap-2"
                onClick={handleOpenModal}
              >
                <PlusCircleIcon className="h-5 w-5" />
                Tambah Admin
              </button>

              {/* Modal */}
              <ModalTambahAdmin
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onAddAdmin={handleAddAdmin} // Fungsi untuk menambah admin
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Nama</th>
                  <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">NIP</th>
                  <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">No. Telp</th>
                  <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Email</th>
                  <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {adminData.length > 0 ? (
                  adminData.map((admin) => (
                    <tr key={admin.id}>
                      <td className="py-2 px-4 border-b">{admin.admin_name}</td>
                      <td className="py-2 px-4 border-b">{admin.nip}</td>
                      <td className="py-2 px-4 border-b">{admin.telp_admin}</td>
                      <td className="py-2 px-4 border-b">{admin.email}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleDelete(admin.id)}
                          className="ml-2 text-red-500 hover:underline"
                        >
                          Hapus Akun
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">Tidak ada data admin</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AkunAdmin;