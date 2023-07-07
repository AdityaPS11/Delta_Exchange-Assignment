import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addRecord } from './store';
import './index.css';

const AddMemberModal = ({closeModal }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [notes, setNotes] = useState('');

  const dispatch = useDispatch();

  const handleAddMember = () => {
    const newRecord = {
      id: Date.now().toString(),
      name,
      company,
      status,
      lastUpdated,
      notes,
    };

    dispatch(addRecord(newRecord));

    setName('');
    setCompany('');
    setStatus('');
    setLastUpdated('');
    setNotes('');
    closeModal();
  };

  return (
    <div className="add-member-modal-overlay">
      <div className="add-member-modal-content">
        <h3>Add Member</h3>
        <div className="form-row">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Company</label>
          <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Status</label>
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Last Updated</label>
          <input type="text" value={lastUpdated} onChange={(e) => setLastUpdated(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
        </div>
        <div className="button-row">
          <button className="cancel-button" onClick={closeModal}>Cancel</button>
          <button className="add-button" onClick={handleAddMember}>Add Member</button>
          
        </div>
      </div>
    </div>
  );
};

AddMemberModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default AddMemberModal;
