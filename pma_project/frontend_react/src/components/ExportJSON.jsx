import React from "react";

function ExportJSON({ data }) {
  const handleDownloadJSON = () => {
    if (!data || data.length === 0) {
      alert("No data available to download.");
      return;
    }

    // Convert data to formatted JSON string
    const jsonString = JSON.stringify(data, null, 2);

    // Create a Blob and download link
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `weather_report_${new Date().toISOString().split("T")[0]}.json`;
    link.click();

    // Cleanup
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleDownloadJSON} className="btn btn-success">
      💾 Download JSON
    </button>
  );
}

export default ExportJSON;
