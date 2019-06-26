/*
    Treehouse instructions:
    // Put the first field in the `focus` state
    // Use jQuery to select the 'Name' input element and place focus on it.

    6/26/2019: YM
    The name id is placed on a focus state.
        $("#name").focus();
        - find the information in the html (<input type="text" id="name" name="user_name">)
            pound sign something is looking for the id something
*/
$("#name").focus();

/*
    Treehouse instructions:
    6/26/2019: YM
    Add an “Other” option to the Job Role section
    <input type="text" id="other-title" name="job_role_other" placeholder="Your Job Role">
*/

$("#other-title").hide();

//T-SHIRT section starts here
//Hide the  “Select Theme”  `option` element in the “Design” menu
//<select id="design" name="user_design">
$("#design").find('option').first().hide();

//Update the “Color” field to read “Please select a T-shirt theme”.
//<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
$("#color option:first").before('<option selected="selected" value="none">Please select a T-shirt theme</option>');

//Hide the colors in the “Color” drop down menu.
//<select id="color">
$("#color").find('option:not(:eq(0))').hide();

//event listener if show hide update color
$('#design').change(function() {

    let choice = $('#design option:selected').attr("value");
    if (choice == 'js puns') {
        $('#color option[value="none"]').remove();
        $('#color option:contains("JS Puns")').show();
        $('#color option:contains("JS shirt only")').first().attr('selected', false);
        $('#color option:contains("JS shirt only")').hide();
        $('#color option:contains("JS Puns")').first().attr('selected', 'selected');
    }
    else if (choice == 'heart js') {
        $('#color option[value="none"]').remove();
        $('#color option:contains("JS Puns")').hide();
        $('#color option:contains("JS Puns")').first().attr('selected', false);
        $('#color option:contains("JS shirt only")').show();
        $('#color option:contains("JS shirt only")').first().attr('selected', 'selected');
    }
    else {
        $("#color option:first").before('<option selected="selected" value="none">Please select a T-shirt theme</option>');
    }
});
//Creating an element to display the total activity cost
    var activityCostDiv = document.createElement("div");  // Create with DOM https://www.w3schools.com/jquery/jquery_dom_add.asp
    $(".activities").append(activityCostDiv);      // Append the new element
    var activityCostAmt = 0.0;