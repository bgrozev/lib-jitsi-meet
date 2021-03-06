module.exports = {
    /**
     * Returns JitsiTrackErrors based on the error object passed by GUM
     * @param error the error
     * @param {Array} devices Array with the requested devices
     */
    parseError: function (error, devices) {
        devices = devices || [];
        if (typeof error == "object" && error.constraintName && error.name
            && (error.name == "ConstraintNotSatisfiedError" ||
            error.name == "OverconstrainedError") &&
            (error.constraintName == "minWidth" ||
            error.constraintName == "maxWidth" ||
            error.constraintName == "minHeight" ||
            error.constraintName == "maxHeight") &&
            devices.indexOf("video") !== -1) {
                return this.UNSUPPORTED_RESOLUTION;
        } else if(typeof error === "object" && error.type === "jitsiError") {
            return error.errorObject;
        } else {
            return this.GENERAL;
        }
    },
    UNSUPPORTED_RESOLUTION: "gum.unsupported_resolution",
    /**
     * An event which indicates that the jidesha extension for Firefox is
     * needed to proceed with screen sharing, and that it is not installed.
     */
    FIREFOX_EXTENSION_NEEDED: "gum.firefox_extension_needed",
    CHROME_EXTENSION_INSTALLATION_ERROR:
        "gum.chrome_extension_installation_error",
    CHROME_EXTENSION_USER_CANCELED:
        "gum.chrome_extension_user_canceled",
    GENERAL: "gum.general",
    TRACK_IS_DISPOSED: "track.track_is_disposed",
    TRACK_MUTE_UNMUTE_IN_PROGRESS: "track.mute_unmute_inprogress"
};
