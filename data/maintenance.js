export const maintenanceConfig = {
    status: 'maintenance',
    
    info: {
        startTime: '2025-06-15',
        estimatedEnd: '2025-06-20T23:00:00',
        reason: 'Project SoneMC2 is under development.',
        type: 'Active Development',
    },
    
    progress: 70, 
    
    statusMessages: {
        maintenance: 'Project is currently under maintenance.',
        planned: 'Maintenance was planned and is ongoing.',
        emergency: 'Project had to be set to maintenance due to issues.',
    },
    
    infoItems: [
        {
            icon: 'fas fa-clock',
            label: 'Started',
            value: 'format-start-time'
        },
        {
            icon: 'fas fa-hourglass-start',
            label: 'Est. Duration',
            value: '5 days'
        },
        {
            icon: 'fas fa-tools',
            label: 'Type',
            value: 'Scheduled'
        },
        {
            icon: 'fas fa-chart-line',
            label: 'Progress',
            value: 'format-progress'
        }
    ]
};
