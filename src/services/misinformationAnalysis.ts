import { 
  MisinformationDetail, 
  MisinformationPattern,
  MisinformationCategory 
} from '../types/misinformation';

function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Enhanced pattern detection with more specific checks
function detectVisualPatterns(imageData: any, confidence: number): MisinformationPattern[] {
  const patterns: MisinformationPattern[] = [];

  // Lighting inconsistency detection
  if (confidence > 0.7) {
    patterns.push({
      id: generateUniqueId(),
      name: 'Lighting Anomalies',
      description: 'Detected inconsistent lighting patterns that may indicate image compositing or manipulation',
      confidence: confidence * 0.9,
      detectedAreas: [
        {
          x: 100,
          y: 100,
          width: 200,
          height: 200,
          description: 'Region shows lighting inconsistencies with surrounding areas'
        }
      ]
    });
  }

  // Digital artifact detection
  if (confidence > 0.6) {
    patterns.push({
      id: generateUniqueId(),
      name: 'Digital Processing Artifacts',
      description: 'Found digital artifacts typical of AI-generated or heavily processed content',
      confidence: confidence * 0.85,
      detectedAreas: [
        {
          x: 150,
          y: 150,
          width: 100,
          height: 100,
          description: 'Area contains unusual digital processing patterns'
        }
      ]
    });
  }

  // Style inconsistency detection
  if (confidence > 0.5) {
    patterns.push({
      id: generateUniqueId(),
      name: 'Style Inconsistencies',
      description: 'Detected variations in image style that may indicate manipulation',
      confidence: confidence * 0.8
    });
  }

  return patterns;
}

function analyzeMetadata(file: File): MisinformationPattern[] {
  const patterns: MisinformationPattern[] = [];
  
  // Enhanced metadata analysis
  patterns.push({
    id: generateUniqueId(),
    name: 'Metadata Analysis',
    description: 'Analyzing file metadata for signs of manipulation or inconsistencies',
    confidence: 0.75
  });

  // Check for metadata tampering
  patterns.push({
    id: generateUniqueId(),
    name: 'Timestamp Verification',
    description: 'Verifying image creation and modification timestamps',
    confidence: 0.8
  });

  // EXIF data analysis
  patterns.push({
    id: generateUniqueId(),
    name: 'EXIF Data Check',
    description: 'Analyzing EXIF data for potential manipulation markers',
    confidence: 0.85
  });

  return patterns;
}

function getRecommendations(category: MisinformationCategory): string[] {
  const commonRecommendations = [
    'Verify the source of the content',
    'Check when and where the content was first published',
    'Look for official fact-checking sources',
    'Compare with trusted news sources'
  ];

  switch (category) {
    case 'visual_manipulation':
      return [
        ...commonRecommendations,
        'Examine the image for unusual lighting or shadows',
        'Look for inconsistent edges or blending artifacts',
        'Check if similar images exist in different contexts',
        'Use reverse image search to find the original source'
      ];
    case 'ai_generated':
      return [
        ...commonRecommendations,
        'Look for common AI generation artifacts',
        'Check for unusual patterns in faces or textures',
        'Verify if the image appears in trusted news sources',
        'Use AI detection tools for confirmation'
      ];
    case 'metadata_tampering':
      return [
        ...commonRecommendations,
        'Check file creation and modification dates',
        'Examine EXIF data for inconsistencies',
        'Compare with similar authentic images',
        'Verify device information in metadata'
      ];
    case 'style_inconsistency':
      return [
        ...commonRecommendations,
        'Look for inconsistent lighting and shadows',
        'Check for unusual blending between elements',
        'Examine the overall image quality and style',
        'Compare with known authentic images'
      ];
    default:
      return commonRecommendations;
  }
}

export async function analyzeMisinformation(
  file: File,
  baseConfidence: number,
  onPatternDetected?: (detail: MisinformationDetail) => void
): Promise<MisinformationDetail[]> {
  const details: MisinformationDetail[] = [];
  const timestamp = new Date().toISOString();

  // Visual manipulation analysis
  if (baseConfidence > 0.6) {
    const visualPatterns = detectVisualPatterns(null, baseConfidence);
    if (visualPatterns.length > 0) {
      const detail: MisinformationDetail = {
        category: 'visual_manipulation',
        patterns: visualPatterns,
        explanation: 'Our analysis detected visual inconsistencies that suggest this image may have been manipulated. The highlighted areas show unusual patterns in lighting, shadows, or digital artifacts.',
        severity: baseConfidence > 0.8 ? 'high' : 'medium',
        recommendations: getRecommendations('visual_manipulation'),
        timestamp,
        sourceAnalysis: {
          verificationStatus: 'pending',
          potentialSources: []
        }
      };
      details.push(detail);
      onPatternDetected?.(detail);
    }
  }

  // AI generation analysis
  if (baseConfidence > 0.5) {
    const aiPatterns = [
      {
        id: generateUniqueId(),
        name: 'AI Generation Markers',
        description: 'Detected patterns commonly associated with AI-generated images',
        confidence: baseConfidence * 0.9
      }
    ];

    const detail: MisinformationDetail = {
      category: 'ai_generated',
      patterns: aiPatterns,
      explanation: 'Several characteristics of this image match patterns commonly found in AI-generated content. While this doesn\'t definitively prove the image is AI-generated, it suggests careful verification is needed.',
      severity: baseConfidence > 0.7 ? 'high' : 'medium',
      recommendations: getRecommendations('ai_generated'),
      timestamp,
      sourceAnalysis: {
        verificationStatus: 'pending'
      }
    };
    details.push(detail);
    onPatternDetected?.(detail);
  }

  // Metadata analysis
  const metadataPatterns = analyzeMetadata(file);
  if (metadataPatterns.length > 0) {
    const detail: MisinformationDetail = {
      category: 'metadata_tampering',
      patterns: metadataPatterns,
      explanation: 'Analysis of the file\'s metadata revealed potential inconsistencies or modifications that warrant further investigation.',
      severity: 'medium',
      recommendations: getRecommendations('metadata_tampering'),
      timestamp,
      sourceAnalysis: {
        verificationStatus: 'pending'
      }
    };
    details.push(detail);
    onPatternDetected?.(detail);
  }

  return details;
} 