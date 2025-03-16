import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlockchainAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UploadedFile {
  file: File;
  preview: string;
  status: 'uploading' | 'processing' | 'verified' | 'error';
  progress: number;
  hash?: string;
}

export function BlockchainAuthModal({ isOpen, onClose }: BlockchainAuthModalProps) {
  const [activeTab, setActiveTab] = useState('verify');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const processFile = (file: File) => {
    const uploadedFile: UploadedFile = {
      file,
      preview: URL.createObjectURL(file),
      status: 'uploading',
      progress: 0,
    };

    setUploadedFiles(prev => [...prev, uploadedFile]);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 100) {
        setUploadedFiles(prev =>
          prev.map(f =>
            f.file === file ? { ...f, progress } : f
          )
        );
      } else {
        clearInterval(interval);
        // Simulate blockchain verification
        setTimeout(() => {
          setUploadedFiles(prev =>
            prev.map(f =>
              f.file === file
                ? {
                    ...f,
                    status: 'verified',
                    hash: '0x' + Math.random().toString(16).slice(2, 34)
                  }
                : f
            )
          );
        }, 1000);
      }
    }, 300);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    files.forEach(processFile);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(processFile);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gray-900 rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white text-xl p-2"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold text-white mb-2">Blockchain Authentication</h2>
              <p className="text-white/80">Verify and secure content with distributed ledger technology</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-800">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('verify')}
                  className={`flex-1 px-6 py-4 text-sm font-medium ${
                    activeTab === 'verify'
                      ? 'text-emerald-500 border-b-2 border-emerald-500'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Verify Content
                </button>
                <button
                  onClick={() => setActiveTab('track')}
                  className={`flex-1 px-6 py-4 text-sm font-medium ${
                    activeTab === 'track'
                      ? 'text-emerald-500 border-b-2 border-emerald-500'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Track Changes
                </button>
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`flex-1 px-6 py-4 text-sm font-medium ${
                    activeTab === 'stats'
                      ? 'text-emerald-500 border-b-2 border-emerald-500'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Source Stats
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === 'verify' && (
                <div className="space-y-6">
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Content Verification</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                          🔒
                        </div>
                        <div>
                          <p className="text-white font-medium">Permanent Storage</p>
                          <p className="text-sm text-gray-400">Original reports stored immutably on blockchain</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                          📝
                        </div>
                        <div>
                          <p className="text-white font-medium">Cryptographic Signatures</p>
                          <p className="text-sm text-gray-400">Each piece of content has a unique digital signature</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Upload Content</h3>
                    <div
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={handleFileClick}
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer
                        ${isDragging
                          ? 'border-emerald-500 bg-emerald-500/10'
                          : 'border-gray-700 hover:border-emerald-500/50'}`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileSelect}
                        className="hidden"
                        multiple
                      />
                      <div className="text-4xl mb-4">📄</div>
                      <p className="text-white font-medium mb-2">
                        {isDragging ? 'Drop files here' : 'Drag and drop files here'}
                      </p>
                      <p className="text-sm text-gray-400 mb-4">or click to select files</p>
                    </div>

                    {/* Uploaded Files List */}
                    {uploadedFiles.length > 0 && (
                      <div className="mt-6 space-y-4">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="bg-gray-800 rounded-lg p-4">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center overflow-hidden">
                                {file.file.type.startsWith('image/') ? (
                                  <img src={file.preview} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-2xl">📄</span>
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="text-white font-medium">{file.file.name}</p>
                                <p className="text-sm text-gray-400">
                                  {(file.file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                                {file.status === 'uploading' && (
                                  <div className="mt-2">
                                    <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-emerald-500 transition-all duration-300"
                                        style={{ width: `${file.progress}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                )}
                                {file.status === 'verified' && file.hash && (
                                  <p className="text-sm text-emerald-500 mt-1">
                                    Verified • Hash: {file.hash}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center">
                                {file.status === 'uploading' && (
                                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-500"></div>
                                )}
                                {file.status === 'verified' && (
                                  <span className="text-emerald-500 text-xl">✓</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'track' && (
                <div className="space-y-6">
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Modification History</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                          📍
                        </div>
                        <div>
                          <p className="text-white font-medium">Original Upload Location</p>
                          <p className="text-sm text-gray-400">Track where content was first published</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                          🔄
                        </div>
                        <div>
                          <p className="text-white font-medium">Change Timeline</p>
                          <p className="text-sm text-gray-400">View all modifications with before/after comparisons</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Recent Changes</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <span className="text-2xl">🖼️</span>
                          <div>
                            <p className="text-white font-medium">Image_001.jpg</p>
                            <p className="text-sm text-gray-400">Modified 2 hours ago</p>
                          </div>
                        </div>
                        <button className="text-emerald-500 hover:text-emerald-400">
                          View Changes
                        </button>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <span className="text-2xl">📹</span>
                          <div>
                            <p className="text-white font-medium">Video_002.mp4</p>
                            <p className="text-sm text-gray-400">Modified 5 hours ago</p>
                          </div>
                        </div>
                        <button className="text-emerald-500 hover:text-emerald-400">
                          View Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'stats' && (
                <div className="space-y-6">
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Source Credibility</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-white">Overall Rating</span>
                          <span className="text-emerald-500 font-medium">85%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-white">Fact Check Score</span>
                          <span className="text-emerald-500 font-medium">92%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-white">Community Trust</span>
                          <span className="text-emerald-500 font-medium">78%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Historical Performance</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800 rounded-lg p-4">
                        <p className="text-4xl font-bold text-emerald-500 mb-2">1.2K</p>
                        <p className="text-sm text-gray-400">Verified Articles</p>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <p className="text-4xl font-bold text-emerald-500 mb-2">24</p>
                        <p className="text-sm text-gray-400">Fake News Detected</p>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <p className="text-4xl font-bold text-emerald-500 mb-2">98%</p>
                        <p className="text-sm text-gray-400">Accuracy Rate</p>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <p className="text-4xl font-bold text-emerald-500 mb-2">4.8</p>
                        <p className="text-sm text-gray-400">Trust Score</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-800 p-6">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  Powered by Blockchain Technology
                </div>
                <button
                  onClick={onClose}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 