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

  // edit
  const handleOnEdit = (index) => {
    setForm(list[index]);
    setEditIndex(index);
  };

  // delete
  const handleOnDelete = (index) => {
    const filteredData = list.filter((_, i) => i !== index);

    setList(filteredData);

    if (editIndex === index) {
      setForm({ state: "", city: "" });
      setEditIndex(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-center text-4xl font-bold text-slate-800 mb-8">
        This is CRUD
      </h1>

      {/* Form */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <input
          type="text"
          name="state"
          value={form.state}
          onChange={handleOnChange}
          placeholder="Enter State"
          className="w-55 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleOnChange}
          placeholder="Enter City"
          className="w-55 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        <button
          onClick={handleOnSave}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          {editIndex !== null ? "Update" : "Save"}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-[80%] mx-auto overflow-hidden rounded-xl bg-white shadow-lg">
          <thead>
            <tr className="bg-yellow-600 text-white">
              <th className="p-3">State</th>
              <th className="p-3">City</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {list.map((item, index) => (
              <tr
                key={index}
                className="text-center border-b border-gray-200"
              >
                <td className="py-0 px-0">{item.state}</td>

                <td className="py-0 px-0">{item.city}</td>

                <td className="py-0 px-0">
                  <button
                    onClick={() => handleOnEdit(index)}
                    className="mr-3 rounded-md bg-green-600 px-0 py-0 text-white hover:bg-green-700"
                  >
                    
                    Edit
                  </button>

                  <button
                    onClick={() => handleOnDelete(index)}
                    className="rounded-md bg-red-600 px-0 py-0 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;