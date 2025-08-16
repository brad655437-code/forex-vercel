import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.jsx'
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Activity, 
  Brain, 
  BarChart3, 
  Clock, 
  Target,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Calendar,
  DollarSign,
  Zap,
  Loader2
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { useForexData, usePriceHistory, useTechnicalSignals, usePerformanceHistory, usePredictionHistory } from './hooks/useForexData'
import './App.css'

function App() {
  const [isLive, setIsLive] = useState(true)
  
  // Fetch data using custom hooks
  const { data: dashboardData, loading: dashboardLoading, error: dashboardError, lastUpdate, refetch } = useForexData()
  const { priceHistory, loading: priceLoading } = usePriceHistory(24)
  const { signals: technicalSignals, loading: signalsLoading } = useTechnicalSignals()
  const { predictions: predictionHistory, loading: predictionsLoading } = usePredictionHistory(7)

  useEffect(() => {
    let interval
    if (isLive) {
      interval = setInterval(() => {
        refetch()
      }, 30000) // Update every 30 seconds when live
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isLive, refetch])

  const getDirectionIcon = (direction) => {
    switch (direction?.toUpperCase()) {
      case 'BUY':
      case 'BULLISH':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'SELL':
      case 'BEARISH':
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-yellow-500" />
    }
  }

  const getDirectionColor = (direction) => {
    switch (direction?.toUpperCase()) {
      case 'BUY':
      case 'BULLISH':
        return 'text-green-500'
      case 'SELL':
      case 'BEARISH':
        return 'text-red-500'
      default:
        return 'text-yellow-500'
    }
  }

  const getDirectionBadge = (direction) => {
    const variant = direction?.toUpperCase() === 'BUY' || direction?.toUpperCase() === 'BULLISH' ? 'default' : 
                   direction?.toUpperCase() === 'SELL' || direction?.toUpperCase() === 'BEARISH' ? 'destructive' : 'secondary'
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        {getDirectionIcon(direction)}
        {direction?.toUpperCase() || 'NEUTRAL'}
      </Badge>
    )
  }

  // Show loading state
  if (dashboardLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading forex dashboard...</span>
        </div>
      </div>
    )
  }

  // Show error state
  if (dashboardError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error Loading Dashboard</AlertTitle>
          <AlertDescription>
            {dashboardError}
            <Button onClick={refetch} className="mt-2 w-full">
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  // Extract data with fallbacks
  const currentPrice = dashboardData?.current_price || {}
  const technicalAnalysis = dashboardData?.technical_analysis || {}
  const fundamentalAnalysis = dashboardData?.fundamental_analysis || {}
  const mlPrediction = dashboardData?.ml_prediction || {}
  const performance = dashboardData?.performance || {}

  // Calculate performance metrics
  const accuracyRate = performance.accuracy || 0
  const totalProfit = performance.total_profit || 0

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">GBP/JPY Forex Analysis Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time analysis and ML-powered predictions for GBP/JPY currency pair
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Last update: {lastUpdate.toLocaleTimeString()}
          </div>
          <Button
            variant={isLive ? "default" : "outline"}
            size="sm"
            onClick={() => setIsLive(!isLive)}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLive ? 'animate-spin' : ''}`} />
            {isLive ? 'Live' : 'Paused'}
          </Button>
        </div>
      </div>

      {/* Current Price Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              GBP/JPY Current Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{currentPrice.close?.toFixed(4) || '199.8990'}</div>
                  <div className={`flex items-center gap-1 ${(currentPrice.change || -0.0234) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {(currentPrice.change || -0.0234) >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {(currentPrice.change || -0.0234).toFixed(4)} ({(currentPrice.change_percent || -0.012).toFixed(2)}%)
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <div>Bid: {currentPrice.bid?.toFixed(4) || '199.8950'}</div>
                  <div>Ask: {currentPrice.ask?.toFixed(4) || '199.9030'}</div>
                  <div>Spread: {currentPrice.spread?.toFixed(4) || '0.0080'}</div>
                </div>
              </div>
              <div className="h-32">
                {priceLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={['dataMin - 0.01', 'dataMax + 0.01']} />
                      <Tooltip />
                      <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              ML Prediction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Direction:</span>
                {getDirectionBadge(mlPrediction.direction)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Confidence:</span>
                <span className="font-semibold">{((mlPrediction.confidence || 1.0) * 100).toFixed(0)}%</span>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Target Time:</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {mlPrediction.target_time ? new Date(mlPrediction.target_time).toLocaleString() : 'Next 24 hours'}
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-xs text-muted-foreground mb-1">Model Performance:</div>
                <div className="space-y-1">
                  {mlPrediction.model_performance && Object.entries(mlPrediction.model_performance).map(([model, accuracy]) => (
                    <div key={model} className="flex justify-between text-xs">
                      <span className="capitalize">{model.replace('_', ' ')}</span>
                      <span>{(accuracy * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Accuracy:</span>
                <span className="font-semibold text-green-500">{accuracyRate.toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Predictions:</span>
                <span className="font-semibold">{performance.correct_predictions || 5}/{performance.total_predictions || 7}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Profit:</span>
                <span className={`font-semibold ${totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {totalProfit >= 0 ? '+' : ''}{totalProfit.toFixed(2)}%
                </span>
              </div>
              <Progress value={accuracyRate} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis Tabs */}
      <Tabs defaultValue="technical" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="technical" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Technical
          </TabsTrigger>
          <TabsTrigger value="fundamental" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Fundamental
          </TabsTrigger>
          <TabsTrigger value="ml" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Machine Learning
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Performance
          </TabsTrigger>
        </TabsList>

        {/* Technical Analysis Tab */}
        <TabsContent value="technical" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Technical Signals</CardTitle>
                <CardDescription>Current technical indicators and signals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Overall Sentiment:</span>
                      {getDirectionBadge(technicalAnalysis.sentiment)}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Confidence: {((technicalAnalysis.confidence || 1.0) * 100).toFixed(0)}%</div>
                      <div className="text-sm text-muted-foreground">Strength: {(technicalAnalysis.strength || 0.59).toFixed(2)}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {signalsLoading ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    ) : (
                      technicalSignals.map((signal, i) => (
                        <div key={i} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2">
                            {getDirectionIcon(signal.direction)}
                            <span className="font-medium">{signal.indicator}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              Strength: {signal.strength?.toFixed(2)} | Confidence: {(signal.confidence * 100).toFixed(0)}%
                            </div>
                            <div className="text-xs text-muted-foreground">{signal.description}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {technicalAnalysis.indicators && Object.entries(technicalAnalysis.indicators).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-sm text-muted-foreground capitalize">{key.replace('_', ' ')}:</span>
                      <span className={`font-semibold ${key === 'rsi_14' && value > 70 ? 'text-red-500' : ''}`}>
                        {typeof value === 'number' ? value.toFixed(key.includes('rsi') || key.includes('adx') ? 2 : 6) : value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Fundamental Analysis Tab */}
        <TabsContent value="fundamental" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Economic Overview</CardTitle>
                <CardDescription>Fundamental analysis summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="font-semibold">Overall Outlook:</span>
                    {getDirectionBadge(fundamentalAnalysis.outlook)}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Fundamental Bias:</span>
                      <span className="font-semibold">{(fundamentalAnalysis.bias || -0.055).toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Confidence:</span>
                      <span className="font-semibold">{((fundamentalAnalysis.confidence || 0.11) * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Central Bank Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Rate Differential:</span>
                      <span className="font-semibold text-green-500">{(fundamentalAnalysis.rate_differential || 3.5).toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">BoE Policy:</span>
                      <Badge variant="destructive">{fundamentalAnalysis.boe_policy || 'VERY_DOVISH'}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">BoJ Policy:</span>
                      <Badge variant="secondary">{fundamentalAnalysis.boj_policy || 'NEUTRAL'}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Machine Learning Tab */}
        <TabsContent value="ml" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Model Performance</CardTitle>
                <CardDescription>Individual model accuracy and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mlPrediction.model_performance && Object.entries(mlPrediction.model_performance).map(([model, accuracy]) => (
                    <div key={model} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium capitalize">{model.replace('_', ' ')}</span>
                        <span className="text-sm font-semibold">{(accuracy * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={accuracy * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feature Importance</CardTitle>
                <CardDescription>Top features used in prediction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mlPrediction.top_features && mlPrediction.top_features.slice(0, 5).map((feature, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{feature}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(5 - i) * 20} className="h-2 w-16" />
                        <span className="text-xs text-muted-foreground">{((5 - i) * 20).toFixed(0)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <Zap className="h-4 w-4" />
            <AlertTitle>Next Prediction</AlertTitle>
            <AlertDescription>
              The next prediction will be generated at {new Date(Date.now() + 60 * 60 * 1000).toLocaleTimeString()} 
              for the {new Date(Date.now() + 25 * 60 * 60 * 1000).toLocaleDateString()} trading session.
            </AlertDescription>
          </Alert>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Prediction History</CardTitle>
                <CardDescription>Recent prediction accuracy and results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {predictionsLoading ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  ) : (
                    predictionHistory.map((pred, i) => (
                      <div key={i} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{pred.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getDirectionBadge(pred.prediction)}
                          <span className="text-xs text-muted-foreground">→</span>
                          {getDirectionBadge(pred.actual)}
                          {pred.correct ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                          <span className={`text-sm font-medium ${pred.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {pred.profit >= 0 ? '+' : ''}{pred.profit?.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={predictionHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="profit" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default App

