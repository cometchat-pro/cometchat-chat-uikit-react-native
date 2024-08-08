export enum MessageEvents {
    ccMessageSent = "ccMessageSent",
    ccMessageDelivered = "ccMessageDelivered",
    ccMessageRead = "ccMessageRead",
    ccMessageDeleted = "ccMessageDeleted",
    ccMessageEdited = "ccMessageEdited",
    ccMessageLiveReaction = "ccMessageLiveReaction",
    ccMarkMessageAsRead = "ccMarkMessageAsRead",
    ccMessageError = "ccMessageError",
    ccActiveChatChanged = "ccActiveChatChanged",
    onTextMessageReceived = "onTextMessageReceived",
    onMediaMessageReceived = "onMediaMessageReceived",
    onCustomMessageReceived = "onCustomMessageReceived",
    onTypingStarted = "onTypingStarted",
    onTypingEnded = "onTypingEnded",
    onMessagesDelivered = "onMessagesDelivered",
    onMessagesRead = "onMessagesRead",
    onMessagesDeliveredToAll = "onMessagesDeliveredToAll",
    onMessagesReadByAll = "onMessagesReadByAll",
    onMessageEdited = "onMessageEdited",
    onMessageDeleted = "onMessageDeleted",
    onTransientMessageReceived = "onTransientMessageReceived",
    onFormMessageReceived = "onFormMessageReceived",
    onCardMessageReceived = "onCardMessageReceived",
    onSchedulerMessageReceived = "onSchedulerMessageReceived",
    onInteractionGoalCompleted = "onInteractionGoalCompleted",
    onCustomInteractiveMessageReceived = "onCustomInteractiveMessageReceived",
    onMessageReactionAdded = "onMessageReactionAdded",
    onMessageReactionRemoved = "onMessageReactionRemoved",
}