import { useState,useEffect } from "react"
import * as Icon from 'react-bootstrap-icons'
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)

export default function(){
    //untuk menampung data siswa dari api
    const [siswa,setSiswa] = useState([])

    //untuk menampung data yang di insert saat store data siswa
    const [nama,setNama] = useState('')
    const [umur,setUmur] = useState(0)
    const [kelas,setKelas] = useState('')

    console.log(nama)
    console.log(umur)
    console.log(kelas)

    useEffect(() => {
        async function FetchSiswas(){
            const res = await fetch('http://127.0.0.1:8000/api/v1/siswas')
            const data = await res.json()
            setSiswa(data.siswa)
        }

        FetchSiswas()


        
    },[]);
    async function InsertSiswa(){
        const res = await fetch(`http://127.0.0.1:8000/api/v1/store`,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Accept' : 'aplication/json'
            },
            body : {
               'nama':{nama},
               'umur':{umur},
               'kelas':{kelas}
            }
        })
        const data = await res.json();
        console.log(data)
    }

    function Card(props){
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
                            <button className="btn btn-primary"><Icon.Trash/></button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            </>
        )
    }

    return(
        <div className="container-fluid mt-5">
            <div className="container py-5 ">
                <div class="card text-start w-50 mx-auto mb-3">
                    <div class="card-body">
                        <label htmlFor=""> nama </label>
                        <input onChange={(v) => setNama(v.target.value)} type="text" className="form-control mb-3" />
                        <label htmlFor=""> umur </label>
                        <input onChange={(v) => setUmur(v.target.value)} type="number" className="form-control mb-3" />
                        <label htmlFor=""> kelas </label>
                        <input onChange={(v) => setKelas(v.target.value)} type="text" className="form-control mb-3" />

                        <button onClick={InsertSiswa} className="btn btn-info text-light"><Icon.Box2/></button>
                    </div>
                </div>
                
                <div className="row">

                { siswa.map((siswa,i) => (
                    <Card key={i} kelas={siswa.kelas} umur={siswa.umur} nama={siswa.nama} />
                )) }

                </div>
                <div className="row">
                </div>
            </div>
        </div>
    )
}