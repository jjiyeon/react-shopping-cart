const Checkbox = ({ id, checked, onChange, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <label htmlFor="selctAll">
      <input className="checkbox" type="checkbox" value={id} onChange={onChange} checked={checked} {...props} />
    </label>
  )
}

export default Checkbox
