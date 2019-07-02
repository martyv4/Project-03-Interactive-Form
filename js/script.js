/* Place the document in a ready state to be manipulated safely. */
    // https://learn.jquery.com/using-jquery-core/document-ready/
$(document).ready(function () { });

/* Set focus on the name ID */
    // pound sign something is looking for the id something
    // <input type="text" id="name" name="user_name">
    // https://api.jquery.com/focus/
    $("#name").focus();

/* Add Other option */
// On the drop down menu Job Role add an other role
    // Add input in index.html adding text to the placeholder. <input type="text" id="other-title" name="job_role_other" placeholder="Your Job Role">
    $('#other-title').hide();
    $('#title').on('change', (e) => {
           if ($(e.target).val() == 'other') {
               $('#other-title').show();
            } else {
                $('#other-title').hide();
            }
     });

 /* T-SHIRT section starts here */
    // Hide the  “Select Theme”  `option` element in the “Design” menu.  <select id="design" name="user_design">
    $("#design").find('option').first().hide();

    // The “Color” field will be updated and now display “Please select a T-shirt theme”.
        // <option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
    $("#color option:first").before('<option selected="selected" value="none">Please select a T-shirt theme</option>');

    // Hide the colors in the “Color” drop down menu. <select id="color">
    $("#color").find('option:not(:eq(0))').hide();

    // Event listener if show hide update color
    $('#design').on('change', function(){
      // T-shirt section extra credit
        $('#color').show();
        $('#colors-js-puns label').show();

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

    //T shirt section extra credit
    $('#color').hide();
    $('#colors-js-puns label').hide();

/* Activity Cost section */
    //Creating an element to display the total activity cost
    //var activityCostDiv = document.createElement("div");  // Create with DOM https://www.w3schools.com/jquery/jquery_dom_add.asp
    var activityCostDiv = $("<div></div>");
    $(".activities").append(activityCostDiv);      // Append the new element
    var activityCostAmt = 0.0;

    $(".activities").click((e) => {
        const wasClicked = $(e.target);
        if (wasClicked.attr("type") == "checkbox")
        {
            const checkboxLblText = wasClicked.parent().text();
            const indexOfDollarSign = checkboxLblText.indexOf("$");
            const dollarStr = checkboxLblText.slice(indexOfDollarSign + 1);
            const intDollar = parseInt(dollarStr);

            let wasChecked = false;

            if (wasClicked.is(':checked')) {
                //remove validation message if something was now checked
                hideInputValidationError("#errActivity");
                //do something when checked
                //activityCostAmt = activityCostAmt + intDollar;
                activityCostAmt += intDollar;
                //wasChecked = true;
            } else {
                //do something when unchecked
                activityCostAmt -= intDollar;
            }

            activityCostDiv.text("Total: $" + activityCostAmt);

            if (wasClicked.attr("name") != "all")
            {
                const dayTimeSubstr = getTimestampStr(wasClicked);
                const allCheckboxes = $(".activities input");

                for (let i = 0; i < allCheckboxes.length; i+=1)
                {
                    let curCheckbox = allCheckboxes.eq(i);
                    if (curCheckbox.attr("name") != "all" && curCheckbox.attr("name") != wasClicked.attr("name") && isTimestampConflicting(dayTimeSubstr, getTimestampStr(curCheckbox)))
                    {
                        curCheckbox.attr("disabled", wasChecked);
                    }
                }
            }
        }
    });

const getTimestampStr = (chkBox) => {
    const chkBoxStr = chkBox.parent().text();
    const emDashLoc = chkBoxStr.indexOf("—");
    const commaLoc = chkBoxStr.indexOf(",");
    const dayTimeSubstr = chkBoxStr.slice(emDashLoc + 2, commaLoc);

    return dayTimeSubstr;
}

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

const isTimestampConflicting = (leftTimestamp, rightTimestamp) => {
    const leftSpaceLoc = leftTimestamp.indexOf(" ");
    const rightSpaceLoc = rightTimestamp.indexOf(" ");

    const leftDay = leftTimestamp.slice(0, leftSpaceLoc);
    const rightDay = rightTimestamp.slice(0, rightSpaceLoc);

    if (leftDay != rightDay)
    {
        return false;
    }

    const leftTime = leftTimestamp.slice(leftSpaceLoc+1);
    const rightTime = rightTimestamp.slice(rightSpaceLoc+1);

    const leftDivide = leftTime.indexOf("-");
    const rightDivide = rightTime.indexOf("-");

    const leftStartTime = leftTime.slice(0, leftDivide);
    const rightStartTime = rightTime.slice(0, rightDivide);

    const leftEndTime = leftTime.slice(leftDivide+1);
    const rightEndTime = rightTime.slice(rightDivide+1);

    let leftTimeStartHr = parseInt(leftStartTime.slice(0, leftStartTime.length-1));
    let rightTimeStartHr = parseInt(rightStartTime.slice(0, rightStartTime.length-1));

    let leftTimeEndHr = parseInt(leftEndTime.slice(0, leftEndTime.length-1));
    let rightTimeEndHr = parseInt(rightEndTime.slice(0, rightEndTime.length-1));

    leftTimeStartHr = DetermineTwentyFourHour(leftTimeStartHr, leftStartTime);
    leftTimeEndHr = DetermineTwentyFourHour(leftTimeEndHr, leftEndTime);
    rightTimeStartHr = DetermineTwentyFourHour(rightTimeStartHr, rightStartTime);
    rightTimeEndHr = DetermineTwentyFourHour(rightTimeEndHr, rightEndTime);

    //https://stackoverflow.com/questions/3269434/whats-the-most-efficient-way-to-test-two-integer-ranges-for-overlap

    return (leftTimeStartHr <= rightTimeEndHr) && (rightTimeStartHr <= leftTimeEndHr);

    /*
    for (let i = leftTimeStartHr; i <= leftTimeEndHr; i++)
    {
        if (rightTimeStartHr >= i && rightTimeEndHr <= i)
        {
            return true;
        }
    }

    return false;
    */
}

const hideInputValidationError = (errIDName) =>
{
    $(errIDName).remove();
}

const showInputValidationError = (queryString, errIDName, displayText, paddingBottom) =>
{
    const mesgTarget = $(queryString);
    var errMesgEle = $('<div id="' + errIDName + '" style="color: red; font-weight: bold; padding-bottom:' + paddingBottom + 'px;"></div>').text(displayText);
    mesgTarget.before(errMesgEle);
}

// Payment Section

const paymentSectionHome = $("fieldset").last();
const paymentTypeSections = paymentSectionHome.find("div");
const ccSection = paymentTypeSections.eq(0);
const paypalSection = paymentTypeSections.eq(4);
const bitcoinSection = paymentTypeSections.eq(5);

ccSection.hide();
paypalSection.hide();
bitcoinSection.hide();

const reactToPaymentType = (paymentTypeVal) => {
  //remove validation error: user has now elected a payment type
  hideInputValidationError("#err-payment");
  if (paymentTypeVal == 'credit card') {
  ccSection.show();
  paypalSection.hide();
  bitcoinSection.hide();
}
else if (paymentTypeVal == 'paypal') {
  ccSection.hide();
  paypalSection.show();
  bitcoinSection.hide();
}
else {
  ccSection.hide();
  paypalSection.hide();
  bitcoinSection.show();
}
}

$("#payment option").first().hide();

$("#payment").on("change", (e) =>
{
  reactToPaymentType($(e.target).val());
});

const paymentSelect = $('#payment option[value="credit card"]');
paymentSelect.attr('selected', 'selected');
reactToPaymentType('credit card');

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
    //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
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

const validationActivitySection = () => {
  hideInputValidationError("#errActivity");
    let gotOne = false;
    const allCheckboxes = $(".activities input");

    for (let i = 0; i < allCheckboxes.length; i+=1)
    {
        let curCheckbox = allCheckboxes.eq(i);
        if (curCheckbox.is(':checked'))
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
  hideInputValidationError("#err-cc-num");
  hideInputValidationError("#err-zip");
  hideInputValidationError("#err-cvv");
  hideInputValidationError("#err-payment");

  const paymentTypeVal = $("#payment").val();
  if (paymentTypeVal == "select_method")
  {
    showInputValidationError("button", "err-payment", "Payment choice must be made.", 0);
  }
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
  else
  {
    return true;
  }
}

const validationCreditCardNumber = () => {
  let validSizeMin = 13;
  let validSizeMax = 16;

  let ccNumberVal = $('#cc-num').val();
  let ccNumberValSize = ccNumberVal.length;

  let digitRegEx = /^(\d)+$/;

  if (ccNumberValSize >= validSizeMin && ccNumberValSize <= validSizeMax && digitRegEx.test(ccNumberVal))
  {
    return true;
  }
  else if (ccNumberValSize == 0) //empty text box
  {
    showInputValidationError("#cc-num", "err-cc-num", "Credit card number cannot be empty.", 0);
    return false;
  }
  else if (!digitRegEx.test(ccNumberVal)) //nondigit characters
  {
    showInputValidationError("#cc-num", "err-cc-num", "Credit card number must be only digits.", 0);
    return false;
  }
  else //wrong size
  {
    showInputValidationError("#cc-num", "err-cc-num", "Credit card number must be between 13 and 16 digits.", 0);
    return false;
  }

}

const validationCreditCardZipCode = () => {
  let validSize = 5;

  let ccZipVal = $('#zip').val();
  let ccZipValSize = ccZipVal.length;

  let digitRegEx = /^(\d)+$/;

  if (ccZipValSize == validSize && digitRegEx.test(ccZipVal))
  {
    return true;
  }
  else if (ccZipValSize == 0) //empty
  {
    showInputValidationError("#zip", "err-zip", "Credit card ZIP code cannot be empty.", 0);
    return false;
  }
  else if (!digitRegEx.test(ccZipVal)) //non-digit characters
  {
    showInputValidationError("#zip", "err-zip", "Credit card ZIP code must be only digits.", 0);
    return false;
  }
  else  //wrong length
  {
    showInputValidationError("#zip", "err-zip", "Credit card ZIP code must be exactly 5 digits.", 0);
    return false;
  }

}

const validationCreditCardCVV = () => {
  let validSize = 3;

  let ccCVVVal = $('#cvv').val();
  let ccCVVValSize = ccCVVVal.length;

  let digitRegEx = /^(\d)+$/;

  if (ccCVVValSize == validSize && digitRegEx.test(ccCVVVal))
  {
    return true;
  }
  else if (ccCVVValSize == 0) //empty
  {
    showInputValidationError("#cvv", "err-cvv", "Credit card CVV code cannot be empty.", 0);
    return false;
  }
  else if (!digitRegEx.test(ccCVVVal)) //non-digit entries
  {
    showInputValidationError("#cvv", "err-cvv", "Credit card CVV code must be only digits.", 0);
    return false;
  }
  else  //wrong length
  {
    showInputValidationError("#cvv", "err-cvv", "Credit card CVV code must be exactly 3 digits.", 0);
    return false;
  }

}

$("form").submit((e) => {
e.preventDefault();

let successMesgName = "#success";
$(successMesgName).remove();

if (validationAllPageFormElements())
{
  //validators succeeded; proceeding with the POST
  //This would normally be called here
  //$("form")[0].submit();
  const mesgTarget = $("button");
  var successMesgEle = $('<div id="success" style="color: green; font-weight: bold; padding-bottom:' + 0 + 'px;"></div>').text("Submit would be executed now.");
  mesgTarget.after(successMesgEle);
}

});

$("#name").on("keyup", () => {
  validationNameInput();
});

$("#mail").on("keyup", () => {
  validationEmailInput();
});

$("#cc-num").on("keyup", () => {
  hideInputValidationError("#err-cc-num");
  validationCreditCardNumber();
});

$("#zip").on("keyup", () => {
  hideInputValidationError("#err-zip");
  validationCreditCardZipCode();
});

$("#cvv").on("keyup", () => {
  hideInputValidationError("#err-cvv");
  validationCreditCardCVV();
});