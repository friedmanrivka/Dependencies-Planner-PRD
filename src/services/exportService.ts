
import { Request, Response } from 'express';
import RequestRepo from '../repositories/requestRepo';
import { createObjectCsvStringifier } from 'csv-writer';

const csvStringifier = createObjectCsvStringifier({
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

    // Convert records to CSV string
    const csvString = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);

    // Set response headers for file download
    res.setHeader('Content-Disposition', 'attachment; filename="dependencies_planner.csv"');
    res.setHeader('Content-Type', 'text/csv');

    // Send the CSV string as a response
    res.send(csvString);
  } catch (error) {
    console.error('Error exporting to CSV:', error);
    res.status(500).send('Internal Server Error');
  }
};