// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
// In Step 1 of the app.js file, create an empty filters variable to keep track of all the elements that change 
//when a search is entered. This variable will be used in Step 5 
//to store the property “id” and the value that was entered from user input. This
var ufoFilters = {};

// 3. Use this function to update the filters(based on criteria entered). 
function updateFilters() {
  
    // 4a. Save the element(date, city, state, etc.) that was changed as a variable.
    let changedElem = d3.select(this);
    // 4b. Save the value(1/10, benton, ak, etc.) that was changed as a variable.
    let changedValue = changedElem.property("value");
    console.log(changedValue);
    // 4c. Save the id of the filter that was changed as a variable.
    let changedId = changedElem.attr("id");
    console.log(changedId);
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    //In Step 5, write an if-else statement that checks if a value was changed by 
    //the user (variable from Step 4b). If a value was changed, add the 
    //element’s id (variable from Step 4c) as the property and the value that was 
    //changed to the filters variable you created in Step 1. If a value was not
    // entered, then clear the element id from the filters variable.
    if (changedValue) {
      ufoFilters[changedId] =changedValue;
    }
    else{
      delete ufoFilters[changedId];
    }
    console.log(ufoFilters)
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
      
      let filteredData = tableData.filter((obj) => {
        
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
      for(changedId in ufoFilters) {
        if(obj[changedId] !== ufoFilters[changedId]) {
         return false;
      }
  }
      return true;
}); 
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll('input').on("change", updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);
