import { FaTimes } from 'react-icons/fa'

const Record = ({ record, onDelete, onToggle }) => {
  return (
    <div
      className={`record ${record.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => onToggle(record.id)}
    >
      <h3>
        {record.title}{' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(record.id)}
        />
      </h3>
      <p>{record.createDate}</p>
    </div>
  )
}

export default Record
