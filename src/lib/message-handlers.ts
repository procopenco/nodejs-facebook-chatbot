
export class MessageHandlers {
    greetingsHandler(message: any) {
        return {
            "text": `Hi! I'm a localhost demo chat bot. My goal is to allow my creator to study facebook chatbot framework.`
        };
    }

    fallbackHandler(message: any) {
        return {
            "text": `Sorry, I'm still learning. Try something easier`
        };
    }
};
