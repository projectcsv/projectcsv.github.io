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

/* Semi constant values */
var SM_SCREEN_SIZE = 768;

var TABLE_COLORS = [
    "#0095f9",
    "#9df900",
    "#00f9ec",
    "#f9f400",
    "#f99900",
    "#f90091",
    "#31f7a8",
    "#fcf805",
    "#14ffeb",
    "#ff2323"
];

/**
 * Basic controls toggle button callback.
 */
$("#basic-controls-toggle").click(function() {
    if(isSM())
        toggleBasic();
});

/**
 * Hides the basic controls.
 */
function hideBasic(){
    $("#basic-controls").hide();
    $("#basic-controls-display").html("arrow_drop_up");
}

/**
 * Shows the basic controls.
 */
function showBasic(){
    $("#basic-controls").show();
    $("#basic-controls-display").html("arrow_drop_down");
}

/**
 * Toggles the basic controls visibility.
 */
function toggleBasic(){
    if ($("#basic-controls").is(":visible")){
        hideBasic();
    } else {
        showBasic();
    }
}

/**
 * Advanced controls toggle button callback.
 */
$("#advanced-controls-toggle").click(function() {
    if(isSM())
        toggleAdvanced();
});

/**
 * Hides the advanced controls.
 */
function hideAdvanced(){
    $("#advanced-controls").hide();
    $("#advanced-controls-display").html("arrow_drop_up");
}

/**
 * Shows the advanced controls.
 */
function showAdvanced(){
    $("#advanced-controls").show();
    $("#advanced-controls-display").html("arrow_drop_down");
}

/**
 * Toggles the advanced controls visibility.
 */
function toggleAdvanced(){
    if ($("#advanced-controls").is(":visible")){
        hideAdvanced();
    } else {
        showAdvanced();
    }
}

/**
 * 
 * @returns {Boolean} true if the browser window
 * is smaller than bootsraps col-sm trigger size.
 */
function isSM(){
    return $(window).width() < SM_SCREEN_SIZE;
}

/* Form input */

/**
 * @returns {getUserInput.userInput} an object
 * containing all the user input at the time 
 * of the method call.
 */
function getUserInput() {
    var userInput = {};
    
    userInput.maxRows = getMaxRows();
    userInput.encoding = getEncoding();
    userInput.columnSeparator = getColumnSeparator();
    userInput.useQuotes = useQuotes();
    userInput.firstRowHeaders = firstRowHeaders();
    userInput.firstRowInlcude = firstRowInclude();
    userInput.files = getFiles();
  
    function getMaxRows(){
        return $("#max-rows").val() === "" ? "0" : $("#max-rows").val();
    }

    function getEncoding(){
        return $("#encoding").val();
    }

    function getColumnSeparator(){
        return $("#column-separator").val();
    }

    function useQuotes(){
        return $("#quotes").is(":checked");
    }
    
    function firstRowHeaders(){
        return $("#first-row-header").is(":checked");
    }
    
    function firstRowInclude(){
        return $("#first-row-include").is(":checked");
    }
    
    function getFiles(){
        return $("#upload").prop('files');
    }
    
    return userInput;
}

/* Tables */

/**
 * Randomly selects the background color of each table title
 * (.table-title) from a predefined list of colors.
 * 
 * @returns {undefined}
 */
function colorTables(){
    $(".table-title").each(function() {
        $(this).css("background-color", randomColor());
    });
    
    function randomColor(){
        return TABLE_COLORS[Math.floor(Math.random() * TABLE_COLORS.length)];
    }
}

/* Table Generation */

/**
 * Creates a table holder with the 
 * given table in it.
 * 
 * @param {type} title
 * @param {type} tableHtml
 * @returns {String|getTableUnit.tableHolder}
 */
function getTableUnit(title, tableHtml){
    var tableHolder = "<div class=\"table-holder\"><p class=\"table-title\"><b>{@name}</b></p>{@table}</div>";
    tableHolder = tableHolder.replace("{@name}", title);
    tableHolder = tableHolder.replace("{@table}", tableHtml);
    return tableHolder;
}

/**
 * Clears all tables from the page.
 */
function clearTables(){
    $("#tables").html("");
}

/**
 * Adds (appends) a table holder to the page.
 * 
 * @param {type} unit
 * @returns {undefined}
 */
function addTableUnit(unit){
    $("#tables").append(unit);
}

/**
 * Gets the users input and creates
 * a set of tables from it.
 */
function populate(){
    for(var i = 0; i <= getUserInput().files.length; i++){
        file = getUserInput().files[i];
        var reader = new FileReader();
        
        reader.onload = (function(theFile) {
            return function(e) {
                var ui = getUserInput();
                addTableUnit(
                        getTableUnit(
                            theFile.name,
                            getTable(
                                    csvTo2DArray(
                                        e.target.result,
                                        ui.columnSeparator,
                                        ui.useQuotes,
                                        ui.maxRows
                                    ),
                            ui.firstRowHeaders, 
                            ui.firstRowInlcude
                            )
                        )
                    );
                colorTables();
            };
        })(file);

        reader.readAsText(file, getUserInput().encoding);
    }
}

$("#go").click(function (){
    if(getUserInput().files.length === 0){
        alert("No files selected!");
        return;
    }
    
    clearTables();
    $("#go").html("Refresh!");
    populate();
});

/**
 * Prevents users submitting the form
 * with the enter key.
 */
$(document).on("keypress", "form", function(event) { 
    return event.keyCode !== 13;
});

/**
 * Prevents the controls from being
 * stuck in collapsed mode.
 */
$(window).resize(function() {
    if($(window).width() < SM_SCREEN_SIZE) {
        showBasic();
        showAdvanced();
    }
});
