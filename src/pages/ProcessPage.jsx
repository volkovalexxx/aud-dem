import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ProcessPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [riskScore] = useState(() => parseFloat((0.5 + Math.random() * 28).toFixed(1)));
  const [riskLevel] = useState(() => {
    const score = parseFloat((0.5 + Math.random() * 28).toFixed(1));
    if (score <= 30) return 'Low';
    if (score <= 69) return 'Medium';
    return 'High';
  });
  
  const progressRef = useRef(0);
  const intervalRef = useRef(null);

  // Demo wallet address (masked)
  const connectedWallet = 'demo-trx-address';
  const maskedWallet = `${connectedWallet.slice(0, 6)}...${connectedWallet.slice(-4)}`;

  // Step 1: Terms
  const handleAcceptTerms = () => {
    if (!agreed) return;
    progressRef.current = 0;
    setAnalysisProgress(0);
    setCurrentStep(2);
  };

  // Analysis logic
  useEffect(() => {
    if (currentStep !== 2) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Start progress
    intervalRef.current = setInterval(() => {
      progressRef.current += 1;
      setAnalysisProgress(progressRef.current);
      
      if (progressRef.current >= 100) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTimeout(() => {
          setCurrentStep(3);
        }, 200);
      }
    }, 60);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [currentStep]);

  // Step 3: Generate Report
  const handleGenerateReport = () => {
    setIsGenerating(true);
    localStorage.setItem('aml_report_data', JSON.stringify({
      riskScore,
      riskLevel,
      timestamp: Date.now()
    }));
    setTimeout(() => {
      setIsGenerating(false);
      navigate('/report');
    }, 2000);
  };

  const getRiskColor = () => {
    if (riskLevel === 'Low') return 'text-green-500';
    if (riskLevel === 'Medium') return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header showConnect={false} />
      
      <main className="flex-1 pt-6 pb-8 min-h-[calc(100vh-48px)]">
        <div className="px-4 max-w-md mx-auto">
          
          {/* Connected Wallet */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-gray-400 text-sm">Connected:</span>
            <span className="text-white font-mono text-sm">{maskedWallet}</span>
          </div>

          {/* Horizontal Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-800 -translate-y-1/2 rounded-full"></div>
              <div 
                className="absolute left-0 top-1/2 h-0.5 bg-bybit-orange -translate-y-1/2 rounded-full transition-all duration-500"
                style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
              ></div>

              <div className="relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= 1 ? 'bg-bybit-orange text-black' : 'bg-gray-800 text-gray-500'
                }`}>
                  {currentStep > 1 ? '✓' : '1'}
                </div>
              </div>

              <div className="relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= 2 ? 'bg-bybit-orange text-black' : 'bg-gray-800 text-gray-500'
                }`}>
                  {currentStep > 2 ? '✓' : '2'}
                </div>
              </div>

              <div className="relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= 3 ? 'bg-bybit-orange text-black' : 'bg-gray-800 text-gray-500'
                }`}>
                  {currentStep > 3 ? '✓' : '3'}
                </div>
              </div>
            </div>
          </div>

          {/* Step 1: Terms */}
          {currentStep === 1 && (
            <div className="bg-bybit-header rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Terms of Service</h2>

              <div className="bg-black rounded-xl p-4 mb-5 border border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/trx-logo.svg" alt="TRON" className="w-8 h-8" />
                  <div>
                    <p className="text-white font-medium">Tron Network</p>
                    <p className="text-gray-500 text-sm">TRC-20</p>
                  </div>
                </div>
                <div className="border-t border-gray-800 pt-4">
                  <p className="text-gray-400 text-sm mb-3">By proceeding, you authorize:</p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Transaction history analysis</li>
                    <li>• Risk score calculation</li>
                    <li>• AML report generation</li>
                  </ul>
                </div>
              </div>

              <label className="flex items-start gap-2 mb-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-600 bg-black text-bybit-orange"
                />
                <span className="text-sm text-gray-400">I agree to the Terms of Service</span>
              </label>

              <button
                onClick={handleAcceptTerms}
                disabled={!agreed}
                className="w-full py-3 bg-bybit-orange text-black font-semibold rounded-full disabled:opacity-50"
              >
                Accept & Continue
              </button>
            </div>
          )}

          {/* Step 2: Analysis */}
          {currentStep === 2 && (
            <div className="bg-bybit-header rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">Analysis</h2>
              <p className="text-gray-400 text-sm mb-6">Scanning your wallet...</p>

              <div className="text-center py-4">
                <div className="relative w-28 h-28 mx-auto mb-6">
                  <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-bybit-orange rounded-full border-t-transparent animate-spin"></div>
                  <div className="absolute inset-2 border-2 border-gray-800/50 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src="/trx-logo.svg" alt="TRON" className="w-12 h-12" />
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold text-bybit-orange">{analysisProgress}%</span>
                </div>

                <div className="w-full h-2 bg-gray-800 rounded-full mb-6 overflow-hidden">
                  <div 
                    className="h-full bg-bybit-orange rounded-full"
                    style={{ width: `${analysisProgress}%` }}
                  ></div>
                </div>

                <p className="text-white font-medium mb-4">
                  {analysisProgress < 30 && 'Initializing scan...'}
                  {analysisProgress >= 30 && analysisProgress < 60 && 'Analyzing transactions...'}
                  {analysisProgress >= 60 && analysisProgress < 85 && 'Checking risk patterns...'}
                  {analysisProgress >= 85 && 'Finalizing report...'}
                </p>

                <div className="space-y-2 text-left text-sm bg-black/30 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Transaction history</span>
                    <span className={analysisProgress > 25 ? 'text-green-500' : 'text-gray-600'}>
                      {analysisProgress > 25 ? '✓' : '...'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Source verification</span>
                    <span className={analysisProgress > 45 ? 'text-green-500' : 'text-gray-600'}>
                      {analysisProgress > 45 ? '✓' : '...'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Risk pattern detection</span>
                    <span className={analysisProgress > 65 ? 'text-green-500' : 'text-gray-600'}>
                      {analysisProgress > 65 ? '✓' : '...'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Compliance check</span>
                    <span className={analysisProgress > 85 ? 'text-green-500' : 'text-gray-600'}>
                      {analysisProgress > 85 ? '✓' : '...'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Report */}
          {currentStep === 3 && (
            <div className="bg-bybit-header rounded-2xl p-6">
              {isGenerating ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 border-4 border-bybit-orange border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                  <p className="text-white font-medium text-lg">Preparing your report...</p>
                  <p className="text-gray-400 text-sm mt-2">Please wait a moment</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-white mb-2">Analysis Complete</h2>
                    <p className="text-gray-400 text-sm">Your wallet has been checked</p>
                  </div>

                  <div className="flex justify-center mb-6">
                    <div className={`w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center ${
                      riskLevel === 'Low' ? 'border-green-500/30 bg-green-500/10' :
                      riskLevel === 'Medium' ? 'border-orange-500/30 bg-orange-500/10' :
                      'border-red-500/30 bg-red-500/10'
                    }`}>
                      <span className="text-gray-400 text-xs mb-1">Risk Score</span>
                      <span className={`text-3xl font-bold ${getRiskColor()}`}>{riskScore}%</span>
                      <span className={`text-sm font-medium mt-1 ${getRiskColor()}`}>{riskLevel}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateReport}
                    className="w-full py-3 bg-bybit-orange text-black font-semibold rounded-full"
                  >
                    View Full Report
                  </button>
                  
                  <button
                    onClick={() => navigate('/')}
                    className="w-full py-3 mt-3 text-gray-400 text-sm hover:text-white"
                  >
                    Back to Home
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProcessPage;
