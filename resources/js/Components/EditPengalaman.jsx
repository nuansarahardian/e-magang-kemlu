import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { router } from "@inertiajs/react";
import moment from "moment";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function EditPengalaman({
    profilData,
    formData,
    setFormData,
    handleChange,
    switchComponent,
}) {
    const [skills, setSkills] = useState([]);
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        if (profilData) {
            setSkills(profilData.keterampilan || []);
            setExperiences(profilData.pengalaman || []);
        } else {
            setSkills([{ nama_keterampilan: "", level: "", id: null }]);
            setExperiences([
                {
                    posisi: "",
                    deskripsi: "",
                    tanggal_mulai: null,
                    tanggal_berakhir: null,
                    instansi: "",
                    isOpen: true,
                    id: null,
                },
            ]);
        }
    }, [profilData]);

    const handleSkillChange = (index, field, value) => {
        const updatedSkills = [...skills];
        updatedSkills[index][field] = value;
        setSkills(updatedSkills);
    };

    const handleExperienceChange = (index, field, value) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[index][field] = value;
        setExperiences(updatedExperiences);
    };

    const addSkillField = () => {
        setSkills([...skills, { nama_keterampilan: "", level: "", id: null }]);
    };

    const removeSkill = (id, index) => {
        if (id) {
            removeSkillFromDatabase(id);
        } else {
            setSkills(skills.filter((_, idx) => idx !== index));
        }
    };

    const removeSkillFromDatabase = (id) => {
        router.delete(route("keterampilan.destroy", id), {
            onSuccess: () => {
                setSkills(skills.filter((skill) => skill.id !== id));
                Swal.fire(
                    "Berhasil!",
                    "Keterampilan berhasil dihapus!",
                    "success"
                );
            },
            onError: (errors) => {
                Swal.fire(
                    "Gagal!",
                    "Terjadi kesalahan saat menghapus.",
                    "error"
                );
            },
        });
    };

    const addExperienceField = () => {
        setExperiences([
            ...experiences,
            {
                posisi: "",
                deskripsi: "",
                tanggal_mulai: null,
                tanggal_berakhir: null,
                instansi: "",
                isOpen: true,
                id: null,
            },
        ]);
    };

    const removeExperience = (id, index) => {
        if (id) {
            removeExperienceFromDatabase(id);
        } else {
            setExperiences(experiences.filter((_, idx) => idx !== index));
        }
    };

    const removeExperienceFromDatabase = (id) => {
        router.delete(route("pengalaman.destroy", id), {
            onSuccess: () => {
                setExperiences(
                    experiences.filter((experience) => experience.id !== id)
                );
                Swal.fire(
                    "Berhasil!",
                    "Pengalaman berhasil dihapus!",
                    "success"
                );
            },
            onError: (errors) => {
                Swal.fire(
                    "Gagal!",
                    "Terjadi kesalahan saat menghapus.",
                    "error"
                );
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validasi untuk memastikan semua input keterampilan terisi
        const validSkills = skills.every(
            (skill) => skill.nama_keterampilan && skill.level
        );
        const validExperiences = experiences.every(
            (experience) =>
                experience.posisi &&
                experience.deskripsi &&
                experience.tanggal_mulai &&
                experience.tanggal_berakhir &&
                experience.instansi
        );

        if (!validSkills) {
            Swal.fire(
                "Gagal!",
                "Pastikan semua input keterampilan terisi!",
                "error"
            );
            return;
        }

        if (!validExperiences) {
            Swal.fire(
                "Gagal!",
                "Pastikan semua input pengalaman terisi!",
                "error"
            );
            return;
        }

        const data = {
            skills: skills.map((skill) => ({
                id: skill.id,
                nama_keterampilan: skill.nama_keterampilan,
                level: skill.level,
            })),
            experiences: experiences.map((experience) => ({
                id: experience.id,
                posisi: experience.posisi,
                deskripsi: experience.deskripsi,
                tanggal_mulai: experience.tanggal_mulai
                    ? moment(experience.tanggal_mulai).format("YYYY-MM-DD")
                    : "",
                tanggal_berakhir: experience.tanggal_berakhir
                    ? moment(experience.tanggal_berakhir).format("YYYY-MM-DD")
                    : "",
                instansi: experience.instansi,
            })),
        };

        router.post(route("pengalaman-keterampilan.save"), data, {
            onSuccess: () => {
                Swal.fire("Berhasil!", "Data berhasil disimpan!", "success");
            },
            onError: (errors) => {
                Swal.fire(
                    "Gagal!",
                    "Terjadi kesalahan saat menyimpan.",
                    "error"
                );
            },
        });
    };

    const toggleExperienceCollapse = (index) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[index].isOpen = !updatedExperiences[index].isOpen;
        setExperiences(updatedExperiences);
    };

    return (
        <div className="px-3">
            <h3 className="text-3xl font-semibold text-gray-900 mb-6">
                Pengalaman Organisasi & Profesional
            </h3>
            {/* Section: Keterampilan */}
            <div className="mb-10">
                <h4 className="text-xl font-medium text-gray-700 mb-3">
                    Keterampilan
                </h4>
                {skills.map((skill, index) => (
                    <div
                        key={skill.id || index}
                        className="grid grid-cols-12 gap-4 mb-5 items-center"
                    >
                        <div className="col-span-5">
                            <input
                                type="text"
                                value={skill.nama_keterampilan}
                                onChange={(e) =>
                                    handleSkillChange(
                                        index,
                                        "nama_keterampilan",
                                        e.target.value
                                    )
                                }
                                placeholder="Masukkan Keterampilan"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="col-span-5">
                            <select
                                value={skill.level || ""}
                                onChange={(e) =>
                                    handleSkillChange(
                                        index,
                                        "level",
                                        e.target.value
                                    )
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            >
                                <option value="">Pilih Level</option>
                                <option value="pemula">Pemula</option>
                                <option value="menengah">Menengah</option>
                                <option value="mahir">Mahir</option>
                            </select>
                        </div>
                        <div className="col-span-2 flex justify-end">
                            <button
                                type="button"
                                onClick={() => removeSkill(skill.id, index)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addSkillField}
                    className="bg-blue-500 text-white py-2 px-5 rounded hover:bg-blue-600 transition-all"
                >
                    + Tambah Keterampilan
                </button>
            </div>
            {/* Section: Pengalaman */}
            <div>
                <h4 className="text-xl font-medium text-gray-700 mb-3">
                    Pengalaman Organisasi & Profesional
                </h4>
                {experiences.map((experience, index) => (
                    <div key={experience.id || index} className="mb-6">
                        <button
                            type="button"
                            onClick={() => toggleExperienceCollapse(index)}
                            className="w-full text-left bg-gray-100 px-4 py-3 border border-gray-200 rounded-lg mb-3 flex justify-between items-center"
                        >
                            {experience.instansi || "Nama Organisasi"} -{" "}
                            {experience.posisi || "Nama Jabatan"}
                        </button>
                        {experience.isOpen && (
                            <div className="grid grid-cols-12 gap-4 mb-4">
                                <div className="col-span-6">
                                    <input
                                        type="text"
                                        value={experience.instansi}
                                        onChange={(e) =>
                                            handleExperienceChange(
                                                index,
                                                "instansi",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Masukkan Nama Organisasi"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="col-span-6">
                                    <input
                                        type="text"
                                        value={experience.posisi}
                                        onChange={(e) =>
                                            handleExperienceChange(
                                                index,
                                                "posisi",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Masukkan Jabatan/Posisi"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="col-span-6">
                                    <DatePicker
                                        selected={experience.tanggal_mulai}
                                        onChange={(date) =>
                                            handleExperienceChange(
                                                index,
                                                "tanggal_mulai",
                                                date
                                            )
                                        }
                                        dateFormat="dd/MM/yyyy"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        placeholderText="Tanggal Mulai"
                                    />
                                </div>
                                <div className="col-span-6">
                                    <DatePicker
                                        selected={experience.tanggal_berakhir}
                                        onChange={(date) =>
                                            handleExperienceChange(
                                                index,
                                                "tanggal_berakhir",
                                                date
                                            )
                                        }
                                        dateFormat="dd/MM/yyyy"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        placeholderText="Tanggal Berakhir"
                                    />
                                </div>
                                <div className="col-span-12">
                                    <textarea
                                        value={experience.deskripsi}
                                        onChange={(e) =>
                                            handleExperienceChange(
                                                index,
                                                "deskripsi",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Masukkan Deskripsi Tugas/Peran"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div className="col-span-12 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeExperience(
                                                experience.id,
                                                index
                                            )
                                        }
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
                                    >
                                        Hapus Pengalaman
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addExperienceField}
                    className="bg-blue-500 text-white py-2 px-5 rounded hover:bg-blue-600 transition-all"
                >
                    + Tambah Pengalaman
                </button>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-[#FFB900] text-white py-3 px-6 rounded-lg hover:bg-yellow-600 transition w-full sm:w-auto"
                >
                    Simpan Semua Data
                </button>
            </div>
        </div>
    );
}
