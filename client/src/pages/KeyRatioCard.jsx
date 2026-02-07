const keyratios = {
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
  }

export default function KeyRatioCard(){

    return(
        <div className="flex flex-col gap-8 p-4">
            
            {/* 3 years */}
            <div className="grid grid-cols-4 gap-4 border-2">
                
                {/* Heading Row */}
                <div className="col-span-4 text-center">3 years</div>

                {/* Row - 1 */}
                <div></div>
                <div>Fund</div>
                <div>Index</div>
                <div>Category</div>

                {/* Row - 2 */}
                <div>Standard Deviation</div>
                <div>{keyratios["3Y"].fund.stdDev}</div>
                <div>{keyratios["3Y"].benchmark.stdDev}</div>
                <div>{keyratios["3Y"].categoryAvg.stdDev}</div>
                

                {/* Row - 3 */}
                <div>Alpha</div>
                <div>{keyratios["3Y"].fund.alpha}</div>
                <div>{keyratios["3Y"].benchmark.alpha}</div>
                <div>{keyratios["3Y"].categoryAvg.alpha}</div>

                {/* Row - 4 */}
                <div>Beta</div>
                <div>{keyratios["3Y"].fund.beta}</div>
                <div>{keyratios["3Y"].benchmark.beta}</div>
                <div>{keyratios["3Y"].categoryAvg.beta}</div>

                {/* Row - 5 */}
                <div>Sharpe Ratio</div>
                <div>{keyratios["3Y"].fund.sharpe}</div>
                <div>{keyratios["3Y"].benchmark.sharpe}</div>
                <div>{keyratios["3Y"].categoryAvg.sharpe}</div>


            </div>

            {/* 5 years */}
            <div className="grid grid-cols-4 gap-4 border-2">
                
                {/* Heading Row */}
                <div className="col-span-4 text-center">5 years</div>

                {/* Row - 1 */}
                <div></div>
                <div>Fund</div>
                <div>Index</div>
                <div>Category</div>

                {/* Row - 2 */}
                <div>Standard Deviation</div>
                <div>{keyratios["5Y"].fund.stdDev}</div>
                <div>{keyratios["5Y"].benchmark.stdDev}</div>
                <div>{keyratios["5Y"].categoryAvg.stdDev}</div>
                

                {/* Row - 3 */}
                <div>Alpha</div>
                <div>{keyratios["5Y"].fund.alpha}</div>
                <div>{keyratios["5Y"].benchmark.alpha}</div>
                <div>{keyratios["5Y"].categoryAvg.alpha}</div>

                {/* Row - 4 */}
                <div>Beta</div>
                <div>{keyratios["5Y"].fund.beta}</div>
                <div>{keyratios["5Y"].benchmark.beta}</div>
                <div>{keyratios["5Y"].categoryAvg.beta}</div>

                {/* Row - 5 */}
                <div>Sharpe Ratio</div>
                <div>{keyratios["5Y"].fund.sharpe}</div>
                <div>{keyratios["5Y"].benchmark.sharpe}</div>
                <div>{keyratios["5Y"].categoryAvg.sharpe}</div>


            </div>

            {/* 10 years */}
              <div className="grid grid-cols-4 gap-4 border-2">
                
                {/* Heading Row */}
                <div className="col-span-4 text-center">10 years</div>

                {/* Row - 1 */}
                <div></div>
                <div>Fund</div>
                <div>Index</div>
                <div>Category</div>

                {/* Row - 2 */}
                <div>Standard Deviation</div>
                <div>{keyratios["10Y"].fund.stdDev}</div>
                <div>{keyratios["10Y"].benchmark.stdDev}</div>
                <div>{keyratios["10Y"].categoryAvg.stdDev}</div>
                

                {/* Row - 3 */}
                <div>Alpha</div>
                <div>{keyratios["10Y"].fund.alpha}</div>
                <div>{keyratios["10Y"].benchmark.alpha}</div>
                <div>{keyratios["10Y"].categoryAvg.alpha}</div>

                {/* Row - 4 */}
                <div>Beta</div>
                <div>{keyratios["10Y"].fund.beta}</div>
                <div>{keyratios["10Y"].benchmark.beta}</div>
                <div>{keyratios["10Y"].categoryAvg.beta}</div>

                {/* Row - 5 */}
                <div>Sharpe Ratio</div>
                <div>{keyratios["10Y"].fund.sharpe}</div>
                <div>{keyratios["10Y"].benchmark.sharpe}</div>
                <div>{keyratios["10Y"].categoryAvg.sharpe}</div>


            </div>

        </div>
    )

}