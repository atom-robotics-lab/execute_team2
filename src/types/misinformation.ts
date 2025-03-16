export type MisinformationSeverity = 'low' | 'medium' | 'high';

export type MisinformationCategory = 
  | 'visual_manipulation'
  | 'ai_generated'
  | 'context_mismatch'
  | 'metadata_tampering'
  | 'style_inconsistency'
  | 'lighting_anomaly';

export interface MisinformationPattern {
  id: string;
  name: string;
  description: string;
  confidence: number;
  detectedAreas?: {
    x: number;
    y: number;
    width: number;
    height: number;
    description: string;
  }[];
}

export interface MisinformationDetail {
  category: MisinformationCategory;
  patterns: MisinformationPattern[];
  explanation: string;
  severity: MisinformationSeverity;
  recommendations: string[];
  timestamp: string;
  sourceAnalysis?: {
    originalContext?: string;
    potentialSources?: string[];
    verificationStatus: 'pending' | 'verified' | 'unverified';
  };
} 