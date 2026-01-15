import { useLocation} from "react-router"

export default function HygineCheck(){

    const location = useLocation();
    const {fund} = location.state;

     return(
        <div>
            <FundInfo fund = {fund}/>
            
            <FundPerformance fund = {fund}/>



        </div>
    )
}

function FundInfo({fund}){
    return(
        <div>
            <div>Objective of the fund : {fund.fundObjective}</div>
            <div>Inception Date : {fund.fundInception}</div>
            <div>Benchmark : {fund.fundBenchmark}</div>
            <div>Net Aum : {fund.fundAun}</div>
            <div>TER : {fund.fundTer}</div>
        </div>
    )
}

function FundPerformance({fund}){
    return(

        //3 year Ratios 
        <div className="grid grid-col-3 gap-4">
            
            <div className="text-center">3 year Ratios</div>

            <div className="grid grid-cols-4 gap-2">

                {/* Row-1 */}
    
                {/* <div>None</div> */}
                <div className="col-start-2">Fund</div>
                <div>Category</div>
                <div>Index</div>

                {/* Row-2 */}
                <div>Standard Deviation</div>
                <div>{fund.fundSD}</div>
                <div>{fund.categorySD}</div>
                <div>{fund.indexSD}</div>

                {/* Row-3 */}
                <div>Sharpe Ratio</div>
                <div>{fund.fundSR}</div>
                <div>{fund.categorySR}</div>
                <div>{fund.indexSR}</div>
                
                {/* Row-4 */}
                <div>Alpha</div>
                <div>{fund.fundAlpha}</div>
                <div>{fund.categoryAlpha}</div>
                <div>{fund.indexAlpha}</div>
                
                {/* Row-5 */}
                <div>Beta</div>
                <div>{fund.fundBeta}</div>
                <div>{fund.categoryBeta}</div>
                <div>{fund.indexBeta}</div>

            </div>

            
        </div>
    )
}


// I will be having Three Seperate components in this single file which will export the basic hygine check functionality
