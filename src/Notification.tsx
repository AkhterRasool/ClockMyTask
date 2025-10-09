import './css/Notification.css'

const Notification = ({notificationText}: { notificationText: string }) => {
    return <p id={'notification-banner'}>
        {notificationText}
    </p>
}

export default Notification