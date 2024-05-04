import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { FetchSiswas } from "../service/siswa"
import Modal from "./components/Modal"
import Card from "./components/Card"
import FormInsertSiswa from "./components/FormInsertSiswa"
import axios from "axios"


const MySwal = withReactContent(Swal)

export default function () {

    //untuk menangkap error siswa
    const [error, setError] = useState()
    //untuk menampung data siswa dari api
    const [siswa, setSiswa] = useState([])

    //untuk menampung data yang di insert saat store data siswa
    const [nama, setNama] = useState('')
    const [umur, setUmur] = useState(0)
    const [kelas, setKelas] = useState('')
    const [idsiswa, setIdsiswa] = useState(0);
    const [fileGambar, setFileGambar] = useState();

    const [loading, setLoading] = useState(false)
    //
    const [modal, setModal] = useState(false)

    //untuk mounting data di page home
    //untuk menfetching data siswa dari Api
    useEffect(() => {
        async function getSiswa() {
            const dataSiswa = await FetchSiswas();
            setSiswa(dataSiswa)
        }

        getSiswa();

        // setSiswa(dataSiswa);
    }, []);

    //untuk insert data siswa ke Api
    async function InsertSiswa() {
        setLoading(true);
        // console.log(formData);
        // return;
        try {
            const res = await axios.post(`${import.meta.env.VITE_LINK_API}/store`, {
                nama : nama,
                kelas : kelas,
                umur : umur,
                file : fileGambar
            } ,{
                headers: {
                    // 'Content-Type': 'application/json',
                    "Content-Type": "multipart/form-data",
                    // 'Accept': 'application/json'
                }
            })

            if (!res.ok) {
                throw new Error();
            }

            const data = await res.json();


            console.log(data.siswa);
            setSiswa(prevSiswa => [...prevSiswa, data.siswa]);

            alert("Berhasil Menambahkan data !");
            reset();
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
        }
    }

    function reset() {
        setNama("")
        setUmur("")
        setKelas("")
    }

    //untuk mehapus data siswa lewat APi
    async function delSiswa(id) {
        const res = await fetch(`${import.meta.env.VITE_LINK_API}/del/${id}`, {
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

    async function getSiswaById(id) {
        const res = await fetch(`${import.meta.env.VITE_LINK_API}/show/${id}`);
        const data = await res.json();

        setNama(data.siswa.nama)
        setUmur(data.siswa.umur)
        setKelas(data.siswa.kelas)
        setIdsiswa(data.siswa.id)
    }



    async function getModal(id) {
        if (modal == true) {
            setModal(false);
        } else if (modal == false) {
            setModal(true);
            getSiswaById(id)
        }
    }


    async function Update(id) {
        const res = await fetch(`${import.meta.env.VITE_LINK_API}/update/${id}`, {
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


    return (
        <>

            <div className="container-fluid mt-5" >
                {modal &&
                    <Modal
                        getModal={getModal}
                        setNama={setNama}
                        setUmur={setUmur}
                        setKelas={setKelas}
                        id={idsiswa}
                        nama={nama}
                        umur={umur}
                        kelas={kelas}
                        Update={Update}
                    />
                }

                <div className="container py-5 ">
                    <div className="row">
                        <div className="col-6">
                            <FormInsertSiswa
                                nama={nama}
                                umur={umur}
                                kelas={kelas}
                                setNama={setNama}
                                setUmur={setUmur}
                                setKelas={setKelas}
                                fileGambar={fileGambar}
                                setFileGambar={setFileGambar}
                                InsertSiswa={InsertSiswa}
                                loading={loading}
                            />
                        </div>
                    </div>
                    <div className="row">
                        {siswa.map((siswa, i) => (
                            <Card delSiswa={delSiswa} getModal={getModal} id={siswa.id} key={i} kelas={siswa.kelas} umur={siswa.umur} nama={siswa.nama} />
                        ))}
                    </div>
                    <div className="row">
                    </div>
                </div>
            </div>
        </>
    )
}