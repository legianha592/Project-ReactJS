import Record from './Record'

const Records = ({ records, onDelete, onToggle }) => {
  return (
    <>
      {records.map((record) => (
        <Record key={record.id} record={record} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </>
  )
}

export default Records
