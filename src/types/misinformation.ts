export type MisinformationSeverity = 'high' | 'medium' | 'low';
export type MisinformationCategory = 'visual_manipulation' | 'metadata_tampering' | 'ai_generation' | 'context_manipulation';

export interface DetectedArea {
  x: number;
  y: number;
  width: number;
  height: number;
  description: string;
}

export interface MisinformationPattern {
  name: string;
  confidence: number;
  detectedAreas: DetectedArea[];
  recommendations?: string[];
}

export interface SourceAnalysis {
  verificationStatus: 'verified' | 'pending' | 'rejected';
  potentialSources: string[];
}

export interface MisinformationDetail {
  category: MisinformationCategory;
  patterns: MisinformationPattern[];
  explanation: string;
  severity: MisinformationSeverity;
  recommendations: string[];
  timestamp: string;
  sourceAnalysis: SourceAnalysis;
} 