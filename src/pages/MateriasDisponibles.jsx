import { useState, useE } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

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
          <NavLink
                className={'dropdown-item'}
                to="materiaspage?semestre=1"
              >
                1
              </NavLink>
          </li>
          <li>
          <NavLink
                className={'dropdown-item'}
                to="materiaspage?semestre=2"
              >
                2
              </NavLink>
          </li>
          <li>
          <NavLink
                className={'dropdown-item'}
                to="materiaspage?semestre=3"
              >
                3
              </NavLink>
          </li>
          <li>
          <NavLink
                className={'dropdown-item'}
                to="materiaspage?semestre=4"
              >
                4
              </NavLink>
          </li>
          <li>
          <NavLink
                className={'dropdown-item'}
                to="materiaspage?semestre=5"
              >
                5
              </NavLink>
          </li>
          <li>
          <NavLink
                className={'dropdown-item'}
                to="materiaspage?semestre=6"
              >
                6
              </NavLink>
          </li>
          <li>
          <NavLink
                className={'dropdown-item'}
                to="materiaspage?semestre=7"
              >
                7
              </NavLink>
          </li>
          <li>
          <NavLink
                className={'dropdown-item'}
                to="materiaspage?semestre=8"
              >
                8
              </NavLink>
          </li>
          <li>
          <NavLink
                className={'dropdown-item'}
                to="materiaspage?semestre=9"
              >
                9
              </NavLink>
          </li>
        </ul>
      </div>
      <div>
   
      </div>
    </>
  );
};
