import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const ExportButtons = ({ tableRef, chartRef }) => {
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => {
      // Clone the elements to avoid modifying the original DOM
      const printContent = document.createElement('div');

      // Add table if ref exists
      if (tableRef?.current) {
        const tableSection = document.createElement('div');
        tableSection.innerHTML = '<h3>Data Table</h3>';
        tableSection.appendChild(tableRef.current.cloneNode(true));
        printContent.appendChild(tableSection);
      }

      // Add chart if ref exists
      if (chartRef?.current) {
        const chartSection = document.createElement('div');
        chartSection.innerHTML = '<h3>Graph</h3>';
        chartSection.appendChild(chartRef.current.cloneNode(true));
        printContent.appendChild(chartSection);
      }

      return printContent;
    },
    pageStyle: `
      @page { size: auto; margin: 10mm; }
      body { -webkit-print-color-adjust: exact; }
      table { width: 100%; border-collapse: collapse; }
      th, td { border: 1px solid #000; padding: 8px; }
      th { background-color: #f2f2f2 !important; }
      h3 { margin: 20px 0 10px; }
    `,
  });

  const handleExport = () => {
    if (!tableRef?.current) return;

    const rows = Array.from(tableRef.current.querySelectorAll('tr'));
    const csvContent = rows
      .map((row) =>
        Array.from(row.querySelectorAll('th, td'))
          .map((cell) => `"${cell.textContent.replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'oscillation_data.csv';
    link.click();
  };

  return (
    <div className="export-buttons">
      <button onClick={handlePrint}>🖨️ Print Report</button>
      <button onClick={handleExport}>📥 Export CSV</button>
    </div>
  );
};

export default ExportButtons;
