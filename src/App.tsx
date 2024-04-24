import logo from "./logo.svg";
import "./App.css";
import blog from "./blog-icon.png";
import { useEffect, useState } from "react";
function App() {
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState('view'); // 'view' or 'edit'
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [selectedRecordId, setSelectedRecordId] = useState(null); // Add this line
  useEffect(() => {
    const savedRecordsString = localStorage.getItem("records");
    if (savedRecordsString) {
      const savedRecords = JSON.parse(savedRecordsString);
      setRecords(savedRecords);
    }
  }, []);
  const handleViewForm = (clickedRecord: any) => {
    setShowForm(true);
    setViewMode('view');
    setFormData(clickedRecord);
    setSelectedRecordId(clickedRecord.id); // Add this line
  };
  const handleEditForm = () => {
    setViewMode('edit');
  };
  const handleDeleteRecord = () => {
    const updatedRecords = records.filter((record: any) => record.id !== selectedRecordId); // Use selectedRecordId here
    localStorage.setItem("records", JSON.stringify(updatedRecords));
    setRecords(updatedRecords);
    setShowForm(false);
    setFormData({
      name: "",
      email: "",
      mobile: "",
    });
  };
  const handleAddButtonClick = () => {
    setShowForm(true);
    setViewMode('edit');
    setFormData({
      name: "",
      email: "",
      mobile: "",
    });
  };
  const handleCloseBtn = () => {
    setShowForm(false);
  };
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const newRecord = {
      id: Date.now(),
      ...formData,
    };
    const updatedRecords: any = viewMode === 'edit'
      ? records.map((record: any) => (record.id === selectedRecordId ? newRecord : record)) // Use selectedRecordId here
      : [...records, newRecord];
    localStorage.setItem("records", JSON.stringify(updatedRecords));
    setRecords(updatedRecords);
    setShowForm(false);
    setFormData({
      name: "",
      email: "",
      mobile: "",
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="header_one">Address Book</div>
        <div className="header_two">
          <div className="tabs">
            <div className="tab_one">HOME</div>
            <div className="tab_one" id="addbutton" onClick={handleAddButtonClick}>
              +ADD
            </div>
          </div>
          <div className="tab_icon">
            <img src={blog} alt="blog icon" />
          </div>
        </div>
      </header>
      <div className="main_div">
        {records.map((record: any) => (
          <div key={record?.id} className="contact_div">
            <div className="record">
              <div className="name" onClick={() => handleViewForm(record)}>
                {record?.name}
              </div>
              <div className="email">{record?.email}</div>
              <div className="phone">{record?.mobile}</div>
            </div>
          </div>
        ))}
        <form onSubmit={handleSubmit}>
          {showForm && (
            <div id="add_address_form" className="form_div">
              <div className="form_title">
                {viewMode === 'edit' ? 'Edit Contacts' : 'View Contact'}
              </div>
              <div className="form_input">
                <div className="input_lbl">Name</div>
                <input
                  className="input_box"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={viewMode === 'view'}
                />
              </div>
              <div className="form_input">
                <div className="input_lbl">Email</div>
                <input
                  className="input_box"
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={viewMode === 'view'}
                />
              </div>
              <div className="form_input">
                <div className="input_lbl">Mobile</div>
                <input
                  className="input_box"
                  name="mobile"
                  type="text"
                  value={formData.mobile}
                  onChange={handleChange}
                  disabled={viewMode === 'view'}
                />
              </div>
              <div className="button_class">
                {viewMode === 'view' && (
                  <button className="button_one" onClick={handleEditForm}>
                    Edit
                  </button>
                )}
                {viewMode === 'view' && (
                  <button className="button_one" onClick={handleDeleteRecord}>
                    Delete
                  </button>
                )}
                <button className="button_one" onClick={handleCloseBtn}>
                  Close
                </button>
                <button type="submit" className="button_two">
                  {viewMode === 'edit' ? 'Update' : 'Adds'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
export default App;