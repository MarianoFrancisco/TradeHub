
function initializeLogin() {
    $(function () {
        $("#circle").hide();
        $("#box").animate({ height: "320px" }, "slow");
        $("#box").animate({ width: "450px" }, "slow");
        $("#circle").fadeIn("slow");

    });
    function blinker() {
        $('#blinking').fadeOut("slow");
        $('#blinking').fadeIn("slow");
    }
    setInterval(blinker, 1500);
}