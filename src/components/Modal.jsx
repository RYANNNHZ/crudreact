import React from 'react'
import * as Icon from 'react-bootstrap-icons'
const Modal = ({id, getModal, setNama, setUmur, setKelas, Update, nama, umur, kelas}) => {

  return (
    <div className="card p-2 w-50 position-fixed top-50 start-50 z-2 translate-middle  " >
      <div className="wrapper-header d-flex justify-content-between">
        <h1>edit data dengan id : {id} </h1>
        <button onClick={getModal} className="btn btn-danger "><Icon.XCircle /></button>
      </div>
      <label htmlFor="">nama</label>
      <input type="text" onChange={(v) => setNama(v.target.value)} className="form-control mb-3" value={nama} />
      <label htmlFor="">umur</label>
      <input type="number" onChange={(v) => setUmur(v.target.value)} className="form-control mb-3" value={umur} />
      <label htmlFor="">kelas</label>
      <input type="text" onChange={(v) => setKelas(v.target.value)} className="form-control mb-3" value={kelas} />
      <button onClick={() => Update(idsiswa)} className="btn btn-success"><Icon.Pencil /></button>
    </div>
  )
}

export default Modal