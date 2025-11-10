import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ExportPDF({ data }) {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No weather data available to export.");
      return;
    }

    const doc = new jsPDF();

    // Title & metadata
    doc.setFontSize(18);
    doc.text("🌦️ Weather Report", 14, 15);
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 22);

    // Define columns dynamically (keys from first object)
    const tableColumn = Object.keys(data[0]);

    // Define rows (values of each record)
    const tableRows = data.map((record) => tableColumn.map((key) => record[key]));

    // Add table
    autoTable(doc, {
      head: [tableColumn.map((col) => col.replace(/_/g, " ").toUpperCase())],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 11, cellPadding: 4 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      columnStyles: { 0: { cellWidth: 20 } },
    });

    // Save file
    doc.save(`weather_report_${new Date().toISOString().split("T")[0]}.pdf`);
  };

  return (
    <button onClick={handleExport} className="btn btn-danger">
      Export Weather PDF
    </button>
  );
}

export default ExportPDF;
