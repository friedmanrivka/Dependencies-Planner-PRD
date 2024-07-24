
// import { Request, Response } from 'express';
// import RequestRepo from '../repositories/requestRepo';
// import { drive_v3, google } from 'googleapis';
// import * as path from 'path';

// const keyFile = path.join( __dirname, '../config/dependencies-planner-307db981027f.json');

// const auth = new google.auth.GoogleAuth({
//   keyFile,
//   scopes: ['https://www.googleapis.com/auth/spreadsheets'],
// });

// const sheets = google.sheets({ version: 'v4', auth });
// const drive = google.drive({ version: 'v3', auth });

// export const exportToGoogleSheets = async (req: Request, res: Response): Promise<void> => {
//   try {
   
//     const requests = await RequestRepo.getAllRequest();

//     const resource = {
//       properties: {
//         title: 'Dependencies Planner 2',
//       },
//     }

//     const spreadsheet = await sheets.spreadsheets.create({
//       requestBody: resource,
//       fields: 'spreadsheetId',
//     });

//     const spreadsheetId = spreadsheet.data.spreadsheetId;

//     if (!spreadsheetId) {
//       throw new Error('Failed to create spreadsheet');
//     }

//     const headers = [
//       'Request ID',
//       'Product Manager Name',
//       'Title',
//       'Description',
//       'Planned',
//       'Comment',
//       'Jira Link',
//       'Critical',
//       'Final Decision',
//       'Requestor Group',
//       ...Array.from({ length: 18 }, (_, i) => `Group ${i + 1} Status`),
//     ];

//     const values = requests.map(request => {
//       const row = [
//         request.id,
//         request.productmanagername,
//         request.title,
//         request.description,
//         request.planned,
//         request.comment,
//         request.JiraLink,
//         request.critical,
//         request.decision,
//         request.requestgroupid,
//       ];

//       const groupStatuses = Array(18).fill('Not Required');
//       request.affectedGroupsList.forEach(group => {
//         const groupIndex = parseInt(group.groupname.split(' ')[1], 10) - 1;
//         if (!isNaN(groupIndex) && groupIndex >= 0 && groupIndex < 18) {
//           groupStatuses[groupIndex] = group.statusname;
//         }
//       });

//       row.push(...groupStatuses);

//       return row;
//     });

//     values.unshift(headers);

//     await sheets.spreadsheets.values.update({
//       spreadsheetId,
//       range: 'Sheet1',
//       valueInputOption: 'RAW',
//       requestBody: {
//         values,
//       },
//     });
//     await drive.permissions.create({
//         fileId: spreadsheetId!,
//         requestBody: {
//           role: 'writer',  // Assigning editor role
//           type: 'user',
//           emailAddress: 'rivkaf291@gmail.com',
//         },
//       });
//     res.json({ message: 'Spreadsheet created successfully', spreadsheetId });
//   } catch (error) {
//     console.error('Error exporting to Google Sheets:', error);
//     res.status(500).send('Internal Server Error');
//   }
// };



// import { Request, Response } from 'express';
// import RequestRepo from '../repositories/requestRepo';
// import { createObjectCsvWriter } from 'csv-writer';
// import * as path from 'path';

// export const exportToCsv = async (req: Request, res: Response): Promise<void> => {
//   try {
//     // Fetch the data from the repository
//     const requests = await RequestRepo.getAllRequest();

//     // Define the headers for the CSV
//     const headers = [
//       { id: 'id', title: 'Request ID' },
//       { id: 'productmanagername', title: 'Product Manager Name' },
//       { id: 'title', title: 'Title' },
//       { id: 'description', title: 'Description' },
//       { id: 'planned', title: 'Planned' },
//       { id: 'comment', title: 'Comment' },
//       { id: 'jiralink', title: 'Jira Link' },
//       { id: 'critical', title: 'Critical' },
//       { id: 'finaldecision', title: 'Final Decision' },
//       { id: 'requestgroupid', title: 'Requestor Group' },
//       ...Array.from({ length: 18 }, (_, i) => ({ id: `group${i + 1}Status`, title: `Group ${i + 1} Status` })),
//     ];

//     // Prepare data for the CSV
//     const records = requests.map(request => {
//       const record: { [key: string]: any } = {
//         id: request.id,
//         productmanagername: request.productmanagername,
//         title: request.title,
//         description: request.description,
//         planned: request.planned,
//         comment: request.comment,
//         jiralink: request.JiraLink,
//         critical: request.critical,
//         finaldecision: request.decision,
//         requestgroupid: request.requestgroupid,
//       };

//       const groupStatuses = Array(18).fill('Not Required');
//       request.affectedGroupsList.forEach(group => {
//         const groupIndex = parseInt(group.groupname.split(' ')[1], 10) - 1;
//         if (!isNaN(groupIndex) && groupIndex >= 0 && groupIndex < 18) {
//           groupStatuses[groupIndex] = group.statusname;
//         }
//       });

//       groupStatuses.forEach((status, index) => {
//         record[`group${index + 1}Status`] = status;
//       });

//       return record;
//     });

//     // Define the CSV writer
//     const csvWriter = createObjectCsvWriter({
//       path: path.join(__dirname, '../config/dependencies_planner.csv'),
//       header: headers,
//     });

//     // Write records to the CSV file
//     await csvWriter.writeRecords(records);

//     // Send the CSV file to the client
//     res.download(path.join(__dirname, '../config/dependencies_planner.csv'), 'dependencies_planner.csv', err => {
//       if (err) {
//         console.error('Error downloading CSV file:', err);
//         res.status(500).send('Internal Server Error');
//       }
//     });
//   } catch (error) {
//     console.error('Error exporting to CSV:', error);
//     res.status(500).send('Internal Server Error');
//   }
// };

import { Request, Response } from 'express';
import RequestRepo from '../repositories/requestRepo';
import { createObjectCsvWriter } from 'csv-writer';
import * as path from 'path';

const csvFilePath = path.join(__dirname, '../config/dependencies_planner.csv');

const csvWriter = createObjectCsvWriter({
  path: csvFilePath,
  header: [
    { id: 'id', title: 'Request ID' },
    { id: 'productmanagername', title: 'Product Manager Name' },
    { id: 'title', title: 'Title' },
    { id: 'description', title: 'Description' },
    { id: 'planned', title: 'Planned' },
    { id: 'comment', title: 'Comment' },
    { id: 'jiralink', title: 'Jira Link' },
    { id: 'critical', title: 'Critical' },
    { id: 'decision', title: 'Final Decision' },
    { id: 'requestgroupid', title: 'Requestor Group' },
    ...Array.from({ length: 18 }, (_, i) => ({ id: `group${i + 1}`, title: `Group ${i + 1} Status` })),
  ],
});

export const exportToCSV = async (req: Request, res: Response): Promise<void> => {
  try {
    const requests = await RequestRepo.getAllRequest();

    const records = requests.map(request => {
      const record: any = {
        id: request.id,
        productmanagername: request.productmanagername,
        title: request.title,
        description: request.description,
        planned: request.planned,
        comment: request.comment,
        jiralink: request.JiraLink,
        critical: request.critical,
        decision: request.decision,
        requestgroupid: request.requestgroupid,
      };

      const groupStatuses = Array(18).fill('Not Required');
      request.affectedGroupsList.forEach(group => {
        const groupIndex = parseInt(group.groupname.split(' ')[1], 10) - 1;
        if (!isNaN(groupIndex) && groupIndex >= 0 && groupIndex < 18) {
          groupStatuses[groupIndex] = group.statusname;
        }
      });

      groupStatuses.forEach((status, index) => {
        record[`group${index + 1}`] = status;
      });

      return record;
    });

    await csvWriter.writeRecords(records);
    res.json({ message: 'CSV file created successfully', filePath: csvFilePath });
  } catch (error) {
    console.error('Error exporting to CSV:', error);
    res.status(500).send('Internal Server Error');
  }
};
