import { useState } from "react";
import "./App.css";
 
function App() {
  const [form, setForm] = useState({ state: "", city: "" });
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
 
  // handle input change
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 
  // save or update
  const handleOnSave = () => {
    if (!form.state || !form.city) return;
 
    if (editIndex !== null) {
      const updatedList = [...list];
      updatedList[editIndex] = form;
      setList(updatedList);
      setEditIndex(null);
    } else {
      setList((prev) => [...prev, form]);
    }
 
    setForm({ state: "", city: "" });
  };
 
 
  const handleOnEdit = (index) => {
    setForm(list[index]);
    setEditIndex(index);
  };
 
  // delete
  const handleOnDelete = (index) => {
    setList(list.filter((_, i) => i !== index));
  };
 
  return (
<div>
<h1>This is CRUD</h1>
 
      <input
        type="text"
        name="state"
        value={form.state}
        onChange={handleOnChange}
        placeholder="Enter State"
      />
 
      <input
        type="text"
        name="city"
        value={form.city}
        onChange={handleOnChange}
        placeholder="Enter City"
      />
 
      <button onClick={handleOnSave}>
        {editIndex !== null ? "Update" : "Save"}
</button>
 
      <table border="2">
<thead>
<tr>
<th>State</th>
<th>City</th>
<th>Actions</th>
</tr>
</thead>
 
        <tbody>
          {list.map((item, index) => (
<tr key={index}>
<td>{item.state}</td>
<td>{item.city}</td>
<td>
<button onClick={() => handleOnEdit(index)}>Edit</button>
<button onClick={() => handleOnDelete(index)}>Delete</button>
</td>
</tr>
          ))}
</tbody>
</table>
</div>
  );
}
 
export default App;