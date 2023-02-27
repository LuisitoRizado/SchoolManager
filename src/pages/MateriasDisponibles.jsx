import { useState, useE } from "react";
export const MateriasDisponibles = () => {
  

  return (
    <>
      <div className="btn-group mt-4">
        <button className="btn btn-secondary btn-lg" type="button">
          Selecciona un semestre
        </button>
        <button
          type="button"
          className="btn btn-lg btn-secondary dropdown-toggle dropdown-toggle-split"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="materiaspage?semestre=1">
              1
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="materiaspage?semestre=2">
              2
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="materiaspage?semestre=3">
              3
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="materiaspage?semestre=4">
              4
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="materiaspage?semestre=5">
              5
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="materiaspage?semestre=6">
              6
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="materiaspage?semestre=7">
              7
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="materiaspage?semestre=8">
              8
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="materiaspage?semestre=9">
              9
            </a>
          </li>
        </ul>
      </div>
      <div>
   
      </div>
    </>
  );
};
