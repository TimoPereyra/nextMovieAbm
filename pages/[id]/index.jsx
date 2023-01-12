import dbConnect from "../../lib/dbConnect";
import Movie from "../../models/Movie";
import Link from "next/link";
const MoviePage = ({success, error, movie}) => {
    console.log(success);
    console.log(error);
    console.log(movie);
    if(!success){
        return(
            <div className=" container text-center my-5">
                
                <h1>{error}</h1>

                <Link className="btn btn-success" href="/">
                Volver...
                </Link>
            </div>
            
        )
    }
    return (

        <div className="container">
            <h1 className="mb-3">Detalle de Movie</h1>
            <div className="card" >
                <div className="card-title">
                    <h5 className="text-uppercase my-2">{movie.title}</h5>

                </div>
                <p className="fw-light">{movie.plot}</p>
                <Link className="btn btn-success btn-sm my-1" href="/">
                Volver...
                </Link>
                <Link className="btn btn-secondary btn-sm my-1" href={`/${movie._id}/edit`}>
                Editar
                </Link>
                <button className="btn btn-danger btn-sm my-1">Eliminar</button>
            </div>
        </div>
    );
};


export default MoviePage;


export async function getServerSideProps({params}){

    try {
      await dbConnect()
      const movie = await Movie.findById(params.id).lean();
      if(!movie){
        return {props: {success: false, error: "Pelicula no encontrada rey"}};
      }
      console.log(movie);
      movie._id = movie._id.toString();
     
      return {props: {success: true, movie}};
    } catch (error) {
      console.log(error)
      if (error.kind === 'ObjectId'){
        return {props: {success: false, error: "Id no valido"}};
      }

      return {props: {success: false, error: "Error del servidor"}}
      
    }
  }