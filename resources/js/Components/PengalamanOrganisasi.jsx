import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function PengalamanOrganisasi({ formData, handleChange, isEditing, toggleEdit, handleSubmit }) {
    // State for skills
    const [skills, setSkills] = useState([{ keterampilan: '', level: '' }]);

    // State for experiences
    const [experiences, setExperiences] = useState([{
        organisationName: '',
        positionTitle: '',
        startDate: null,
        endDate: null,
        roleDescription: '',
        isOpen: true
    }]);

    // Function to add a skill field
    const addSkillField = () => {
        setSkills([...skills, { keterampilan: '', level: '' }]);
    };

    // Function to remove a skill
    const removeSkillField = (index) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        setSkills(updatedSkills);
    };

    // Function to handle skill input changes
    const handleSkillChange = (index, field, value) => {
        const updatedSkills = [...skills];
        updatedSkills[index][field] = value;
        setSkills(updatedSkills);
    };

    // Function to add an experience field
    const addExperienceField = () => {
        setExperiences([...experiences, {
            organisationName: '',
            positionTitle: '',
            startDate: null,
            endDate: null,
            roleDescription: '',
            isOpen: true
        }]);
    };

    // Function to remove an experience
    const removeExperienceField = (index) => {
        const updatedExperiences = experiences.filter((_, i) => i !== index);
        setExperiences(updatedExperiences);
    };

    // Function to handle experience input changes
    const handleExperienceChange = (index, field, value) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[index][field] = value;
        setExperiences(updatedExperiences);
    };

    // Function to toggle the experience form collapse
    const toggleExperienceCollapse = (index) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[index].isOpen = !updatedExperiences[index].isOpen;
        setExperiences(updatedExperiences);
    };

    return (
        <div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-6">Pengalaman Organisasi & Profesional</h3>

            {/* Section 1: Keterampilan */}
            <div className="mb-10">
                <h4 className="text-xl font-medium text-gray-700 mb-3">Keterampilan</h4>
                <p className="text-sm text-gray-500 mb-5">Tambahkan keterampilan yang relevan dengan pengalaman profesional Anda.</p>

                {skills.map((skill, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 mb-5 items-center">
                        {/* Keterampilan */}
                        <div className="col-span-5">
                            <input
                                type="text"
                                value={skill.keterampilan}
                                onChange={(e) => handleSkillChange(index, 'keterampilan', e.target.value)}
                                placeholder="Masukkan Keterampilan"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                                disabled={!isEditing}
                                required
                            />
                        </div>

                        {/* Level */}
                        <div className="col-span-5 relative">
                            <select
                                value={skill.level}
                                onChange={(e) => handleSkillChange(index, 'level', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 appearance-none"
                                disabled={!isEditing}
                                required
                            >
                                <option value="">Pilih Level</option>
                                <option value="Pemula">Pemula</option>
                                <option value="Menengah">Menengah</option>
                                <option value="Mahir">Mahir</option>
                            </select>
                        </div>

                        {/* Tombol Hapus */}
                        <div className="col-span-2 flex justify-end">
                            <button
                                type="button"
                                onClick={() => removeSkillField(index)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                                disabled={!isEditing}
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
                    disabled={!isEditing}
                >
                    + Tambah Keterampilan
                </button>
            </div>

            {/* Section 2: Pengalaman Organisasi & Profesional */}
            <div>
                <h4 className="text-xl font-medium text-gray-700 mb-3">Pengalaman Organisasi & Profesional</h4>

                {experiences.map((experience, index) => (
                    <div key={index} className="mb-6">
                        {/* Dropdown trigger */}
                        <button
                            type="button"
                            onClick={() => toggleExperienceCollapse(index)}
                            className="w-full text-left bg-gray-100 px-4 py-3 border border-gray-200 rounded-lg mb-3 flex justify-between items-center"
                        >
                            {experience.organisationName || 'Nama Organisasi'} - {experience.positionTitle || 'Nama Jabatan'}
                        </button>

                        {/* Experience form (collapsible) */}
                        {experience.isOpen && (
                            <div className="grid grid-cols-12 gap-4 mb-4">
                                {/* Organisation/Event Name */}
                                <div className="col-span-6">
                                    <input
                                        type="text"
                                        value={experience.organisationName}
                                        onChange={(e) => handleExperienceChange(index, 'organisationName', e.target.value)}
                                        placeholder="Masukkan Nama Organisasi"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                {/* Position Title */}
                                <div className="col-span-6">
                                    <input
                                        type="text"
                                        value={experience.positionTitle}
                                        onChange={(e) => handleExperienceChange(index, 'positionTitle', e.target.value)}
                                        placeholder="Masukkan Jabatan/Posisi"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                {/* Start Date */}
                                <div className="col-span-6">
                                    <DatePicker
                                        selected={experience.startDate}
                                        onChange={(date) => handleExperienceChange(index, 'startDate', date)}
                                        dateFormat="dd/MM/yyyy"
                                        className="min-w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                                        placeholderText="Tanggal Mulai"
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                {/* End Date */}
                                <div className="col-span-6">
                                    <DatePicker
                                        selected={experience.endDate}
                                        onChange={(date) => handleExperienceChange(index, 'endDate', date)}
                                        dateFormat="dd/MM/yyyy"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                                        placeholderText="Tanggal Berakhir"
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                {/* Role Description */}
                                <div className="col-span-12">
                                    <textarea
                                        value={experience.roleDescription}
                                        onChange={(e) => handleExperienceChange(index, 'roleDescription', e.target.value)}
                                        placeholder="Masukkan Deskripsi Tugas/Peran"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                                        disabled={!isEditing}
                                        rows="3"
                                        required
                                    ></textarea>
                                </div>

                                {/* Tombol Hapus */}
                                <div className="col-span-12 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => removeExperienceField(index)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
                                        disabled={!isEditing}
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
                    disabled={!isEditing}
                >
                    + Tambah Pengalaman
                </button>
            </div>

            {/* Tombol Ubah dan Simpan */}
            <div className="flex justify-end space-x-4 mt-8">
                {isEditing ? (
                    <button
                        type="submit"
                        className="bg-[#FFB900] text-white py-3 px-6 rounded-lg hover:bg-yellow-600 transition-all"
                    >
                        Simpan
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={toggleEdit}
                        className="bg-[#384AA0] text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all"
                    >
                        Ubah
                    </button>
                )}
            </div>
        </div>
    );
}
