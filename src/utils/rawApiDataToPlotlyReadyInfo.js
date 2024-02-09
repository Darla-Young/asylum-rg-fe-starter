const rawApiDataToPlotlyReadyInfo = (view, office, data) => {
  if (!office || office === 'Select an Asylum Office') office = 'All Offices';
  const officeNames = [
    'All Offices',
    'Los Angeles, CA',
    'San Francisco, CA',
    'New York, NY',
    'Houston, TX',
    'Chicago, IL',
    'Newark, NJ',
    'Arlington, VA',
    'Boston, MA',
    'Miami, FL',
    'New Orleans, LA',
  ];
  const officeData = {};
  let yearMinMax = [];
  const yearByOfficeByGrant = {};
  let rowsForAllDisplay = [];
  let rowItem;
  for (let officeName of officeNames) {
    officeData[officeName] = {
      xYears: [],
      totals: [],
      yTotalPercentGranteds: [],
      totalPercentAdminCloseds: [],
      totalPercentDenieds: [],
    };
  }
  for (let yearResult of data['yearResults']) {
    yearMinMax.push(yearResult['fiscal_year']);
    if (!yearByOfficeByGrant[yearResult['fiscal_year']]) {
      yearByOfficeByGrant[yearResult['fiscal_year']] = {};
    }
    for (let yearData of yearResult['yearData']) {
      yearByOfficeByGrant[yearResult['fiscal_year']][yearData['office']] = {
        granted: yearData['granted'],
        adminClosed: yearData['adminClosed'],
        denied: yearData['denied'],
      };
      for (let officeName of officeNames) {
        let chosen = officeName === 'All Offices' ? yearResult : yearData;
        officeData[officeName]['xYears'].push(yearResult['fiscal_year']);
        officeData[officeName]['totals'].push(chosen['totalCases']);
        officeData[officeName]['yTotalPercentGranteds'].push(chosen['granted']);
        officeData[officeName]['totalPercentAdminCloseds'].push(
          chosen['adminClosed']
        );
        officeData[officeName]['totalPercentDenieds'].push(chosen['denied']);
      }
    }
  }
  if (office === 'All Offices') {
    switch (view) {
      case 'time-series':
        rowsForAllDisplay = [];
        for (let yearResults of data['yearResults']) {
          rowItem = {
            'Fiscal Year': yearResults['fiscal_year'],
            'Total Cases': yearResults['totalCases'],
            '% Granted': Number(yearResults['granted']).toFixed(2),
            '% Admin Close / Dismissal': Number(
              yearResults['adminClosed']
            ).toFixed(2),
            '% Denied': Number(yearResults['denied']).toFixed(2),
          };
          rowsForAllDisplay.push(rowItem);
        }
        return { rowsForAllDisplay, officeData };
      case 'office-heat-map':
        rowsForAllDisplay = [];
        for (let yearResults of data.yearResults) {
          for (let officeKey of officeNames) {
            if (
              yearResults.yearData.filter(
                yearItem => yearItem.office === officeKey
              ).length > 0
            ) {
              rowItem = {
                'Year [Office]': `${String(yearResults.fiscal_year)} [ ${String(
                  officeKey
                )} ]`,
                'Total Cases': yearResults.yearData.filter(
                  yearItem => yearItem.office === officeKey
                )[0].totalCases,
                '% Granted': Number(
                  yearResults.yearData.filter(
                    yearItem => yearItem.office === officeKey
                  )[0].granted
                ).toFixed(2),
                '% Admin Close / Dismissal': Number(
                  yearResults.yearData.filter(
                    yearItem => yearItem.office === officeKey
                  )[0].adminClosed
                ).toFixed(2),
                '% Denied': Number(
                  yearResults.yearData.filter(
                    yearItem => yearItem.office === officeKey
                  )[0].denied
                ).toFixed(2),
              };
              rowsForAllDisplay.push(rowItem);
            }
          }
        }
        const officeHeatMapDataObject = {
          x: officeNames,
          y: [],
          z: [],
        };
        for (let fiscal_year in yearByOfficeByGrant) {
          officeHeatMapDataObject['y'].push(fiscal_year);
          let zAxisArray = [];
          for (let officeName of officeNames) {
            zAxisArray.push(
              yearByOfficeByGrant[fiscal_year][officeName]
                ? yearByOfficeByGrant[fiscal_year][officeName]['granted']
                : 0
            );
          }
          officeHeatMapDataObject['z'].push(zAxisArray);
        }
        return { officeHeatMapDataObject, rowsForAllDisplay };
      case 'citizenship':
        rowsForAllDisplay = [];
        for (let item of data.citizenshipResults) {
          rowItem = {
            Citizenship: item.citizenship,
            'Total Cases': item.totalCases,
            '% Granted': Number(item.granted).toFixed(2),
            '% Admin Close / Dismissal': Number(item.adminClosed).toFixed(2),
            '% Denied': Number(item.denied).toFixed(2),
          };
          rowsForAllDisplay.push(rowItem);
        }
        const countryGrantRateObj = {
          countries: [],
          countriesPercentGranteds: [],
        };
        for (let country of data.citizenshipResults) {
          countryGrantRateObj['countries'].push(country['citizenship']);
          countryGrantRateObj['countriesPercentGranteds'].push(
            country['granted']
          );
        }
        return { rowsForAllDisplay, countryGrantRateObj };
      default:
        return {};
    }
  } else {
    switch (view) {
      case 'time-series':
        rowsForAllDisplay = [];
        data.yearResults.sort((a, b) => a.fiscal_year - b.fiscal_year);
        for (let i = 0; i < data.yearResults.length; i++) {
          if (
            data.yearResults[i].yearData.filter(
              dataItem => dataItem.office === office
            )[0]
          ) {
            const officeObj = data.yearResults[i].yearData.filter(
              dataItem => dataItem.office === office
            )[0];
            rowItem = {
              'Fiscal Year': data.yearResults[i].fiscal_year,
              'Total Cases': officeObj.totalCases,
              '% Granted': Number(officeObj.granted).toFixed(2),
              '% Admin Close / Dismissal': Number(
                officeObj.adminClosed
              ).toFixed(2),
              '% Denied': Number(officeObj.denied).toFixed(2),
            };
            rowsForAllDisplay.push(rowItem);
          }
        }
        const dataObject = officeData[office];
        return { rowsForAllDisplay, dataObject };
      case 'citizenship':
        rowsForAllDisplay = [];
        for (let item of data.citizenshipResults) {
          rowItem = {
            Citizenship: item.citizenship,
            'Total Cases': item.totalCases,
            '% Granted': Number(item.granted).toFixed(2),
            '% Admin Close / Dismissal': Number(item.adminClosed).toFixed(2),
            '% Denied': Number(item.denied).toFixed(2),
          };
          rowsForAllDisplay.push(rowItem);
        }
        const countryGrantRateObj = {
          countries: [],
          countriesPercentGranteds: [],
        };
        for (let country of data.citizenshipResults) {
          countryGrantRateObj['countries'].push(country['citizenship']);
          countryGrantRateObj['countriesPercentGranteds'].push(
            country['granted']
          );
        }
        return {
          rowsForAllDisplay,
          countryGrantRateObj,
        };
      default:
        return {};
    }
  }
};

export { rawApiDataToPlotlyReadyInfo };
