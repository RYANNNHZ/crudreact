import * as Icon from 'react-bootstrap-icons'

export default function Card(props) {
  return (
      <>
          <div className="col-3">
              <div
                  className="card text-white bg-info p-2 mb-3"
              >
                  <img className="card-img-top" src="https://cdn-icons-png.flaticon.com/512/2491/2491056.png" alt="Title" />
                  <div className="card-body">
                      <h4 className="card-title">{props.nama}</h4>
                      <div className="wrapper d-flex justify-content-between">
                          <div className="wrpper-info">
                              <h6>kelas : {props.kelas}</h6>
                              <p>umur : {props.umur}</p>
                          </div>
                          <div className="wrapper-event">
                              <button onClick={() => props.delSiswa(props.id)} className="btn btn-primary ms-2 ">{props.id}<Icon.Trash /></button>
                              <button onClick={() => props.getModal(props.id)} className="btn btn-warning ms-2 "><Icon.PenFill /></button>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
      </>
  )
}