import React, { useState, useEffect, useCallback } from 'react';
import { blockchainService } from '../services/blockchainService';

const VerificationTool = () => {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [contentHistory, setContentHistory] = useState([]);
  const [networkError, setNetworkError] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [sourceInfo, setSourceInfo] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [publishedContent, setPublishedContent] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window.ethereum === 'undefined') {
      setError('Please install MetaMask to use this feature');
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts'
      });
      
      console.log('Current accounts:', accounts);
      
      if (accounts.length > 0) {
        await initializeBlockchain();
      } else {
        setIsConnected(false);
        setError('Please connect your MetaMask wallet');
      }
    } catch (error) {
      console.error('Connection check failed:', error);
      setIsConnected(false);
      setError(error.message);
    }
  };

  const initializeBlockchain = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      
      await blockchainService.initialize();
      
      setIsConnected(true);
      setError(null);
      await loadSourceInfo();
      await loadPublishedContent();
    } catch (error) {
      console.error('Blockchain initialization failed:', error);
      setIsConnected(false);
      setError(error.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const loadSourceInfo = async () => {
    try {
      const address = await blockchainService.signer.getAddress();
      const source = await blockchainService.getSource(address);
      setSourceInfo(source);
    } catch (err) {
      console.error('Error loading source info:', err);
      setError('Failed to load source information');
    }
  };

  const loadPublishedContent = async () => {
    try {
      const content = await blockchainService.getPublishedContent();
      setPublishedContent(content);
    } catch (err) {
      console.error('Error loading published content:', err);
      setError('Failed to load published content');
    }
  };

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      console.log('Connected accounts:', accounts);
      
      if (accounts.length === 0) {
        throw new Error('Please connect your MetaMask wallet');
      }

      await initializeBlockchain();
    } catch (error) {
      console.error('Connection failed:', error);
      setIsConnected(false);
      setError(error.message);
    } finally {
      setIsConnecting(false);
    }
  };

  // Add event listeners for account and network changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts) => {
        console.log('Accounts changed:', accounts);
        if (accounts.length === 0) {
          setIsConnected(false);
          setError('Please connect your MetaMask wallet');
        } else {
          checkConnection();
        }
      };

      const handleChainChanged = () => {
        console.log('Network changed, reloading...');
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      handleUpload(file);
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      handleUpload(file);
    }
  };

  const handleUpload = async (file) => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsUploading(true);
    setError('');
    setUploadStatus('Uploading...');

    try {
      const result = await blockchainService.publishContent(
        file,
        file.type
      );
      setUploadStatus(`Content published successfully! Content ID: ${result.contentId}`);
      await loadSourceInfo();
      await loadPublishedContent();
      setSelectedFile(null); // Reset file selection after successful upload
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err.message);
      setUploadStatus('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleContentSelect = async (content) => {
    setSelectedContent(content);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            Verify Content Authenticity
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Upload any news article, image, or video to verify its authenticity and track its history on our blockchain.
          </p>
        </div>

        {/* Error Messages */}
        {error && (
          <div className="transform transition-all duration-300 ease-in-out hover:scale-102">
            <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/20 rounded-lg p-4 mb-6">
              <pre className="text-red-400 font-mono text-sm whitespace-pre-wrap">
                {error}
              </pre>
            </div>
          </div>
        )}

        {/* Network Error */}
        {networkError && (
          <div className="transform transition-all duration-300 ease-in-out hover:scale-102">
            <div className="bg-yellow-900/20 backdrop-blur-sm border border-yellow-500/20 rounded-lg p-4 mb-6 text-center">
              <p className="text-yellow-400">{networkError}</p>
              <button
                onClick={handleConnect}
                className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Switch Network
              </button>
            </div>
          </div>
        )}

        {/* Wallet Connection */}
        <div className="text-center mb-8">
          {isConnected ? (
            <div className="inline-flex items-center space-x-2 bg-green-900/20 backdrop-blur-sm text-green-400 px-4 py-2 rounded-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Wallet Connected</span>
            </div>
          ) : (
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="group relative inline-flex items-center justify-center px-8 py-3 font-medium tracking-wide text-white transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-200 ease-in-out bg-purple-600 rounded-lg group-hover:mt-0 group-hover:ml-0"></span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></span>
              <span className="relative flex items-center space-x-2">
                {isConnecting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Connect Wallet</span>
                  </>
                )}
              </span>
            </button>
          )}
        </div>

        {/* Upload Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-12 transform transition-all duration-300 hover:scale-[1.02]">
          <div 
            className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              isDragging 
                ? 'border-blue-500 bg-blue-500/10' 
                : 'border-gray-600 hover:border-blue-400 hover:bg-blue-500/5'
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-input"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*,video/*,.pdf,.doc,.docx"
            />
            <label htmlFor="file-input" className="cursor-pointer block">
              <div className="mb-4">
                <div className={`text-6xl transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}>
                  📤
                </div>
              </div>
              <p className="text-gray-300 text-lg mb-2">
                {selectedFile ? selectedFile.name : "Drag and drop your content here"}
              </p>
              <p className="text-gray-500">
                or click to select a file
              </p>
            </label>

            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm rounded-xl">
                <div className="text-center">
                  <div className="inline-block">
                    <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <p className="text-blue-400 mt-4 text-lg">Uploading to blockchain...</p>
                </div>
              </div>
            )}

            {uploadStatus && (
              <div className={`mt-4 transition-all duration-300 ${uploadStatus.includes('failed') ? 'text-red-400' : 'text-green-400'}`}>
                <p className="text-lg">{uploadStatus}</p>
              </div>
            )}
          </div>
        </div>

        {/* Published Content */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6">
            Published Content
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Content ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Published</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {publishedContent.map((content, index) => (
                  <tr 
                    key={content.contentId}
                    className="transform transition-all duration-200 hover:bg-blue-500/5"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <td className="px-6 py-4">
                      <span className="text-gray-300 font-mono">{content.contentId.slice(0, 8)}...</span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {content.contentType}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {formatDate(content.timestamp)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        content.isVerified 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        <span className={`w-2 h-2 mr-2 rounded-full ${
                          content.isVerified ? 'bg-green-400' : 'bg-yellow-400'
                        }`}></span>
                        {content.isVerified ? 'Verified' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleContentSelect(content)}
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Content Details Modal */}
        {selectedContent && (
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4 animate-fade-in">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedContent(null)}></div>
            <div className="relative bg-gray-800 rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  Content Details
                </h3>
                <button
                  onClick={() => setSelectedContent(null)}
                  className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">Content ID</p>
                  <p className="text-gray-200 font-mono break-all">{selectedContent.contentId}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">IPFS Hash</p>
                  <p className="text-gray-200 font-mono break-all">{selectedContent.ipfsHash}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">Publisher</p>
                  <p className="text-gray-200 font-mono">{selectedContent.publisher}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">Published Date</p>
                  <p className="text-gray-200">{formatDate(selectedContent.timestamp)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">Content Type</p>
                  <p className="text-gray-200">{selectedContent.contentType}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">Credibility Score</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000"
                        style={{ width: `${selectedContent.credibilityScore}%` }}
                      />
                    </div>
                    <span className="text-gray-200">{selectedContent.credibilityScore}%</span>
                  </div>
                </div>
              </div>

              {selectedContent.contentType.startsWith('image/') && (
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-gray-300 mb-4">Preview</h4>
                  <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    <img
                      src={selectedContent.ipfsHash}
                      alt="Content Preview"
                      className="absolute inset-0 w-full h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23374151"/><text x="50" y="50" font-family="Arial" font-size="14" text-anchor="middle" dy=".3em" fill="%239CA3AF">Preview not available</text></svg>';
                      }}
                    />
                  </div>
                </div>
              )}

              {contentHistory.length > 0 && (
                <div>
                  <h4 className="text-lg font-medium text-gray-300 mb-4">Modification History</h4>
                  <div className="space-y-4">
                    {contentHistory.map((mod, index) => (
                      <div 
                        key={index}
                        className="bg-gray-700/50 rounded-lg p-4 transform transition-all duration-300 hover:scale-[1.02]"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-gray-300 font-medium">Modified by</p>
                            <p className="text-gray-400 font-mono">{mod.modifiedBy}</p>
                          </div>
                          <span className="text-gray-500 text-sm">{formatDate(mod.timestamp)}</span>
                        </div>
                        <p className="text-gray-300 mt-2">{mod.description}</p>
                        <p className="text-gray-400 font-mono text-sm mt-2 break-all">
                          New IPFS Hash: {mod.ipfsHash}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationTool; 