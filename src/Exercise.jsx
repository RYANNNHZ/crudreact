import { useState, useEffect } from "react"
import * as Icon from 'react-bootstrap-icons'

export default function () {
    //untuk set data siswa yang di ambil dari api siswa
    const [siswa, setsiswa] = useState([])
    //untuk mendinamiskan modal tambah data siswa
    const [Modal, setmodal] = useState(false)
    //untuk mendinamiskan modal edit data siswa
    const [editModal, seteditmodal] = useState(false)
    //beberapa usestate untuk menambahkan dan mendinamiskan kelas nama dan umur
    const [nama, setNama] = useState('')
    const [umur, setUmur] = useState(0)
    const [kelas, setKelas] = useState('')

    //state untuk menghandale loading
    const [loading, setloading] = useState(false)

    //useeffect untuk mounting awal fetching dara
    //fetchdata untuk menangkap data siswa dari api
    useEffect(() => {
        async function fetchData() {
            const res = await fetch('http://127.0.0.1:8000/api/v1/siswas');
            const data = await res.json()
            console.log(data.siswa)
            setsiswa(data.siswa);
        }

        fetchData()
    }, []);

    //untuk mendelete suatu data yang ada di dalam api
    async function del(id) {
        const res = await fetch(`http://127.0.0.1:8000/api/v1/del/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        const data = await res.json();
        setsiswa(data.siswa)
    }

    //untuk membukan dan menutup modal tambah siswa
    function closeOpenModal() {
        if (Modal == false) {
            setmodal(true)
        } else if (Modal == true) {
            setmodal(false)
        }
    }


    async function InsertSiswa() {
        try {
            setloading(true)
            const res = await fetch(`http://127.0.0.1:8000/api/v1/store`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    'nama': nama,
                    'umur': umur,
                    'kelas': kelas
                })
            })
            const data = await res.json()
            setsiswa(prevSiswa => [...prevSiswa, data.siswa]);
            closeOpenModal()
            setloading(false)
        } catch (error) {
            console.log(error)
        }
    }

    async function upSiswa(id) {
        setloading(true)
        const res = await fetch(`http://127.0.0.1:8000/api/v1/update/${id}`,{
            method : 'POST',
            headers : {
                'Content-Type':'application/json',
                'Accept':'application/json',
            },
            body : JSON.stringify({
                'nama':nama,
                'umur':umur,
                'kelas':kelas
            })
        });

        const data = await res.json()
        setsiswa(data.siswa)
        setloading(false)
    }

        //untuk membukan dan menutup modal edit siswa
        function closeOpenModaledit(id) {
            if (editModal == false) {
                async function edit() {
                    const res = await fetch(`http://127.0.0.1:8000/api/v1/show/${id}`);
                    const data = await res.json()
                    setNama(data.siswa.nama)
                    setUmur(data.siswa.umur)
                    setKelas(data.siswa.kelas)
                }
                edit()
                seteditmodal(true)
            } else if (editModal == true) {
                seteditmodal(false)
            }
        }


    return (
        <>
            <div className="container-fluid">
                <div className="container">



        {/* modal untuk memasukan data */}
                    {
                        Modal ?
                            <div className="card p-3 w-50 mx-auto position-fixed z-3 top-50 start-50 translate-middle ">
                                <h1 className="text-center">masukan data siswa</h1>
                                <label htmlFor="">nama</label>
                                <input onChange={(v) => setNama(v.target.value)} type="text" className="form-control mb-3" />
                                <label htmlFor="">umur</label>
                                <input onChange={(v) => setUmur(v.target.value)} type="number" className="form-control mb-3" />
                                <label htmlFor="">kelas</label>
                                <input onChange={(v) => setKelas(v.target.value)} type="text" className="form-control mb-3" />
                                <button onClick={InsertSiswa} className="btn btn-success">
                                    {
                                        loading == true ?
                                            "loading..."
                                            :
                                            <Icon.Person />
                                    }

                                </button>
                            </div>

                            :
                            ''
                    }

            {/* modal untuk mengedit data siswa */}
                    {
                        editModal ?
                            <div className="card p-3 w-50 mx-auto position-fixed z-3 top-50 start-50 translate-middle ">
                                <h1 className="text-center">edit data siswa</h1>
                                <label htmlFor="">nama</label>
                                <input defaultValue={nama} onChange={(v) => setNama(v.target.value)} type="text" className="form-control mb-3" />
                                <label htmlFor="">umur</label>
                                <input defaultValue={umur} onChange={(v) => setUmur(v.target.value)} type="number" className="form-control mb-3" />
                                <label htmlFor="">kelas</label>
                                <input defaultValue={kelas} onChange={(v) => setKelas(v.target.value)} type="text" className="form-control mb-3" />
                                <button onClick={() => upSiswa()} className="btn btn-info">
                                    {
                                        loading == true ?
                                            "loading..."
                                            :
                                            <Icon.Person />
                                    }

                                </button>
                            </div>

                            :
                            ''
                    }

                    <button onClick={closeOpenModal} className="btn btn-success m-4"><Icon.Airplane /></button>
                    <table className="table table-border-bottom ">
                        <thead>
                            <tr>
                                <td>nama</td>
                                <td>umur</td>
                                <td>kelas</td>
                                <td>event</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                siswa.map((siswa, i) => (
                                    <tr key={i}>
                                        <td>{siswa.nama}</td>
                                        <td>{siswa.umur}</td>
                                        <td>{siswa.kelas}</td>
                                        <td>
                                            <button onClick={() => del(siswa.id)} className="btn btn-danger ms-2"><Icon.Trash /></button>
                                            <button onClick={() => closeOpenModaledit(siswa.id)} className="btn btn-info ms-2"><Icon.PenFill /></button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
