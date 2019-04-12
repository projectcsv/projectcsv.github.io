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
SM_SCREEN_SIZE = 768;

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

$("#go").click(function (){
    
});
