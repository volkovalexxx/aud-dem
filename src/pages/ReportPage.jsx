import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const DEMO_ADDRESS = 'demo-trx-address';

function ReportPage() {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // Generate consistent report data
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    
    // Read stored risk data from ProcessPage
    const storedData = localStorage.getItem('aml_report_data');
    let riskPercent;
    
    if (storedData) {
      const parsed = JSON.parse(storedData);
      riskPercent = parsed.riskScore;
    } else {
      // Fallback if no stored data
      riskPercent = parseFloat((0.5 + Math.random() * 28).toFixed(1));
    }
    
    const exchangeMl = parseFloat((riskPercent * 0.4).toFixed(1));
    const s1 = parseFloat((riskPercent * 0.2).toFixed(1));
    const s2 = parseFloat((riskPercent * 0.13).toFixed(1));
    const s3 = parseFloat((riskPercent * 0.07).toFixed(1));
    const d1 = parseFloat((riskPercent * 0.07).toFixed(1));
    const d2 = parseFloat((riskPercent * 0.06).toFixed(1));
    const d3 = parseFloat((riskPercent * 0.07).toFixed(1));
    
    const report = {
      walletAddress: DEMO_ADDRESS,
      riskPercentage: riskPercent,
      riskLevel: riskPercent <= 30 ? 'Low risk level' : riskPercent <= 69 ? 'Medium risk level' : 'High risk level',
      dateOfCreation: `${dateStr}, ${timeStr}`,
      trustedSources: {
        'Exchange With ML Risk': `${exchangeMl} %`,
        'Wallet Created': `${dateStr}, ${timeStr}`,
        'TRX Balance': '0 TRX',
        'USDT Balance': '0 USDT',
        'Transactions': '0 (0 In / 0 Out)',
      },
      suspiciousSources: {
        'Exchange Unlicensed': `${s1} %`,
        'ATM': `${s2} %`,
        'Liquidity pools': `${s3} %`,
      },
      dangerousSources: {
        'Darknet Marketplace': `${d1} %`,
        'Mixer': `${d2} %`,
        'Illegal Service': `${d3} %`,
      },
    };

    setReportData(report);
  }, []);

  const getRiskColor = (percentage) => {
    if (percentage <= 30) return 'text-green-500';
    if (percentage <= 69) return 'text-orange-500';
    return 'text-red-500';
  };

  const getRiskBgColor = (percentage) => {
    if (percentage <= 30) return 'bg-green-500/10 border-green-500/30';
    if (percentage <= 69) return 'bg-orange-500/10 border-orange-500/30';
    return 'bg-red-500/10 border-red-500/30';
  };

  const getGaugeStrokeColor = (percentage) => {
    if (percentage <= 30) return '#22C55E';
    if (percentage <= 69) return 'rgb(255, 156, 46)';
    return '#ef4444';
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert('Report downloaded successfully!');
    }, 1500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'AML Report',
        text: `AML Report for wallet ${DEMO_ADDRESS.slice(0, 8)}...`,
      }).catch(() => {});
    } else {
      alert('Share feature not available');
    }
  };

  if (!reportData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-bybit-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const riskPercent = reportData.riskPercentage;
  const radius = 80;
  const centerX = 100;
  const centerY = 90;
  const startX = 20;
  const startY = 90;
  const angle = (riskPercent / 100) * Math.PI;
  const endX = centerX + radius * Math.cos(Math.PI - angle);
  const endY = centerY - radius * Math.sin(Math.PI - angle);
  const largeArcFlag = riskPercent > 50 ? 1 : 0;
  const gaugePath = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header showConnect={false} />
      
      <main className="flex-1 pt-6 pb-24">
        <div className="px-4 max-w-md mx-auto">
          
          {/* Header with logo */}
          <div className="flex items-center justify-center gap-2 mb-6 pt-4">
            <img src="/trx-logo.svg" alt="TRON" className="w-8 h-8" />
            <span className="text-white font-bold text-lg">AML Report</span>
          </div>

          {/* Risk Gauge Card */}
          <div className={`rounded-2xl border p-6 mb-6 ${getRiskBgColor(riskPercent)}`}>
            <div className="flex flex-col items-center">
              {/* Gauge */}
              <div className="relative w-48 h-24 mb-4">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  <path d="M 20 90 A 80 80 0 0 1 180 90" stroke="#2C333A" strokeWidth="16" fill="none" strokeLinecap="round" />
                  <path d={gaugePath} stroke={getGaugeStrokeColor(riskPercent)} strokeWidth="16" fill="none" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-end justify-center pb-2">
                  <span className={`text-3xl font-bold ${getRiskColor(riskPercent)}`}>
                    {riskPercent}%
                  </span>
                </div>
              </div>

              {/* Risk Level */}
              <div className={`text-lg font-semibold mb-4 ${getRiskColor(riskPercent)}`}>
                {reportData.riskLevel}
              </div>

              {/* Legend */}
              <div className="flex gap-4 flex-wrap justify-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-gray-400 text-sm">0-30</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-gray-400 text-sm">31-69</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-gray-400 text-sm">70-100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wallet Address Card */}
          <div className="bg-bybit-header rounded-xl p-5 mb-6">
            <h2 className="text-white text-lg font-semibold mb-2">
              AML report for a wallet:
            </h2>
            <p className="text-gray-400 text-sm font-mono break-all">
              {reportData.walletAddress}
            </p>
          </div>

          {/* Trusted Sources */}
          <div className="bg-bybit-header rounded-xl p-5 mb-4">
            <h3 className="text-green-500 text-lg font-semibold mb-4">
              Trusted sources:
            </h3>
            <div className="space-y-3">
              {Object.entries(reportData.trustedSources).map(([label, value], index, arr) => (
                <div key={label}>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-400 text-sm">{label}:</span>
                    <span className="text-white text-sm font-semibold">{value}</span>
                  </div>
                  {index < arr.length - 1 && <div className="border-t border-gray-700" />}
                </div>
              ))}
            </div>
          </div>

          {/* Suspicious Sources */}
          <div className="bg-bybit-header rounded-xl p-5 mb-4">
            <h3 className="text-orange-500 text-lg font-semibold mb-4">
              Suspicious sources:
            </h3>
            <div className="space-y-3">
              {Object.entries(reportData.suspiciousSources).map(([label, value], index, arr) => (
                <div key={label}>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-400 text-sm">{label}:</span>
                    <span className="text-white text-sm font-semibold">{value}</span>
                  </div>
                  {index < arr.length - 1 && <div className="border-t border-gray-700" />}
                </div>
              ))}
            </div>
          </div>

          {/* Dangerous Sources */}
          <div className="bg-bybit-header rounded-xl p-5 mb-6">
            <h3 className="text-red-500 text-lg font-semibold mb-4">
              Dangerous sources:
            </h3>
            <div className="space-y-3">
              {Object.entries(reportData.dangerousSources).map(([label, value], index, arr) => (
                <div key={label}>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-400 text-sm">{label}:</span>
                    <span className="text-white text-sm font-semibold">{value}</span>
                  </div>
                  {index < arr.length - 1 && <div className="border-t border-gray-700" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-bybit-header border-t border-gray-800 z-40">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/trx-logo.svg" alt="TRON" className="w-6 h-6" />
            <span className="text-white text-sm font-medium">AML Report Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="p-2 bg-bybit-orange rounded-full hover:bg-bybit-orange-hover transition-colors disabled:opacity-75"
              aria-label="Download PDF"
            >
              {isDownloading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              )}
            </button>
            
            <button
              onClick={handleShare}
              className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
              aria-label="Share"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
              aria-label="Home"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for fixed footer */}
      <div className="h-16"></div>
    </div>
  );
}

export default ReportPage;
