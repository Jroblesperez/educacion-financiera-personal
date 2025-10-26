function Select({ label, options = [], value, onChange, required, ...rest }) {
  return (
    <label className="flex flex-col gap-1 text-sm text-slate-600">
      <span className="font-semibold text-slate-700">{label}</span>
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="rounded border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Select;
