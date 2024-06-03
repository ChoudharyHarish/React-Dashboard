import styles from "./EventCard.module.scss";

const EventCard = (props) => {
    const {
        timestamp,
        event_type,
        src_ip,
        dest_ip,
        proto,
        alert,
        dns,
        ssh,
        http,
        fileinfo
    } = props;

    const renderEventSpecifics = () => {
        console.log(dns);
        switch (event_type) {
            case 'alert':
                return (
                    <>
                        <p><strong>Signature:</strong> {alert.signature}</p>
                        <p><strong>Category:</strong> {alert.category}</p>
                        <p><strong>Severity:</strong> {alert.severity}</p>
                    </>
                );
            case 'ssh':
                return (
                    <>
                        <p><strong>Client Software Version:</strong> {ssh.client.software_version}</p>
                        <p><strong>Server Software Version:</strong> {ssh.server.software_version}</p>
                    </>
                );
            case 'http':
                return (
                    <>
                        <p><strong>URL:</strong> {http.url}</p>
                        <p><strong>Hostname:</strong> {http.hostname}</p>
                    </>
                );
            case 'fileinfo':
                return (
                    <>
                        <p><strong>Filename:</strong> {fileinfo.filename}</p>
                        <p><strong>Size:</strong> {fileinfo.size}</p>
                    </>
                );
            case 'dns':
                return (
                    <>
                        <p><strong>Query Type:</strong> {dns.type}</p>
                        {dns.rrname && <p><strong>RRName:</strong> {dns.rrname}</p>}
                        {dns.rrtype && <p><strong>RRType:</strong> {dns.rrtype}</p>}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`${styles.card}`}>
            {/* <p><strong>Timestamp:</strong> {timestamp}</p> */}
            <p><strong>Event Type:</strong> {event_type}</p>
            <p><strong>Source IP:</strong> {src_ip}</p>
            <p><strong>Destination IP:</strong> {dest_ip}</p>
            <p><strong>Protocol:</strong> {proto}</p>
            {renderEventSpecifics()}
        </div>
    );
};

export default EventCard;
