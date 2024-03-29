type CheckboxProps = {
  id: string
  isChecked?: boolean
  onChange: () => void
}

const Checkbox = ({ id, isChecked, onChange }: CheckboxProps) => {
  return (
    <label htmlFor="selctAll">
      <input className="checkbox" type="checkbox" value={id} onChange={onChange} checked={isChecked} />
    </label>
  )
}

export default Checkbox
