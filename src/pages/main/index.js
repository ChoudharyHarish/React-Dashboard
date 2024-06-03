import React from 'react';
import styles from "./styles.module.scss"

import Search from '../../components/Search';


import Charts from '../../components/charts';
import data from "../../data/eve.json";


const MainDashboard = () => {

    const eventTypes = data.map(item => item.event_type);
    const categoryTypes = data.map((item) => {
        return item.event_type === 'alert' && item.alert.category
    })

    const eventTypeCounts = eventTypes.reduce((acc, type) => {
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {});
    const topEventType = Object.keys(eventTypeCounts).reduce((a, b) => eventTypeCounts[a] > eventTypeCounts[b] ? a : b);
    const topEventTypePercentage = ((eventTypeCounts[topEventType] / eventTypes.length) * 100).toFixed(2);

    const alertCategories = data.filter(item => item.event_type === 'alert').map(item => item.alert.category);
    const categoryCounts = alertCategories.reduce((acc, category) => {
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {});
    const topAlertCategory = Object.keys(categoryCounts).reduce((a, b) => categoryCounts[a] > categoryCounts[b] ? a : b);
    const topAlertCategoryPercentage = ((categoryCounts[topAlertCategory] / alertCategories.length) * 100).toFixed(2);

    const eventTypeDistribution = Object.keys(eventTypeCounts).map(type => {
        return `${type} (${((eventTypeCounts[type] / eventTypes.length) * 100).toFixed(2)}%)`;
    }).join(', ');



    const sourceIPs = data.map(item => item.src_ip);
    const destIPs = data.map(item => item.dest_ip);

    const sourceIPCounts = sourceIPs.reduce((acc, ip) => {
        acc[ip] = (acc[ip] || 0) + 1;
        return acc;
    }, {});
    const topSourceIP = Object.keys(sourceIPCounts).reduce((a, b) => sourceIPCounts[a] > sourceIPCounts[b] ? a : b);
    const topSourceIPCount = sourceIPCounts[topSourceIP];

    const destIPCounts = destIPs.reduce((acc, ip) => {
        acc[ip] = (acc[ip] || 0) + 1;
        return acc;
    }, {});
    const topDestIP = Object.keys(destIPCounts).reduce((a, b) => destIPCounts[a] > destIPCounts[b] ? a : b);
    const topDestIPCount = destIPCounts[topDestIP];

    const connectionPairs = data.reduce((acc, item) => {
        const pair = `${item.src_ip} -> ${item.dest_ip}`;
        acc[pair] = (acc[pair] || 0) + 1;
        return acc;
    }, {});
    const topConnectionPair = Object.keys(connectionPairs).reduce((a, b) => connectionPairs[a] > connectionPairs[b] ? a : b);
    const topConnectionPairCount = connectionPairs[topConnectionPair];

    const averageConnectionsPerSourceIP = (sourceIPs.length / new Set(sourceIPs).size).toFixed(2);
    const averageConnectionsPerDestIP = (destIPs.length / new Set(destIPs).size).toFixed(2);




    const severityData = data.filter((item) => item.event_type === 'alert').map((item) => item.alert.severity)

    const severityDataLine = data
        .filter(item => item.event_type === 'alert') // Filter only 'alert' events
        .map(item => ({ severity: item.alert.severity, timeStamp: item.timestamp }));


    const severityLevel3BySourceIP = data.filter(item => item.event_type === 'alert' && item.alert.severity === 3)
        .reduce((sourceIPs, item) => {
            const sourceIP = item.src_ip;
            sourceIPs[sourceIP] = (sourceIPs[sourceIP] || 0) + 1;
            return sourceIPs;
        }, {});

    const sortedSourceIPs = Object.keys(severityLevel3BySourceIP).sort((a, b) => severityLevel3BySourceIP[b] - severityLevel3BySourceIP[a]);
    const topSourceSevereIP = sortedSourceIPs[0];

    const signatureSeverityCounts = data.filter(item => item.event_type === 'alert').reduce((signatures, item) => {
        const { alert: { signature, severity } } = item;
        signatures[signature] = signatures[signature] || { 2: 0, 3: 0 };
        signatures[signature][severity]++;
        return signatures;
    }, {});


    const signatureStats = Object.entries(signatureSeverityCounts).reduce((stats, [signature, counts]) => {
        const totalAlerts = Object.values(counts).reduce((total, count) => total + count, 0);
        const highSeverityAlerts = counts[3] || 0;
        stats[signature] = highSeverityAlerts;
        return stats;
    }, {});


    const sortedSignatures = Object.keys(signatureStats).sort((a, b) => signatureStats[b] - signatureStats[a]);


    const topSignature = sortedSignatures[0];
    const topSignatureAlerts = signatureStats[topSignature];

    const protocolSeverityCounts = data.filter(item => item.event_type === 'alert').reduce((protocols, item) => {
        const { proto, alert: { severity } } = item;
        protocols[proto] = protocols[proto] || { 2: 0, 3: 0 };
        protocols[proto][severity]++;
        return protocols;
    }, {});


    const protocolStats = Object.entries(protocolSeverityCounts).reduce((stats, [protocol, counts]) => {
        const totalAlerts = Object.values(counts).reduce((total, count) => total + count, 0);
        const level2Alerts = counts[2] || 0;
        const level3Alerts = counts[3] || 0;
        const level2Percentage = ((level2Alerts / totalAlerts) * 100).toFixed(2);
        const level3Percentage = ((level3Alerts / totalAlerts) * 100).toFixed(2);
        stats[protocol] = {
            level2: `${level2Percentage}%`,
            level3: `${level3Percentage}%`,
        };
        return stats;
    }, {});


    return (
        <section className={`bg-background py-8  ${styles.mainContainer}`}>
            <Search />
            <section className='flex flex-col mt-6 gap-6'>
                <h1 className='text-center text-xl text-white'>Alerts Overview</h1>
                <div className={`${styles.container}`}>
                    <div className='flex flex-col gap-6 '>
                        <h1 className='text-left text-xl text-white'>Top trends</h1>
                        <div className='flex flex-col gap-4 text-white'>
                            <p>Most occured event type : <span className='text-blue-500 underline'> {topEventType} - {topEventTypePercentage}% </span></p>
                            <p>Most alerts are of type : <span className='text-green-500 underline'> {topAlertCategory} - {topAlertCategoryPercentage}% </span></p>
                            <p>Event types are distributed as :<span className='text-red-500 underline'>  {eventTypeDistribution}</span></p>
                        </div>

                    </div>
                    <Charts.PieChart eventTypes={eventTypes} />
                    <Charts.CategoryBarChart categoryData={categoryTypes} />
                </div>
            </section>
            <section className='flex flex-col mt-6 gap-6'>
                <h1 className='text-center text-xl text-white'>Ips overview</h1>
                <div className={`${styles.container}`}>
                    <div className='flex flex-col gap-6 '>
                        <h1 className='text-left text-xl text-white'>Top trends</h1>
                        <div className='flex flex-col gap-4 text-white'>
                            <p>The most active source IP is <span className='text-blue-500 underline'> {topSourceIP} </span>, initiating  <span className='text-blue-500 underline'>{topSourceIPCount} connections </span></p>
                            <p>The most targeted destination IP is  <span className='text-green-500 underline'> {topDestIP} </span> recieving <span className='text-green-500 underline'>{topDestIPCount} connections </span></p>
                            <p>Top source-destination pair: <span className='text-green-500 underline'> {topConnectionPair} </span>, <span className='text-green-500 underline'> {topConnectionPairCount} </span> connections.</p>
                            <p> Avg connections per source IP <span className='text-pink-500 underline'>{averageConnectionsPerSourceIP}</span> . Avg connections per destination IP: <spanc className='text-pink-500 underline'>{averageConnectionsPerDestIP}</spanc>.</p>
                        </div>

                    </div>
                    <Charts.IpChart sourceIPs={sourceIPs} />
                    <Charts.StackedBarChart srcIPs={sourceIPs} destIPs={destIPs} />


                </div>
            </section>
            <section className='flex flex-col mt-6 gap-6'>
                <h1 className='text-center text-xl text-white'>Severity overview</h1>
                <div className={`${styles.container}`}>
                    <div className='flex flex-col gap-6 '>
                        <h1 className='text-left text-xl text-white'>Top trends</h1>
                        <div className='flex flex-col gap-4 text-white'>
                            <p>Source Ips <span className='text-blue-500 underline'>{topSourceSevereIP}</span> triggered the highesh severity alert with level 3.</p>
                            <p>Signature {topSignature} is responsible for the most high severity alerts {topSignatureAlerts} </p>
                            <div>
                                {Object.entries(protocolStats).map(([protocol, { level2, level3 }]) => (
                                    <p key={protocol}>
                                        {protocol}: Level 2 - {level2}, Level 3 - {level3}
                                    </p>
                                ))}
                            </div>
                        </div>

                    </div>
                    <Charts.SeverityBar severityData={severityData} />

                    <Charts.SeverityLine severityData={severityDataLine} />

                </div>
            </section>

        </section>

    );
}

export default MainDashboard;
