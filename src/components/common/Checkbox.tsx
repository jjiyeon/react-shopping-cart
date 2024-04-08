interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  onChange: () => void
  isChecked?: boolean
}

const Checkbox = ({ id, isChecked, onChange, ...props }: CheckboxProps) => {
  return (
    <label htmlFor="selctAll">
      <input className="checkbox" type="checkbox" value={id} onChange={onChange} checked={isChecked} {...props} />
    </label>
  )
}

export default Checkbox
