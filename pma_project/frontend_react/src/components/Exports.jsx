import React from 'react'
import ExportCSV from './ExportCSV';
import ExportPDF from './ExportPDF';
import ExportExcel from './ExportExcel';
import ExportJSON from './ExportJson';


function Exports({data}) {
  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        id="downloadMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        📥 Download
      </button>

      <ul className="dropdown-menu" aria-labelledby="downloadMenuButton">
        <li className="dropdown-item">
          <ExportCSV data={data} />
        </li>
        <li className="dropdown-item">
          <ExportExcel data={data} />
        </li>
        <li className="dropdown-item">
          <ExportPDF data={data} />
        </li>
        <li className="dropdown-item">
          <ExportJSON data={data} />
        </li>
      </ul>
    </div>
  );
}

export default Exports