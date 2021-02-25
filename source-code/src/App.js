import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Records from './components/Records'
import AddRecord from './components/AddRecord'
import About from './components/About'
import { TASK_ROOT_URL } from './utils/constants';

const App = () => {
  const [showAddRecord, setShowAddRecord] = useState(false)
  const [records, setRecords] = useState([])

  useEffect(() => {
    const getRecords = async () => {
      const recordsFromServer = await fetchRecords()
      setRecords(recordsFromServer)
    }

    getRecords()
  }, [])

  // Fetch Records
  const fetchRecords = async () => {
    const res = await fetch(TASK_ROOT_URL)
    const data = await res.json()

    return data
  }

  // Fetch Record
  const fetchRecord = async (id) => {
    const res = await fetch(`${TASK_ROOT_URL}/${id}`)
    const data = await res.json()

    return data
  }

  // Add Record
  const addRecord = async (record) => {
    const res = await fetch(`${TASK_ROOT_URL}/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(record),
    })

    const data = await res.json()

    setRecords([...records, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newRecord = { id, ...record }
    // setRecords([...records, newRecord])
  }

  // Delete Record
  const deleteRecord = async (id) => {
    const res = await fetch(`${TASK_ROOT_URL}/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setRecords(records.filter((record) => record.id !== id))
      : alert('Error Deleting This Record')
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const recordToToggle = await fetchRecord(id)
    const updRecord = { ...recordToToggle, reminder: !recordToToggle.reminder }

    const res = await fetch(`${TASK_ROOT_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updRecord),
    })

    const data = await res.json()

    setRecords(
      records.map((record) =>
        record.id === id ? { ...record, reminder: data.reminder } : record
      )
    )
  }

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddRecord(!showAddRecord)}
          showAdd={showAddRecord}
        />
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddRecord && <AddRecord onAdd={addRecord} />}
              {records.length > 0 ? (
                <Records
                  records={records}
                  onDelete={deleteRecord}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Records To Show'
              )}
            </>
          )}
        />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  )
}

export default App
