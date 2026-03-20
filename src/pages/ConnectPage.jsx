import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ConnectPage() {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showAgreementError, setShowAgreementError] = useState(false);

  // Handle connect from header or form
  const handleConnect = () => {
    if (!isAgreed) {
      setShowAgreementError(true);
      // Hide error after 3 seconds
      setTimeout(() => setShowAgreementError(false), 3000);
      return;
    }
    
    setIsConnecting(true);
    
    // Simulate connection delay (2 seconds)
    setTimeout(() => {
      setIsConnecting(false);
      navigate('/process');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header 
        onConnectClick={handleConnect} 
        isConnecting={isConnecting}
        isAgreed={isAgreed}
      />
      
      {/* Section 1: Hero with Form - Black background with bg image */}
      <section 
        className="relative flex items-center justify-center px-4 py-16"
        style={{ 
          backgroundColor: '#000',
          backgroundImage: 'url(/bg-img.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: 'calc(100vh - 48px)'
        }}
      >
        <div className="w-full max-w-md">
          {/* Form Container */}
          <div className="bg-[#1a1a1a]/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-6">Start AML inspection</h2>

            {/* Network selector */}
            <div className="mb-4">
              <label className="text-gray-400 text-sm font-medium block mb-2">Network</label>
              <div className="flex items-center gap-3 bg-black/50 rounded-xl p-4 border border-gray-700">
                <img src="/trx-logo.svg" alt="TRON" className="w-8 h-8" />
                <span className="text-white font-semibold">Tron network</span>
              </div>
            </div>

            {/* Info block */}
            <div className="bg-black/50 rounded-xl p-4 mb-5 border border-gray-700">
              <h4 className="text-white font-semibold mb-1">Completely Free</h4>
              <p className="text-gray-400 text-sm">
                Get a comprehensive AML risk assessment for your wallet at no cost.
              </p>
            </div>

            {/* Agreement checkbox */}
            <div className={`flex items-start gap-3 mb-5 p-3 rounded-lg transition-colors ${showAgreementError ? 'bg-red-500/20 border border-red-500/50' : ''}`}>
              <input
                type="checkbox"
                id="agreement"
                checked={isAgreed}
                onChange={(e) => {
                  setIsAgreed(e.target.checked);
                  if (e.target.checked) setShowAgreementError(false);
                }}
                className="mt-1 w-5 h-5 rounded border-gray-600 bg-black text-bybit-orange focus:ring-bybit-orange focus:ring-offset-0"
              />
              <label htmlFor="agreement" className="text-sm text-gray-400 leading-relaxed cursor-pointer">
                Before starting the verification, you confirm your agreement with service&apos;s{' '}
                <a href="#" className="text-bybit-orange hover:underline">terms of use</a>
              </label>
            </div>

            {/* Connect button */}
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full py-4 bg-bybit-orange text-black font-semibold rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:bg-bybit-orange-hover"
            >
              {isConnecting ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connecting...
                </>
              ) : (
                'Connect Wallet'
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Features - Dark section with gradient */}
      <section className="bg-gradient-to-b from-black to-[#0d1117] py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[28px] font-bold text-white leading-tight mb-4">
              AML <span className="text-bybit-orange">Compliance</span> Tools
            </h2>
            <p className="text-gray-400 text-base">
              Essential tools for monitoring and assessing crypto transaction risks
            </p>
          </div>

          <div className="grid gap-6">
            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-bybit-orange/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-bybit-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-base mb-1">Transaction Verification</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Verify the legitimacy of incoming and outgoing transactions on the Tron network.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-bybit-orange/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-bybit-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-base mb-1">Risk Assessment</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Comprehensive risk scoring based on on-chain data and historical patterns.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-bybit-orange/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-bybit-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-base mb-1">Export Reports</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Download detailed compliance reports for your records or regulatory requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Stats - Black section */}
      <section className="bg-black py-12 px-4 border-y border-gray-800">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-bybit-orange mb-1">10M+</div>
              <div className="text-gray-500 text-xs">Wallets Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-bybit-orange mb-1">99.9%</div>
              <div className="text-gray-500 text-xs">Detection Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-bybit-orange mb-1">&lt;10s</div>
              <div className="text-gray-500 text-xs">Analysis Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: How It Works - Light section */}
      <section className="bg-[#f5f5f5] py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[28px] font-bold text-gray-900 leading-tight mb-4">
              How It <span className="text-bybit-orange">Works</span>
            </h2>
            <p className="text-gray-600 text-base">
              Three simple steps to secure your assets
            </p>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-bybit-orange text-black font-bold flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-lg mb-1">Connect Wallet</h3>
                <p className="text-gray-600 text-sm">
                  Link your Tron wallet securely with one click. No private keys required.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-bybit-orange text-black font-bold flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-lg mb-1">AI Analysis</h3>
                <p className="text-gray-600 text-sm">
                  Our system scans billions of transactions to identify potential risks.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-bybit-orange text-black font-bold flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-lg mb-1">Get Report</h3>
                <p className="text-gray-600 text-sm">
                  Download your detailed AML compliance report instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Risk Categories - Dark section */}
      <section className="bg-[#0d1117] py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[28px] font-bold text-white leading-tight mb-4">
              What We <span className="text-bybit-orange">Detect</span>
            </h2>
            <p className="text-gray-400 text-base">
              Comprehensive risk assessment across multiple categories
            </p>
          </div>

          <div className="space-y-4">
            {/* Trusted */}
            <div className="bg-black/50 rounded-xl p-5 border border-green-500/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-green-500 font-bold">Trusted Sources</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Verified exchanges, licensed services, and compliant platforms.
              </p>
            </div>

            {/* Suspicious */}
            <div className="bg-black/50 rounded-xl p-5 border border-orange-500/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-orange-500 font-bold">Suspicious Activity</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Unlicensed exchanges, high-risk jurisdictions, unusual patterns.
              </p>
            </div>

            {/* Dangerous */}
            <div className="bg-black/50 rounded-xl p-5 border border-red-500/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-red-500 font-bold">High Risk</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Darknet markets, mixers, sanctioned addresses, illegal services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: CTA - Dark section with gradient */}
      <section 
        className="relative py-16 px-4"
        style={{ 
          background: 'linear-gradient(180deg, #0d1117 0%, #000 100%)'
        }}
      >
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Secure Your Assets?
          </h2>
          <p className="text-gray-400 mb-8">
            Join millions of users who trust Bybit AML for their compliance needs.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-4 bg-bybit-orange text-black font-semibold rounded-full hover:bg-bybit-orange-hover transition-colors"
          >
            Start Free Analysis
          </button>
        </div>
      </section>

      {/* Footer - Sticky at bottom */}
      <Footer />
    </div>
  );
}

export default ConnectPage;
