import { useState, useEffect } from 'react'

const API_BASE_URL = '/api/forex'

export const useForexData = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/dashboard-data`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (result.success) {
        setData(result.data)
        setLastUpdate(new Date())
        setError(null)
      } else {
        throw new Error(result.error || 'Failed to fetch data')
      }
    } catch (err) {
      setError(err.message)
      console.error('Error fetching forex data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    data,
    loading,
    error,
    lastUpdate,
    refetch: fetchData
  }
}

export const usePriceHistory = (hours = 24) => {
  const [priceHistory, setPriceHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPriceHistory = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/price-history?hours=${hours}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        if (result.success) {
          // Transform data for chart
          const transformedData = result.data.map(item => ({
            time: new Date(item.timestamp).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            price: item.close,
            volume: item.volume || 0
          }))
          
          setPriceHistory(transformedData)
          setError(null)
        } else {
          throw new Error(result.error || 'Failed to fetch price history')
        }
      } catch (err) {
        setError(err.message)
        console.error('Error fetching price history:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPriceHistory()
  }, [hours])

  return { priceHistory, loading, error }
}

export const useTechnicalSignals = () => {
  const [signals, setSignals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/technical-signals`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        if (result.success) {
          setSignals(result.data)
          setError(null)
        } else {
          throw new Error(result.error || 'Failed to fetch technical signals')
        }
      } catch (err) {
        setError(err.message)
        console.error('Error fetching technical signals:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSignals()
  }, [])

  return { signals, loading, error }
}

export const usePerformanceHistory = (days = 30) => {
  const [performance, setPerformance] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/performance?days=${days}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        if (result.success) {
          setPerformance(result.data)
          setError(null)
        } else {
          throw new Error(result.error || 'Failed to fetch performance data')
        }
      } catch (err) {
        setError(err.message)
        console.error('Error fetching performance data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPerformance()
  }, [days])

  return { performance, loading, error }
}

export const usePredictionHistory = (limit = 10) => {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/prediction-history?limit=${limit}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        if (result.success) {
          setPredictions(result.data)
          setError(null)
        } else {
          throw new Error(result.error || 'Failed to fetch prediction history')
        }
      } catch (err) {
        setError(err.message)
        console.error('Error fetching prediction history:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPredictions()
  }, [limit])

  return { predictions, loading, error }
}

