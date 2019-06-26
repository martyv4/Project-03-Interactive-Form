$("h1")
$("body")

/*
    Treehouse instructions:
    // Put the first field in the `focus` state
    // Use jQuery to select the 'Name' input element and place focus on it.

    6/26/2019 (YM)
    The name id is placed on a focus state.
        $("#name").focus();
        - find the information in the html (<input type="text" id="name" name="user_name">)
            pound sign something is looking for the id something
*/
$("#name").focus();

/*
    Treehouse instructions:
    //Add an “Other” option to the Job Role section
        This is the one and only section of the project where you will have to make changes directly in
        the `index.html` file.
         ● In the `index.html` file, just below the ‘Job Role’ `select` element, create a text input
        element , set its `name` attribute to “job_role_other”, set its `placeholder` attribute to
        “ Your Job Role ”, and give it an `id` attribute of “other-title” so you can easily target this
        element in your JS file.
         ● In your JavaScript file, target the ‘Other’ input field, and hide it initially, so that it will
        display if JavaScript is disabled, but be hidden initially with JS.

    6/26/2019 (YM)
    Add an “Other” option to the Job Role section
     from index.html
        <input type="text" id="other-title" name="job_role_other" placeholder="Your Job Role">
*/
$("#other-title").hide();
/*
    //T-SHIRT section starts here
    //Hide the  “Select Theme”  `option` element in the “Design” menu
    //<select id="design" name="user_design">
*/
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