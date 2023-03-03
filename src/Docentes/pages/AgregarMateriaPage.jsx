import { useState } from "react";
export const AgregarMateriaPage = () => {
  const [ID_MATERIA, setID_MATERIA] = useState()
  const [Id_Carrera, setId_Carrera] = useState();
  const [HORARIO, setHorario] = useState();
  const [AULA, setAula] = useState();
  const [MATERIA, setMateria] = useState();
  const [CREDITOS, setCreditos] = useState();
  const [CUPO, setCupo] = useState();
  const [SEMESTRE, setSemestre] = useState();
  const [Id_Docente, setId_Docente] = useState()

  const onHandleIdMateria = (e) =>{
    setID_MATERIA(e.target.value)
  }

  const onHandleCarrera = (e) => {
    setId_Carrera(e.target.value);
  };
  
  const onHandleHorario = (e) =>{
    setHorario(e.target.value)
  }

  const onHandleAula = (e) =>{
    setAula(e.target.value)
  }

  const onHandleMateria = (e) =>{
    setMateria(e.target.value)
  }

  const onHandleCreditos = (e) =>{
    setCreditos(e.target.value)
  }
  const onHandleCupo = (e) =>{
    setCupo(e.target.value)
  }
  const onHandleSemestre = (e) =>{
    setSemestre(e.target.value)
  }


  const onHandleId_Docente = (e) =>{
    setId_Docente(e.target.value)
  }

  const agregarMateria = () =>{
    const url = 'http://localhost:3030/postMateria';
    fetch(url, {method:'POST', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  }, body:JSON.stringify({
      "ID_MATERIA": ID_MATERIA,
      "HORA":HORARIO,
      "AULA":AULA,
      "ID_CARRERA":Id_Carrera,
      "MATERIA":MATERIA,
      "CREDITOS":CREDITOS,
      "CUPO":CUPO,
      "SEMESTRE":SEMESTRE,
    })})
  }
  return (

    <div>
      <h1>Agregar Materias</h1>
      <hr />
      <form action="" className="mt-5" onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor="idmateria" className="form-label">
          Id materia
        </label>
        <input type="text" name="idmateria" 
        className="form-control" 
        onChange={(e)=> onHandleIdMateria(e)}
        />

        <h4 className="mt-3">Carrera</h4>
        <div className="radioGroup p-2 d-flex flex-column justify-content-around">
          <label for="sistemas">Sistemas</label>

          <input
            type="radio"
            id="sistemas"
            name="fav_language"
            value="20"
            className="form-check-input"
            onChange={(event) => onHandleCarrera(event)}
          />
          <label for="gestion">Gestión empresarial</label>

          <input
            type="radio"
            id="gestion"
            name="fav_language"
            value="30"
            className="form-check-input"
            onChange={(event) => onHandleCarrera(event)}
          />
          <label for="industrial">Industrial</label>

          <input
            type="radio"
            id="industrial"
            name="fav_language"
            value="40"
            className="form-check-input"
            onChange={(event) => onHandleCarrera(event)}
          />
          <label for="mecatronica">Mecatrónica</label>

          <input
            type="radio"
            id="mecatronica"
            name="fav_language"
            value="50"
            className="form-check-input"
            onChange={(event) => onHandleCarrera(event)}
          />
          <label for="electronica">Electrónica</label>

          <input
            type="radio"
            id="electronica"
            name="fav_language"
            value="60"
            className="form-check-input"
            onChange={(event) => onHandleCarrera(event)}
          />
        </div>

        <label htmlFor="horario" className="form-label">
          Hora
        </label>
        <input type="text" name="horario" className="form-control" 
        onChange={(e)=> onHandleHorario(e)}
        />

        <label htmlFor="aula" className="form-label">
          Aula
        </label>
        <input
         type="text" name="aula" className="form-control" 
        onChange={(e)=> onHandleAula(e)}
         
         />

        
        <label htmlFor="materia" className="form-label">
          Materia
        </label>
        <input type="text" name="materia" className="form-control" 
        onChange={(e)=> onHandleMateria(e)}
        
        />

        <label htmlFor="creditos" className="form-label">
          Creditos
        </label>
        <input type="number" name="creditos" className="form-control" 
        onChange={(e)=> onHandleCreditos(e)}
        
        />

        <label htmlFor="cupo" className="form-label">
          Cupo
        </label>
        <input type="number" name="cupo" className="form-control"
        onChange={(e)=> onHandleCupo(e)}
        
        />

        <label htmlFor="semestre" className="form-label">
          Semestre
        </label>
        <input type="number" name="semestre" className="form-control" 
        onChange={(e)=> onHandleSemestre(e)}
        
        />

        <label htmlFor="docente" className="form-label">
          Id Docente
        </label>
        <input type="number" name="idDocente" className="form-control" 
        onChange={(e)=> onHandleId_Docente(e)}
        
        />

        <button className="btn btn-danger">Cancelar</button>
        <button className="btn btn-success m-4"
        onClick={()=>agregarMateria()}
        >Agregar!</button>
      </form>
    </div>
  );
};
