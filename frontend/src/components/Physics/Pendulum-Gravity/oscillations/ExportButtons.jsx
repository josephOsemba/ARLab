import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const ExportButton = ({ tableRef, chartRef, fileName = 'report' }) => {
  const [isTableReady, setIsTableReady] = useState(false);

  // Check if table ref is available
  useEffect(() => {
    const checkTableReady = () => {
      if (tableRef?.current) {
        setIsTableReady(true);
      }
    };

    // Initial check
    checkTableReady();

    // Set up observer if ref isn't immediately available
    if (!tableRef?.current) {
      const observer = new MutationObserver(checkTableReady);
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      return () => observer.disconnect();
    }
  }, [tableRef]);

  const handlePrint = () => {
    document.body.classList.add('print-mode');

    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body.print-mode * { visibility: visible; }
        body.print-mode .no-print { display: none !important; }
        body.print-mode table { 
          width: 100% !important; 
          margin-bottom: 30px !important;
          border-collapse: collapse;
        }
        body.print-mode th, body.print-mode td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        body.print-mode th {
          background-color: #f2f2f2;
        }
        body.print-mode canvas {
          max-width: 100% !important;
          height: auto !important;
        }
      }
    `;
    document.head.appendChild(style);

    window.print();

    setTimeout(() => {
      document.body.classList.remove('print-mode');
      document.head.removeChild(style);
    }, 500);
  };

  const handleExportCSV = () => {
    try {
      if (!isTableReady || !tableRef?.current) {
        throw new Error('No table data available for export');
      }

      const table = tableRef.current;
      const rows = table.querySelectorAll('tr');
      const csvData = [];

      rows.forEach((row) => {
        const rowData = [];
        const cells = row.querySelectorAll('th, td');
        cells.forEach((cell) => rowData.push(cell.innerText));
        csvData.push(rowData);
      });

      const ws = XLSX.utils.aoa_to_sheet(csvData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, `${fileName}.csv`, { bookType: 'csv' });
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export CSV. Please ensure the table is loaded.');
    }
  };

  return (
    <div
      className="export-buttons no-print"
      style={{ display: 'flex', gap: '10px', margin: '10px 0' }}
    >
      <button
        onClick={handlePrint}
        style={{
          padding: '8px 16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        Print Report
      </button>
      <button
        onClick={handleExportCSV}
        disabled={!isTableReady}
        style={{
          padding: '8px 16px',
          backgroundColor: isTableReady ? '#2196F3' : '#cccccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isTableReady ? 'pointer' : 'not-allowed',
          fontSize: '14px',
        }}
      >
        Export CSV
      </button>
    </div>
  );
};

export default ExportButton;
