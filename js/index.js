import { getDeceased } from './getData.js';

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
                backgroundColor: 'rgb(163, 53, 156)',
                borderColor: 'rgb(163, 53, 156)',
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

function processDeceasedByYear(deceasedData) {
    const yearCounts = {};
    
    deceasedData.forEach(person => {
        if (person.deathDate) {
            try {
                const deathDate = new Date(person.deathDate);
                if (!isNaN(deathDate.getTime())) {
                    const year = deathDate.getFullYear();
                    yearCounts[year] = (yearCounts[year] || 0) + 1;
                }
            } catch (e) {
                console.error('Error al procesar fecha:', person.deathDate, e);
            }
        }
    });
    
    const sortedYears = Object.keys(yearCounts).sort();
    const counts = sortedYears.map(year => yearCounts[year]);
    
    return {
        years: sortedYears,
        counts: counts
    };
}

function createDeceasedByYearChart(yearData) {
    const ctx = document.getElementById('deceasedByYearChart').getContext('2d');
    
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: yearData.years,
            datasets: [{
                label: 'Número de Difuntos',
                data: yearData.counts,
                backgroundColor: 'rgb(163, 53, 156)',
                borderColor: 'rgb(163, 53, 156)',
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
                        text: 'Año'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Distribución de Difuntos por Año',
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

function calculateStatistics(deceased, monthlyCounts, yearData) {
    const totalDeceased = deceased.length;
    
    let maxYear = { year: '', count: 0 };
    let minYear = { year: '', count: Infinity };
    
    yearData.years.forEach((year, index) => {
        const count = yearData.counts[index];
        if (count > maxYear.count) {
            maxYear = { year, count };
        }
        if (count < minYear.count) {
            minYear = { year, count };
        }
    });
    
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    let maxMonth = { month: '', count: 0 };
    let minMonth = { month: '', count: Infinity };
    
    monthlyCounts.forEach((count, index) => {
        if (count > maxMonth.count) {
            maxMonth = { month: months[index], count };
        }
        if (count < minMonth.count) {
            minMonth = { month: months[index], count };
        }
    });
    
    return {
        totalDeceased,
        maxYear,
        minYear,
        maxMonth,
        minMonth
    };
}

function updateStatsCards(stats) {
    document.getElementById('total-deceased').innerHTML = `<span class="highlight-year">${stats.totalDeceased}</span>`;

    document.getElementById('max-year').innerHTML = `
        <span class="highlight-year">${stats.maxYear.year}</span>
        <span class="highlight-count">(${stats.maxYear.count})</span>
    `;

    document.getElementById('min-year').innerHTML = `
        <span class="highlight-year">${stats.minYear.year}</span>
        <span class="highlight-count">(${stats.minYear.count})</span>
    `;

    document.getElementById('max-month').innerHTML = `
        <span class="highlight-year">${stats.maxMonth.month}</span>
        <span class="highlight-count">(${stats.maxMonth.count})</span>
    `;

    document.getElementById('min-month').innerHTML = `
        <span class="highlight-year">${stats.minMonth.month}</span>
        <span class="highlight-count">(${stats.minMonth.count})</span>
    `;
}

async function main() {
    const deceased = await getDeceased();

    const monthlyCounts = processDeceasedByMonth(deceased);
    createDeceasedByMonthChart(monthlyCounts);

    const yearData = processDeceasedByYear(deceased);
    createDeceasedByYearChart(yearData);

    const stats = calculateStatistics(deceased, monthlyCounts, yearData);
    updateStatsCards(stats);
}

document.addEventListener('DOMContentLoaded', main);