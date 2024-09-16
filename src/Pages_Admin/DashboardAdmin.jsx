import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserGroupIcon, DocumentTextIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom"; // Import Link dari react-router-dom
import Sidebar from "../ComponentsAdmin/SidebarAdmin";
import Header from "../ComponentsAdmin/HeaderAdmin";

const DashboardAdmin = () => {
  const [applicantsData, setApplicantsData] = useState([]);
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [verifyingApplicants, setVerifyingApplicants] = useState(0);
  const [acceptedApplicants, setAcceptedApplicants] = useState(0);
  const [rejectedApplicants, setRejectedApplicants] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Anda belum login. Silakan login terlebih dahulu.");
        window.location.href = "/loginadmin";
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setApplicantsData(response.data.applicantsList || []);
        setTotalApplicants(response.data.totalApplicants || 0);
        setVerifyingApplicants(response.data.verifyingApplicants || 0);
        setAcceptedApplicants(response.data.acceptedApplicants || 0);
        setRejectedApplicants(response.data.rejectedApplicants || 0);
      } catch (error) {
        console.error("Error fetching applicants data:", error);

        if (error.response && error.response.status === 401) {
          setError("Akses tidak diizinkan. Silakan login ulang.");
          localStorage.removeItem("token");
          window.location.href = "/loginadmin";
        } else {
          setError("Data tidak dapat diambil");
        }
      }
    };

    fetchData();
  }, []);

  const handleUpdateStatus = async (userId, status) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Anda belum login. Silakan login terlebih dahulu.");
      window.location.href = "/loginadmin";
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/updateUserStatus2",
        { userId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.href = response.request.responseURL; // Redirect to WhatsApp link
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Gagal memperbarui status");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header className="relative z-20" />

      <div className="flex-1 flex flex-col ml-64 pt-16 p-6 mt-10 bg-gray-100">
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white p-8 rounded shadow flex items-center">
                <UserGroupIcon className="h-16 w-16 text-blue-500 mr-4" />
                <div>
                  <h3 className="text-xl font-bold">Jumlah Lamaran</h3>
                  <p className="text-4xl">{totalApplicants}</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded shadow flex items-center">
                <DocumentTextIcon className="h-16 w-16 text-green-500 mr-4" />
                <div>
                  <h3 className="text-xl font-bold">Lamaran Diproses</h3>
                  <p className="text-4xl">{verifyingApplicants}</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded shadow flex items-center">
                <CheckCircleIcon className="h-16 w-16 text-green-500 mr-4" />
                <div>
                  <h3 className="text-xl font-bold">Lamaran Diterima</h3>
                  <p className="text-4xl">{acceptedApplicants}</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded shadow flex items-center">
                <XCircleIcon className="h-16 w-16 text-red-500 mr-4" />
                <div>
                  <h3 className="text-xl font-bold">Lamaran Ditolak</h3>
                  <p className="text-4xl">{rejectedApplicants}</p>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-white p-4 rounded shadow relative">
              <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2 mb-4">
                <h3 className="text-xl font-bold">Data Pelamar</h3>
                <Link to="/hasildaftarmagang" className="text-blue-500 hover:underline">Lihat Selengkapnya</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Nama</th>
                      <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Jenjang Pendidikan</th>
                      <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Tanggal Pendaftaran</th>
                      <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Status</th>
                      <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicantsData.length > 0 ? (
                      applicantsData.map((peserta, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border-b">{peserta.user.name}</td>
                          <td className="py-2 px-4 border-b">{peserta.user.University?.univ_name || "N/A"}</td>
                          <td className="py-2 px-4 border-b">{new Date(peserta.user.createdAt).toLocaleDateString()}</td>
                          <td className="py-2 px-4 border-b">{peserta.user.status}</td>
                          <td className="py-2 px-4 border-b flex flex-row">
                            <button
                              className="ml-2 px-4 py-2 w-full bg-green-500 text-white rounded hover:bg-green-600"
                              onClick={() => handleUpdateStatus(peserta.user._id, 'Accepted')}
                            >
                              Terima
                            </button>
                            <button
                              className="ml-2 px-4 py-2 w-full bg-red-500 text-white rounded hover:bg-red-600"
                              onClick={() => handleUpdateStatus(peserta.user._id, 'Rejected')}
                            >
                              Tolak
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-2 px-4 border-b text-center">Tidak ada data pendaftar</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;