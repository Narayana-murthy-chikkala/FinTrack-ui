// Export functionality for CSV and JSON formats

export const exportManager = {
  exportToCSV: (data, filename = "export.csv") => {
    if (!data || data.length === 0) {
      console.warn("No data to export");
      return;
    }

    // Get headers from first object
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            // Escape quotes and wrap in quotes if contains comma or quote
            if (value === null || value === undefined) return "";
            const stringValue = String(value);
            if (stringValue.includes(",") || stringValue.includes('"')) {
              return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
          })
          .join(",")
      ),
    ].join("\n");

    downloadFile(csvContent, filename, "text/csv");
  },

  exportToJSON: (data, filename = "export.json") => {
    if (!data) {
      console.warn("No data to export");
      return;
    }

    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, filename, "application/json");
  },

  exportToExcel: (data, filename = "export.xlsx") => {
    // For proper Excel support, you'd need a library like `xlsx`
    // For now, we can export as CSV which Excel can read
    console.warn("Use exportToCSV for Excel-compatible format");
    exportManager.exportToCSV(data, filename.replace(".xlsx", ".csv"));
  },
};

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Utility to format transactions for export
export const prepareTransactionsForExport = (transactions) => {
  return transactions.map((tx) => ({
    Date: new Date(tx.date).toLocaleDateString(),
    Description: tx.description,
    Category: tx.category,
    Type: tx.type,
    Amount: Math.abs(tx.amount),
    "Account/Source": tx.account || "Default",
  }));
};
