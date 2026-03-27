const inputClass =
  'w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100';

const labelClass = 'block text-sm font-medium text-slate-700 dark:text-slate-200';

const PersonalInfoForm = ({ personalInfo, onChange }) => (
  <div className="grid gap-4 md:grid-cols-2">
    <label className={labelClass}>
      First Name
      <input
        className={`${inputClass} mt-2`}
        name="firstName"
        value={personalInfo.firstName}
        onChange={onChange}
        placeholder="First name"
      />
    </label>

    <label className={labelClass}>
      Last Name
      <input
        className={`${inputClass} mt-2`}
        name="lastName"
        value={personalInfo.lastName}
        onChange={onChange}
        placeholder="Last name"
      />
    </label>

    <label className={labelClass}>
      Professional Title
      <input
        className={`${inputClass} mt-2`}
        name="title"
        value={personalInfo.title}
        onChange={onChange}
        placeholder="Frontend Developer"
      />
    </label>

    <label className={labelClass}>
      Photo
      <input
        className={`${inputClass} mt-2 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white`}
        name="photo"
        type="file"
        accept="image/*"
        onChange={onChange}
      />
    </label>

    <label className={`${labelClass} md:col-span-2`}>
      Address
      <input
        className={`${inputClass} mt-2`}
        name="address"
        value={personalInfo.address}
        onChange={onChange}
        placeholder="City, Country"
      />
    </label>

    <label className={labelClass}>
      Phone Number
      <input
        className={`${inputClass} mt-2`}
        name="phoneNumber"
        value={personalInfo.phoneNumber}
        onChange={onChange}
        placeholder="+91 9876543210"
      />
    </label>

    <label className={labelClass}>
      Email
      <input
        className={`${inputClass} mt-2`}
        name="email"
        type="email"
        value={personalInfo.email}
        onChange={onChange}
        placeholder="name@example.com"
      />
    </label>

    <label className={`${labelClass} md:col-span-2`}>
      Summary
      <textarea
        className={`${inputClass} mt-2 min-h-28`}
        name="description"
        value={personalInfo.description}
        onChange={onChange}
        placeholder="Write a short summary about your experience and strengths."
      />
    </label>
  </div>
);

export default PersonalInfoForm;
