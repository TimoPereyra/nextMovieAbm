import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

const Form = ({formData, forNewMovie = true}) => {

    const router = useRouter()
    const [form, setForm] = useState({
        title: formData.title,
        plot: formData.plot
    })
    const [message, setMenssage] = useState([])

    const handleChange = e => {
        const {value, name} = e.target
        setForm({
            ...form,
            [name]: value
        })
    }
    const handleSubmit = e=>{
        e.preventDefault()
        if (forNewMovie){
           postData(form) 
        }
        else{
            //editar data
        }
        
    }
    const postData = async (form) =>{
        try {
            console.log(form)
            const res = await fetch("/api/movie", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(form),
            });
            const data = await res.json()
            console.log(data)
            if(!data.success){
                for (const key in data.error.errors) {
                    let error = data.error.errors[key]
                    setMenssage(oldmenssage => [
                        ...oldmenssage,
                        {message: error.message}
                    ])
                    
                }
            }else{
                
                router.push('/')
            }

        } catch (error) {
            console.log(error)
        }
    };
    return (
    
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input type="text" className="form-control my-2" placeholder="Tittle" autoComplete="off" value={form.title} onChange={handleChange}  name="title"/>
                
                <input type="text" className="form-control my-2" placeholder="Plot" autoComplete="off" value={form.plot} onChange={handleChange} name="plot"/>

                <button className="btn btn-primary w-100 my-2" type="submit">Submit</button>
                <Link href="/"
                className="btn btn-warning w-100">
                    Volver
                </Link>
                {message.map(({message}) =>(
                    <p key={message}>{message}</p>
                ))
                }
                
            </form>

        </div>
    )
};



export default Form
