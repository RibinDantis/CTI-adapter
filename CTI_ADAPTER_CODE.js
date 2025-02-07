// Define our minimal CTI adapter object
var MyCTIAdapter = {
    /**
     * Initialize the adapter:
     * - Enable click-to-dial in the Lightning app.
     * - Register an event handler for onClickToDial.
     */
    init: function() {
        console.log("CTI Adapter initializing...");

        // Enable click-to-dial using the standard Open CTI API method.
        sforce.opencti.enableClickToDial({
            callback: function(result) {
                if (result.success) {
                    console.log("Click-to-Dial enabled successfully.");
                } else {
                    console.error("Error enabling Click-to-Dial:", result.errors);
                }
            }
        });

        // Register an event handler for when a user clicks (or dials) a phone number.
        sforce.opencti.onClickToDial({
            callback: function(response) {
                // The response object should contain the phone number in response.number.
                var phoneNumber = response.number;
                console.log("onClickToDial event received. Phone number:", phoneNumber);
                // Initiate the call by sending the phone number to your server.
                MyCTIAdapter.placeCall(phoneNumber);
            }
        });
    },

    /**
     * Sends a POST request to your server with the phone number.
     * Replace the endpoint URL with your own server’s API endpoint.
     *
     * @param {String} phoneNumber - The phone number to dial.
     */
    placeCall: function(phoneNumber) {
        console.log("Placing call to:", phoneNumber);

        // Replace this URL with your server's actual endpoint.
        var endpoint = "https://yourserver.example.com/api/call";

        // Use the Fetch API to send the phone number to the server.
        fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ phone: phoneNumber })
        })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok");
        })
        .then(function(data) {
            console.log("Call initiated successfully:", data);
        })
        .catch(function(error) {
            console.error("Error initiating call:", error);
        });
    }
};

// Initialize the CTI adapter when the window loads.
window.onload = function() {
    MyCTIAdapter.init();
};
