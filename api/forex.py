from http.server import BaseHTTPRequestHandler
import json
from datetime import datetime, timedelta
import random
import urllib.parse

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL and query parameters
        parsed_url = urllib.parse.urlparse(self.path)
        query_params = urllib.parse.parse_qs(parsed_url.query)
        endpoint = query_params.get('endpoint', [''])[0]
        
        # Add CORS headers
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
        # Route handling based on endpoint parameter
        if endpoint == 'health':
            response = self.get_health()
        elif endpoint == 'dashboard-data':
            response = self.get_dashboard_data()
        elif endpoint == 'current-price':
            response = self.get_current_price()
        elif endpoint == 'technical-analysis':
            response = self.get_technical_analysis()
        elif endpoint == 'price-history':
            response = self.get_price_history()
        elif endpoint == 'prediction-history':
            response = self.get_prediction_history()
        elif endpoint == 'technical-signals':
            response = self.get_technical_signals()
        elif endpoint == 'fundamental-analysis':
            response = self.get_fundamental_analysis()
        elif endpoint == 'ml-prediction':
            response = self.get_ml_prediction()
        elif endpoint == 'performance':
            response = self.get_performance()
        else:
            response = self.get_endpoints_list()
        
        self.wfile.write(json.dumps(response).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def get_health(self):
        return {
            'status': 'healthy',
            'timestamp': datetime.now().isoformat(),
            'service': 'forex-analysis-api',
            'version': '2.0.0'
        }
    
    def get_dashboard_data(self):
        return {
            'success': True,
            'data': {
                "current_price": {
                    "symbol": "GBP/JPY",
                    "price": 199.8990,
                    "change": -0.0234,
                    "change_percent": -0.01,
                    "bid": 199.8950,
                    "ask": 199.9030,
                    "spread": 0.0080,
                    "timestamp": datetime.now().isoformat()
                },
                "technical_analysis": {
                    "overall_sentiment": "BEARISH",
                    "confidence": 1.00,
                    "strength": 0.59,
                    "signals": [
                        {"name": "RSI", "signal": "SELL", "strength": 1.00, "confidence": 0.70, "description": "RSI overbought at 84.59"},
                        {"name": "Stochastic", "signal": "SELL", "strength": 0.88, "confidence": 0.65, "description": "Stochastic overbought (%K: 88.8, %D: 85.2)"},
                        {"name": "ADX", "signal": "SELL", "strength": 0.73, "confidence": 0.75, "description": "Strong downtrend (ADX: 36.3)"},
                        {"name": "Williams %R", "signal": "SELL", "strength": 0.88, "confidence": 0.60, "description": "Williams %R overbought at -11.2"}
                    ],
                    "key_indicators": {
                        "adx": 36.26,
                        "atr": 0.064400,
                        "bollinger_position": 81.980000,
                        "macd": 0.039327,
                        "macd_signal": 0.024249,
                        "rsi_14": 84.59
                    }
                },
                "fundamental_analysis": {
                    "overall_bias": "NEUTRAL",
                    "confidence": 0.11,
                    "uk_economic_momentum": -0.012,
                    "japan_economic_momentum": 0.014,
                    "rate_differential": 3.50,
                    "boe_policy": "VERY_DOVISH",
                    "boj_policy": "NEUTRAL",
                    "carry_trade_attractiveness": 0.875
                },
                "ml_prediction": {
                    "direction": "HOLD",
                    "confidence": 1.00,
                    "target_time": datetime.now().replace(hour=6, minute=0, second=0).isoformat(),
                    "model_performance": {
                        "gradient_boosting": 0.961,
                        "random_forest": 0.966,
                        "svm": 0.966
                    },
                    "top_features": ["price_max_50", "price_range_50", "ema_50", "sma_50", "ema_10"]
                },
                "performance": {
                    "accuracy": 0.714,
                    "total_predictions": 7,
                    "correct_predictions": 5,
                    "total_profit": 0.41
                }
            },
            'timestamp': datetime.now().isoformat()
        }
    
    def get_current_price(self):
        return {
            'success': True,
            'data': {
                "symbol": "GBP/JPY",
                "price": 199.8990,
                "change": -0.0234,
                "change_percent": -0.01,
                "bid": 199.8950,
                "ask": 199.9030,
                "spread": 0.0080,
                "timestamp": datetime.now().isoformat()
            },
            'timestamp': datetime.now().isoformat()
        }
    
    def get_technical_analysis(self):
        return {
            'success': True,
            'data': {
                "overall_sentiment": "BEARISH",
                "confidence": 1.00,
                "strength": 0.59,
                "signals": [
                    {"name": "RSI", "signal": "SELL", "strength": 1.00, "confidence": 0.70, "description": "RSI overbought at 84.59"},
                    {"name": "Stochastic", "signal": "SELL", "strength": 0.88, "confidence": 0.65, "description": "Stochastic overbought (%K: 88.8, %D: 85.2)"},
                    {"name": "ADX", "signal": "SELL", "strength": 0.73, "confidence": 0.75, "description": "Strong downtrend (ADX: 36.3)"},
                    {"name": "Williams %R", "signal": "SELL", "strength": 0.88, "confidence": 0.60, "description": "Williams %R overbought at -11.2"}
                ],
                "key_indicators": {
                    "adx": 36.26,
                    "atr": 0.0644,
                    "bollinger_position": 81.98,
                    "macd": 0.039327,
                    "macd_signal": 0.024249,
                    "rsi_14": 84.59
                }
            },
            'timestamp': datetime.now().isoformat()
        }
    
    def get_price_history(self):
        # Generate 24 hours of mock price data
        price_history = []
        base_price = 199.8990
        current_time = datetime.now()
        
        for i in range(24):
            time_point = current_time - timedelta(hours=24-i)
            price_variation = random.uniform(-0.5, 0.5)
            price = base_price + price_variation
            
            price_history.append({
                "timestamp": time_point.isoformat(),
                "price": round(price, 4),
                "volume": random.randint(1000, 5000)
            })
        
        return {
            'success': True,
            'data': price_history,
            'timestamp': datetime.now().isoformat()
        }
    
    def get_prediction_history(self):
        predictions = []
        current_time = datetime.now()
        directions = ['BUY', 'SELL', 'HOLD']
        
        for i in range(7):
            prediction_time = current_time - timedelta(days=i+1)
            target_time = prediction_time + timedelta(hours=24)
            
            predicted_direction = random.choice(directions)
            actual_direction = random.choice(directions)
            is_correct = predicted_direction == actual_direction
            
            predictions.append({
                "id": i + 1,
                "timestamp": prediction_time.isoformat(),
                "target_timestamp": target_time.isoformat(),
                "predicted_direction": predicted_direction,
                "actual_direction": actual_direction,
                "confidence": round(random.uniform(0.6, 1.0), 2),
                "is_correct": is_correct,
                "profit_loss": round(random.uniform(-0.2, 0.3), 3) if is_correct else round(random.uniform(-0.3, 0.1), 3)
            })
        
        return {
            'success': True,
            'data': predictions,
            'timestamp': datetime.now().isoformat()
        }
    
    def get_technical_signals(self):
        return {
            'success': True,
            'data': {
                "signals": [
                    {"name": "RSI", "signal": "SELL", "strength": 1.00, "confidence": 0.70, "description": "RSI overbought at 84.59", "value": 84.59, "threshold": 70},
                    {"name": "Stochastic", "signal": "SELL", "strength": 0.88, "confidence": 0.65, "description": "Stochastic overbought (%K: 88.8, %D: 85.2)", "value": 88.8, "threshold": 80},
                    {"name": "ADX", "signal": "SELL", "strength": 0.73, "confidence": 0.75, "description": "Strong downtrend (ADX: 36.3)", "value": 36.3, "threshold": 25},
                    {"name": "Williams %R", "signal": "SELL", "strength": 0.88, "confidence": 0.60, "description": "Williams %R overbought at -11.2", "value": -11.2, "threshold": -20},
                    {"name": "MACD", "signal": "BUY", "strength": 0.45, "confidence": 0.55, "description": "MACD bullish crossover", "value": 0.039327, "threshold": 0}
                ],
                "overall_sentiment": "BEARISH",
                "confidence": 1.00,
                "strength": 0.59,
                "bullish_signals": 1,
                "bearish_signals": 4,
                "neutral_signals": 0
            },
            'timestamp': datetime.now().isoformat()
        }
    
    def get_fundamental_analysis(self):
        return {
            'success': True,
            'data': {
                "overall_bias": "NEUTRAL",
                "confidence": 0.11,
                "uk_economic_momentum": -0.012,
                "japan_economic_momentum": 0.014,
                "rate_differential": 3.50,
                "boe_policy": "VERY_DOVISH",
                "boj_policy": "NEUTRAL",
                "carry_trade_attractiveness": 0.875
            },
            'timestamp': datetime.now().isoformat()
        }
    
    def get_ml_prediction(self):
        return {
            'success': True,
            'data': {
                "direction": "HOLD",
                "confidence": 1.00,
                "target_time": datetime.now().replace(hour=6, minute=0, second=0).isoformat(),
                "model_performance": {
                    "gradient_boosting": 0.961,
                    "random_forest": 0.966,
                    "svm": 0.966
                },
                "top_features": ["price_max_50", "price_range_50", "ema_50", "sma_50", "ema_10"]
            },
            'timestamp': datetime.now().isoformat()
        }
    
    def get_performance(self):
        return {
            'success': True,
            'data': {
                "accuracy": 0.714,
                "total_predictions": 7,
                "correct_predictions": 5,
                "total_profit": 0.41
            },
            'timestamp': datetime.now().isoformat()
        }
    
    def get_endpoints_list(self):
        return {
            'service': 'forex-analysis-api',
            'version': '2.0.0',
            'available_endpoints': [
                '/api/forex?endpoint=health',
                '/api/forex?endpoint=dashboard-data',
                '/api/forex?endpoint=current-price',
                '/api/forex?endpoint=technical-analysis',
                '/api/forex?endpoint=price-history',
                '/api/forex?endpoint=prediction-history',
                '/api/forex?endpoint=technical-signals',
                '/api/forex?endpoint=fundamental-analysis',
                '/api/forex?endpoint=ml-prediction',
                '/api/forex?endpoint=performance'
            ],
            'timestamp': datetime.now().isoformat()
        }

