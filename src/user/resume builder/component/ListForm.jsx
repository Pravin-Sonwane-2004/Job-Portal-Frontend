const inputClass =
  'w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100';

const ListForm = ({ label, items, onChange, onAdd, onDelete }) => (
  <div className="space-y-4">
    {items.map((item, index) => (
      <div
        key={`${label}-${index}`}
        className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/70 sm:flex-row sm:items-end"
      >
        <label className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200">
          {label}
          <input
            className={`${inputClass} mt-2`}
            value={item}
            onChange={(event) => onChange(index, event.target.value)}
            placeholder={label}
          />
        </label>
        <button
          type="button"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 transition-colors hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/15"
          onClick={() => onDelete(index)}
        >
          Delete
        </button>
      </div>
    ))}

    <button
      type="button"
      className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800"
      onClick={onAdd}
    >
      Add {label}
    </button>
  </div>
);

export default ListForm;
