import React from 'react'
import { CSVLink } from "react-csv";

function ExportCSV({data}) {



  return (
    <div>
      <CSVLink 
        data={data} 
        filename="users_data.csv"
        className="btn btn-success"
      >
        Export CSV
      </CSVLink>
    </div>
  );
}

export default ExportCSV