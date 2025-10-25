import React, { useState, useEffect } from 'react';
import {
  User, Bell, HelpCircle, Menu, Plus, Eye, Trash2, Edit, X,
  ChevronDown, Upload, Paperclip, Copy, Check, Briefcase,
  BookOpen, Code, Linkedin, Phone, Mail, MapPin, Calendar,
  UserCheck, Building, GraduationCap, Star, List, GripVertical,
  AlertCircle, Loader2
} from 'lucide-react';

// --- Mock Data ---
const MOCK_USERS = [
  {
    id: '1',
    name: 'Dave Richards',
    email: 'dave@mail.com',
    contact: '+91 8332883854',
    avatar: 'https://placehold.co/128x128/E9D5FF/4C1D95?text=DR',
    basicInfo: {
      firstName: 'Dave',
      lastName: 'Richards',
      email: 'dave@mail.com',
      yearOfBirth: '1990',
      gender: 'Male',
      phone: '+91 8332883854',
      alternatePhone: '+91 9876543210',
      address: '123, Main St, Tech City',
      pincode: '560001',
      domicileState: 'Karnataka',
      domicileCountry: 'India',
    },
    educationSkills: {
      education: [
        { id: 1, school: 'Lincoln College', degree: 'Bachelors in Technology', course: 'Computer science engineering', year: '2012', grade: 'A' }
      ],
      skills: 'React, Node.js, Tailwind CSS, JavaScript, TypeScript',
      projects: 'User Management Dashboard, E-commerce Platform',
    },
    experience: {
      work: [
        { id: 1, domain: 'Technology', subdomain: 'MERN Stack', experience: '5 years' },
        { id: 2, domain: 'Fintech', subdomain: 'React Native', experience: '2 years' },
      ],
      linkedin: 'https://linkedin.com/in/daverichards',
      resume: 'dave_richards_resume.pdf',
    }
  },
  {
    id: '2',
    name: 'Abhishek Hari',
    email: 'hari@mail.com',
    contact: '+91 9123456789',
    avatar: 'https://placehold.co/128x128/E9D5FF/4C1D95?text=AH',
    basicInfo: { firstName: 'Abhishek', lastName: 'Hari', email: 'hari@mail.com', phone: '+91 9123456789' },
    educationSkills: { education: [], skills: '', projects: '' },
    experience: { work: [], linkedin: '', resume: '' },
  },
  {
    id: '3',
    name: 'Nishta Gupta',
    email: 'nishta@mail.com',
    contact: '+91 7123456789',
    avatar: 'https://placehold.co/128x128/E9D5FF/4C1D95?text=NG',
    basicInfo: { firstName: 'Nishta', lastName: 'Gupta', email: 'nishta@mail.com', phone: '+91 7123456789' },
    educationSkills: { education: [], skills: '', projects: '' },
    experience: { work: [], linkedin: '', resume: '' },
  },
];

// --- Utility Components ---

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full w-full">
    <Loader2 className="w-12 h-12 text-violet-600 animate-spin" />
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="flex flex-col items-center justify-center h-full w-full text-red-600">
    <AlertCircle className="w-16 h-16 mb-4" />
    <h3 className="text-xl font-semibold">An Error Occurred</h3>
    <p>{message}</p>
  </div>
);

// --- Header Component ---
const Header = () => (
  <header className="bg-white shadow-sm sticky top-0 z-40">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 md:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <div className="font-bold text-xl tracking-wider uppercase">
            LOGO
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-violet-600 p-1 rounded-full">
            <HelpCircle className="w-6 h-6" />
          </button>
          <button className="text-gray-600 hover:text-violet-600 p-1 rounded-full">
            <Bell className="w-6 h-6" />
          </button>
          <button className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
              <User className="w-5 h-5" />
            </span>
          </button>
        </div>
      </div>
    </div>
  </header>
);

// --- Add User Modal Component ---
const AddUserModal = ({ isOpen, onClose, onAddUser, setError, setLoading }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError("Name and Email are required.");
      return;
    }
    setLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      try {
        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          contact,
          avatar: `https://placehold.co/128x128/E9D5FF/4C1D95?text=${name.slice(0, 2).toUpperCase()}`,
          basicInfo: { firstName: name.split(' ')[0] || '', lastName: name.split(' ').slice(1).join(' ') || '', email, phone: contact },
          educationSkills: { education: [], skills: '', projects: '' },
          experience: { work: [], linkedin: '', resume: '' },
        };
        onAddUser(newUser);
        setName('');
        setEmail('');
        setContact('');
        onClose();
      } catch (err) {
        setError("Failed to add user.");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-end" onClick={onClose}>
      <div
        className="w-full max-w-md bg-white h-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Add User</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form className="flex-grow p-6 space-y-6 overflow-y-auto" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name of the user
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type here"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type here"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
              />
            </div>
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                Contact
              </label>
              <input
                type="tel"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Type here"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
              />
            </div>
          </form>

          {/* Footer */}
          <div className="flex justify-end items-center p-6 border-t space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Delete Confirmation Modal ---
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, userName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete User?</h3>
          <p className="text-sm text-gray-600 mb-6">
            Are you sure you want to delete <span className="font-medium">{userName}</span>? This action cannot be undone.
          </p>
          <div className="flex w-full space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- User List Component ---
const UserList = ({ users, onAddUserClick, onViewUser, onDeleteUserClick }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    {/* Card Header */}
    <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800">Users</h2>
      <button
        onClick={onAddUserClick}
        className="flex items-center space-x-2 px-4 py-2 bg-violet-600 text-white rounded-md text-sm font-medium hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
      >
        <Plus className="w-4 h-4" />
        <span>Add user</span>
      </button>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sr. No
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              E-mail
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onViewUser(user.id)}
                    className="text-gray-500 hover:text-violet-600"
                    title="View"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDeleteUserClick(user.id)}
                    className="text-gray-500 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- User Profile Components ---

const ProfileHeader = ({ user, onBack }) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    // This method is more reliable inside iframes
    const el = document.createElement('textarea');
    el.value = user.email;
    document.body.appendChild(el);
    el.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
    document.body.removeChild(el);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
      <button onClick={onBack} className="text-sm text-violet-600 hover:underline mb-4">&larr; Back to all users</button>
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-violet-100 object-cover"
          onError={(e) => e.target.src = 'https://placehold.co/128x128/E9D5FF/4C1D95?text=USER'}
        />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{user.name}</h1>
          <div className="flex items-center space-x-2 text-gray-600 mt-2">
            <Mail className="w-4 h-4" />
            <span>{user.email}</span>
            <button onClick={copyEmail} className="text-gray-500 hover:text-violet-600">
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 mt-1">
            <Phone className="w-4 h-4" />
            <span>{user.contact}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ['Basic info', 'Education & Skills', 'Experience'];
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              ${activeTab === tab
                ? 'border-violet-500 text-violet-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none
            `}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

// --- Form Section Wrapper ---
const FormSection = ({ title, children, isEditing, onEditToggle }) => (
  <div className="bg-white rounded-lg shadow-sm">
    <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <button
        onClick={onEditToggle}
        className="text-violet-600 hover:text-violet-800 p-1 rounded-full"
      >
        <Edit className="w-5 h-5" />
      </button>
    </div>
    <div className="p-4 sm:p-6">
      {children}
      {isEditing && (
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onEditToggle}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onEditToggle} // In a real app, this would be onSave
            className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700"
          >
            Save
          </button>
        </div>
      )}
    </div>
  </div>
);

// --- Input Field Component ---
const InputField = ({ label, id, value, onChange, placeholder, type = "text", disabled = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={!disabled}
      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
    />
  </div>
);

const SelectField = ({ label, id, value, onChange, children, disabled = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      disabled={!disabled}
      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
    >
      {children}
    </select>
  </div>
);

const TextareaField = ({ label, id, value, onChange, placeholder, disabled = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={!disabled}
      rows="4"
      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
    ></textarea>
  </div>
);

// --- Profile Tab Content ---

const BasicInfoTab = ({ user, onUserUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user.basicInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Note: In a real app, onUserUpdate would be called on Save.
  // Here we just toggle. The data isn't actually saved.
  // To make it save, you'd call onUserUpdate with the new formData.

  return (
    <FormSection title="Basic Details" isEditing={isEditing} onEditToggle={() => setIsEditing(!isEditing)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InputField label="First name" id="firstName" value={formData.firstName} onChange={handleChange} placeholder="e.g. John" disabled={isEditing} />
        <InputField label="Last name" id="lastName" value={formData.lastName} onChange={handleChange} placeholder="e.g. Doe" disabled={isEditing} />
        <InputField label="Email ID" id="email" type="email" value={formData.email} onChange={handleChange} placeholder="e.g. mrnobody@mail.com" disabled={isEditing} />
        
        <SelectField label="Year of birth" id="yearOfBirth" value={formData.yearOfBirth} onChange={handleChange} disabled={isEditing}>
          <option value="">YYYY</option>
          {Array.from({ length: 50 }, (_, i) => 2023 - i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </SelectField>
        <SelectField label="Gender" id="gender" value={formData.gender} onChange={handleChange} disabled={isEditing}>
          <option value="">Select an option</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </SelectField>
        <InputField label="Phone number" id="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. 8332883854" disabled={isEditing} />
        
        <InputField label="Alternate Phone no" id="alternatePhone" value={formData.alternatePhone} onChange={handleChange} placeholder="e.g. 9876543210" disabled={isEditing} />
        <InputField label="Address" id="address" value={formData.address} onChange={handleChange} placeholder="Enter here" disabled={isEditing} />
        <InputField label="Pincode" id="pincode" value={formData.pincode} onChange={handleChange} placeholder="Enter here" disabled={isEditing} />
        
        <SelectField label="Domicile state" id="domicileState" value={formData.domicileState} onChange={handleChange} disabled={isEditing}>
          <option value="">Select an option</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Delhi">Delhi</option>
        </SelectField>
        <SelectField label="Domicile country" id="domicileCountry" value={formData.domicileCountry} onChange={handleChange} disabled={isEditing}>
          <option value="">Select an option</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </SelectField>
      </div>
    </FormSection>
  );
};

const EducationSkillsTab = ({ user, onUserUpdate }) => {
  const [isEduEditing, setIsEduEditing] = useState(false);
  const [isSkillsEditing, setIsSkillsEditing] = useState(false);
  const [eduData, setEduData] = useState(user.educationSkills.education[0] || {});
  const [skillsData, setSkillsData] = useState({
    skills: user.educationSkills.skills,
    projects: user.educationSkills.projects
  });

  const handleEduChange = (e) => {
    const { name, value } = e.target;
    setEduData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    const { name, value } = e.target;
    setSkillsData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <FormSection title="Education Details" isEditing={isEduEditing} onEditToggle={() => setIsEduEditing(!isEduEditing)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="School / College" id="school" value={eduData.school} onChange={handleEduChange} placeholder="e.g. Lincoln College" disabled={isEduEditing} />
          <InputField label="Highest degree or equivalent" id="degree" value={eduData.degree} onChange={handleEduChange} placeholder="e.g. Bachelors in Technology" disabled={isEduEditing} />
          <InputField label="Course" id="course" value={eduData.course} onChange={handleEduChange} placeholder="e.g. Computer science engineering" disabled={isEduEditing} />
          <SelectField label="Year of completion" id="year" value={eduData.year} onChange={handleEduChange} disabled={isEduEditing}>
            <option value="">YYYY</option>
            {Array.from({ length: 20 }, (_, i) => 2024 - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </SelectField>
          <InputField label="Grade" id="grade" value={eduData.grade} onChange={handleEduChange} placeholder="Enter here" disabled={isEduEditing} />
        </div>
      </FormSection>

      <FormSection title="Skills & Projects" isEditing={isSkillsEditing} onEditToggle={() => setIsSkillsEditing(!isSkillsEditing)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextareaField label="Skills" id="skills" value={skillsData.skills} onChange={handleSkillsChange} placeholder="Enter here" disabled={isSkillsEditing} />
          <TextareaField label="Projects" id="projects" value={skillsData.projects} onChange={handleSkillsChange} placeholder="Enter here" disabled={isSkillsEditing} />
        </div>
      </FormSection>
    </div>
  );
};

const ExperienceTab = ({ user, onUserUpdate }) => {
  const [isWorkEditing, setIsWorkEditing] = useState(false);
  const [isLinksEditing, setIsLinksEditing] = useState(false);
  const [workData, setWorkData] = useState(user.experience.work[0] || {});
  const [linksData, setLinksData] = useState({
    linkedin: user.experience.linkedin,
    resume: user.experience.resume
  });

  const handleWorkChange = (e) => {
    const { name, value } = e.target;
    setWorkData(prev => ({ ...prev, [name]: value }));
  };

  const handleLinksChange = (e) => {
    const { name, value } = e.target;
    setLinksData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <FormSection title="Work Experience" isEditing={isWorkEditing} onEditToggle={() => setIsWorkEditing(!isWorkEditing)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputField label="Domain" id="domain" value={workData.domain} onChange={handleWorkChange} placeholder="e.g. Technology" disabled={isWorkEditing} />
          <InputField label="Sub-domain" id="subdomain" value={workData.subdomain} onChange={handleWorkChange} placeholder="e.g. MERN Stack" disabled={isWorkEditing} />
          <SelectField label="Experience" id="experience" value={workData.experience} onChange={handleWorkChange} disabled={isWorkEditing}>
            <option value="">Select an option</option>
            <option value="1 year">1 year</option>
            <option value="2 years">2 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5+ years">5+ years</option>
          </SelectField>
        </div>
        {/* In a real app, you'd map over user.experience.work and have an "Add" button */}
      </FormSection>

      <FormSection title="LinkedIn" isEditing={isLinksEditing} onEditToggle={() => setIsLinksEditing(!isLinksEditing)}>
        <InputField label="Profile URL" id="linkedin" value={linksData.linkedin} onChange={handleLinksChange} placeholder="e.g. linkedin.com/in/mrbean" disabled={isLinksEditing} />
      </FormSection>

      <FormSection title="Resume" isEditing={isLinksEditing} onEditToggle={() => setIsLinksEditing(!isLinksEditing)}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Resume
          </label>
          {isLinksEditing ? (
            <div className="flex items-center justify-center w-full">
              <label htmlFor="resume-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 5MB)</p>
                </div>
                <input id="resume-upload" type="file" className="hidden" />
              </label>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-300 rounded-md">
              <div className="flex items-center space-x-2 text-gray-700">
                <Paperclip className="w-5 h-5" />
                <span className="text-sm font-medium">{linksData.resume || 'No resume uploaded'}</span>
              </div>
              <button className="text-sm font-medium text-violet-600 hover:underline">
                View
              </button>
            </div>
          )}
        </div>
      </FormSection>
    </div>
  );
};


const UserProfile = ({ userId, users, onUserUpdate, onBack }) => {
  const [activeTab, setActiveTab] = useState('Basic info');
  const user = users.find(u => u.id === userId);

  if (!user) {
    return (
      <div className="text-center p-10">
        <h2 className="text-xl text-gray-700">User not found.</h2>
        <button onClick={onBack} className="text-sm text-violet-600 hover:underline mt-4">&larr; Back to all users</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProfileHeader user={user} onBack={onBack} />
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-6">
          {activeTab === 'Basic info' && <BasicInfoTab user={user} onUserUpdate={onUserUpdate} />}
          {activeTab === 'Education & Skills' && <EducationSkillsTab user={user} onUserUpdate={onUserUpdate} />}
          {activeTab === 'Experience' && <ExperienceTab user={user} onUserUpdate={onUserUpdate} />}
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('list'); // 'list' or 'profile'
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Load users from localStorage on initial render
  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      } else {
        setUsers(MOCK_USERS);
        localStorage.setItem('users', JSON.stringify(MOCK_USERS));
      }
    } catch (err) {
      setError("Failed to load user data. Please refresh the page.");
      console.error(err);
      setUsers(MOCK_USERS); // Fallback
    } finally {
      // Simulate loading time
      setTimeout(() => setLoading(false), 500);
    }
  }, []);

  // Persist users to localStorage whenever they change
  const updateUsers = (newUsers) => {
    setUsers(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
  };

  const handleAddUser = (newUser) => {
    const newUsers = [newUser, ...users];
    updateUsers(newUsers);
  };

  const handleDeleteUserClick = (userId) => {
    const user = users.find(u => u.id === userId);
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteUser = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newUsers = users.filter(u => u.id !== userToDelete.id);
      updateUsers(newUsers);
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
      setLoading(false);
    }, 500);
  };

  const handleViewUser = (userId) => {
    setSelectedUserId(userId);
    setView('profile');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedUserId(null);
  };
  
  // In a real app, this would take the updated user object
  const handleUserUpdate = () => {
    // This is a placeholder. 
    // The individual tabs would pass new user data here.
    console.log("User update logic goes here");
  }

  const renderContent = () => {
    if (loading && users.length === 0) {
      return <div className="p-10"><LoadingSpinner /></div>;
    }
    if (error) {
      return <div className="p-10"><ErrorMessage message={error} /></div>;
    }
    if (view === 'list') {
      return (
        <UserList
          users={users}
          onAddUserClick={() => setIsAddModalOpen(true)}
          onViewUser={handleViewUser}
          onDeleteUserClick={handleDeleteUserClick}
        />
      );
    }
    if (view === 'profile' && selectedUserId) {
      return (
        <UserProfile
          userId={selectedUserId}
          users={users}
          onUserUpdate={handleUserUpdate}
          onBack={handleBackToList}
        />
      );
    }
    return null; // Fallback
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </main>

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddUser={handleAddUser}
        setError={setError}
        setLoading={setLoading}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteUser}
        userName={userToDelete?.name}
      />
      
      {/* Global Loading Overlay */}
      {loading && view !== 'list' && (
        <div className="fixed inset-0 bg-white/70 z-50 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      
      {/* Global Error Toast */}
      {error && view === 'list' && (
         <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg flex items-center space-x-3">
            <AlertCircle className="w-6 h-6" />
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-4"><X className="w-5 h-5" /></button>
         </div>
      )}
    </div>
  );
}
