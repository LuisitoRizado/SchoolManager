import { useState } from "react";
export const AgregarMateriaPage = () => {
  const [Id_Carrera, setId_Carrera] = useState();
  const [ID_HORARIO, setId_Horario] = useState();
  const [ID_AULA, setId_Aula] = useState();
  const [MATERIA, setMateria] = useState();
  const [CREDITOS, setCreditos] = useState();
  const [CUPO, setCupo] = useState();
  const [SEMESTRE, setSemestre] = useState();


  
  const onHandleCarrera = (e) => {
    setId_Carrera(e.target.value);
    console.log("Carrera: " + e.target.value);
  };

  return (
    <div>
      <h1>Agregar Materias</h1>
      <hr />
      <form action="" className="mt-5">
        <label htmlFor="idmateria" className="form-label">
          Id materia
        </label>
        <input type="text" name="idmateria" className="form-control" />

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
          <label for="gestion">Gestión</label>

          <input
            type="radio"
            id="gestion"
            name="fav_language"
            value="gestion"
            className="form-check-input"
            onChange={(event) => onHandleCarrera(event)}
          />
          <label for="industrial">Industrial</label>

          <input
            type="radio"
            id="industrial"
            name="fav_language"
            value="industrial"
            className="form-check-input"
            onChange={(event) => onHandleCarrera(event)}
          />
          <label for="mecatronica">Mecatrónica</label>

          <input
            type="radio"
            id="mecatronica"
            name="fav_language"
            value="mecatronica"
            className="form-check-input"
            onChange={(event) => onHandleCarrera(event)}
          />
          <label for="electronica">Electrónica</label>

          <input
            type="radio"
            id="electronica"
            name="fav_language"
            value="electronica"
            className="form-check-input"
            onChange={(event) => onHandleCarrera(event)}
          />
        </div>

        <label htmlFor="horario" className="form-label">
          Hora
        </label>
        <input type="text" name="horario" className="form-control" />

        <label htmlFor="aula" className="form-label">
          Aula
        </label>
        <input type="text" name="aula" className="form-control" />

        <label htmlFor="carrera" className="form-label">
          Carrera
        </label>
        <input type="text" name="carrera" className="form-control" />

        <label htmlFor="materia" className="form-label">
          Materia
        </label>
        <input type="number" name="materia" className="form-control" />

        <label htmlFor="creditos" className="form-label">
          Creditos
        </label>
        <input type="text" name="creditos" className="form-control" />

        <label htmlFor="cupo" className="form-label">
          Cupo
        </label>
        <input type="text" name="cupo" className="form-control" />

        <label htmlFor="semestre" className="form-label">
          Semestre
        </label>
        <input type="text" name="semestre" className="form-control" />

        <label htmlFor="docente" className="form-label">
          Id Docente
        </label>
        <input type="text" name="idDocente" className="form-control" />

        <button className="btn btn-danger">Cancelar</button>
        <button className="btn btn-success m-4">Agregar!</button>
      </form>
    </div>
  );
};
