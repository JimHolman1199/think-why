export interface ModalConfig {
    modalTitle: string
    dismissButtonLabel?: string
    closeButtonLabel?: string
    shouldClose?(): Promise<boolean> | boolean
    shouldDismiss?(): Promise<boolean> | boolean
    onClose?(): Promise<boolean> | boolean
    onDismiss?(): Promise<boolean> | any
    disableCloseButton?(): boolean
    disableDismissButton?(): boolean
    hideCloseButton?: boolean
    hideDismissButton?: boolean
}
