console.log("Dummy CTI Adapter Loaded!");
sforce.opencti.enableClickToDial({
    callback: function(result) {
        console.log("Click-to-Dial Enabled:", result.success);
    }
});
