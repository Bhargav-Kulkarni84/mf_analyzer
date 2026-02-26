//This function filters funds based on user preference.
const category = "equity";
const subcategory ="smallcap";
const dividendType = "growth";

const filters = [category,subcategory,dividendType];

function filterFunds(funds,filters){

    //We will be filtering funds on the basis of user filters.
    // let filteredFunds = funds.filter((fund)=>{
    //     isOngoingFund(fund)
    // })

    let filteredFunds = [];

    for(let i=0; i<funds.length; i++){

        let fund = fund[i];
        
        let {category,subcategory,dividendType} = getFundInfo();

        if(filters.category === category && filters.subcategory===subcategory && filters.dividendType === dividendType){
            filteredFunds.push(fund);
        }

    }

}

exports = {filterFunds}


