import { useState, useEffect } from "react"
import * as Icon from 'react-bootstrap-icons'
import { Await, json } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"


const MySwal = withReactContent(Swal)

export default function () {
    //untuk menangkap value dari show agar bisa mengupdate data
    const [update, setUpdate] = useState([])

    //untuk menangkap error siswa
    const [error, setError] = useState()
    //untuk menampung data siswa dari api
    const [siswa, setSiswa] = useState([])

    //untuk menampung data yang di insert saat store data siswa
    const [nama, setNama] = useState('')
    const [umur, setUmur] = useState(0)
    const [kelas, setKelas] = useState('')
    const [idsiswa, setIdsiswa] = useState(0)
    //
    const [modal, setModal] = useState(false)

    //untuk mounting data di page home
    //untuk menfetching data siswa dari Api
    useEffect(() => {
        async function FetchSiswas() {
            const res = await fetch('http://127.0.0.1:8000/api/v1/siswas')
            const data = await res.json()
            setSiswa(data.siswa)
        }

        FetchSiswas()



    }, []);

    //untuk insert data siswa ke Api
    async function InsertSiswa() {
        const res = await fetch(`http://127.0.0.1:8000/api/v1/store`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'nama': nama,
                'umur': umur,
                'kelas': kelas
            })
        })
        const data = await res.json();
        console.log(data.siswa)
        setSiswa(prevSiswa => [...prevSiswa, data.siswa])
    }

    //untuk mehapus data siswa lewat APi
    async function delSiswa(id) {
        const res = await fetch(`http://127.0.0.1:8000/api/v1/del/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accepet': 'application/json',
            }
        })

        if (!res.ok) {
            //untuk mengset data error jika ada error yang terjadi di dalam delete
            setError('maaf sepertinya data yang ingin anda delete tidak ada')
        }

        const data = await res.json();
        setSiswa(data.siswa)

    }



    async function getModal(id) {
        if (modal == true) {
            setModal(false);
        } else if (modal == false) {
            const res = await fetch(`http://127.0.0.1:8000/api/v1/show/${id}`);
            const data = await res.json();
            setNama(data.siswa.nama)
            setUmur(data.siswa.umur)
            setKelas(data.siswa.kelas)
            setIdsiswa(data.siswa.id)
            setModal(true);
        }
    }


    async function Update(id) {
        const res = await fetch(`http://127.0.0.1:8000/api/v1/update/${id}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'nama': nama,
                'umur': umur,
                'kelas': kelas
            })

        });
        const data = await res.json();
        console.log(data.siswa)
        setSiswa(data.siswa);
        getModal()
    }

    //untuk membuat component dinamis card 
    function Card(props) {
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
                                    <button onClick={() => delSiswa(props.id)} className="btn btn-primary ms-2 ">{props.id}<Icon.Trash /></button>
                                    <button onClick={() => getModal(props.id)} className="btn btn-warning ms-2 "><Icon.PenFill /></button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }

    return (
        <>

            <div className="container-fluid mt-5" >

                {
                    modal == true ?
                        <div className="card p-2 w-50 position-fixed top-50 start-50 z-2 translate-middle  " >
                            <div className="wrapper-header d-flex justify-content-between">
                                <h1>edit data dengan id : {update.id} </h1>
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
                        :
                        ''
                }

                <div className="container py-5 ">
                    <div className="row">
                        <div className="col-6">

                            <div className="card text-start mb-3">
                                <div className="card-body">
                                    <label htmlFor=""> nama </label>
                                    <input onChange={(v) => setNama(v.target.value)} type="text" className="form-control mb-3" />
                                    <label htmlFor=""> umur </label>
                                    <input onChange={(v) => setUmur(v.target.value)} type="number" className="form-control mb-3" />
                                    <label htmlFor=""> kelas </label>
                                    <input onChange={(v) => setKelas(v.target.value)} type="text" className="form-control mb-3" />

                                    <button onClick={InsertSiswa} className="btn btn-info text-light"><Icon.Box2 /></button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="row">

                        {siswa.map((siswa, i) => (
                            <Card id={siswa.id} key={i} kelas={siswa.kelas} umur={siswa.umur} nama={siswa.nama} />
                        ))}

                    </div>
                    <div className="row">
                    </div>
                </div>
            </div>
        </>
    )
}