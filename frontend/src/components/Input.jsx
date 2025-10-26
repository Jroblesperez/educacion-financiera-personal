function Input({ label, type = 'text', value, onChange, placeholder, required, ...rest }) {
  return (
    <label className="flex flex-col gap-1 text-sm text-slate-600">
      <span className="font-semibold text-slate-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="rounded border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        {...rest}
      />
    </label>
  );
}

export default Input;
