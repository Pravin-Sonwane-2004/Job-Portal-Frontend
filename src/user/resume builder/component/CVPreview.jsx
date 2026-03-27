import React, { forwardRef } from 'react';
import {
  IconBriefcase,
  IconMail,
  IconMapPin,
  IconPhone,
  IconSchool,
} from '@tabler/icons-react';

const Section = ({ title, icon: Icon, children }) => (
  <section>
    <div className="mb-3 flex items-center gap-2">
      <Icon size={18} className="text-indigo-500" />
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
        {title}
      </h3>
    </div>
    {children}
  </section>
);

const CVPreview = forwardRef(({ cv, style }, ref) => {
  const { personalInfo, experience, education, skills, languages, hobbies } = cv;

  return (
    <article
      ref={ref}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
      style={style}
    >
      <header className="border-b border-slate-200 bg-slate-50 px-8 py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <img
            src={personalInfo.photo || '/Profile/awtar.png'}
            alt="Profile"
            className="h-24 w-24 rounded-2xl object-cover"
          />
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold text-slate-900">
              {[personalInfo.firstName, personalInfo.lastName].filter(Boolean).join(' ') || 'Your Name'}
            </h1>
            <p className="mt-2 text-base text-indigo-600">{personalInfo.title || 'Professional Title'}</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              {personalInfo.email && (
                <span className="inline-flex items-center gap-2">
                  <IconMail size={16} />
                  {personalInfo.email}
                </span>
              )}
              {personalInfo.phoneNumber && (
                <span className="inline-flex items-center gap-2">
                  <IconPhone size={16} />
                  {personalInfo.phoneNumber}
                </span>
              )}
              {personalInfo.address && (
                <span className="inline-flex items-center gap-2">
                  <IconMapPin size={16} />
                  {personalInfo.address}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="space-y-8 px-8 py-8">
        {personalInfo.description && (
          <Section title="Profile" icon={IconMapPin}>
            <p className="text-sm leading-7 text-slate-600">{personalInfo.description}</p>
          </Section>
        )}

        {experience.some((item) => item.position || item.company) && (
          <Section title="Experience" icon={IconBriefcase}>
            <div className="space-y-5">
              {experience
                .filter((item) => item.position || item.company)
                .map((item) => (
                  <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h4 className="font-semibold text-slate-900">{item.position || 'Position'}</h4>
                        <p className="text-sm text-slate-600">
                          {[item.company, item.city].filter(Boolean).join(' • ')}
                        </p>
                      </div>
                      <p className="text-sm text-slate-500">
                        {[item.from, item.to].filter(Boolean).join(' - ')}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </Section>
        )}

        {education.some((item) => item.universityName || item.degree) && (
          <Section title="Education" icon={IconSchool}>
            <div className="space-y-5">
              {education
                .filter((item) => item.universityName || item.degree)
                .map((item) => (
                  <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h4 className="font-semibold text-slate-900">
                          {item.universityName || 'Institution'}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {[item.degree, item.subject, item.city].filter(Boolean).join(' • ')}
                        </p>
                      </div>
                      <p className="text-sm text-slate-500">
                        {[item.from, item.to].filter(Boolean).join(' - ')}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </Section>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          <Section title="Skills" icon={IconBriefcase}>
            <div className="flex flex-wrap gap-2">
              {skills.filter(Boolean).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Section>

          <Section title="Languages" icon={IconMail}>
            <div className="flex flex-wrap gap-2">
              {languages.filter(Boolean).map((language) => (
                <span
                  key={language}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  {language}
                </span>
              ))}
            </div>
          </Section>

          <Section title="Interests" icon={IconPhone}>
            <div className="flex flex-wrap gap-2">
              {hobbies.filter(Boolean).map((hobby) => (
                <span
                  key={hobby}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </article>
  );
});

export default CVPreview;
