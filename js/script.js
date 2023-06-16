const submitButton = document.querySelector('#submitButton')
const resultsTable = document.querySelector('#resultsTable')

submitButton.addEventListener('click', async () => {
  event.preventDefault()
  const raceYear = document.querySelector('#seasonInput').value
  const raceRound = document.querySelector('#roundInput').value
  const data = await fetch(`http://ergast.com/api/f1/${raceYear}/${raceRound}/driverstandings.json`).then(res => res.json())
  const tableData = data['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings'].slice(0, 7)
    .map(({ position, Driver, Constructors, points }) => ({
      drvPosition: position,
      drvName: `${Driver.givenName} ${Driver.familyName}`,
      drvNation: Driver.nationality,
      drvSponsor: Constructors[0].name,
      drvPoints: points
    }))
  handleTableData(tableData)
})

function handleTableData(tableData) {
  const tableBody = resultsTable.querySelector('tbody')
  tableData.forEach(rowData => {
    const rowCells = Object.values(rowData).map(val => `<td>${val}</td>`).join('')
    tableBody.innerHTML += `<tr>${rowCells}</tr>`
  })
}
