import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { v4 as uuidv4 } from 'uuid';
import {
  IconBook,
  IconBriefcase,
  IconDeviceFloppy,
  IconFileDownload,
  IconHeart,
  IconLanguage,
  IconRefresh,
  IconUser,
} from '@tabler/icons-react';

import CVPreview from './CVPreview';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import ListForm from './ListForm';
import PersonalInfoForm from './PersonalInfoForm';

const initialCV = {
  personalInfo: {
    firstName: '',
    lastName: '',
    title: '',
    photo: '/Profile/awtar.png',
    address: '',
    phoneNumber: '',
    email: '',
    description: '',
  },
  experience: [
    {
      id: uuidv4(),
      position: '',
      company: '',
      city: '',
      from: '',
      to: '',
    },
  ],
  education: [
    {
      id: uuidv4(),
      universityName: '',
      city: '',
      degree: '',
      subject: '',
      from: '',
      to: '',
    },
  ],
  skills: [''],
  languages: [''],
  hobbies: [''],
};

const exampleCV = {
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    title: 'Senior Web Developer',
    photo: '/Profile/awtar.png',
    address: 'Example Street 10, Oklahoma',
    phoneNumber: '123456789',
    email: 'john.doe@gmail.com',
    description:
      'Experienced developer with a focus on building scalable web applications and keeping user interfaces simple.',
  },
  experience: [
    {
      id: uuidv4(),
      position: 'Senior Web Developer',
      company: 'Facebook Inc.',
      city: 'Menlo Park',
      from: '2015',
      to: 'Present',
    },
    {
      id: uuidv4(),
      position: 'Junior Web Developer',
      company: 'Tesla Inc.',
      city: 'Palo Alto',
      from: '2012',
      to: '2015',
    },
  ],
  education: [
    {
      id: uuidv4(),
      universityName: 'University of Technology',
      city: 'Oklahoma',
      degree: 'Master',
      subject: 'Computer Science',
      from: '2008',
      to: '2010',
    },
  ],
  skills: ['JavaScript', 'React', 'Node.js'],
  languages: ['English', 'Spanish'],
  hobbies: ['Reading', 'Cycling'],
};

const sections = [
  { id: 'personal', label: 'Personal', icon: IconUser },
  { id: 'experience', label: 'Experience', icon: IconBriefcase },
  { id: 'education', label: 'Education', icon: IconBook },
  { id: 'skills', label: 'Skills', icon: IconDeviceFloppy },
  { id: 'languages', label: 'Languages', icon: IconLanguage },
  { id: 'hobbies', label: 'Interests', icon: IconHeart },
];

const actionButtonClass =
  'rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800';

const SingleCVComponent = () => {
  const [cv, setCv] = useState(initialCV);
  const [activeSection, setActiveSection] = useState('personal');
  const previewRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
  });

  const handleChangePersonal = (event) => {
    const { name, value, files, type } = event.target;

    if (type === 'file') {
      const file = files?.[0];
      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setCv((currentCV) => ({
          ...currentCV,
          personalInfo: {
            ...currentCV.personalInfo,
            [name]: reader.result,
          },
        }));
      };
      reader.readAsDataURL(file);
      return;
    }

    setCv((currentCV) => ({
      ...currentCV,
      personalInfo: {
        ...currentCV.personalInfo,
        [name]: value,
      },
    }));
  };

  const updateCollectionItem = (collectionName, id, event) => {
    const { name, value } = event.target;

    setCv((currentCV) => ({
      ...currentCV,
      [collectionName]: currentCV[collectionName].map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      ),
    }));
  };

  const appendCollectionItem = (collectionName, itemFactory) => {
    setCv((currentCV) => ({
      ...currentCV,
      [collectionName]: [...currentCV[collectionName], itemFactory()],
    }));
  };

  const removeCollectionItem = (collectionName, id) => {
    setCv((currentCV) => ({
      ...currentCV,
      [collectionName]: currentCV[collectionName].filter((item) => item.id !== id),
    }));
  };

  const handleListChange = (collectionName, index, value) => {
    setCv((currentCV) => ({
      ...currentCV,
      [collectionName]: currentCV[collectionName].map((item, itemIndex) =>
        itemIndex === index ? value : item
      ),
    }));
  };

  const handleAddListItem = (collectionName) => {
    setCv((currentCV) => ({
      ...currentCV,
      [collectionName]: [...currentCV[collectionName], ''],
    }));
  };

  const handleDeleteListItem = (collectionName, index) => {
    setCv((currentCV) => ({
      ...currentCV,
      [collectionName]: currentCV[collectionName].filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'experience':
        return (
          <ExperienceForm
            experience={cv.experience}
            onChange={(event, id) => updateCollectionItem('experience', id, event)}
            onAdd={() =>
              appendCollectionItem('experience', () => ({
                id: uuidv4(),
                position: '',
                company: '',
                city: '',
                from: '',
                to: '',
              }))
            }
            onDelete={(id) => removeCollectionItem('experience', id)}
          />
        );
      case 'education':
        return (
          <EducationForm
            education={cv.education}
            onChange={(event, id) => updateCollectionItem('education', id, event)}
            onAdd={() =>
              appendCollectionItem('education', () => ({
                id: uuidv4(),
                universityName: '',
                city: '',
                degree: '',
                subject: '',
                from: '',
                to: '',
              }))
            }
            onDelete={(id) => removeCollectionItem('education', id)}
          />
        );
      case 'skills':
        return (
          <ListForm
            label="Skill"
            items={cv.skills}
            onChange={(index, value) => handleListChange('skills', index, value)}
            onAdd={() => handleAddListItem('skills')}
            onDelete={(index) => handleDeleteListItem('skills', index)}
          />
        );
      case 'languages':
        return (
          <ListForm
            label="Language"
            items={cv.languages}
            onChange={(index, value) => handleListChange('languages', index, value)}
            onAdd={() => handleAddListItem('languages')}
            onDelete={(index) => handleDeleteListItem('languages', index)}
          />
        );
      case 'hobbies':
        return (
          <ListForm
            label="Interest"
            items={cv.hobbies}
            onChange={(index, value) => handleListChange('hobbies', index, value)}
            onAdd={() => handleAddListItem('hobbies')}
            onDelete={(index) => handleDeleteListItem('hobbies', index)}
          />
        );
      default:
        return (
          <PersonalInfoForm personalInfo={cv.personalInfo} onChange={handleChangePersonal} />
        );
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <header className="border-b border-slate-200 pb-6 dark:border-slate-700">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                Resume Builder
              </h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                One clean form, one printable preview, no extra template switching.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="button" className={actionButtonClass} onClick={handlePrint}>
                <span className="flex items-center gap-2">
                  <IconFileDownload size={18} />
                  Download PDF
                </span>
              </button>
              <button
                type="button"
                className={actionButtonClass}
                onClick={() => setCv(exampleCV)}
              >
                Load Example
              </button>
              <button
                type="button"
                className={actionButtonClass}
                onClick={() => setCv(initialCV)}
              >
                <span className="flex items-center gap-2">
                  <IconRefresh size={18} />
                  Reset
                </span>
              </button>
            </div>
          </div>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr]">
          <nav className="grid gap-2" aria-label="Resume sections">
            {sections.map((section) => {
              const SectionIcon = section.icon;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <SectionIcon size={18} />
                  {section.label}
                </button>
              );
            })}
          </nav>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/70">
            {renderActiveSection()}
          </div>
        </div>
      </section>

      <aside className="xl:sticky xl:top-24 xl:self-start">
        <CVPreview ref={previewRef} cv={cv} />
      </aside>
    </div>
  );
};

export default SingleCVComponent;
