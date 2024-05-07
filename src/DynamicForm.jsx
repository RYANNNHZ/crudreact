import React, { useState } from "react";

const DynamicForm = () => {
  const [form, setForm] = useState(
    [
      {
      nama: "",
      kelas: "",
      umur: "",
    }
  ]
  );

  function tambahForm() {
    setForm((prev) => [...prev, { nama: "", kelas: "", umur: "" }]);
  }

  function insertSiswa() {
    console.log(form);
  }

  function changeForm(e, index){
    const data = [...form];
    data[index][e.target.name] = e.target.value;
    setForm(data);
  }

  function insertForm(){
    console.log(form)
  }

  return (
    <div className="container my-5">
      <button onClick={tambahForm} className="btn btn-primary mb-3">
        Tambah Form
      </button>

      {form.map((data, index) => (
        <div key={index} className="card text-start mb-3">
          <div className="card-body">
            <label htmlFor=""> nama </label>
            <input name="nama" value={data.name} type="text" onChange={(e) => changeForm(e, index)} className="form-control mb-3" />
            <label htmlFor=""> umur </label>
            <input name="umur" value={data.umur} type="number" onChange={(e) => changeForm(e, index)} className="form-control mb-3" />
            <label htmlFor=""> kelas </label>
            <input name="kelas" value={data.kelas} type="text" onChange={(e) => changeForm(e, index)} className="form-control mb-3" />
            <input type="file" className="form-control mb-3" />
          </div>
        </div>
      ))}

      <button className="btn btn-success" onClick={insertForm}>Insert</button>
    </div>
  );
};

export default DynamicForm;
