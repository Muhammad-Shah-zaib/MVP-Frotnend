export const PERMISSION_STATES = {
    GRANTED: "granted",
    DENIED: "denied",
    REQUESTING: "requesting",
    IDLE: "idle",
}

export const ERROR_NAMES = {
    NOT_ALLOWED: "NotAllowedError",
    NOT_FOUND: "NotFoundError",
    NOT_SUPPORTED: "NotSupportedError",
};

export const PERMISSION_MESSAGES = {
    GENERIC: "Unable to access camera. Please check your settings and try again.",
    DENIED: "Camera permission denied. Please allow camera access and try again.",
    NOT_FOUND: "No camera found on this device.",
    NOT_SUPPORTED: "Camera access is not supported by this browser.",
};

export const AUDIO_PERMISSION_MESSAGES = {
    GENERIC: "Unable to access microphone. Please check your settings and try again.",
    DENIED: "Microphone permission denied. Please allow microphone access and try again.",
    NOT_FOUND: "No microphone found on this device.",
    NOT_SUPPORTED: "Microphone access is not supported by this browser.",
};