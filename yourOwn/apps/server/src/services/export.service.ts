
// Grabs experiences and layout from db and turns into json structure 
// Returns the json structure
// Used by worker to generate the portfolio files
export async function generatePortfolioData(sessionId: string) {

}

// Looks at patternIds given from portolio Data and inserts pattern details from PATTERN_REGISTRY
// inserts patterns into correct directory of portfolio code
// Used by worker to prepare the portfolio for zipping
export async function insertPatterns() {

}

// Zips up the portfolio code and data into a zip file for download
// Used by worker to create the final zip
export async function zipPortfolio( ){

}