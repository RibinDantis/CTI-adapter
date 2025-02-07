var agentExtension = null;

window.onload = function () {
    console.log("CTI Adapter Loaded");

    // Retrieve agent details using the standard Open CTI API
    sforce.opencti.getUserInfo({
        callback: function(response) {
            if (response.success && response.userInfo) {
                agentExtension = response.userInfo.extension; // Adjust the property name if needed
                console.log("Agent Extension Retrieved: ", agentExtension);
            } else {
                console.error("Failed to retrieve user info:", response.errors);
            }
        }
    });

    // Enable Click-to-Dial functionality
    sforce.opencti.enableClickToDial({
        callback: function(response) {
            if (response.success) {
                console.log("Click-to-Dial enabled.");
            } else {
                console.error("Failed to enable Click-to-Dial:", response.errors);
            }
        }
    });

    // Listen for Click-to-Dial events
    sforce.opencti.onClickToDial({
        callback: function(response) {
            if (response.success && response.number) {
                console.log("Click-to-Dial event detected. Number:", response.number);
                dialNumber(response.number);
            } else {
                console.error("Failed to handle Click-to-Dial event:", response.errors);
            }
        }
    });

};


function dialNumber(phoneNumber) {
    console.log("Dialing number: " + phoneNumber);

    sforce.opencti.clickToDial({
        number: phoneNumber,
        callback: function(response) {
            if (response.success) {
                console.log("Call initiated successfully.");
                logCall(phoneNumber, "In Progress");
            } else {
                console.error("Call initiation failed:", response.errors);
            }
        }
    });
}


function logCall(phoneNumber, callStatus) {
    sforce.opencti.saveLog({
        value: "Call to " + phoneNumber + " - Status: " + callStatus,
        callback: function(response) {
            if (response.success) {
                console.log("Call log saved successfully.");
            } else {
                console.error("Failed to save call log:", response.errors);
            }
        }
    });
}