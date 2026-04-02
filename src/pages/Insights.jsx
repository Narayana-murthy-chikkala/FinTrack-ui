import InsightsPanel from "../components/insights/InsightsPanel";
import AdvancedAnalytics from "../components/insights/AdvancedAnalytics";

export default function Insights() {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="page-title">Financial Insights 📊</div>
        <div className="page-subtitle">
          Deep dive into your spending patterns and financial health
        </div>
      </div>

      <AdvancedAnalytics />
      <InsightsPanel />
    </div>
  );
}
