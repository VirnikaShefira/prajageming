import React, { useState, useEffect } from "react";
import Header from "../ComponentsAdmin/HeaderAdmin";
import * as XLSX from "xlsx";
import axios from "axios";

const PAGE_SIZE = 10;

const DataPengguna = () => {
  const [pesertaData, setPesertaData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/users", {
          // const response = await axios.get("https://prajagamer-backend-64316396636.asia-southeast2.run.app/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPesertaData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(pesertaData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data Pelamar Magang");
    XLSX.writeFile(wb, "Data_Pelamar_Magang.xlsx");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleStatusChange = async (userId, status) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/status",
        { userId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User status updated:", response.data);
      // Optionally, fetch data again to update UI
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentData = pesertaData.slice(startIndex, startIndex + PAGE_SIZE);
  const totalPages = Math.ceil(pesertaData.length / PAGE_SIZE);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options); // 'id-ID' untuk format tanggal Indonesia
  };

  return (
    <div className="flex flex-col h-screen">
      <Header className="relative z-20" />
      <div className="flex-1 flex flex-col ml-64 pt-16 p-6 mt-10 bg-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Data Pengguna</h3>
          <button
            onClick={handleExportToExcel}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          >
            Export to Excel
          </button>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="bg-white p-4 rounded shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Nama</th>
                    <th className="py-2 px-4 border-b">NIM</th>
                    <th className="py-2 px-4 border-b">NIK</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">No. Telp</th>
                    <th className="py-2 px-4 border-b">Asal Pendidikan</th>
                    <th className="py-2 px-4 border-b">Jurusan</th>
                    <th className="py-2 px-4 border-b">Foto</th>
                    <th className="py-2 px-4 border-b">CV</th>
                    <th className="py-2 px-4 border-b">Transkrip Nilai</th>
                    <th className="py-2 px-4 border-b">
                      Tanggal Pembuatan Akun
                    </th>
                    <th className="py-2 px-4 border-b">Status Akun</th>
                    <th className="py-2 px-4 border-b">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((peserta) => {
                    console.log(peserta); // Debug data peserta
                    return (
                      <tr key={peserta.id}>
                        <td className="py-2 px-4 border-b">{peserta.name}</td>
                        <td className="py-2 px-4 border-b">
                          {peserta.University.nim}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {peserta.Profile.nik}
                        </td>
                        <td className="py-2 px-4 border-b">{peserta.email}</td>
                        <td className="py-2 px-4 border-b">
                          {peserta.Profile.telp_user}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {peserta.University.univ_name}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {peserta.University.major}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {peserta.Profile.photo ? (
                            <a
                              href={'http://localhost:5000/uploads/'+peserta.Profile.photo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              Lihat Foto
                            </a>
                          ) : (
                            "Foto tidak tersedia"
                          )}
                        </td>

                        <td className="py-2 px-4 border-b">
                          {peserta.Regist.cv ? (
                            <a
                              href={'http://localhost:5000/uploads/'+peserta.Regist.cv}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              Lihat CV
                            </a>
                          ) : (
                            "CV tidak tersedia"
                          )}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {peserta.Regist.score_list ? (
                            <a
                              href={'http://localhost:5000/uploads/'+peserta.Regist.score_list}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              Lihat Transkrip
                            </a>
                          ) : (
                            "Transkrip tidak tersedia"
                          )}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {formatDate(peserta.createdAt)}
                        </td>
                        <td className="py-2 px-4 border-b">{peserta.status}</td>
                        <td className="py-2 px-4 border-b flex flex-row w-72">
                          <button
                            onClick={() =>
                              handleStatusChange(peserta.id, "Verifying")
                            }
                            className="ml-2 px-4 py-2 w-full bg-green-500 text-white rounded hover:bg-green-600 hover:underline"
                          >
                            Terima
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(peserta.id, "NotVerifying")
                            }
                            className="ml-2 px-4 py-2 w-full bg-red-500 text-white rounded hover:bg-red-600 hover:underline"
                          >
                            Tolak
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded shadow hover:bg-gray-400"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded shadow hover:bg-gray-400"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataPengguna;