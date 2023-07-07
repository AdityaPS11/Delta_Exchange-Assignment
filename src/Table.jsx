import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRecord, deleteRecord} from './store'; 
import AddModal from './AddModal.jsx';
import './index.css'; 


const Table = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State variable for modal visibility

  const records = useSelector((state) => state.records);

  const dispatch = useDispatch();

  useEffect(() => {
    // Load data from local storage on component mount
    const storedRecords = localStorage.getItem('records');
    if (storedRecords) {
      dispatch(addRecord(JSON.parse(storedRecords)));
    }
  }, [dispatch]);

  useEffect(() => {
    // Save data to local storage whenever records change
    localStorage.setItem('records', JSON.stringify(records));
  }, [records]);

  const handleDeleteRecord = (recordId) => {
    dispatch(deleteRecord(recordId));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="header">
        <h2>Team Members</h2>
        <button className="add-button" onClick={openModal}>
          Add Members + 
        </button>
      </div>
      <div className="divider"></div>
      <div className="dropdowns">
        <div className="dropdown">
          <select>
            <option>Select All</option>
            <option>DC United</option>
            <option>Manchester United</option>
            <option>LA Galaxy</option>
          </select>
          <div className="arrow"></div>
        </div>
        <div className="dropdown">
          <select>
            <option>Select All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <div className="arrow"></div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Company</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 &&
            records
            .filter((record) => record.name || record.company || record.status || record.lastUpdated || record.notes)
            .map((record) => (
              <tr key={record.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{record.name}</td>
                <td>{record.company}</td>
                <td>{record.status}</td>
                <td>{record.lastUpdated}</td>
                <td>{record.notes}</td>
                <td>
                  <button
                    onClick={() => handleDeleteRecord(record.id)}
                    className="delete-button"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isModalOpen && <AddModal isOpen={isModalOpen} closeModal={closeModal} />}
    </div>
  );
};

export default Table;
