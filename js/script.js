/*
//DOCUMENT READY
      //Place the document in a ready state to be manipulated safely.
      //$(document).ready(function(){
        //https://learn.jquery.com/using-jquery-core/document-ready/
  //FOCUS
      //Set focus on the name ID.
        //https://api.jquery.com/focus/
          //pound sign is looking for the id attribute value
          //<input type="text" id="name" name="user_name">
  //OTHER
      //First Hide the other title element input: $('#other-title').hide();
              //https://www.w3schools.com/jquery/eff_hide.asp
      //On the drop down menu 'Job Role' add another role, name it 'Other'
          //Create a if else conditional statement
              //https://www.w3schools.com/js/js_if_else.asp
          //Create an event listener on change
              //https://api.jquery.com/change/#change-handler
              //$('#title').on('change', (e) => {
          //Use the .val() method on the event target
              //https://api.jquery.com/val/#val
          //Use the hide or show the Other title if selected
              //https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_eff_show_hide
          //IMPORTANT to Add input in index.html adding text to the placeholder
              //https://www.w3schools.com/jquery/event_change.asp
              //<input type="text" id="other-title" name="job_role_other" placeholder="Your Job Role">
*/

$(document).ready(function(){
  $('#name').focus();                            //FOCUS
  $('#other-title').hide();                       //OTHER
  $('#title').on('change', (e) => {
    if ($(e.target).val() == 'other') {           //The value selected in the drop down is shown or hidden depending upon the value of the selection.
        $('#other-title').show();
      }
      else {
          $('#other-title').hide();
      }
    });

/*//T-SHIRT Section
    //The T-Shirt Section selects the available colors by theme
 */
  //Hide the “Select Theme” `option` element in the “Design” menu
  //Reference the index.html for the id <select id="design" name="user_design">
  //Search by id 'design', then find the design options, then the first item is hidden
  $('#design').find('option').first().hide();

  //Add a new option to the top of the option list (https://stackoverflow.com/questions/1414276/how-to-make-the-first-option-of-select-selected-with-jquery?rq=1)
  //This will make the selected option read “Please select a T-shirt theme”.
  $('#color option:first').before('<option selected="selected" value="none">Please select a T-shirt theme</option>');

  //Hide the options in the “Color” drop down menu excepting the first.
  //('option:not(:eq(0))') - we are looking for all the elements with the name option but not at index 0 (eq(0))
  $('#color').find('option:not(:eq(0))').hide();

  //We start the event listener
  $('#design').on('change', function(){

    //T-Shirt section extra credit
    $('#color').show();
    $('#colors-js-puns label').show();

    //Get the selected option in the select #design,
    //then get its value attribute js puns & heart js
    const choice = $('#design option:selected').attr("value");
    if (choice == 'js puns') {
          //remove the Please select a T-shirt theme
          $('#color option[value="none"]').remove();
          //we are showing any option whose innertext contains JS Puns
          $('#color option:contains("JS Puns")').show();
          //deselect all elements associated with JS Shirt only (cleanup)
          //set selected attribute to false for deselection
          $('#color option:contains("JS shirt only")').attr('selected', false);
          //Now we hide JS shirt only
          $('#color option:contains("JS shirt only")').hide();
          //set the first JS Puns option to be selected
          //setting the selected attribute to selected will highlight it
          $('#color option:contains("JS Puns")').first().attr('selected', 'selected');
      }
      else if (choice == 'heart js') {
          //remove the none option, hide and deselect the 'JS Puns' group, show and select the first option of the 'JS shirt only' group
          $('#color option[value="none"]').remove();
          $('#color option:contains("JS Puns")').hide();
          $('#color option:contains("JS Puns")').attr('selected', false);
          $('#color option:contains("JS shirt only")').show();
          $('#color option:contains("JS shirt only")').first().attr('selected', 'selected');
        }
        //failsafe: if neither choice was somehow made restore the starting state of the #color dropdown
        else {
            $("#color option:first").before('<option selected="selected" value="none">Please select a T-shirt theme</option>');
            $('#color option:contains("JS Puns")').hide();
            $('#color option:contains("JS shirt only")').hide();
            $('#color option:contains("JS Puns")').attr('selected', false);
            $('#color option:contains("JS shirt only")').attr('selected', false);
        }
    });
    //T-Shirt SECTION EXTRA CREDIT
    $('#color').hide();
    $('#colors-js-puns label').hide();

    //used to reset any input validator messages set later
    const hideInputValidationError = (errIDName) =>
    {
        const $targetEle = $(errIDName);

        if ($targetEle.length > 0)
        {
            $targetEle.remove();
        }
    }

//ACTIVITY Section
  // Create with DOM https://www.w3schools.com/jquery/jquery_dom_add.asp

  //Generate a new div element and append to the element with the activities class
  const $activityCostDiv = $("<div></div>");
  $(".activities").append($activityCostDiv);      //Append the new element
  let activityCostAmt = 0.0;                     //Start the activityCostAmt at 0

  //Create event listener for the click action on the element with the activities class
  $(".activities").click((e) => {
      //if the clicked element was a checkbox proceed otherwise ignore the click (no else)
      //Updating and displaying the total activity cost part 1
      const $wasClicked = $(e.target);
       if ($wasClicked.attr("type") == "checkbox")
       {
           //bring back the parent's text (the label of the checkbox)
              //<label><input type="checkbox" name="all"> Main Conference — $200</label>
           const checkboxLblText = $wasClicked.parent().text();
           //brings back the position of the dollar sign in the label string
           const indexOfDollarSign = checkboxLblText.indexOf("$");
           //bring back the substring after the $ sign (https://www.w3schools.com/jsref/jsref_slice_string.asp)
           const dollarStr = checkboxLblText.slice(indexOfDollarSign + 1);
           //parse the string as an integer
           const intDollar = parseInt(dollarStr);

    //Updating and displaying the total activity cost part 2
           let wasChecked = false;
           //
           if ($wasClicked.is(':checked')) {
               //remove activity validation message if something was now checked
               hideInputValidationError("#errActivity");

               //do something when checked making it true (adding) (https://www.w3schools.com/js/js_operators.asp)
               //activityCostAmt = activityCostAmt + intDollar;
               activityCostAmt += intDollar;
               wasChecked = true;
           }
           else {
               //do something when unchecked, making it false, subtracting same as (x = x - y)
               activityCostAmt -= intDollar;
         }
         //The running total of the selected checkboxes is displayed here.
           $activityCostDiv.text("Total: $" + activityCostAmt);

           //Disabling conflicting activities part 1
            //checking for conflicts for any checkboxes besides the first (name = all) because it does not include a time range
           if ($wasClicked.attr("name") != "all")
           {
               const dayTimeSubstr = getTimestampStr($wasClicked);
               const $allCheckboxes = $(".activities input");

               //get each checkbox using for loop (i = 0-6 for 7 items), assigned to $curCheckbox
               for (let i = 0; i < $allCheckboxes.length; i+=1)
               {
                   const $curCheckbox = $allCheckboxes.eq(i);

                   if (($curCheckbox.attr("name") != "all") && ($curCheckbox.attr("name") != $wasClicked.attr("name")) && (isTimestampConflicting(dayTimeSubstr, getTimestampStr($curCheckbox))))
                   {
                      //current checkbox conflicts with the checkbox that was clicked
                      //enable if the $wasClicked was just checked, disable if just unchecked
                       $curCheckbox.attr("disabled", wasChecked);
                   }
               }
           }
       }
  });

  //getTimestampStr - extract the timestamp segment from a checkbox's label
  //emDash location plus two begins the timestamp. Go up to the position of the comma.
  //— Tuesday 1pm-4pm,

  const getTimestampStr = ($chkBox) => {
    const chkBoxStr = $chkBox.parent().text();
    const emDashLoc = chkBoxStr.indexOf("—");
    const commaLoc = chkBoxStr.indexOf(",");
    const dayTimeSubstr = chkBoxStr.slice(emDashLoc + 2, commaLoc);

    return dayTimeSubstr;
}

  //DetermineTwentyFourHour - take the curHour (int) and hourStr (complete time)
  //and determine its integer 24-hour representation
  const DetermineTwentyFourHour = (curHour, hourStr) => {
    if (hourStr == "12am")
    {
        return 0;
    }
    else if (hourStr == "12pm")
    {
        return 12;
    }
    else if (hourStr.indexOf("pm")!= -1)
    {
        return curHour + 12;
    }
    else
    {
        return curHour;
    }
}

  //isTimestampConflicting - determine whether the timestamps represented by
    //two separate strings (leftTimestamp, rightTimestamp) intersect at all
    //return true if so, false if not

  const isTimestampConflicting = (leftTimestamp, rightTimestamp) => {
  //timestamps are in the format {Day} {startTime}-{endTime}
  //isolate the day from each and compare; if they're different then
  //the two timestamps cannot conflict
    const leftSpaceLoc = leftTimestamp.indexOf(" ");
    const rightSpaceLoc = rightTimestamp.indexOf(" ");

    const leftDay = leftTimestamp.slice(0, leftSpaceLoc);
    const rightDay = rightTimestamp.slice(0, rightSpaceLoc);

    if (leftDay != rightDay)
    {
        return false;
    }

  //if the days are the same, compare the time ranges from each
  //isolate the numeric hours and the am vs pm strings
  //calculate the 24 hour representation of each of the four times
  //(left: start hour - end hour, right: start hour - end hour)

  //take everything one character to the right of the space up to the end of the string
    const leftTime = leftTimestamp.slice(leftSpaceLoc+1);
    const rightTime = rightTimestamp.slice(rightSpaceLoc+1);

    const leftDivide = leftTime.indexOf("-");
    const rightDivide = rightTime.indexOf("-");

    //we start at the beginning of the string up to the dash
    const leftStartTime = leftTime.slice(0, leftDivide);
    const rightStartTime = rightTime.slice(0, rightDivide);

    //take everything one character to the right of the dash up to the end of the string
    const leftEndTime = leftTime.slice(leftDivide+1);
    const rightEndTime = rightTime.slice(rightDivide+1);

    //we are removing the am/pm and parsing the hour number as an integer
    //in JS parseInt takes in all numbers found until a non-number is found
    //ex: parseInt("9pm") = 9
    let leftTimeStartHr = parseInt(leftStartTime);
    let rightTimeStartHr = parseInt(rightStartTime);

    let leftTimeEndHr = parseInt(leftEndTime);
    let rightTimeEndHr = parseInt(rightEndTime);

    //convert to 24 hour time clock
    leftTimeStartHr = DetermineTwentyFourHour(leftTimeStartHr, leftStartTime);
    leftTimeEndHr = DetermineTwentyFourHour(leftTimeEndHr, leftEndTime);
    rightTimeStartHr = DetermineTwentyFourHour(rightTimeStartHr, rightStartTime);
    rightTimeEndHr = DetermineTwentyFourHour(rightTimeEndHr, rightEndTime);

    //test if any of the time ranges have intersections. return result (true if yes, false if no)
      //https://stackoverflow.com/questions/3269434/whats-the-most-efficient-way-to-test-two-integer-ranges-for-overlap

      //example (9am <= 4pm) && (1pm <= 12pm) = (true) && (false) = no conflict (false)
    return (leftTimeStartHr <= rightTimeEndHr) && (rightTimeStartHr <= leftTimeEndHr);
}

//Payment Section
  //The selected payment option is selected based on the value (credit card, PayPal, or Bitcoin)
  //There are 6 total divs in the payment section (the last fieldset of the document)
  const $paymentSectionHome = $("fieldset").last();
  const $paymentTypeSections = $paymentSectionHome.find("div");
  //the first div eq(0) is the credit card section
  const $ccSection = $paymentTypeSections.eq(0);
  //the fifth div eq(4) is the paypal section
  const $paypalSection = $paymentTypeSections.eq(4);
  //the sixth div eq(5) is the bitcoin section
  const $bitcoinSection = $paymentTypeSections.eq(5);

  //Hide the sections for the values until selected
  $ccSection.hide();
  $paypalSection.hide();
  $bitcoinSection.hide();

  //Change the display depending upon the users choice of payment type
  const reactToPaymentType = (paymentTypeVal) => {
    //remove validation error: user has now selected a payment type
    hideInputValidationError("#err-payment");
    if (paymentTypeVal == 'credit card') {
   //Display the credit card inputs, hide others
      $ccSection.show();
      $paypalSection.hide();
      $bitcoinSection.hide();
    }
    //Display the paypal text, hide others
    else if (paymentTypeVal == 'paypal') {
      $ccSection.hide();
      $paypalSection.show();
      $bitcoinSection.hide();
    }
    //Display the bitcoin text, hide others
    else {
      $ccSection.hide();
      $paypalSection.hide();
      $bitcoinSection.show();
    }
  }
  //We are hiding the Select Payment Method option:  <option value="select_method">Select Payment Method</option>
  $("#payment option").first().hide();

  //event listener to call reactToPayment type on the selected option's value attribute
  $("#payment").on("change", (e) =>
  {
    reactToPaymentType($(e.target).val());
  });

  //These 3 lines are being called on page load: set the payment type to credit card
  //#payment id which is the select drop down, then get every option where the value is equal to credit card
  const $paymentSelect = $('#payment option[value="credit card"]');
  //setting the selected attribute to selected will highlight it
  $paymentSelect.attr('selected', 'selected');
  //selecting the 'credit card' choice in the dropdown doesn't cause the event listener to trigger
  //have to force the page to react by calling reactToPaymentType
  reactToPaymentType('credit card');

//Form Validation and Validation Messages
    //prevent the user from submitting the form if there are any validation errors

    //showInputValidationError - display an input validation error message in the specified
    //querystring element - display message ID in DOM is errIDName, displayed message is
    //display text, and take in a parameter to add any padding-bottom to adjust for spacing
    const showInputValidationError = (queryString, errIDName, displayText, paddingBottom) =>
    {
        const $mesgTarget = $(queryString);
        const $errMesgEle = $('<div id="' + errIDName + '" style="color: red; font-weight: bold; padding-bottom:' + paddingBottom + 'px;"></div>').text(displayText);
        $mesgTarget.before($errMesgEle);
    }

//VALIDATION
  //Error messages for validation errors
  //This is the master function to check all input validation
  //We want each of these validation functions to happen and if any returns false we return false

  const validationAllPageFormElements = () => {
    let retVal = true;
    if (!validationNameInput())
    {
      retVal = false;
    }
    if (!validationEmailInput())
    {
      retVal = false;
    }
    if (!validationActivitySection())
    {
      retVal = false;
    }
    if (!validationCreditCardInformation())
    {
      retVal = false;
    }

    return retVal;
  }

  //If the name text field value is empty then show a message
  const validationNameInput = () => {
    hideInputValidationError("#errName");
    if ($('#name').val() != "")
    {
      return true;
    }
    else
    {
      showInputValidationError("#name", "errName", "Name field must not be empty.", 0);
      return false;
    }
  }

  const validationEmailInput = () => {
      hideInputValidationError("#errEmail");
    //Validate the e-mail field if false then give an error message
      //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
      const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (re.test($('#mail').val()))
      {
        return true;
      }
      else
      {
        showInputValidationError("#mail", "errEmail", "Email address is improperly formatted.", 0);
        return false;
      }
  }
//Form Validation
  //At least one checkbox in the section Register for Activities must be selected
  //else an error will appear on the activities section.

  const validationActivitySection = () => {
    hideInputValidationError("#errActivity");
      let gotOne = false;
      const $allCheckboxes = $(".activities input");

      for (let i = 0; i < $allCheckboxes.length; i+=1)
      {
          const $curCheckbox = $allCheckboxes.eq(i);
          if ($curCheckbox.is(':checked'))
          {
              gotOne = true;
          }
      }

  if (gotOne)
    {
      return true;
    }
    else
    {
      showInputValidationError(".activities label:first", "errActivity", "At least one activity must be selected.", 30);
      return false;
    }
  }

  const validationCreditCardInformation = () => {
    //Hide all credit card validation errors
    hideInputValidationError("#err-cc-num");
    hideInputValidationError("#err-zip");
    hideInputValidationError("#err-cvv");
    hideInputValidationError("#err-payment");

    const paymentTypeVal = $("#payment").val();

    //if no payment option is selected, generate a message forcing the user to choose
    if (paymentTypeVal == "select_method")
    {
      showInputValidationError("button", "err-payment", "Payment choice must be made.", 0);
    }
    //if its credit card, validate the three input textboxes
    else if (paymentTypeVal == 'credit card')
    {
        let retVal = true;
        if (!validationCreditCardNumber())
        {
          retVal = false;
        }
        if (!validationCreditCardZipCode())
        {
          retVal = false;
        }
        if (!validationCreditCardCVV())
        {
          retVal = false;
        }

        return retVal;

    }
    //paypal and bitcoin need no validation; just return true
    else
    {
      return true;
    }
  }
  //Form validation for Credit Card error message
    //Regex (https://www.computerhope.com/unix/regex-quickref.htm)
    //(Positional metacharacters (^ = start of string or line, $ = end of string, or end of line
    //Use the regex to define the text https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

  const validationCreditCardNumber = () => {
    const validSizeMin = 13;
    const validSizeMax = 16;

    const ccNumberVal = $('#cc-num').val();
    const ccNumberValSize = ccNumberVal.length;

    const digitRegEx = /^(\d)+$/;

    //if the length is correct and the regex test is true, return true
    if (ccNumberValSize >= validSizeMin && ccNumberValSize <= validSizeMax && digitRegEx.test(ccNumberVal))
    {
      return true;
    }
    else if (ccNumberValSize == 0) //empty text box; error
    {
      showInputValidationError("#cc-num", "err-cc-num", "Credit card number cannot be empty.", 0);
      return false;
    }
    else if (!digitRegEx.test(ccNumberVal)) //nondigit characters; error
    {
      //error message for credit card if letters are typed
      showInputValidationError("#cc-num", "err-cc-num", "Credit card number must be only digits.", 0);
      return false;
    }
    else //wrong size; error
    {
      //error message for credit card if 13-16 digits are not typed
      showInputValidationError("#cc-num", "err-cc-num", "Credit card number must be between 13 and 16 digits.", 0);
      return false;
    }
  }

  //Form validation for Zip Code error message
    //Regex (https://www.computerhope.com/unix/regex-quickref.htm) //Positional metacharacters (^ = start of string or line, $ = end of string, or end of line
  const validationCreditCardZipCode = () => {
    const validSize = 5;

    const ccZipVal = $('#zip').val();
    const ccZipValSize = ccZipVal.length;

    const digitRegEx = /^(\d)+$/;

    //if size is correct and the regex passes, return true
    if (ccZipValSize == validSize && digitRegEx.test(ccZipVal))
    {
      return true;
    }
    else if (ccZipValSize == 0) //empty textfield; error
    {
      showInputValidationError("#zip", "err-zip", "Credit card ZIP code cannot be empty.", 0);
      return false;
    }
    else if (!digitRegEx.test(ccZipVal)) //non-digit characters; error
    {
      showInputValidationError("#zip", "err-zip", "Credit card ZIP code must be only digits.", 0);
      return false;
    }
    else  //wrong length; error
    {
      showInputValidationError("#zip", "err-zip", "Credit card ZIP code must be exactly 5 digits.", 0);
      return false;
    }
  }

  const validationCreditCardCVV = () => {
    const validSize = 3;

    const ccCVVVal = $('#cvv').val();
    const ccCVVValSize = ccCVVVal.length;

    const digitRegEx = /^(\d)+$/;

    //if size is correct and regex test passes, return true
    if (ccCVVValSize == validSize && digitRegEx.test(ccCVVVal))
    {
      return true;
    }
    else if (ccCVVValSize == 0) //empty textfield; error
    {
      showInputValidationError("#cvv", "err-cvv", "Credit card CVV code cannot be empty.", 0);
      return false;
    }
    else if (!digitRegEx.test(ccCVVVal)) //non-digit entries; error
    {
      showInputValidationError("#cvv", "err-cvv", "Credit card CVV code must be only digits.", 0);
      return false;
    }
    else  //wrong length; error
    {
      showInputValidationError("#cvv", "err-cvv", "Credit card CVV code must be exactly 3 digits.", 0);
      return false;
    }
  }

  //Use preventDefault when the form isn't properly filled out and let it submit/refresh when it is filled out properly
  $("form").submit((e) => {
  e.preventDefault();

  if (validationAllPageFormElements())
  {
    //validators succeeded; proceeding with the POST
    //This would normally be called here
    //$("form")[0].submit();

    //instead we will refresh the page
    location.reload();
  }

  });

  //when a key is pressed in the name input text field, call the name validator
  $("#name").on("keyup", () => {
    validationNameInput();
  });

  //when a key is pressed in the email input text field, call the email validator
  $("#mail").on("keyup", () => {
    validationEmailInput();
  });

  //when a key is pressed in the cc num input text field, call the cc num validator
  $("#cc-num").on("keyup", () => {
    hideInputValidationError("#err-cc-num");
    validationCreditCardNumber();
  });
 
  //when a key is pressed in the ZIP input text field, call the ZIP validator
  $("#zip").on("keyup", () => {
    hideInputValidationError("#err-zip");
    validationCreditCardZipCode();
  });

  //when a key is pressed in the CVV input text field, call the CVV validator
  $("#cvv").on("keyup", () => {
    hideInputValidationError("#err-cvv");
    validationCreditCardCVV();
  });

//THE END
});