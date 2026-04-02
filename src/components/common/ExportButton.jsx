import { Download, FileJson, FileText } from "lucide-react";
import { exportManager, prepareTransactionsForExport } from "../../../src/utils/export.js";
import "../../styles/exportButton.css";

export function ExportButton({ transactions = [] }) {
  if (!transactions || transactions.length === 0) {
    return null;
  }

  const handleExportCSV = () => {
    const data = prepareTransactionsForExport(transactions);
    const filename = `transactions_${new Date().toISOString().split("T")[0]}.csv`;
    exportManager.exportToCSV(data, filename);
  };

  const handleExportJSON = () => {
    const filename = `transactions_${new Date().toISOString().split("T")[0]}.json`;
    exportManager.exportToJSON(transactions, filename);
  };

  return (
    <div className="export-button-group">
      <button className="export-btn" onClick={handleExportCSV} title="Export as CSV">
        <FileText size={18} />
        <span>CSV</span>
      </button>
      <button className="export-btn" onClick={handleExportJSON} title="Export as JSON">
        <FileJson size={18} />
        <span>JSON</span>
      </button>
    </div>
  );
}

export default ExportButton;
