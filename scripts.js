$(document).ready(function(){

    // Validation vars
    validWeight = false;
    validGoalWeight = false;
    validCals = false;
    validExercise = false;
    validGender = false;
    validExerciseDays = false;

    // Main validation function
    validateFields = function(){

        submit = $('#submitBtn');

        if(validWeight == false) {
            submit.prop('disabled',true);
            return false;
        }

        if(validGoalWeight == false) {
            submit.prop('disabled',true);
            return false;
        }
                
        if(validCals == false) {
            submit.prop('disabled',true);
            return false;
        }
                
        if(validExercise == false) {
            submit.prop('disabled',true);
            return false;
        }
                
        if(validGender == false) {
            submit.prop('disabled',true);
            return false;
        }
                
        if(validExerciseDays == false) {
            submit.prop('disabled',true);
            return false;
        }

        submit.prop('disabled',false);

    }



    

    // Validation for each form field
    $('#currentWeight').on('change',function(){
        weight = $(this);

        $('#currentWeightError').remove();
        weight.removeClass('error-border');
        weight.removeClass('valid-border');

        if($.isNumeric(weight.val()) && weight.val() != 0 && weight.val() != ''){
            weight.addClass('valid-border');
            validWeight = true;
            validateFields();
            return validWeight;
        } else {
            error = '<span id="currentWeightError" class="error-msg">Please enter a valid weight.</span>';
            weight.parent().prepend(error)
            weight.addClass('error-border');
            validWeight = false;
            return validWeight;
        }
    })

    $('#goalWeight').on('change',function(){
        weight = $(this);

        $('#currentGoalWeightError').remove();
        weight.removeClass('error-border');
        weight.removeClass('valid-border');

        if($.isNumeric(weight.val()) && weight.val() != 0 && weight.val() != ''){
            weight.addClass('valid-border');
            validGoalWeight = true;
            validateFields();
            return validGoalWeight;
        } else {
            error = '<span id="currentGoalWeightError" class="error-msg">Please enter a valid weight.</span>';
            weight.parent().prepend(error)
            weight.addClass('error-border');
            validGoalWeight = false;
            validateFields();
            return validGoalWeight;
        }
    })

    $('#consumed').on('change',function(){
        consumed = $(this);

        $('#consumedError').remove();
        consumed.removeClass('error-border');
        consumed.removeClass('valid-border');

        if($.isNumeric(consumed.val()) && consumed.val() != 0 && consumed.val() != ''){
            consumed.addClass('valid-border');
            validCals = true;
            validateFields();
            return validCals;
        } else {
            error = '<span id="consumedError" class="error-msg">Please enter the amount of calories you normally eat.</span>';
            consumed.parent().prepend(error)
            consumed.addClass('error-border');
            validCals = false;
            validateFields();
            return validCals;
        }
    })

    $('#exercise').on('change',function(){
        exercise = $(this);

        $('#exerciseError').remove();
        exercise.removeClass('error-border');
        exercise.removeClass('valid-border');

        if($.isNumeric(exercise.val()) && exercise.val() >= 0 && exercise.val() != ''){
            exercise.addClass('valid-border');
            validExercise = true;
            validateFields();
            return validExercise;
        } else {
            error = '<span id="exerciseError" class="error-msg">Please enter the amount of calories you normally burn.</span>';
            exercise.parent().prepend(error)
            exercise.addClass('error-border');
            validExercise = false;
            validateFields();
            return validExercise;
        }
    })

    $('#gender').on('change',function(){
        gender = $(this);

        $('#genderError').remove();
        gender.removeClass('error-border');
        gender.removeClass('valid-border');

        if(gender.val() !=''){
            gender.addClass('valid-border');
            validGender = true;
            validateFields();
            return validGender;
        } else {
            error = '<span id="genderError" class="error-msg">Please select a gender.</span>';
            gender.parent().prepend(error)
            gender.addClass('error-border');
            validGender = false;
            validateFields();
            return validGender;
        }
    })

    $('#exerciseDays').on('change',function(){
        exerciseDays = $(this);

        $('#exerciseDaysError').remove();
        exerciseDays.removeClass('error-border');
        exerciseDays.removeClass('valid-border');

        if(exerciseDays.val() !=''){
            exerciseDays.addClass('valid-border');
            validExerciseDays = true;
            validateFields();
            return validExerciseDays;
        } else {
            error = '<span id="exerciseDaysError" class="error-msg">Please select how many days you exercise.</span>';
            exerciseDays.parent().prepend(error)
            exerciseDays.addClass('error-border');
            validExerciseDays = false;
            validateFields();
            return validExerciseDays;
        }
    })
    
    $('#resetBtn').on('click',function(){
        $('#currentWeight').val('');
        $('#goalWeight').val('');
        $('#consumed').val('');
        $('#exercise').val('');
        $('#gender').val('');
        $('#exerciseDays').val('');
        $('.valid-border').removeClass('valid-border');
        $('.error-border').removeClass('error-border');
        $('.error-msg').remove();

        $('#results').slideUp('slow',function(){
            $('#results').remove();
        });
        
        validWeight = false;
        validGoalWeight = false;
        validCals = false;
        validExercise = false;
        validGender = false;
        validExerciseDays = false;
        validateFields();
    })

    // Functions for setting values
    calcTDEE = function(){
        gender = $('#gender').val();

        if(gender == 1) {
            tdee = 12
            return tdee;
        } else if(gender == 2) {
            tdee = 10
            return tdee;
        } else {
            alert('Invalid selection in gender field, please click reset and try again.');
            return false;
        }
    }

    calcDailyBurn = function() {
        exercise = $('#exercise').val();
        exerciseDays = $('#exerciseDays').val();

        if(exerciseDays == 7) {
            averageBurn = exercise;
            return averageBurn;
        } else {
            exerciseArray = [];
            for(i=0;i<7;i++){
                if(exerciseDays >= i+1){
                    exerciseArray.push(exercise);
                } else {
                    exerciseArray.push(0);
                }
            }
            sum = 0;
            $.each(exerciseArray,function(){
                sum += parseInt(this);
            })
            averageBurn = Math.round(sum / exerciseArray.length);
            return averageBurn;
        }
    }


    // Calcuation function 
    $('#submitBtn').on('click',function(){
        $(this).prop('disabled',true);

        $('#results').slideUp('slow',function(){
            $('#results').remove();
        });
        
        currentWeight = $('#currentWeight').val();
        goalWeight = $('#goalWeight').val();
        tdee = calcTDEE();
        averageBurn = calcDailyBurn();
        dailyCalsEaten = $('#consumed').val();
        pound = 3500;
        totCals = 0;
        days = 0;

        while(currentWeight > goalWeight) {
            dailyCalsBurned = parseInt(currentWeight) * parseInt(tdee) + parseInt(averageBurn) - parseInt(dailyCalsEaten);
            totCals += dailyCalsBurned;
            Math.round(poundsLost = dailyCalsBurned / pound);
            currentWeight -= poundsLost;
            days += 1;
        }

        html = '<div class="row results-container" id="results">\
                    <div class="col-12 text-center">\
                        <span class="loader">It will take you '+days+' days to reach your goal weight.</span>\
                    </div>\
                    <div class="col-12 text-center">\
                        <span class="loader">You will burn '+totCals.toLocaleString()+' calories along the way.</span>\
                    </div>\
                </div>';
        $('#formContainer').append(html);
        $('#results').slideDown('slow');
        $(this).prop('disabled',false);
    })

})