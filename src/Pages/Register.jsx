import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderImage from "../assets/Pictures/disdukcapil.png";
import BackgroundImage from "../assets/Pictures/logodisdukcapil.png";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import axios from "axios"; // Import axios untuk melakukan HTTP request

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    namaLengkap: "",
    nim: "",
    nik: "",
    password: "",
    email: "",
    noTelp: "",
    asalUniversitas: "",
    jurusan: "",
    photo: null,
    cv: null,
    score_list: null,
  });
  const navigate = useNavigate();

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.namaLengkap);
    formDataToSend.append("nim", formData.nim);
    formDataToSend.append("nik", formData.nik);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("telp", formData.noTelp);
    formDataToSend.append("universitas", formData.asalUniversitas);
    formDataToSend.append("major", formData.jurusan);
    formDataToSend.append("photo", formData.photo);
    formDataToSend.append("cv", formData.cv);
    formDataToSend.append("score_list", formData.score_list);
    console.log("response1",formDataToSend)
  
    try {
      const response = await axios.post('http://localhost:5000/api/user/register', formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.status === 201) {
        console.log("response", response)
        alert("Registrasi berhasil!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registrasi gagal. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-gray-100 relative">
      {/* Background Image */}
      <div className="absolute inset-0 flex justify-center items-center z-0">
        <img
          src={BackgroundImage}
          alt="Background"
          className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] object-cover opacity-20"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col">
        {/* Header Section */}
        <div className="w-full bg-gradient-to-t from-red-500 to-red-700 text-white py-16 relative rounded-b-3xl">
          <img
            src={HeaderImage}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
          <h2 className="text-5xl font-bold text-center text-gray-800 mb-4">
            <span className="text-black">Registrasi</span>{" "}
            <span className="text-white">Akun</span>
          </h2>
          <p className="text-center text-lg relative z-10">
            Daftar Akun Anda Untuk Dapat Mendaftar Magang
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex justify-center items-center px-4 py-8"
        >
          <div className="bg-transparent rounded-lg p-8 w-full max-w-4xl flex flex-col space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Input Section - Left Side */}
              <div className="flex flex-col space-y-4">
             {/* NIK */}
             <div className="mb-4">
                  <label htmlFor="nik" className="block text-gray-700 text-left">
                    NIK
                  </label>
                  <input
                    type="text"
                    id="nik"
                    name="nik"
                    value={formData.nik}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545]"
                    placeholder="NIK"
                  />
                </div>
            
                {/* Nama Lengkap */}
                <div className="mb-4">
                  <label
                    htmlFor="namaLengkap"
                    className="block text-gray-700 text-left"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="namaLengkap"
                    name="namaLengkap"
                    value={formData.namaLengkap}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545]"
                    placeholder="Nama Lengkap"
                  />
                </div>

                {/* NIM */}
                <div className="mb-4">
                  <label htmlFor="nim" className="block text-gray-700 text-left">
                    NIM
                  </label>
                  <input
                    type="text"
                    id="nim"
                    name="nim"
                    value={formData.nim}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545]"
                    placeholder="NIM"
                  />
                </div>

               

                {/* Password */}
                <div className="mb-4 relative">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-left"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545] pr-12"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Input Section - Right Side */}
              <div className="flex flex-col space-y-4">
                {/* Email */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-left">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545]"
                    placeholder="Email"
                  />
                </div>

                {/* No. Telp */}
                <div className="mb-4">
                  <label htmlFor="noTelp" className="block text-gray-700 text-left">
                    No. Telp
                  </label>
                  <input
                    type="text"
                    id="noTelp"
                    name="noTelp"
                    value={formData.noTelp}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545]"
                    placeholder="No. Telp"
                  />
                </div>

                {/* Asal Universitas */}
                <div className="mb-4">
                  <label
                    htmlFor="asalUniversitas"
                    className="block text-gray-700 text-left"
                  >
                    Asal Universitas
                  </label>
                  <input
                    type="text"
                    id="asalUniversitas"
                    name="asalUniversitas"
                    value={formData.asalUniversitas}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545]"
                    placeholder="Asal Universitas"
                  />
                </div>

                {/* Jurusan */}
                <div className="mb-4">
                  <label htmlFor="jurusan" className="block text-gray-700 text-left">
                    Jurusan
                  </label>
                  <input
                    type="text"
                    id="jurusan"
                    name="jurusan"
                    value={formData.jurusan}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545]"
                    placeholder="Jurusan"
                  />
                </div>
              </div>
            </div>

            {/* Upload Section */}
            <div className="space-y-6">
              {/* Upload Foto */}
              <div className="border rounded p-4 mb-4">
                <label className="font-semibold block mb-2">Upload Foto</label>
                <div className="flex items-center">
                  <label className="bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-l cursor-pointer hover:bg-gray-300">
                    Choose File
                    <input
                      type="file"
                      className="hidden"
                      name="photo"
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="bg-white text-gray-500 py-2 px-4 border border-l-0 rounded-r flex-1">
                    {formData.photo ? formData.photo.name : "Upload Foto"}
                  </span>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  Unggah dalam format JPG atau PNG dengan ukuran maksimal 5 MB.
                </p>
              </div>

              {/* Upload CV */}
              <div className="border rounded p-4 mb-4">
                <label className="font-semibold block mb-2">Upload CV</label>
                <div className="flex items-center">
                  <label className="bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-l cursor-pointer hover:bg-gray-300">
                    Choose File
                    <input
                      type="file"
                      className="hidden"
                      name="cv"
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="bg-white text-gray-500 py-2 px-4 border border-l-0 rounded-r flex-1">
                    {formData.cv ? formData.cv.name : "Upload CV"}
                  </span>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  Unggah dalam format PDF dengan ukuran maksimal 5 MB.
                </p>
              </div>

              {/* Upload Transkrip Nilai */}
              <div className="border rounded p-4 mb-4">
                <label className="font-semibold block mb-2">
                  Upload Transkrip Nilai
                </label>
                <div className="flex items-center">
                  <label className="bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-l cursor-pointer hover:bg-gray-300">
                    Choose File
                    <input
                      type="file"
                      className="hidden"
                      name="score_list"
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="bg-white text-gray-500 py-2 px-4 border border-l-0 rounded-r flex-1">
                    {formData.score_list
                      ? formData.score_list.name
                      : "Upload Transkrip Nilai"}
                  </span>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  Unggah dalam format PDF dengan ukuran maksimal 5 MB.
                </p>
              </div>
            </div>

            <button type="submit" className="py-3 px-10 bg-[#D24545] text-white font-semibold rounded-lg">
              Simpan
            </button>

            {/* Buttons Section */}
            <div className="flex justify-center space-x-8">
              <p className="mt-6 text-center text-gray-600">
                Sudah punya akun?{" "}
                <button
                  className="text-[#D24545] hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </form>

        {/* Footer Section */}
        <div className="text-center w-full bg-gradient-to-t from-red-500 to-red-700 text-white py-6 relative z-10 rounded-t-3xl flex justify-center items-center">
          <p className="text-sm">
            © 2023 Disdukcapil. All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;