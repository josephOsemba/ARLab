import React from 'react';

const ExportButtons = ({ tableRef }) => {
  const handlePrint = () => window.print();

  const handleExport = () => {
    const table = tableRef.current;
    const csv = [];
    for (let row of table.rows) {
      const cells = Array.from(row.cells).map((cell) => `"${cell.innerText}"`);
      csv.push(cells.join(','));
    }
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const link = document.createElement('a');
    link.download = 'oscillation_data.csv';
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <div className="export-buttons">
      <button onClick={handlePrint}>🖨️ Print</button>
      <button onClick={handleExport}>📥 Export CSV</button>
    </div>
  );
};

export default ExportButtons;
