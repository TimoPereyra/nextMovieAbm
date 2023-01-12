import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import Form from "../components/form"
const New = () =>{
    const formData = {
        title: '',
        plot: ''
    }
        
    return (
        <div className="container">

            <h1 className="my-3">Agregar Movie</h1>
            <Form formData={formData}>

            </Form>
        </div>
    )
}


export default New