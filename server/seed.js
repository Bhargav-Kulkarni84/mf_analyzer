const seedFundData = {
  fundDetails: {
    fundId: "fund_001",
    fundName: "Axis Bluechip Fund",

    objective:
      "To generate long-term capital appreciation by investing predominantly in equity and equity-related instruments of large-cap companies",

    inception: "2010-01-01",

    fundManager: "Shreyash Devalkar",

    fundAumCr: 32000,
    equityAumCr: 28500,

    fundShareInCategoryAumPercent: 18.4,

    benchmark: "NIFTY 100 TRI",
    category: "Large Cap",

    terPercent: 0.52
  },

  ratios: {
    "3Y": {
      fund: {
        stdDev: 14.2,
        alpha: 2.1,
        beta: 0.92,
        sharpe: 0.78,
        rSquared: 0.95
      },
      categoryAvg: {
        stdDev: 15.6,
        alpha: 1.4,
        beta: 0.98,
        sharpe: 0.70,
        rSquared: 0.93
      },
      benchmark: {
        stdDev: 15.9,
        alpha: 0,
        beta: 1,
        sharpe: 0.66,
        rSquared: 1
      }
    },

    "5Y": {
      fund: {
        stdDev: 13.6,
        alpha: 2.8,
        beta: 0.89,
        sharpe: 0.84,
        rSquared: 0.94
      },
      categoryAvg: {
        stdDev: 14.8,
        alpha: 1.9,
        beta: 0.96,
        sharpe: 0.76,
        rSquared: 0.92
      },
      benchmark: {
        stdDev: 15.1,
        alpha: 0,
        beta: 1,
        sharpe: 0.71,
        rSquared: 1
      }
    },

    "10Y": {
      fund: {
        stdDev: 14.9,
        alpha: 3.2,
        beta: 0.91,
        sharpe: 0.88,
        rSquared: 0.93
      },
      categoryAvg: {
        stdDev: 15.4,
        alpha: 2.1,
        beta: 0.97,
        sharpe: 0.79,
        rSquared: 0.91
      },
      benchmark: {
        stdDev: 15.8,
        alpha: 0,
        beta: 1,
        sharpe: 0.74,
        rSquared: 1
      }
    }
  },

  rollingReturns: {
    "3Y": {
      fund: {
        min: 4.2,
        max: 22.8,
        avg: 13.6
      },
      benchmark: {
        min: 3.1,
        max: 21.4,
        avg: 12.4
      }
    },

    "5Y": {
      fund: {
        min: 7.1,
        max: 19.4,
        avg: 14.2
      },
      benchmark: {
        min: 6.2,
        max: 18.6,
        avg: 13.1
      }
    },

    "10Y": {
      fund: {
        min: 9.8,
        max: 17.6,
        avg: 14.9
      },
      benchmark: {
        min: 8.9,
        max: 16.8,
        avg: 13.8
      }
    }
  },

  riskReturnMatrix: {
    "3Y": {
      riskVsCategory: "Below Average",
      returnVsCategory: "Above Average"
    },
    "5Y": {
      riskVsCategory: "Below Average",
      returnVsCategory: "Above Average"
    },
    "10Y": {
      riskVsCategory: "Average",
      returnVsCategory: "Above Average"
    }
  },

  captureRatios: {
    "3Y": {
      upCapture: 104.5,
      downCapture: 89.3
    },
    "5Y": {
      upCapture: 107.8,
      downCapture: 86.9
    },
    "10Y": {
      upCapture: 109.2,
      downCapture: 88.1
    }
  },

  meta: {
    overallScore: 7.8,
    consistencyRating: "High",
    verdict:
      "Strong large-cap fund with consistent alpha generation and good downside protection"
  }
};

export default seedFundData;
