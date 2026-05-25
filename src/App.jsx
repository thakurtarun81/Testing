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
  
  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1e293b",
          marginBottom: "20px",
        }}
      >
        This is CRUD
      </h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          name="state"
          value={form.state}
          onChange={handleOnChange}
          placeholder="Enter State"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "200px",
          }}
        />

        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleOnChange}
          placeholder="Enter City"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "200px",
          }}
        />

        <button
          onClick={handleOnSave}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {editIndex !== null ? "Update" : "Save"}
        </button>
      </div>

      <table
        border="1"
        style={{
          width: "80%",
          margin: "auto",
          borderCollapse: "collapse",
          backgroundColor: "white",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#2563eb", color: "white" }}>
            <th style={{ padding: "12px" }}>State</th>
            <th style={{ padding: "12px" }}>City</th>
            <th style={{ padding: "12px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {list.map((item, index) => (
            <tr key={index} style={{ textAlign: "center" }}>
              <td style={{ padding: "10px" }}>{item.state}</td>
              <td style={{ padding: "10px" }}>{item.city}</td>

              <td style={{ padding: "10px" }}>
                <button
                  onClick={() => handleOnEdit(index)}
                  style={{
                    marginRight: "10px",
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "6px",
                    backgroundColor: "green",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleOnDelete(index)}
                  style={{
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "6px",
                    backgroundColor: "red",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;