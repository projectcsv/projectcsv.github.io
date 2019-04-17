/* 
 * Copyright (C) 2019 Luke Melaia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* Project CSV API */

/**
 * Method to test if the file is included.
 * 
 * @returns {undefined}
 */
function test(){
    console.log("projectcsv.test()");
}

/**
 * Creates an unstyled, bare-bones html table
 * from the provided 2D(Multidimentional Array).
 * 
 * @param {type} tableArray the 2D array.
 * @param {type} useHeaders will make the first row
 * in the table bold if true.
 * @param {type} dupeHeaders will duplicate the first row
 * in the table if true and useHeaders is true.
 * @param {type} tableId HTML ID for the table.
 * @returns {String} the constructed html table as text.
 */
function getTable(tableArray, useHeaders, dupeHeaders, tableId){
    var tableOpen = "<table contenteditable id=\"" + tableId + "\">";
    var tableClose = "</table>";
    
    var headerCell = "<th>{@val}</th>";
    var cell = "<td>{@val}</td>";
    
    var rowOpen = "<tr>";
    var rowClose = "</tr>";
    
    var table = tableOpen;
    
    for(i = 0; i < tableArray.length; i++){
        //Row
        if(i === 1 && useHeaders && dupeHeaders){
            i = 0;
            useHeaders = false;
            dupeHeaders = false;
        }
        
        table += rowOpen;
        for(j = 0; j < tableArray[i].length; j++){
            //Cell
            if(i === 0 && useHeaders){
                table += headerCell.replace("{@val}", tableArray[i][j]);
            } else {
                table += cell.replace("{@val}", tableArray[i][j]);
            }
        }
        
        table += rowClose;
    }
    
    return table + tableClose;
}

/**
 * Creates a 2D (Multidimentional) array from
 * CSV data in string form.
 * 
 * @param {type} csv the CSV data.
 * @param {type} separator the character used
 * to separate the columns/cells.
 * @param {type} quotes ignores the separator
 * in quoted text.
 * @param {type} maxRows the maximum rows
 * to scan.
 * @returns {Array|csvTo2DArray.table} the CSV data
 * as a 2D (Multidimentional) array.
 */
function csvTo2DArray(csv, separator, quotes, maxRows){
    var table = [];
    var rows = 0;
    
    csv.split("\n").map(function(row){
        if(maxRows !== "0")
            if(rows >= maxRows)
                return;
        
        var tableRow = getRow(row, separator,  quotes);
        
        if(tableRow === null)
            return table;
        
        table.push(tableRow);
        rows++;
    });
    
    return table;
}

/**
 * Creates an array from a CSV row (line)
 * 
 * @param {type} row the CSV row.
 * @param {type} separator character used to separate
 * cells/columns
 * @param {type} quotes ignores the separator
 * in quoted text.
 * @returns {Array|getRow.trow} the CSV row as an array.
 */
function getRow(row, separator, quotes){
    if(row.length === 0)
        return null;
        
    isQuoted = false;
    var trow = [];
    var cell = "";
        
    for(var i = 0; i < row.length; i++){
        var char = row.charAt(i);
            
        if(quotes){
            if(char === '\"' || char === '\''){
                isQuoted = !isQuoted;
                continue;
            }
        }
            
        if(char === separator && !isQuoted){
            trow.push(cell);
            cell = "";
            continue;
        }
            
        cell += char;
    }
    
    trow.push(cell);
    return trow;
}
