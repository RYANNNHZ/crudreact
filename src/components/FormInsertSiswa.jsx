import React from 'react'
import * as Icon from 'react-bootstrap-icons'

const FormInsertSiswa = ({nama, umur, kelas, fileGambar,  setNama, setUmur, setKelas, setFileGambar, InsertSiswa, loading}) => {
  function onImageUpload (v) {
    setFileGambar(v.target.files[0]);

    v.target.value = null;
  }


  return (
    <div className="card text-start mb-3">
      <div className="card-body">
        <label htmlFor=""> nama </label>
        <input value={nama} onChange={(v) => setNama(v.target.value)} type="text" className="form-control mb-3" />
        <label htmlFor=""> umur </label>
        <input value={umur} onChange={(v) => setUmur(v.target.value)} type="number" className="form-control mb-3" />
        <label htmlFor=""> kelas </label>
        <input value={kelas} onChange={(v) => setKelas(v.target.value)} type="text" className="form-control mb-3" />
        <input onChange={(v) => onImageUpload(v)} type="file" className="form-control mb-3" />

        <button onClick={InsertSiswa} className="btn btn-info text-light">
          {loading && "Loading ...."}
          {!loading && <Icon.Box2 />}
        </button>
      </div>
    </div>
  )
}

export default FormInsertSiswa