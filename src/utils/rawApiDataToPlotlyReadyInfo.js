const rawApiDataToPlotlyReadyInfo = (view, office, data) => {
  const officeNames = [
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
  let rowItem;
  let rowsForTable;

  let yearMinMax = [];
  for (let yearResult of data.yearResults) {
    yearMinMax.push(yearResult['fiscal_year']);
  }

  const yearByOfficeByGrant = {};
  for (let yearResult of data.yearResults) {
    if (!yearByOfficeByGrant[yearResult['fiscal_year']])
      yearByOfficeByGrant[yearResult['fiscal_year']] = {};
    for (let yearData of yearResult['yearData']) {
      yearByOfficeByGrant[yearResult['fiscal_year']][yearData['office']] = {
        //assign rates to year:{office:{}}
        granted: yearData['granted'],
        adminClosed: yearData['adminClosed'],
        denied: yearData['denied'],
      };
    }
  }

  const officeData = {}; //object that holds each % as a key of array value
  for (let officeName of officeNames) {
    // creates an object for each office in officeData
    officeData[officeName] = {
      xYears: [],
      totals: [],
      yTotalPercentGranteds: [],
      totalPercentAdminCloseds: [],
      totalPercentDenieds: [],
    };

    for (let year of data.yearResults) {
      year.yearData.forEach(i => {
        if (i.office === officeName) {
          officeData[officeName]['xYears'].push(year['fiscal_year']);
          officeData[officeName]['totals'].push(i['totalCases']);
          officeData[officeName]['yTotalPercentGranteds'].push(i['granted']);
          officeData[officeName]['totalPercentAdminCloseds'].push(
            i['adminClosed']
          );
          officeData[officeName]['totalPercentDenieds'].push(i['denied']);
        }
      });
    }
  }

  if (!office || office === 'all') {
    switch (view) {
      case 'time-series':
        const rowsForAllDisplay = [];
        for (let yearResults of data.yearResults) {
          rowItem = {
            'Fiscal Year': yearResults.fiscal_year,
            'Total Cases': yearResults.totalCases,
            '% Granted': Number(yearResults.granted).toFixed(2),
            '% Admin Close / Dismissal': Number(
              yearResults.adminClosed
            ).toFixed(2),
            '% Denied': Number(yearResults.denied).toFixed(2),
          };
          rowsForAllDisplay.push(rowItem);
        }

        const finalData = {
          xYears: [],
          totals: [],
          yTotalPercentGranteds: [],
          totalPercentAdminCloseds: [],
          totalPercentDenieds: [],
        };
        for (let year of data.yearResults) {
          finalData['xYears'].push(year['fiscal_year']);
          finalData['totals'].push(year['totalCases']);
          finalData['yTotalPercentGranteds'].push(year['granted']);
          finalData['totalPercentAdminCloseds'].push(year['adminClosed']);
          finalData['totalPercentDenieds'].push(year['denied']);
        }

        return { ...finalData, rowsForAllDisplay, officeData };

      case 'office-heat-map':
        rowsForTable = [];
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
              rowsForTable.push(rowItem);
            }
          }
        }
        const officeHeatMapDataObject = {
          //declare helper object to construct data for heatmap plotly
          x: officeNames, //office
          y: [], //year
          z: [], //rate
        };
        for (let fiscal_year in yearByOfficeByGrant) {
          //loop through
          officeHeatMapDataObject['y'].push(fiscal_year); //include year into y axis
          let zAxisArray = []; //Array to hold each row for z axis
          for (let officeName of officeNames) {
            //loop using unique office names
            zAxisArray.push(
              yearByOfficeByGrant[fiscal_year][officeName]
                ? yearByOfficeByGrant[fiscal_year][officeName]['granted']
                : 0
            );
          }
          officeHeatMapDataObject['z'].push(zAxisArray); //push to zaxis array
        }
        return { officeHeatMapDataObject, rowsForTable };

      case 'citizenship':
        rowsForTable = [];
        for (let item of data.citizenshipResults) {
          rowItem = {
            Citizenship: item.citizenship,
            'Total Cases': item.totalCases,
            '% Granted': Number(item.granted).toFixed(2),
            '% Admin Close / Dismissal': Number(item.adminClosed).toFixed(2),
            '% Denied': Number(item.denied).toFixed(2),
          };
          rowsForTable.push(rowItem);
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
          rowsForTable,
          countryGrantRateObj,
        };
      default:
        return {};
    }
  } else {
    switch (view) {
      case 'time-series':
        rowsForTable = [];
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

            rowsForTable.push(rowItem);
          }
        }
        const singleOfficeDataObject = officeData[office];

        return {
          rowsForTable,
          singleOfficeDataObject,
        };

      case 'citizenship':
        rowsForTable = [];
        for (let item of data.citizenshipResults) {
          rowItem = {
            Citizenship: item.citizenship,
            'Total Cases': item.totalCases,
            '% Granted': Number(item.granted).toFixed(2),
            '% Admin Close / Dismissal': Number(item.adminClosed).toFixed(2),
            '% Denied': Number(item.denied).toFixed(2),
          };
          rowsForTable.push(rowItem);
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
          rowsForTable,
          countryGrantRateObj,
        };
      default:
        return {};
    }
  }
};

export { rawApiDataToPlotlyReadyInfo };
