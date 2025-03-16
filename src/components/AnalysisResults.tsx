interface AnalysisResult {
  isManipulated: boolean;
  confidence: number;
  detectionMethod: string;
  manipulatedRegions?: {
    x: number;
    y: number;
    width: number;
    height: number;
  }[];
  additionalInfo?: {
    key: string;
    value: string;
  }[];
}

interface AnalysisResultsProps {
  result: AnalysisResult | null;
  isLoading: boolean;
}

export const AnalysisResults = ({ result, isLoading }: AnalysisResultsProps) => {
  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const confidenceColor = result.confidence > 0.8 
    ? 'text-red-600' 
    : result.confidence > 0.5 
      ? 'text-yellow-600' 
      : 'text-green-600';

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Analysis Results</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-lg font-medium">
            Status: {' '}
            <span className={result.isManipulated ? 'text-red-600' : 'text-green-600'}>
              {result.isManipulated ? 'Potentially Manipulated' : 'Likely Authentic'}
            </span>
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Confidence Score</p>
          <p className={`text-lg font-medium ${confidenceColor}`}>
            {(result.confidence * 100).toFixed(1)}%
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Detection Method</p>
          <p className="text-base">{result.detectionMethod}</p>
        </div>

        {result.additionalInfo && result.additionalInfo.length > 0 && (
          <div>
            <p className="text-sm text-gray-600 mb-2">Additional Information</p>
            <dl className="grid grid-cols-2 gap-2">
              {result.additionalInfo.map(({ key, value }) => (
                <div key={key} className="col-span-1">
                  <dt className="text-xs text-gray-500">{key}</dt>
                  <dd className="text-sm">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}; 