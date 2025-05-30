import { getGraves, getDeceased, getBlocks, getOwners, getRepairs, getVisits, getLogs, getUsers } from './getData.js';

function processDeceasedByMonth(deceasedData) {
    const monthlyCounts = new Array(12).fill(0);
    
    deceasedData.forEach(person => {
        if (person.deathDate) {
            try {
                const deathDate = new Date(person.deathDate);

                if (!isNaN(deathDate.getTime())) {
                    const month = deathDate.getMonth();
                    monthlyCounts[month]++;
                }
            } catch (e) {
                console.error('Error al procesar fecha:', person.deathDate, e);
            }
        }
    });
    
    return monthlyCounts;
}

function createDeceasedByMonthChart(monthlyData) {
    const ctx = document.getElementById('deceasedByMonthChart').getContext('2d');
    
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: 'Número de Difuntos',
                data: monthlyData,
                backgroundColor: 'rgba(75, 192, 192, 0.7)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cantidad de Difuntos'
                    },
                    ticks: {
                        stepSize: 1,
                        precision: 0
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Mes del Año'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Distribución de Difuntos por Mes',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} difunto(s)`;
                        }
                    }
                }
            }
        }
    });
}

async function main() {
    const deceased = await getDeceased();
    const graves = await getGraves();
    const blocks = await getBlocks();
    const owners = await getOwners();
    const repairs = await getRepairs();
    const visits = await getVisits();
    const logs = await getLogs();
    const users = await getUsers();

    const monthlyCounts = processDeceasedByMonth(deceased);

    createDeceasedByMonthChart(monthlyCounts);
}

document.addEventListener('DOMContentLoaded', main);